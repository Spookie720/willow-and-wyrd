# app/journal.py
from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from .db import get_session
from .models import JournalEntry

router = APIRouter(prefix="/journal", tags=["journal"])


@router.get("/", response_model=List[JournalEntry])
def list_entries(session: Session = Depends(get_session)):
    """
    Return all journal entries, newest first.
    """
    statement = select(JournalEntry).order_by(JournalEntry.timestamp.desc())
    return session.exec(statement).all()


@router.post("/", response_model=JournalEntry, status_code=201)
def create_entry(entry: JournalEntry, session: Session = Depends(get_session)):
    """
    Create a new journal entry.
    """
    new_entry = JournalEntry(mood=entry.mood, text=entry.text)
    session.add(new_entry)
    session.commit()
    session.refresh(new_entry)
    return new_entry
