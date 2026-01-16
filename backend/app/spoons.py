from __future__ import annotations

from datetime import date as date_type
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from database import get_db
from models import SpoonDay, SpoonEvent
from schemas import SpoonDayUpsert, SpoonDayOut, SpoonEventCreate, SpoonEventOut

router = APIRouter(prefix="/api/spoons", tags=["spoons"])


@router.get("/today", response_model=SpoonDayOut)
def get_today(db: Session = Depends(get_db)):
    day = _get_or_create_day(db, date_type.today(), starting=10)
    return day


@router.post("/today", response_model=SpoonDayOut)
def set_today(payload: SpoonDayUpsert, db: Session = Depends(get_db)):
    target_day = payload.day or date_type.today()
    day = db.scalars(select(SpoonDay).where(SpoonDay.day == target_day)).first()
    if day:
        day.starting = payload.starting
        # keep remaining within range
        day.remaining = min(day.remaining, day.starting)
    else:
        day = SpoonDay(
            day=target_day, starting=payload.starting, remaining=payload.starting
        )
        db.add(day)

    db.commit()
    db.refresh(day)
    return day


@router.post("/today/event", response_model=SpoonDayOut)
def add_event(payload: SpoonEventCreate, db: Session = Depends(get_db)):
    day = _get_or_create_day(db, date_type.today(), starting=10)
    # apply delta
    new_remaining = max(0, min(day.starting, day.remaining + payload.delta))
    day.remaining = new_remaining

    ev = SpoonEvent(spoon_day_id=day.id, label=payload.label, delta=payload.delta)
    db.add(ev)

    db.commit()
    db.refresh(day)
    return day


def _get_or_create_day(db: Session, d: date_type, starting: int) -> SpoonDay:
    day = db.scalars(select(SpoonDay).where(SpoonDay.day == d)).first()
    if not day:
        day = SpoonDay(day=d, starting=starting, remaining=starting)
        db.add(day)
        db.commit()
        db.refresh(day)
    return day
