import React, { useMemo, useState } from "react";

type Todo = {
    id: string;
    text: string;
    done: boolean;
    createdAt: string;
};

export default function SpellsTodo() {
    const [text, setText] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

    const addTodo = () => {
        const t = text.trim();
        if (!t) return;

        const todo: Todo = {
            id: crypto.randomUUID(),
            text: t,
            done: false,
            createdAt: new Date().toISOString(),
        };

        setTodos((prev) => [todo, ...prev]);
        setText("");
    };

    const toggle = (id: string) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    };

    const remove = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="card">
            <h3>Spells.todo</h3>
            <p className="small">Keep it simple. One task is still a spell.</p>

            <div className="row">
                <div style={{ flex: 1, minWidth: 260 }}>
                    <label htmlFor="todo">New task</label>
                    <input
                        id="todo"
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") addTodo();
                        }}
                        placeholder="e.g., drink water, email recruiter, take a walk"
                    />
                </div>
                <div style={{ alignSelf: "flex-end" }}>
                    <button className="primary" onClick={addTodo} disabled={!text.trim()}>
                        Add
                    </button>
                </div>
            </div>

            <div style={{ marginTop: 12 }} className="small">
                Remaining: <strong>{remaining}</strong>
            </div>

            <ul className="list" style={{ marginTop: 12 }}>
                {todos.map((t) => (
                    <li key={t.id}>
                        <div>
                            <div className="small">{new Date(t.createdAt).toLocaleString()}</div>
                            <div style={{ marginTop: 6 }}>
                                <label style={{ display: "flex", gap: 10, alignItems: "center", margin: 0 }}>
                                    <input
                                        type="checkbox"
                                        checked={t.done}
                                        onChange={() => toggle(t.id)}
                                        style={{ width: 18, height: 18 }}
                                    />
                                    <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                                        {t.text}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <button className="danger" onClick={() => remove(t.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {todos.length === 0 && <p className="small">No tasks yet.</p>}
        </div>
    );
}
