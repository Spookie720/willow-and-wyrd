# app/database.py
"""
Compatibility shim.

Some code or tools may expect `database.py` with engine/init_db/get_session.
We delegate to app.db to keep a single source of truth.
"""

from .db import engine, init_db, get_session

__all__ = ["engine", "init_db", "get_session"]
