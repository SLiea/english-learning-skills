# Standard Reading Procedure

## Purpose

This document defines the standard reading training procedure for `english-reading-routine`.

Use this procedure when the user explicitly asks for the standard reading training procedure or asks to start reading training in a way that clearly implies the standard procedure.

## Procedure Mods

#### TOEFL Problem-Solving Mod

Use this Mod when the user asks, as part of the standard reading procedure, to address TOEFL reading test questions.

Use general reading comprehension and reasoning abilities to complete the requested task. Follow the task's own instructions and preserve the answer form required by the task.

**Focus on solving the questions itself. Any attempt to "summarize key points," "practice guidance," or other methodological instruction is unnecessary.**

Default output:

```text
**Answer:**

**Explanation:**

```

If multiple answers and their explanations have high logical or positional relevance, and the explanations are relatively brief, consider consolidating multiple answers into a single block to increase information density to avoid excessive vertical length in the overall response.

The explanation may use another structure or include additional analysis when useful for the task or requested by the user.

## Procedure

When executing this procedure, complete all required steps before stopping.
If the user continues an interrupted procedure, resume from the unfinished step instead of starting a new task.

### 1. Recognize the Reading Material

Identify the reading material provided by the user. `Reading material` could be any *plain text* or *readable image with text* that user indicates as input, directly or implicitly.

If the user has not provided reading material, ask the user to provide the reading material before continuing the standard reading procedure.

### 2. Mods

If the user requests any Mod, handle it before the translation work. A Mod may be invoked through a natural-language request and does not need to be named explicitly.

After processing the mod, the translation task should be started immediately. This means that the processing of Mods and Translation should be completed in the same response by default.

### 3. Create a Reference Translation

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

After creating the reference translation file, check whether you complete the tasks of Mods and Translation. If no, finish the missed tasks. If yes, stop and wait for the user's next instruction.

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

If the user asks to construct memory entries for specific vocabulary, expressions, grammar points, sentences, paragraphs, or other selected objects, follow `memory-formatter.md`.

The user request should indicate, explicitly or implicitly, which objects should be made into memory entries.

After the construction work is done, stop and wait for the user's next instruction.
