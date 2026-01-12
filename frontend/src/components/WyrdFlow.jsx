import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function WyrdFlow() {
    const [logs, setLogs] = useState([]);
    const [spoons, setSpoons] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState(() =>
        new Date().toISOString().slice(0, 10)
    );
    const [loading, setLoading] = useState(false);

    async function fetchLogs() {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/spoons/`);
            const data = await res.json();
            setLogs(data);
        } catch (err) {
            console.error("Error fetching spoon logs:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const value = parseInt(spoons, 10);
        if (Number.isNaN(value)) return;

        try {
            const res = await fetch(`${API_URL}/spoons/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    spoons: value,
                    notes,
                    date,
                }),
            });
            if (!res.ok) {
                console.error("Failed to log spoons");
                return;
            }
            const newLog = await res.json();
            setLogs((prev) => [newLog, ...prev]);
            setNotes("");
        } catch (err) {
            console.error("Error creating spoon log:", err);
        }
    }

    return (
        <div>
            <h2 className="ww-section-title">🌕 Wyrd Flow</h2>
            <p className="ww-section-desc">
                Track how many spoons you have so you can plan your magic (and rest)
                with kindness.
            </p>

            <form className="ww-form" onSubmit={handleSubmit}>
                <div className="ww-field-row">
                    <div className="ww-field-group">
                        <label className="ww-label">Date</label>
                        <input
                            className="ww-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="ww-field-group">
                        <label className="ww-label">Spoons / energy</label>
                        <input
                            className="ww-input"
                            type="number"
                            min="0"
                            max="50"
                            value={spoons}
                            onChange={(e) => setSpoons(e.target.value)}
                            placeholder="e.g. 3, 7, 10..."
                        />
                    </div>
                </div>

                <div className="ww-field-group">
                    <label className="ww-label">Notes (optional)</label>
                    <textarea
                        className="ww-textarea"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="What’s affecting your spoons today?"
                    />
                </div>

                <button className="ww-button" type="submit">
                    🌙 Log Wyrd Flow
                </button>
            </form>

            <hr className="ww-divider" />

            <section className="ww-list-section">
                <h3 className="ww-list-title">Recent days</h3>
                {loading && <div>Reading the tides…</div>}
                {!loading && logs.length === 0 && (
                    <div className="ww-empty">
                        No spoon logs yet. Today is a good first check-in. 💫
                    </div>
                )}

                <div className="ww-card-grid">
                    {logs.map((log) => (
                        <article key={log.id} className="ww-potion-card">
                            <div
                                style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.2rem" }}
                            >
                                {log.date}
                            </div>
                            <div
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    marginBottom: "0.3rem",
                                }}
                            >
                                {log.spoons} spoons
                            </div>
                            {log.notes && (
                                <p className="ww-potion-notes">{log.notes}</p>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default WyrdFlow;
