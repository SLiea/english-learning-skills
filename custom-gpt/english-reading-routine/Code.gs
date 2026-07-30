const ROOT_FOLDER_ID = "folderid";

const TIME_ZONE = "Asia/Shanghai";
const DECK = "TOEFL2026";
const NOTE_TYPE = "Reading Memory";

function doGet() {
  return json_({ ok: true });
}

function doPost(e) {
  try {
    const body = JSON.parse(
      (e.postData && e.postData.contents) || "{}"
    );

    return json_(store_(body.entries));
  } catch (error) {
    return json_({
      error: String(error.message || error)
    });
  }
}

function store_(entries) {
  if (!Array.isArray(entries)) {
    return { error: "entries must be an array" };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const timestamp = Utilities.formatDate(
      new Date(),
      TIME_ZONE,
      "HH-dd-MM-yy"
    );
    const date = timestamp.slice(3);

    const memoryFilename =
      "reading-memory-" + timestamp + ".json";

    const sourceFolder = subfolder_("sources");

    const preparedEntries = entries.map(prepareEntry_);

    const mergedEntries = mergeIntoMemoryFile_(
      sourceFolder,
      memoryFilename,
      preparedEntries
    );

    const allEntries = loadEntries_(date);

    const ankiFilename =
      "reading-anki-" + date + ".txt";

    const ankiFile = upsert_(
      subfolder_("anki"),
      ankiFilename,
      formatAnki_(allEntries)
    );

    const memoryFile =
      sourceFolder.getFilesByName(memoryFilename).next();

    return {
      storedEntries: mergedEntries.length,
      saved: [
        {
          filename: memoryFile.getName(),
          url: memoryFile.getUrl()
        },
        {
          filename: ankiFile.getName(),
          url: ankiFile.getUrl()
        }
      ]
    };
  } finally {
    lock.releaseLock();
  }
}

function prepareEntry_(entry) {
  const prepared = Object.assign({}, entry);

  if (!clean_(prepared["Import Key"])) {
    const importKey = defaultImportKey_(prepared);

    if (importKey) {
      prepared["Import Key"] = importKey;
    }
  }

  return prepared;
}

function defaultImportKey_(entry) {
  const type = clean_(entry["Entry Type"]);

  if (
    type === "vocabulary" ||
    type === "expression"
  ) {
    return [
      clean_(entry["Entry Content"]),
      clean_(entry["Source Sentence"])
    ].join("::");
  }

  const valueFields = entry["Value Fields"] || [];

  if (
    (
      type === "sentence" ||
      type === "paragraph"
    ) &&
    valueFields.indexOf("grammar") !== -1
  ) {
    return clean_(entry["Grammar"]);
  }

  return "";
}

function loadEntries_(date) {
  const files = subfolder_("sources").getFiles();
  const pattern = new RegExp(
    "^reading-memory-\\d{2}-" +
    escapeRegex_(date) +
    "\\.json$"
  );
  const matched = [];

  while (files.hasNext()) {
    const file = files.next();

    if (pattern.test(file.getName())) {
      matched.push(file);
    }
  }

  matched.sort((a, b) =>
    a.getName().localeCompare(b.getName())
  );

  const entries = [];

  matched.forEach(file => {
    const data = JSON.parse(
      file.getBlob().getDataAsString("UTF-8")
    );

    if (Array.isArray(data)) {
      entries.push.apply(entries, data);
    }
  });

  return entries;
}

function mergeIntoMemoryFile_(folder, filename, newEntries) {
  const files = folder.getFilesByName(filename);
  let file;
  let existingEntries = [];

  if (files.hasNext()) {
    file = files.next();

    const content =
      file.getBlob().getDataAsString("UTF-8");

    if (content.trim()) {
      const parsed = JSON.parse(content);

      if (!Array.isArray(parsed)) {
        throw new Error(
          "Existing memory file does not contain a JSON array"
        );
      }

      existingEntries = parsed.map(prepareEntry_);
    }
  }

  const mergedEntries =
    mergeEntries_(existingEntries, newEntries);

  const output =
    JSON.stringify(mergedEntries, null, 2);

  if (file) {
    file.setContent(output);
  } else {
    folder.createFile(
      filename,
      output,
      MimeType.PLAIN_TEXT
    );
  }

  return mergedEntries;
}

