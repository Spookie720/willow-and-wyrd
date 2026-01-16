from __future__ import annotations

from datetime import date as date_type
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from database import get_db
from models import JournalEntry
from schemas import JournalCreate, JournalOut

router = APIRouter(prefix="/api/journal", tags=["journal"])


@router.get("", response_model=list[JournalOut])
def list_entries(db: Session = Depends(get_db)):
    entries = db.scalars(
        select(JournalEntry).order_by(JournalEntry.created_at.desc())
    ).all()
    return [_to_out(e) for e in entries]


@router.post("", response_model=JournalOut)
def create_entry(payload: JournalCreate, db: Session = Depends(get_db)):
    tags_str = ",".join(payload.tags) if payload.tags else ""
    entry = JournalEntry(
        title=payload.title,
        body=payload.body,
        entry_type=payload.entry_type,
        tags=tags_str,
        entry_date=payload.entry_date or date_type.today(),
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return _to_out(entry)


@router.delete("/{entry_id}")
def delete_entry(entry_id: str, db: Session = Depends(get_db)):
    entry = db.get(JournalEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return {"ok": True}


def _to_out(e: JournalEntry) -> JournalOut:
    tags = [t.strip() for t in (e.tags or "").split(",") if t.strip()]
    return JournalOut(
        id=e.id,
        title=e.title,
        body=e.body,
        entry_type=e.entry_type,
        tags=tags,
        entry_date=e.entry_date,
        created_at=e.created_at,
        updated_at=e.updated_at,
    )
