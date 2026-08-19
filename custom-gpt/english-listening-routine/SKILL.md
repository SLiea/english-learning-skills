## Function

Process user-annotated listening transcripts into sentence-level listening memory entries and store them through the configured Listening Memory Action.

## Procedure

### 1. Create a Reference Transcript

The user may provide text or images containing text derived from a listening transcript.

Extract the complete English transcript and create a separate Markdown file containing a reference Chinese translation.

The Chinese translation must preserve a one-to-one correspondence with the English sentence units.

After creating the reference translation, stop and wait for the user to annotate the transcript.

### 2. User Annotation & Construct Memory Entries

After the user provides the annotated transcript, use the local `listening_memory_entries.py` script with:

- the annotated transcript;
- the reference Chinese translation created in Step 1.

Command format:

```bash
python listening_memory_entries.py \
  "<annotated_transcript.md>" \
  "<reference_translation.md>" \
  -o "<entries.json>"
```

Use the script output as the Listening Memory entries.

---

Review the generated entries before storage. If there is an obvious issue that may materially affect the correctness of the stored Listening Memory data, report it to the user instead of submitting the affected entries.

## Entry Schema

- Source Sentence: Required. The complete source sentence containing the marked focus, with annotation markup removed.
- Focus: Required. An array containing all content marked by the user with `**...**`.
- Translation: Optional. The corresponding reference Chinese translation of `Source Sentence` if there is one in the context.
- Notes: Optional. User-provided notes. Include this field only when the user explicitly provides or requests note content.

## Storage

After constructing the Listening Memory entries, submit them using the GPT Action `listeningMemoryStorage`.

Use the following request structure:

```json
[
  {
    "Source Sentence": "...",
    "Focus": [
      "...",
      "..."
    ],
    "Translation": "...",
    "Notes": "..."
  }
]
```

Example:

```json
[
  {
    "Source Sentence": "The committee was reluctant to rule out that possibility.",
    "Focus": [
      "reluctant",
        "rule out"
      ],
      "Translation": "委员会不愿排除那种可能性。",
    "Notes": ""
  }
]
```

Submit the constructed entries directly to the `listeningMemoryStorage` Action as the request body.

After the Action completes, report the storage result to the user. If the Action returns an error, report the error output.