import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Journal() {
    const [entries, setEntries] = useState([]);
    const [mood, setMood] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchEntries() {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/journal/`);
            const data = await res.json();
            setEntries(data);
        } catch (err) {
            console.error("Error fetching journal entries:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEntries();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            const res = await fetch(`${API_URL}/journal/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mood, text }),
            });

            if (!res.ok) {
                console.error("Failed to save entry");
                return;
            }

            const newEntry = await res.json();
            setEntries((prev) => [newEntry, ...prev]); // newest first
            setMood("");
            setText("");
        } catch (err) {
            console.error("Error creating entry:", err);
        }
    }

    return (
        <div>
            <h2 className="ww-section-title">📖 Grimoire Pages</h2>
            <p className="ww-section-desc">
                Log today’s mood and words — they’ll sink into your Grimoire.
            </p>

            <form className="ww-form" onSubmit={handleSubmit}>
                <div className="ww-field-group">
                    <label className="ww-label">Mood (word or 1–5)</label>
                    <input
                        className="ww-input"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="stormy, soft, 3/5..."
                    />
                </div>

                <div className="ww-field-group">
                    <label className="ww-label">Words for the Grimoire</label>
                    <textarea
                        className="ww-textarea"
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Let the ink spill…"
                    />
                </div>

                <button className="ww-button" type="submit">
                    ✨ Save Entry
                </button>
            </form>

            <hr className="ww-divider" />

            <section className="ww-list-section">
                <h3 className="ww-list-title">Past entries</h3>
                {loading && <div>Summoning pages…</div>}
                {!loading && entries.length === 0 && (
                    <div className="ww-empty">The Grimoire is still blank. 🌙</div>
                )}

                <div className="ww-card-grid">
                    {entries.map((entry) => (
                        <article key={entry.id} className="ww-potion-card">
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    opacity: 0.75,
                                    marginBottom: "0.25rem",
                                }}
                            >
                                {new Date(entry.timestamp).toLocaleString()}
                            </div>
                            <div
                                style={{
                                    fontWeight: 600,
                                    marginBottom: "0.25rem",
                                    fontSize: "0.9rem",
                                }}
                            >
                                Mood: {entry.mood || "n/a"}
                            </div>
                            <div style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
                                {entry.text}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Journal;
