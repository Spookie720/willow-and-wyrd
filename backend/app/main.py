from __future__ import annotations

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
import meds
import journal
import todo
import spoons

# Create tables (simple dev mode; later you'll switch to Alembic migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Willow & Wyrd API")

# CORS for Vite/React dev servers
# Set FRONTEND_ORIGINS="http://localhost:5173,http://localhost:3000"
origins_env = os.getenv(
    "FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:3000"
)
origins = [o.strip() for o in origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meds.router)
app.include_router(journal.router)
app.include_router(todo.router)
app.include_router(spoons.router)


@app.get("/api/health")
def health():
    return {"ok": True}
