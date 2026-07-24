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
reading-hh-dd-mm-yy.md
```

Use the current local time when filling the file name.

Example: reading-08-21-06-26.md

The file should contain the full reading material and its Chinese reference translation in paragraph pairs:

```markdown
<English source paragraph 1>

<Chinese reference translation of paragraph 1>

<English source paragraph 2>

<Chinese reference translation of paragraph 2>
```

Do not add extra headings, notes, summaries, or explanatory text to the translation file.

Never use pypandoc to generate `.md` files. Write the Markdown text directly with `Path.write_text()` so formatting is preserved exactly.

After creating the reference translation file, stop and wait for the user's next instruction.

### 3. Explain User-Selected Language Points

When the user provides vocabulary, expressions, grammar points, or other language objects from the reading material, explain them according to the user's request.

#### 3.1 Selected Object Markup Rules

In Step 3, the user selects explanation objects with Markdown-style markup. Each marker defines the object type.

Use these markers:

```text
**...**  = vocabulary
<...>    = expression
`...`    = grammar pattern
[...]    = sentence / paragraph
{...}    = User-defined prompt
```

Selection rules:
```text
- **...**: explain the marked word as a vocabulary object.
- <...>: use the marked span as the search range; exactly one expression object is expected to be extracted from it and explained.
- `...`: use the marked span as the search range; exactly one grammar pattern object is expected to be extracted from it and explained.
- [...]: explain the marked span as a sentence or paragraph object.
- {...}: A user-defined prompt appears only directly after other markers. Its content represents the user's custom notes or prompts for that object. user-defined prompt shouldn't be treated as an independent object. Don't address it like a object.
```

Object hierarchy: vocabulary < expression = grammar pattern < sentence / paragraph

Vocabulary objects may be nested inside expression, grammar pattern, or sentence / paragraph objects.

Expression and grammar pattern objects are on the same level. Their marked ranges may overlap, cross, or contain each other. They may also be nested inside sentence / paragraph objects.

Nested marked objects are still independent selected objects. They deserve independent explanatory entries.

Explain objects according to the order in which their markup begins in the text. This order is also the output numbering order.

#### 3.2 Standard Explanation Output

Vocabulary object output:

```text
<number>. <Base form of marked word> — UK /<UK IPA>/; US /<US IPA>/

**Meaning in context:**

**Examples of this meaning:**

1. <example different from the source context>
2. <example different from the source context>
```

Expression object output:

```text
<number>. <extracted expression object>

**Meaning in context:**

**Examples of this meaning:**

1. <example different from the source context>
2. <example different from the source context>
```

Grammar pattern object output:

```text
<number>. <Abstract format of Grammar pattern>

**Meaning / function in context:**

**General meaning / function:**

**Examples of the same pattern:**

1. <example different from the source context>
2. <example different from the source context>
```

Sentence / paragraph object output:

```text
<number>. <selected sentence / paragraph>

**Further detailed translation in context:**
```

A user-defined prompt `{...}` appears only directly after another marker. It is not an independent explanation object.

First complete the default standard explanation output for the selected object, taking the user-defined prompt into account. Only if the `Standard Explanation Output` is insufficient for the user-defined prompt, add extra content without format requirements after the default explanation to answer the prompt.

#### 3.3 Construct User-Selected Objects as Memory Entries

If the user asks to construct memory entries for specific vocabulary, expressions, grammar points, sentences, paragraphs, or other selected objects, follow `memory-formatter.md` and `memory-schemas.md`.

The user request should indicate, explicitly or implicitly, which objects should be made into memory entries.

After the construction work is done, stop and wait for the user's next instruction.
