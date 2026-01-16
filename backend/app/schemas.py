from __future__ import annotations

from datetime import datetime, date
from pydantic import BaseModel, Field


# ---------- MEDS ----------
class MedicationCreate(BaseModel):
    name: str
    dose: str
    time: str = Field(default="morning")
    color: str = Field(default="green")


class MedicationOut(BaseModel):
    id: str
    name: str
    dose: str
    time: str
    color: str
    active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class DoseLogCreate(BaseModel):
    status: str  # taken/skipped/missed
    notes: str | None = None


class DoseLogOut(BaseModel):
    id: str
    medication_id: str
    status: str
    notes: str | None
    taken_at: datetime

    class Config:
        from_attributes = True


# ---------- JOURNAL ----------
class JournalCreate(BaseModel):
    title: str
    body: str
    entry_type: str = "personal"
    tags: list[str] = []
    entry_date: date | None = None


class JournalOut(BaseModel):
    id: str
    title: str
    body: str
    entry_type: str
    tags: list[str]
    entry_date: date
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ---------- TODO ----------
class TodoCreate(BaseModel):
    text: str
    priority: str = "normal"
    due_at: datetime | None = None


class TodoUpdate(BaseModel):
    text: str | None = None
    done: bool | None = None
    priority: str | None = None
    due_at: datetime | None = None


class TodoOut(BaseModel):
    id: str
    text: str
    done: bool
    priority: str
    due_at: datetime | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ---------- SPOONS ----------
class SpoonDayUpsert(BaseModel):
    day: date | None = None
    starting: int = 10


class SpoonEventCreate(BaseModel):
    label: str
    delta: int  # - drains, + restores


class SpoonEventOut(BaseModel):
    id: str
    label: str
    delta: int
    created_at: datetime

    class Config:
        from_attributes = True


class SpoonDayOut(BaseModel):
    id: str
    day: date
    starting: int
    remaining: int
    events: list[SpoonEventOut] = []

    class Config:
        from_attributes = True


# ---------- WYRDFLOW ----------
class FlowCreate(BaseModel):
    name: str
    description: str = ""


class FlowOut(BaseModel):
    id: str
    name: str
    description: str
    active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class FlowStepCreate(BaseModel):
    label: str
    minutes: int = 5
    spoon_cost: int | None = None
    sort_order: int = 0


class FlowStepOut(BaseModel):
    id: str
    flow_id: str
    sort_order: int
    label: str
    minutes: int
    spoon_cost: int | None

    class Config:
        from_attributes = True
