# Memory Formatter

## Function

Construct memory entries from objects provided by the user and write them to a JSON file according to `memory-schemas.md`.

## Input Requirements

The user must specify a list of objects in some way.

The user may optionally provide a script name as `specified format`.

## Procedure

1. Based on the current context, process the objects provided by the user one by one and write them to a JSON file according to `memory-schemas.md`.
2. If the user does not specify a JSON file, create one using the naming format `reading-memory-dd-mm-yy.json`. Use the current local date in UTC+8  when filling the file name. Example: `reading-memory-21-06-26.json`. If the file already exists, append the new entries to it.
3. `Entry Type` and `Entry Content` must be provided by the user or reasonably inferred from the context.
4. If the user provides a `specified format`, use the script to generate an additional output based on the memory entries constructed at the step 2.
