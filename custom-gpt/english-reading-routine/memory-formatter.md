# Memory Formatter

## Function

- Construct memory entries from objects provided by the user and write them to a JSON file according to `memory-schemas.md`.
- Manage the recording and updating procedure of persistent memory

## Input Requirements

The user must specify a list of objects in some way.

The user may optionally provide a script name as `specified format`.

## Procedure

1. Get the current UTC+8 time in `hh-dd-mm-yy` format.
2.  Use the configured persistent memory GPT Action to  pull the current day's existing memory files into the sandbox from the persistent storage.
3. Based on the current context, process the objects provided by the user one by one and write them to a JSON file according to `memory-schemas.md`. `Entry Type` and `Entry Content` must be provided by the user or reasonably inferred from the context.
4. Create the JSON file using the naming format `reading-memory-hh-dd-mm-yy.json`. Use the time of step 1  when filling the file name. Example: `reading-memory-13-21-06-26.json`.
5. If the user provides a `specified format`, use all memory entry files available in the sandbox, including newly generated files and pulled existing files, to generate an additional output based on the memory entry files in the sandbox.
6.  Use the configured persistent memory GPT Action to  push the generated output files back to persistent storage.
