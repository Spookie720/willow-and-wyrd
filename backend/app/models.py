# app/models.py
from datetime import datetime, date
from typing import Optional
from sqlmodel import SQLModel, Field


# -------------------------
# 📖 Grimoire / Journal
# -------------------------
class JournalEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    mood: str
    text: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# -------------------------
# 🧪 Healing Brews / Medications
# -------------------------
class Medication(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    dosage: Optional[str] = None
    schedule: Optional[str] = None
    notes: Optional[str] = None
    is_active: bool = Field(default=True)


# -------------------------
# ✨ Spells to Cast / Todo
# -------------------------
class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    notes: Optional[str] = None
    is_done: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    due_date: Optional[date] = None


# -------------------------
# 🌕 Wyrd Flow / Spoons
# -------------------------
class SpoonLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: date = Field(default_factory=date.today)
    spoons: int
    notes: Optional[str] = None
