# Development Notes

## Current Milestone

Initial Custom GPT prototype for `english-reading-routine`.

## Current Repository Purpose

This repository records the design, configuration, and development notes for the English learning skill / workflow project.

The current runnable tool form is a Custom GPT.

## Current Custom GPT Configuration

Custom GPT location:

```text
custom-gpt/english-reading-routine/
```

Files:

```text
SKILL.md
standard-reading-procedure.md
```

Usage:

- `SKILL.md` is used as the Custom GPT instruction content.
- `standard-reading-procedure.md` is uploaded as a Custom GPT knowledge file and referenced by the instructions.

## Confirmed Current Scope

The current minimum working scope is:

1. Accept complete reading material provided by the user.
2. Follow the standard reading procedure when requested.
3. Translate the full reading material into a Markdown file.
4. Output paragraph pairs: English source paragraph followed by Chinese reference translation.
5. Stop after creating the reference translation file and wait for the user's next instruction.
6. Explain user-selected vocabulary, expressions, grammar points, sentences, or paragraphs.
7. Format user-selected objects as memory entries only when the user requests it and provides or implies an entry format.

## Current Exclusions

The following are not implemented in the current milestone:

- topic-based reading material generation;
- reading material search;
- complex file format conversion;
- automatic language point extraction;
- learner profile integration;
- independent `meaning-explorer.md`;
- independent `input-builder.md`;
- independent `memory-formatter.md`;
- finalized `memory-schemas.md`.

## Test Result Summary

A first Custom GPT test was conducted with a reading material on resilient architecture and seismic design.

Observed result:

- The reference translation workflow operated as expected.
- The general AI explanation ability was sufficient for contextual explanation.
- The explanation output was usable but too verbose and low-density.
- The next improvement should focus on higher information density and standardized output sections.

## Next Plan

Improve the Custom GPT configuration by:

1. increasing the information density of explanation outputs;
2. defining standardized output sections for contextual explanations;
3. reducing unnecessary headings, separators, and low-value explanatory expansion;
4. reconsidering whether `meaning-explorer.md` is necessary.
