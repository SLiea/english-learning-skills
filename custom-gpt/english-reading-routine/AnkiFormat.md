# Anki Format

## Function

Convert canonical memory entries into an Anki import file through `anki_formatter.py`.

## Supported Entries

- `vocabulary`
- `expression`
- `sentence` or `paragraph` entries whose `Value Fields` contains `grammar`

Each supported memory entry instance generates one Anki note.

## Output

Generate a UTF-8 tab-separated plain text file using the naming format:

```
reading-anki-dd-mm-yy.txt
```

Use the current date in UTC+8 when filling the file name.

Begin the file with:

```
#separator:Tab
#html:true
#notetype:Reading Memory
#deck:TOEFL2026
#columns:Import Key	Entry Type	Front	Back
```

The Anki import file is generated from the memory entries of the same day.

## Note Fields

| Field | Description |
|---|---|
| Import Key | Identifies the Anki note. |
| Entry Type | The Anki entry type: `vocabulary`, `expression`, or `grammar`. |
| Front | Content displayed on the card front. |
| Back | Content displayed on the card back. |

## Field Mapping

| Supported entry | Import Key | Anki Entry Type | Front | Back |
|---|---|---|---|---|
| `vocabulary` | `<Entry Content>::<Source Sentence>` | `vocabulary` | `Entry Content`; `Source Sentence`;`Pronunciation` | `Explanation`; `Optional Translation`; `Source Context`; `Notes` |
| `expression` | `<Entry Content>::<Source Sentence>` | `expression` | `Entry Content`; `Source Sentence` | `Explanation`; `Optional Translation`; `Source Context`; `Notes` |
| `sentence` or `paragraph` with `grammar` | `<Grammar>` | `grammar` | `Grammar` | `Custom Note`; `Source` |

When multiple fields are used, wrap each non-empty value in `<div>...</div>` in the listed order.

`Import Key` is not displayed on the card.

## Card Template

### Front

```html
{{Front}}
```

### Back

```html
{{FrontSide}}

<hr id="answer">

{{Back}}
```
