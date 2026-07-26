# English Reading Routine

## Custom GPT Configuration

Use `SKILL.md` as the main instruction.

Add these files as reference files:

```text
standard-reading-procedure.md
memory-formatter.md
memory-schemas.md
AnkiFormat.md
anki_formatter.py
```

Enable Data Analysis so the GPT can run `anki_formatter.py` in the sandbox.

Configure one GPT Action named `readingMemoryStorage` for persistent memory storage.

## Anki Memory Entry Usage

Reading Routine constructs canonical memory entries first, then uses `anki_formatter.py` to convert same-day memory entries into an Anki import file.

### One-time Anki setup

1. Create an Anki note type named `Reading Memory`.
2. Add fields in this order:

```text
Import Key
Entry Type
Front
Back
```

3. Configure the card template:

Front:

```html
{{Front}}
```

Back:

```html
{{FrontSide}}

<hr id="answer">

{{Back}}
```

### Daily usage

1. Request memory entry construction and ask for Anki output.
2. The GPT pulls the current day's existing memory files from persistent storage.
3. The GPT creates a new `reading-memory-hh-dd-mm-yy.json` file for the current request.
4. The GPT uses all same-day memory entry files in the sandbox to regenerate `reading-anki-dd-mm-yy.txt`.
5. The GPT pushes generated output files back to persistent storage.
6. Import the generated `reading-anki-dd-mm-yy.txt` file in Anki Desktop.
7. For normal additions, ignore duplicate notes to avoid modifying existing learning records.

New entries are added as new cards and follow the existing deck's scheduling rules.

## Persistent Memory Storage Setup

### Google Drive

Create one Google Drive folder as the storage root.

Folder structure:

```text
<ROOT_FOLDER_ID>/
  sources/
  anki/
  outputs/
```

File routing:

```text
sources/reading-memory-hh-dd-mm-yy.json
anki/reading-anki-dd-mm-yy.txt
outputs/<other generated files>
```

### Google Apps Script

Create a Google Apps Script project and replace `YOUR_FOLDER_ID` with the Google Drive root folder ID.

Deploy the project as a Web App:

```text
Execute as: Me
Who has access: Anyone
```

After editing the script, deploy a new version.

```javascript
const ROOT_FOLDER_ID = "YOUR_FOLDER_ID";

function doGet() {
  return json_({ ok: true });
}

function doPost(e) {
  const body = JSON.parse((e.postData && e.postData.contents) || "{}");

  if (body.operation === "pull") {
    return json_(pull_(body.date));
  }

  if (body.operation === "push") {
    return json_(push_(body.files || []));
  }

  return json_({ error: "Unsupported operation" });
}

function pull_(date) {
  const folder = subfolder_("sources");
  const files = folder.getFiles();
  const result = [];
  const pattern = new RegExp("^reading-memory-\\d{2}-" + escape_(date) + "\\.json$");

  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName();

    if (pattern.test(name)) {
      result.push({
        filename: name,
        content: file.getBlob().getDataAsString("UTF-8")
      });
    }
  }

  return { files: result };
}

function push_(files) {
  const saved = [];

  files.forEach(item => {
    const folder = targetFolder_(item.filename);
    const file = upsert_(folder, item.filename, text_(item.content));

    saved.push({
      filename: file.getName(),
      url: file.getUrl()
    });
  });

  return { saved: saved };
}

function targetFolder_(filename) {
  if (/^reading-memory-\d{2}-\d{2}-\d{2}-\d{2}\.json$/.test(filename)) {
    return subfolder_("sources");
  }

  if (/^reading-anki-\d{2}-\d{2}-\d{2}\.txt$/.test(filename)) {
    return subfolder_("anki");
  }

  return subfolder_("outputs");
}

function upsert_(folder, filename, content) {
  const files = folder.getFilesByName(filename);

  if (files.hasNext()) {
    const file = files.next();
    file.setContent(content);
    return file;
  }

  return folder.createFile(filename, content, MimeType.PLAIN_TEXT);
}

function subfolder_(name) {
  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const folders = root.getFoldersByName(name);

  if (folders.hasNext()) {
    return folders.next();
  }

  return root.createFolder(name);
}

function text_(content) {
  return typeof content === "string" ? content : JSON.stringify(content);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escape_(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
```

Direct access to the deployed Web App URL should return:

```json
{"ok":true}
```

### GPT Action

Authentication:

```text
None
```

For a public GPT with actions, provide a valid privacy policy URL in the GPT configuration.

Replace `YOUR_DEPLOYMENT_ID` with the Apps Script deployment ID.

```yaml
openapi: 3.1.0
info:
  title: Reading Memory Storage
  version: 0.1.0

servers:
  - url: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID

paths:
  /exec:
    post:
      operationId: readingMemoryStorage
      summary: Pull or push reading memory files.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - operation
              properties:
                operation:
                  type: string
                  enum:
                    - pull
                    - push
                date:
                  type: string
                  description: Date in dd-mm-yy format. Required for pull.
                files:
                  type: array
                  description: Files to push. Required for push.
                  items:
                    type: object
                    required:
                      - filename
                      - content
                    properties:
                      filename:
                        type: string
                      content:
                        type: string
      responses:
        "200":
          description: Operation result.
          content:
            application/json:
              schema:
                type: object
                properties:
                  ok:
                    type: boolean
                  files:
                    type: array
                    items:
                      type: object
                      properties:
                        filename:
                          type: string
                        content:
                          type: string
                  saved:
                    type: array
                    items:
                      type: object
                      properties:
                        filename:
                          type: string
                        url:
                          type: string
                  error:
                    type: string
```

### Action test

PowerShell pull test:

```powershell
$Url = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"

$Body = @{
  operation = "pull"
  date = "24-07-26"
} | ConvertTo-Json

Invoke-RestMethod -Uri $Url -Method Post -ContentType "application/json" -Body $Body
```

PowerShell push test:

```powershell
$Url = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"

$Body = @{
  operation = "push"
  files = @(
    @{
      filename = "reading-memory-13-24-07-26.json"
      content = "[]"
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri $Url -Method Post -ContentType "application/json" -Body $Body
```
