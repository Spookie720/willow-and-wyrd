from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from database import get_db
from models import TodoItem
from schemas import TodoCreate, TodoUpdate, TodoOut

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("", response_model=list[TodoOut])
def list_todos(db: Session = Depends(get_db)):
    items = db.scalars(select(TodoItem).order_by(TodoItem.created_at.desc())).all()
    return items


@router.post("", response_model=TodoOut)
def create_todo(payload: TodoCreate, db: Session = Depends(get_db)):
    item = TodoItem(text=payload.text, priority=payload.priority, due_at=payload.due_at)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{todo_id}", response_model=TodoOut)
def update_todo(todo_id: str, payload: TodoUpdate, db: Session = Depends(get_db)):
    item = db.get(TodoItem, todo_id)
    if not item:
        raise HTTPException(status_code=404, detail="Todo not found")

    if payload.text is not None:
        item.text = payload.text
    if payload.done is not None:
        item.done = payload.done
    if payload.priority is not None:
        item.priority = payload.priority
    if payload.due_at is not None:
        item.due_at = payload.due_at

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{todo_id}")
def delete_todo(todo_id: str, db: Session = Depends(get_db)):
    item = db.get(TodoItem, todo_id)
    if not item:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(item)
    db.commit()
    return {"ok": True}
