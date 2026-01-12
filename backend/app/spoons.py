# app/spoons.py
from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from .db import get_session
from .models import SpoonLog

router = APIRouter(prefix="/spoons", tags=["spoons"])


@router.get("/", response_model=List[SpoonLog])
def list_spoons(session: Session = Depends(get_session)):
    """
    Return daily spoon/energy logs.
    """
    statement = select(SpoonLog).order_by(SpoonLog.date.desc(), SpoonLog.id.desc())
    return session.exec(statement).all()


@router.post("/", response_model=SpoonLog, status_code=201)
def create_spoon_log(log: SpoonLog, session: Session = Depends(get_session)):
    """
    Log today's spoons / energy.
    """
    new_log = SpoonLog(
        date=log.date,
        spoons=log.spoons,
        notes=log.notes,
    )
    session.add(new_log)
    session.commit()
    session.refresh(new_log)
    return new_log
