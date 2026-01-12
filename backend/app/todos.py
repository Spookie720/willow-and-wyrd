# app/todos.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from .db import get_session
from .models import Todo

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=List[Todo])
def list_todos(session: Session = Depends(get_session)):
    """
    List all spells (to-dos), incomplete ones first.
    """
    statement = select(Todo).order_by(Todo.is_done.asc(), Todo.created_at.desc())
    return session.exec(statement).all()


@router.post("/", response_model=Todo, status_code=201)
def create_todo(todo: Todo, session: Session = Depends(get_session)):
    """
    Create a new spell/task.
    """
    if not todo.title:
        raise HTTPException(status_code=400, detail="Spell title is required.")

    new_todo = Todo(
        title=todo.title,
        notes=todo.notes,
        due_date=todo.due_date,
        is_done=False,
    )
    session.add(new_todo)
    session.commit()
    session.refresh(new_todo)
    return new_todo


@router.patch("/{todo_id}/toggle", response_model=Todo)
def toggle_todo(todo_id: int, session: Session = Depends(get_session)):
    """
    Toggle spell completion.
    """
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Spell not found.")

    todo.is_done = not todo.is_done
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    """
    Remove a spell from the list.
    """
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Spell not found.")

    session.delete(todo)
    session.commit()
    return
