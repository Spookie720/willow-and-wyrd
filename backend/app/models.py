from __future__ import annotations

import uuid
from datetime import datetime, date
from sqlalchemy import String, Text, Integer, Boolean, DateTime, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class Medication(Base):
    __tablename__ = "medications"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    dose: Mapped[str] = mapped_column(String(100), nullable=False)  # "2mg"
    time: Mapped[str] = mapped_column(
        String(30), nullable=False
    )  # morning/evening etc.
    color: Mapped[str] = mapped_column(String(30), nullable=False, default="green")
    active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    dose_logs: Mapped[list["DoseLog"]] = relationship(
        back_populates="medication", cascade="all, delete-orphan"
    )


class DoseLog(Base):
    __tablename__ = "dose_logs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    medication_id: Mapped[str] = mapped_column(
        ForeignKey("medications.id"), nullable=False
    )
    status: Mapped[str] = mapped_column(
        String(20), nullable=False
    )  # taken/skipped/missed
    notes: Mapped[str | None] = mapped_column(String(400), nullable=True)
    taken_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    medication: Mapped["Medication"] = relationship(back_populates="dose_logs")


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    entry_type: Mapped[str] = mapped_column(
        String(40), default="personal"
    )  # personal/doctor_note/appointment
    tags: Mapped[str] = mapped_column(String(400), default="")  # comma-separated
    entry_date: Mapped[date] = mapped_column(Date, default=date.today)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class TodoItem(Base):
    __tablename__ = "todo_items"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    text: Mapped[str] = mapped_column(String(300), nullable=False)
    done: Mapped[bool] = mapped_column(Boolean, default=False)
    priority: Mapped[str] = mapped_column(
        String(20), default="normal"
    )  # low/normal/high
    due_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class SpoonDay(Base):
    """
    One per date. Stores starting/remaining; events change the day.
    """

    __tablename__ = "spoon_days"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    day: Mapped[date] = mapped_column(Date, default=date.today, unique=True)
    starting: Mapped[int] = mapped_column(Integer, default=10)
    remaining: Mapped[int] = mapped_column(Integer, default=10)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    events: Mapped[list["SpoonEvent"]] = relationship(
        back_populates="spoon_day", cascade="all, delete-orphan"
    )


class SpoonEvent(Base):
    __tablename__ = "spoon_events"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    spoon_day_id: Mapped[str] = mapped_column(
        ForeignKey("spoon_days.id"), nullable=False
    )
    label: Mapped[str] = mapped_column(String(240), nullable=False)
    delta: Mapped[int] = mapped_column(Integer, nullable=False)  # - drains, + restores

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    spoon_day: Mapped["SpoonDay"] = relationship(back_populates="events")


class WyrdFlow(Base):
    __tablename__ = "wyrd_flows"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(String(400), default="")
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    steps: Mapped[list["WyrdFlowStep"]] = relationship(
        back_populates="flow", cascade="all, delete-orphan"
    )


class WyrdFlowStep(Base):
    __tablename__ = "wyrd_flow_steps"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    flow_id: Mapped[str] = mapped_column(ForeignKey("wyrd_flows.id"), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    label: Mapped[str] = mapped_column(String(200), nullable=False)
    minutes: Mapped[int] = mapped_column(Integer, default=5)
    spoon_cost: Mapped[int | None] = mapped_column(Integer, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    flow: Mapped["WyrdFlow"] = relationship(back_populates="steps")


class WyrdFlowRun(Base):
    __tablename__ = "wyrd_flow_runs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    flow_id: Mapped[str] = mapped_column(ForeignKey("wyrd_flows.id"), nullable=False)
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    ended_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    status: Mapped[str] = mapped_column(
        String(30), default="running"
    )  # running/completed/abandoned
    notes: Mapped[str] = mapped_column(String(400), default="")
