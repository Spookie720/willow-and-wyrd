# app/main.py
from . import journal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import init_db
from .. import meds, todos, spoons

app = FastAPI(
    title="Willow & Wyrd API",
    description="Backend for the cozy witchy mental health app.",
    version="0.1.0",
)

# Allow frontend (React) to connect
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


# Register routers
app.include_router(journal.router)
app.include_router(meds.router)
app.include_router(todos.router)
app.include_router(spoons.router)


@app.get("/")
def root():
    return {"message": "🌿 Willow & Wyrd API – a Wispmire project"}
