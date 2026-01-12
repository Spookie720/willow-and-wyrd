import json
import os
from datetime import datetime
from colorama import Fore, Style

DATA_DIR = "data"
JOURNAL_PATH = os.path.join(DATA_DIR, "journal.json")


def load_entries():
    """Load journal entries from JSON. If file doesn't exist, return empty list."""

    if not os.path.exists(JOURNAL_PATH):
        return[]

    with open(JOURNAL_PATH, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
        #if the file is corrupt/empty. start fresh
        return[]
def save_entries(entries):
    """Save journal entries back to JSON"""
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(JOURNAL_PATH, "w",encoding="utf-8") as f:
        Json.dump(entries, f, indent=2, ensure_ascii=False)


def add_entry():
    """Create a new journal entry."""
    print()
    print(Fore.GREEN + "/ New Grimoire Entry" + Style.RESET_ALL)

    mood = input("Mood")
