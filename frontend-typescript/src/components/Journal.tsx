import React, { useState } from "react";

type JournalEntry = {
    id: string;
    title: string;
    body: string;
    createdAt: string; // ISO
};

export default function Journal() {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const onAdd = () => {
        const t = title.trim();
        const b = body.trim();
        if (!t || !b) return;

        const entry: JournalEntry = {
            id: crypto.randomUUID(),
            title: t,
            body: b,
            createdAt: new Date().toISOString(),
        };

        setEntries((prev) => [entry, ...prev]);
        setTitle("");
        setBody("");
    };

    const onDelete = (id: string) => {
        setEntries((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <div className="row" style={{ alignItems: "flex-start" }}>
            <section className="card" style={{ flex: 1, minWidth: 320 }}>
                <h3>New Entry</h3>

                <div>
                    <label htmlFor="j-title">Title</label>
                    <input
                        id="j-title"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        placeholder="Small, honest title"
                    />
                </div>

                <div style={{ marginTop: 12 }}>
                    <label htmlFor="j-body">Body</label>
                    <textarea
                        id="j-body"
                        value={body}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                        placeholder="Write it out. No perfect words required."
                    />
                </div>

                <div className="row" style={{ marginTop: 12 }}>
                    <button className="primary" onClick={onAdd} disabled={!title.trim() || !body.trim()}>
                        Add Entry
                    </button>
                    <span className="small">Local only until connected to your backend.</span>
                </div>
            </section>

            <section className="card" style={{ flex: 1, minWidth: 320 }}>
                <h3>Entries</h3>
                {entries.length === 0 ? (
                    <p className="small">No entries yet.</p>
                ) : (
                    <ul className="list">
                        {entries.map((e) => (
                            <li key={e.id}>
                                <div>
                                    <div className="small">{new Date(e.createdAt).toLocaleString()}</div>
                                    <div style={{ fontWeight: 700, marginTop: 6 }}>{e.title}</div>
                                    <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{e.body}</div>
                                </div>
                                <button className="danger" onClick={() => onDelete(e.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
