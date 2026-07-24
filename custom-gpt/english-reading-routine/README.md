# English Reading Routine

## Anki Memory Entry Usage

Reading Routine constructs canonical memory entries first, then uses `anki_formatter.py` to convert them into an Anki import file.

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

1. Request memory entry construction and provide `anki_formatter.py` as `specified format` when Anki output is needed.
2. Generate or append the Anki import file with `anki_formatter.py`:

```bash
python anki_formatter.py reading-memory-dd-mm-yy.json reading-anki-dd-mm-yy.txt
```

3. Import the generated text file in Anki Desktop.
4. For normal additions, ignore duplicate notes to avoid modifying existing learning records.

New entries are added as new cards and follow the existing deck's scheduling rules.
