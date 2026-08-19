#!/usr/bin/env python3
"""
Generate Listening Memory entries from:
  1) an annotated English transcript
  2) a sentence-aligned Chinese translation text

Contract
--------
- English sentence boundaries are sentence-final punctuation: . ? !
- Chinese sentence boundaries are sentence-final punctuation: 。？！
- Paragraph / blank-line structure is ignored.
- After splitting, each part is whitespace-normalized:
    - leading/trailing whitespace removed
    - runs of spaces/newlines/tabs collapsed to one space
- English sentence N maps to Chinese sentence N.
- Only English sentences containing **...** create entries.
- One sentence -> one entry; multiple **...** spans -> multiple Focus items.
- The script does NOT judge or repair annotations.
- If English/Chinese sentence counts differ, it fails instead of guessing.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

FOCUS_RE = re.compile(r"\*\*(.*?)\*\*", re.DOTALL)
EN_BOUNDARY_RE = re.compile(r"(?<=[.!?])")
ZH_BOUNDARY_RE = re.compile(r"(?<=[。？！])")


def normalize_whitespace(text: str) -> str:
    """Trim both sides and collapse spaces/newlines/tabs to one space."""
    return re.sub(r"\s+", " ", text).strip()


def remove_markdown_separators(text: str) -> str:
    """Remove standalone Markdown horizontal rules; they are not transcript text."""
    return re.sub(r"(?m)^\s*---\s*$", "", text)


def split_sentences(text: str, boundary_re: re.Pattern[str]) -> list[str]:
    """
    Split immediately after sentence-final punctuation, then normalize each part.

    Empty parts are discarded. Paragraph structure is deliberately ignored.
    """
    text = remove_markdown_separators(text)
    parts = boundary_re.split(text)
    return [
        cleaned
        for part in parts
        if (cleaned := normalize_whitespace(part))
    ]


def extract_focuses(annotated_sentence: str) -> list[str]:
    """Return **...** contents exactly as annotated, except surrounding whitespace."""
    return [normalize_whitespace(m.group(1)) for m in FOCUS_RE.finditer(annotated_sentence)]


def remove_annotations(annotated_sentence: str) -> str:
    """Remove Markdown bold markers without changing the annotated content."""
    return normalize_whitespace(annotated_sentence.replace("**", ""))


def build_entries(annotated_text: str, translation_text: str) -> dict:
    english = split_sentences(annotated_text, EN_BOUNDARY_RE)
    chinese = split_sentences(translation_text, ZH_BOUNDARY_RE)

    if len(english) != len(chinese):
        raise ValueError(
            "Sentence-count mismatch: "
            f"English={len(english)}, Chinese={len(chinese)}. "
            "No entries were generated because ordinal matching would be unsafe."
        )

    entries = []

    for index, (en_sentence, zh_sentence) in enumerate(zip(english, chinese), start=1):
        focuses = extract_focuses(en_sentence)
        if not focuses:
            continue

        entries.append(
            {
                "Source Sentence": remove_annotations(en_sentence),
                "Focus": focuses,
                "Translation": zh_sentence,
            }
        )

    return {
        "entries": entries,
        "_meta": {
            "english_sentence_count": len(english),
            "chinese_sentence_count": len(chinese),
            "entry_count": len(entries),
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate Listening Memory entries by sentence ordinal."
    )
    parser.add_argument("annotated_transcript", help="Annotated English Markdown/text")
    parser.add_argument("translation", help="Sentence-aligned Chinese translation text")
    parser.add_argument("-o", "--output", default="listening_memory_entries.json")
    args = parser.parse_args()

    annotated_text = Path(args.annotated_transcript).read_text(encoding="utf-8")
    translation_text = Path(args.translation).read_text(encoding="utf-8")

    try:
        payload = build_entries(annotated_text, translation_text)
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    # _meta is useful for local verification but is not part of the Action payload.
    meta = payload.pop("_meta")

    Path(args.output).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(
        f"OK: {meta['english_sentence_count']} aligned sentences; "
        f"{meta['entry_count']} entries written to {args.output}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
