# app/db.py
from sqlmodel import SQLModel, create_engine, Session

# SQLite DB stored in backend folder
DATABASE_URL = "sqlite:///./willow_wyrd.db"

engine = create_engine(DATABASE_URL, echo=True)


def init_db() -> None:
    """
    Creates all database tables.
    """
    from . import models  # Import models so SQLModel sees them

    SQLModel.metadata.create_all(engine)


def get_session():
    """
    FastAPI dependency providing a DB session.
    """
    with Session(engine) as session:
        yield session