function mergeEntries_(existingEntries, newEntries) {
  const result = existingEntries.slice();
  const indexes = new Map();

  result.forEach((entry, index) => {
    indexes.set(entryKey_(entry), index);
  });

  newEntries.forEach(entry => {
    const key = entryKey_(entry);

    if (indexes.has(key)) {
      // 同一 instance 再次提交时，以新版本更新旧版本。
      const index = indexes.get(key);
      result[index] = Object.assign(
        {},
        result[index],
        entry
      );
    } else {
      indexes.set(key, result.length);
      result.push(entry);
    }
  });

  return result;
}

function entryKey_(entry) {
  const importKey = clean_(entry["Import Key"]);

  if (importKey) {
    return importKey;
  }
  
  const type = clean_(entry["Entry Type"]);

  if (
    type === "vocabulary" ||
    type === "expression"
  ) {
    return [
      type,
      clean_(entry["Entry Content"]),
      clean_(entry["Source Sentence"])
    ].join("::");
  }

  const valueFields =
    entry["Value Fields"] || [];

  if (
    (
      type === "sentence" ||
      type === "paragraph"
    ) &&
    valueFields.indexOf("grammar") !== -1
  ) {
    return [
      type,
      clean_(entry["Grammar"])
    ].join("::");
  }

  return [
    type,
    clean_(entry["Entry Content"])
  ].join("::");
}

function formatAnki_(entries) {
  const lines = [
    "#separator:Tab",
    "#html:true",
    "#notetype:" + NOTE_TYPE,
    "#deck:" + DECK,
    "#columns:Import Key\tEntry Type\tFront\tBack"
  ];

  entries.forEach(entry => {
    const row = convertEntry_(entry);

    if (row) {
      lines.push(row.map(clean_).join("\t"));
    }
  });

  return lines.join("\n") + "\n";
}

function convertEntry_(entry) {
  const entryType = entry["Entry Type"];

  if (
    entryType === "vocabulary" ||
    entryType === "expression"
  ) {
    const content = clean_(entry["Entry Content"]);
    const source = clean_(entry["Source Sentence"]);
    const importKey = clean_(entry["Import Key"]) || defaultImportKey_(entry);
    const frontFields =
      entryType === "vocabulary"
        ? [
            "Entry Content",
            "Source Sentence",
            "Pronunciation"
          ]
        : [
            "Entry Content",
            "Source Sentence"
          ];

    const front = frontFields
      .map(field => div_(entry[field]))
      .join("");

    const back = [
      "Explanation",
      "Optional Translation",
      "Source Context",
      "Notes"
    ]
      .map(field => div_(entry[field]))
      .join("");

    return [
      importKey,
      entryType,
      front,
      back
    ];
  }

  const valueFields = entry["Value Fields"] || [];

  if (
    (
      entryType === "sentence" ||
      entryType === "paragraph"
    ) &&
    valueFields.indexOf("grammar") !== -1
  ) {
    const grammar = clean_(entry["Grammar"]);
    const importKey = clean_(entry["Import Key"]) || defaultImportKey_(entry);
    const back = [
      "Custom Note",
      "Source"
    ]
      .map(field => div_(entry[field]))
      .join("");

    return [
      importKey,
      "grammar",
      grammar,
      back
    ];
  }

  return null;
}

function div_(value) {
  const text = escapeHtml_(value);

  return text
    ? "<div>" + text + "</div>"
    : "";
}

function clean_(value) {
  return String(value == null ? "" : value)
    .replace(/\t/g, " ")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ");
}

function escapeHtml_(value) {
  return clean_(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function upsert_(folder, filename, content) {
  const files = folder.getFilesByName(filename);

  if (files.hasNext()) {
    const file = files.next();
    file.setContent(content);
    return file;
  }

  return folder.createFile(
    filename,
    content,
    MimeType.PLAIN_TEXT
  );
}

function subfolder_(name) {
  const root =
    DriveApp.getFolderById(ROOT_FOLDER_ID);

  const folders =
    root.getFoldersByName(name);

  if (folders.hasNext()) {
    return folders.next();
  }

  return root.createFolder(name);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeRegex_(text) {
  return String(text).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}