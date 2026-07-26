#!/usr/bin/env python3

import argparse
import html
import json
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


def load_entries(paths):
    entries = []

    for path in paths:
        data = json.loads(path.read_text(encoding="utf-8"))
        entries.extend(data)

    return entries


def convert(entry):
    entry_type = entry.get("Entry Type")

    if entry_type in ("vocabulary", "expression"):
        content = clean(entry.get("Entry Content"))
        source = clean(entry.get("Source Sentence"))

        front_fields = ("Entry Content", "Source Sentence")
        if entry_type == "vocabulary":
            front_fields = ("Entry Content", "Source Sentence", "Pronunciation")

        front = "".join(div(entry.get(field)) for field in front_fields)
        back = "".join(div(entry.get(field)) for field in (
            "Explanation",
            "Optional Translation",
            "Source Context",
            "Notes",
        ))

        return [f"{content}::{source}", entry_type, front, back]

    if entry_type in ("sentence", "paragraph") and "grammar" in entry.get("Value Fields", []):
        grammar = clean(entry.get("Grammar"))
        back = "".join(div(entry.get(field)) for field in ("Custom Note", "Source"))
        return [grammar, "grammar", grammar, back]

    return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_json", nargs="+", type=Path)
    parser.add_argument("-o", "--output", required=True, type=Path)
    parser.add_argument("--deck", default=DEFAULT_DECK)
    args = parser.parse_args()

    entries = load_entries(args.input_json)
    rows = [row for entry in entries if (row := convert(entry))]

    with args.output.open("w", encoding="utf-8") as file:
        file.write(make_header(args.deck))

        for row in rows:
            file.write("\t".join(clean(value) for value in row) + "\n")


if __name__ == "__main__":
    main()