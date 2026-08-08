const ROOT_FOLDER_ID = "<YOUR_ROOT_FOLDER_ID>";

const TIME_ZONE = "Asia/Shanghai";
const DECK = "TOEFL Listening";
const NOTE_TYPE = "Listening Memory";

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

  if (entries.length === 0) {
    return { error: "entries must contain at least one entry" };
  }

  const preparedEntries = entries.map(prepareEntry_);

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
      "listening-memory-" + timestamp + ".json";

    const sourceFolder = subfolder_("sources");

    const mergedEntries = mergeIntoMemoryFile_(
      sourceFolder,
      memoryFilename,
      preparedEntries
    );

    const allEntries = loadEntries_(date);

    const ankiFilename =
      "listening-anki-" + date + ".txt";

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
  if (
    entry == null ||
    typeof entry !== "object" ||
    Array.isArray(entry)
  ) {
    throw new Error("Each entry must be a JSON object");
  }

  const sourceSentence = clean_(entry["Source Sentence"]);

  if (!sourceSentence) {
    throw new Error("Source Sentence is required");
  }

  const focus = entry["Focus"];

  if (!Array.isArray(focus) || focus.length === 0) {
    throw new Error("Focus must be a non-empty array");
  }

  const preparedFocus = focus
    .map(clean_)
    .filter(Boolean);

  if (preparedFocus.length === 0) {
    throw new Error("Focus must contain at least one non-empty item");
  }

  const prepared = {
    "Source Sentence": sourceSentence,
    "Focus": preparedFocus
  };

  if (Object.prototype.hasOwnProperty.call(entry, "Translation")) {
    prepared["Translation"] = clean_(entry["Translation"]);
  }

  if (Object.prototype.hasOwnProperty.call(entry, "Notes")) {
    prepared["Notes"] = clean_(entry["Notes"]);
  }

  return prepared;
}

function loadEntries_(date) {
  const files = subfolder_("sources").getFiles();
  const pattern = new RegExp(
    "^listening-memory-\\d{2}-" +
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

  let entries = [];

  matched.forEach(file => {
    const data = JSON.parse(
      file.getBlob().getDataAsString("UTF-8")
    );

    if (Array.isArray(data)) {
      entries = mergeEntries_(
        entries,
        data.map(prepareEntry_)
      );
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
  return clean_(entry["Source Sentence"]);
}

function formatAnki_(entries) {
  const lines = [
    "#separator:Tab",
    "#html:true",
    "#notetype:" + NOTE_TYPE,
    "#deck:" + DECK,
    "#columns:Source Sentence\tFocus\tTranslation\tNotes"
  ];

  entries.forEach(entry => {
    lines.push([
      escapeHtml_(entry["Source Sentence"]),
      formatFocus_(entry["Focus"]),
      escapeHtml_(entry["Translation"]),
      escapeHtml_(entry["Notes"])
    ].join("\t"));
  });

  return lines.join("\n") + "\n";
}

function formatFocus_(focus) {
  return focus
    .map(item => escapeHtml_(item))
    .join("<br>");
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
