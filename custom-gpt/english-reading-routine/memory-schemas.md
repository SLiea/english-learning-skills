# Memory Schemas

`*` marks required fields.

## Vocabulary Entry

| Field | Description |
| --- | --- |
| *Entry Type | `vocabulary` |
| *Entry Content | The vocabulary item. |
| *Source Sentence | The original sentence in which the item appears. |
| Pronunciation | IPA phonetic pronunciation of `Entry Content` |
| Source Context | Recording relevant surrounding context when necessary. |
| Explanation | Its meaning or function in the recorded context. |
| Optional Translation | Optional Chinese meaning or translation. |
| Notes | Additional notes from user (if exists). |

```json
{
  "Entry Type": "vocabulary",
  "Entry Content": "",
  "Source Sentence": "",
  "Pronunciation": "",
  "Source Context": "",
  "Explanation": "",
  "Optional Translation": "",
  "Notes": ""
}
```

## Expression Entry

| Field | Description |
| --- | --- |
| *Entry Type | `expression` |
| *Entry Content | An abstract form that stably identifies the expression. |
| *Source Sentence | The original sentence in which the expression appears. |
| Source Context | Recording relevant surrounding context when necessary. |
| Explanation | Its meaning, function, usage boundary, or relevant variation in the recorded context. |
| Optional Translation | Optional Chinese meaning or translation. |
| Notes | Additional notes from user (if exists). |

```json
{
  "Entry Type": "expression",
  "Entry Content": "",
  "Source Sentence": "",
  "Source Context": "",
  "Explanation": "",
  "Optional Translation": "",
  "Notes": ""
}
```

## Sentence / Paragraph Entry

| Field | Description |
| --- | --- |
| *Entry Type | `sentence` or `paragraph` |
| *Entry Content | The original sentence or paragraph. |
| Value Fields | Enabled dynamic field markers. |
| Grammar | When this field is enabled, it means that this entry's main role is to explain this grammar. The Grammar field should contain the `Entry Content` with the grammar pattern marked using HTML underline tags (`<u>...</u>`). The `Custom Note` will contain a context-based explanation of this grammar. |
| Custom Note | A customed open field. It may serve as a user note or other use. |
| Source | The source of the Entry Content. |
| Reference ID | A stable identifier for references from other entries. |

```json
{
  "Entry Type": "sentence",
  "Entry Content": "",
  "Value Fields": [],
  "Grammar": "",
  "Custom Note": "",
  "Source": "",
  "Reference ID": ""
}
```

## Dynamic Field Markers

| Marker | Field |
| --- | --- |
| grammar | Grammar |
