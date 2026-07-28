# Memory Formatter

## Function

- Construct memory entries from objects provided by the user and write them to a JSON file according to `memory-schemas.md`.
- Store the constructed entries through GPT Action `"operation": "store"`.

## Input Requirements

The user must specify a list of objects in some way.

## Procedure

1. Based on the current context, process the objects provided by the user one by one according to `memory-schemas.md`. `Entry Type` and `Entry Content` must be provided by the user or reasonably inferred from the context.

2. Call the configured `readingMemoryStorage` GPT Action with:

   ```json
   {
     "operation": "store",
     "entries": [
       "<constructed canonical memory entries>"
     ]
   }
   ```

3. Report the storage result and the files returned by the Action.
