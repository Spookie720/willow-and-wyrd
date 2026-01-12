# app/schemas.py
"""
Compatibility shim.

If something expects Pydantic `schemas.py`, we simply re-export our SQLModel
models, which act as both ORM + Pydantic models.
"""

from .models import JournalEntry, Medication, Todo, SpoonLog

__all__ = ["JournalEntry", "Medication", "Todo", "SpoonLog"]
