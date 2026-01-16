import React, { useMemo, useState } from "react";
import { PotionIcon } from "./Icons";


type EntryType = "personal" | "doctor_note" | "appointment";

type JournalEntry = {
    id: string;
    title: string;
    body: string;
    type: EntryType;
    createdAt: string;
    tags: string[];
};

export default function Journal() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState<EntryType>("personal");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const canSave = useMemo(() => title.trim() && body.trim(), [title, body]);

    const add = () => {
        if (!canSave) return;
        const entry: JournalEntry = {
            id: crypto.randomUUID(),
            title: title.trim(),
            body: body.trim(),
            type,
            createdAt: new Date().toISOString(),
            tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        };
        setEntries((prev) => [entry, ...prev]);
        setTitle("");
        setBody("");
        setTags("");
        setType("personal");
    };

    return (
        <div className="row">
            <div className="col">
                <div className="scroll-wrap">
                    <div className="scroll-top-rod" aria-hidden="true" />
                    <div className="scroll-paper">
                        <div className="h2">New Entry</div>
                        <div className="small">Unroll it. Write it. Fold it into your history.</div>

                        <label>Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Endo follow-up notes" />

                        <div className="row">
                            <div className="col" style={{ minWidth: 200 }}>
                                <label>Type</label>
                                <select value={type} onChange={(e) => setType(e.target.value as EntryType)}>
                                    <option value="personal">personal</option>
                                    <option value="doctor_note">doctor note</option>
                                    <option value="appointment">appointment</option>
                                </select>
                            </div>
                            <div className="col" style={{ minWidth: 200 }}>
                                <label>Tags (comma)</label>
                                <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="hrt, mood, side effects" />
                            </div>
                        </div>

                        <label>Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Symptoms, questions, outcomes, what to remember…"
                        />

                        <div className="row" style={{ marginTop: 10 }}>
                            <button className="btn primary" onClick={add} disabled={!canSave}>
                                Seal entry
                            </button>
                            <span className="small">Local-only for now.</span>
                        </div>
                    </div>
                    <div className="scroll-bottom-rod" aria-hidden="true" />
                </div>
            </div>

            <div className="col">
                <div className="card">
                    <div className="h2">Entries</div>
                    {entries.length === 0 ? (
                        <p className="small">No scrolls yet.</p>
                    ) : (
                        <ul className="entries">
                            {entries.slice(0, 8).map((e) => (
                                <li key={e.id} className="entry">
                                    <div className="entry-head">
                                        <div>
                                            <div className="entry-title">{e.title}</div>
                                            <div className="small">
                                                <span className={`badge ${e.type === "doctor_note" ? "purple" : e.type === "appointment" ? "amber" : "green"}`}>
                                                    {e.type.replace("_", " ")}
                                                </span>{" "}
                                                <span className="muted">{new Date(e.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entry-body">{e.body}</div>
                                    {e.tags.length > 0 && (
                                        <div className="entry-tags">
                                            {e.tags.map((t) => (
                                                <span key={t} className="tag">#{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="divider" />
                    <p className="small">Later: search, export, and doctor-note filters.</p>
                </div>
            </div>
        </div>
    );
}
