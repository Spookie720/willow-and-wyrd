# app/meds.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from .db import get_session
from .models import Medication

router = APIRouter(prefix="/meds", tags=["medications"])


@router.get("/", response_model=List[Medication])
def list_meds(session: Session = Depends(get_session)):
    """
    Return all medications (healing brews).
    """
    statement = select(Medication).order_by(Medication.name)
    return session.exec(statement).all()


@router.post("/", response_model=Medication, status_code=201)
def create_med(med: Medication, session: Session = Depends(get_session)):
    """
    Add a medication to the Potion Cabinet.
    """
    if not med.name:
        raise HTTPException(status_code=400, detail="Potion name is required.")

    new_med = Medication(
        name=med.name,
        dosage=med.dosage,
        schedule=med.schedule,
        notes=med.notes,
        is_active=True if med.is_active is None else med.is_active,
    )
    session.add(new_med)
    session.commit()
    session.refresh(new_med)
    return new_med


@router.patch("/{med_id}/toggle", response_model=Medication)
def toggle_med(med_id: int, session: Session = Depends(get_session)):
    """
    Toggle a med between active/paused.
    """
    med = session.get(Medication, med_id)
    if not med:
        raise HTTPException(status_code=404, detail="Potion not found.")

    med.is_active = not med.is_active
    session.add(med)
    session.commit()
    session.refresh(med)
    return med
