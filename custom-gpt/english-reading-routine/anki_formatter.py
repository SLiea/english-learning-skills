#!/usr/bin/env python3

import argparse
import html
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

DEFAULT_DECK = "TOEFL2026"
NOTE_TYPE = "Reading Memory"
HEADER_FIELDS = "Import Key\tEntry Type\tFront\tBack"


def clean(value):
    return str(value or "").replace("\t", " ").replace("\n", " ").replace("\r", " ")


def div(value):
    value = clean(value)
    return f"<div>{html.escape(value, quote=False)}</div>" if value else ""


def make_header(deck):
    return "\n".join([
        "#separator:Tab",
        "#html:true",
        f"#notetype:{NOTE_TYPE}",
        f"#deck:{deck}",
        f"#columns:{HEADER_FIELDS}",
        "",
    ])


def convert(entry):
    t = entry.get("Entry Type")

    if t in ("vocabulary", "expression"):
        content = clean(entry.get("Entry Content"))
        source = clean(entry.get("Source Sentence"))
        front_fields = ("Entry Content", "Source Sentence")
        if t == "vocabulary":
            front_fields = ("Entry Content", "Source Sentence", "Pronunciation")
        front = "".join(div(entry.get(f)) for f in front_fields)
        back = "".join(div(entry.get(f)) for f in ("Explanation", "Optional Translation", "Source Context", "Notes"))
        return [f"{content}::{source}", t, front, back]

    if t in ("sentence", "paragraph") and "grammar" in entry.get("Value Fields", []):
        grammar = clean(entry.get("Grammar"))
        return [grammar, "grammar", grammar, "".join(div(entry.get(f)) for f in ("Custom Note", "Source"))]

    return None


def convert_entries(entries):
    return [row for entry in entries if (row := convert(entry))]


def create_file(path, deck):
    path.write_text(make_header(deck), encoding="utf-8")


def append_file(path, deck, rows):
    if not path.exists():
        create_file(path, deck)
    elif not path.read_text(encoding="utf-8").startswith(make_header(deck)):
        raise ValueError("Unexpected Anki file header")

    with path.open("a", encoding="utf-8") as f:
        for row in rows:
            f.write("\t".join(clean(x) for x in row) + "\n")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_json", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--deck", default=DEFAULT_DECK)
    args = parser.parse_args()

    entries = json.loads(args.input_json.read_text(encoding="utf-8"))
    append_file(args.output, args.deck, convert_entries(entries))


if __name__ == "__main__":
    main()
