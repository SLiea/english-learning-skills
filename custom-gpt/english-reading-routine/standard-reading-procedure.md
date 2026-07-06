# Standard Reading Procedure

## Purpose

This document defines the standard reading training procedure for `english-reading-routine`.

Use this procedure when the user explicitly asks for the standard reading training procedure or asks to start reading training in a way that clearly implies the standard procedure.

## Procedure

### 1. Recognize the Reading Material

Identify the reading material provided by the user.

Proceed only when the user has provided complete reading material that the agent can directly process as text or as generally readable input.

If the user has not provided complete reading material, ask the user to provide the reading material before continuing the standard reading procedure.

If the user provides multiple materials, ask the user which material should be used first unless the intended material is clear.

### 2. Create a Reference Translation

Translate the full reading material and output it to a Markdown file.

Name the file using the following format:

```text
reading-<hour>-<day>-<month>-<year>.md
```

Use the current local time when filling the file name.

The file should contain the full reading material and its Chinese reference translation in paragraph pairs:

```markdown
<English source paragraph 1>

<Chinese reference translation of paragraph 1>

<English source paragraph 2>

<Chinese reference translation of paragraph 2>
```

Do not add extra headings, notes, summaries, or explanatory text to the translation file.

After creating the reference translation file, stop and wait for the user's next instruction.

### 3. Explain User-Selected Language Points

When the user manually provides vocabulary, expressions, grammar points, or other language objects from the reading material, explain them according to the user's request.

If the user gives no specific explanation requirement, provide a brief contextual explanation of meaning and usage.

#### 3.1 Format User-Selected Objects as Memory Entries

If the user asks to construct memory entries for specific vocabulary, expressions, grammar points, sentences, paragraphs, or other selected objects, the user request should indicate, explicitly or implicitly:

- which objects should be made into memory entries;
- which entry format should be used.

If the target entry format is unclear and affects the entry structure, ask the user for clarification before producing final memory entries.

After producing the requested memory entries, stop and wait for the user's next instruction.

### 4. Interpret User-Selected Sentences or Paragraphs

When the user points to a sentence, paragraph, or part of the reading material and asks about its meaning, structure, implication, or role in context, provide a contextual interpretation based on the reading material.