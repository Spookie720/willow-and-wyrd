from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from database import get_db
from models import Medication, DoseLog
from schemas import MedicationCreate, MedicationOut, DoseLogCreate, DoseLogOut

router = APIRouter(prefix="/api/meds", tags=["meds"])


@router.get("", response_model=list[MedicationOut])
def list_meds(db: Session = Depends(get_db)):
    meds = db.scalars(select(Medication).order_by(Medication.created_at.desc())).all()
    return meds


@router.post("", response_model=MedicationOut)
def create_med(payload: MedicationCreate, db: Session = Depends(get_db)):
    med = Medication(
        name=payload.name,
        dose=payload.dose,
        time=payload.time,
        color=payload.color,
        active=True,
    )
    db.add(med)
    db.commit()
    db.refresh(med)
    return med


@router.post("/{med_id}/dose", response_model=DoseLogOut)
def log_dose(med_id: str, payload: DoseLogCreate, db: Session = Depends(get_db)):
    med = db.get(Medication, med_id)
    if not med:
        raise HTTPException(status_code=404, detail="Medication not found")

    if payload.status not in {"taken", "skipped", "missed"}:
        raise HTTPException(status_code=400, detail="Invalid status")

    log = DoseLog(medication_id=med_id, status=payload.status, notes=payload.notes)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log


@router.get("/logs", response_model=list[DoseLogOut])
def list_logs(db: Session = Depends(get_db)):
    logs = db.scalars(select(DoseLog).order_by(DoseLog.taken_at.desc())).all()
    return logs
