import React, { useMemo, useState } from "react";

type Priority = "low" | "normal" | "high";

type Todo = {
    id: string;
    text: string;
    done: boolean;
    priority: Priority;
    createdAt: string;
};

export default function SpellsTodo() {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState<Priority>("normal");
    const [todos, setTodos] = useState<Todo[]>([
        { id: crypto.randomUUID(), text: "Drink water", done: false, priority: "low", createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), text: "Send 1 application", done: false, priority: "high", createdAt: new Date().toISOString() },
    ]);

    const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

    const add = () => {
        const t = text.trim();
        if (!t) return;
        setTodos((prev) => [{ id: crypto.randomUUID(), text: t, done: false, priority, createdAt: new Date().toISOString() }, ...prev]);
        setText("");
        setPriority("normal");
    };

    const toggle = (id: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const remove = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

    return (
        <div className="grimoire">
            <div className="grimoire-cover" aria-hidden="true" />
            <div className="grimoire-pages">
                <div className="h2">Spells.todo</div>
                <div className="small">Your ingredient list. One completed ingredient is still magic.</div>

                <div className="row" style={{ marginTop: 10 }}>
                    <div className="col" style={{ minWidth: 260 }}>
                        <label>New ingredient</label>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && add()}
                            placeholder="e.g., email recruiter, 10 min walk"
                        />
                    </div>
                    <div className="col" style={{ minWidth: 180 }}>
                        <label>Potency</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                            <option value="low">low</option>
                            <option value="normal">normal</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <div style={{ alignSelf: "flex-end" }}>
                        <button className="btn primary" onClick={add} disabled={!text.trim()}>
                            Add
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: 12 }}>
                    <span className="badge amber">remaining: {remaining}</span>{" "}
                    <span className="badge purple">total: {todos.length}</span>
                </div>

                <ul className="ingredient-list">
                    {todos.map((t) => (
                        <li key={t.id} className={`ingredient-row ${t.done ? "done" : ""}`}>
                            <label className="ingredient-check">
                                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                                <span className="ingredient-text">{t.text}</span>
                            </label>
                            <div className="ingredient-meta">
                                <span className={`badge ${t.priority === "high" ? "amber" : t.priority === "low" ? "green" : "purple"}`}>
                                    {t.priority}
                                </span>
                                <button className="btn danger" onClick={() => remove(t.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
