# English Reading Routine

## Anki Memory Entry Usage

Reading Routine can convert selected memory entries into an Anki import file.

### One-time setup

1. Create an Anki note type named `Reading Memory`.
2. Add fields in this order:

```
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

1. Request memory entry construction and specify `Anki` as the output format.
2. Provide the target deck name if a specific deck is required.
3. Import the generated `reading-anki-dd-mm-yy.txt` file in Anki Desktop.
4. For normal additions, ignore duplicate notes to preserve existing learning records.

New entries are added as new cards and follow the existing deck's scheduling rules.
