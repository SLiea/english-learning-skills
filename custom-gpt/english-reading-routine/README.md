# English Reading Routine

## Custom GPT Configuration

Use `SKILL.md` as the main instruction.

Add these files as reference files:

```text
standard-reading-procedure.md
memory-formatter.md
memory-schemas.md
```

Configure one GPT Action named `readingMemoryStorage` for persistent memory storage and Anki file generation.

## Anki Memory Entry Usage

Reading Routine constructs canonical memory entries according to `memory-schemas.md`.

The GPT sends the constructed entries to the `readingMemoryStorage` Action. The backend stores the entries as reading memory files and rebuilds the Anki import file from all memory entries of the same day.

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

1. Request memory entry construction.
2. The GPT constructs canonical memory entries according to `memory-schemas.md`.
3. The GPT sends the entries to the `readingMemoryStorage` Action.
4. The backend stores or updates the current hour's `reading-memory-hh-dd-mm-yy.json` file.
5. The backend loads all reading memory entries of the same day and rebuilds `reading-anki-dd-mm-yy.txt`.
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
```

File routing:

```text
sources/reading-memory-hh-dd-mm-yy.json
anki/reading-anki-dd-mm-yy.txt
```

The backend uses UTC+8 time.

Entries submitted within the same hour are merged into the same memory file. Every successful store operation rebuilds the Anki file from all memory files of the same day.

### Google Apps Script

Use `Code.gs`.

Create a Google Apps Script project and replace `YOUR_FOLDER_ID` with the Google Drive root folder ID.

Deploy the project as a Web App:

```text
Execute as: Me
Who has access: Anyone
```

Direct access to the deployed Web App URL should return:

```json
{"ok":true}
```

### GPT Action

Use `OpenAISchema.txt`

Authentication:

```text
None
```

For a public GPT with actions, provide a valid privacy policy URL in the GPT configuration.

Replace `YOUR_DEPLOYMENT_ID` with the Apps Script deployment ID.

### Action test

PowerShell test:

```powershell
$Url = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"

$Body = @{
  entries = @(
    @{
      "Entry Type" = "vocabulary"
      "Entry Content" = "example"
      "Source Sentence" = "This is an example."
      "Pronunciation" = "UK /ɪɡˈzɑːm.pəl/; US /ɪɡˈzæm.pəl/"
      "Source Context" = ""
      "Explanation" = "Something used to illustrate an idea."
      "Optional Translation" = "例子"
      "Notes" = ""
    }
  )
} | ConvertTo-Json -Depth 6

Invoke-RestMethod `
  -Uri $Url `
  -Method Post `
  -ContentType "application/json" `
  -Body $Body
```

A successful response should contain the stored memory file and rebuilt Anki file:

```powershell
{
  "storedEntries": 1,
  "saved": [
    {
      "filename": "reading-memory-13-29-07-26.json",
      "url": "https://drive.google.com/..."
    },
    {
      "filename": "reading-anki-29-07-26.txt",
      "url": "https://drive.google.com/..."
    }
  ]
}
```
