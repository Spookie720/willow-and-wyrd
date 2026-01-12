import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function SpellsTodo() {
    const [spells, setSpells] = useState([]);
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchSpells() {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/todos/`);
            const data = await res.json();
            setSpells(data);
        } catch (err) {
            console.error("Error fetching spells:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSpells();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const res = await fetch(`${API_URL}/todos/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, notes }),
            });
            if (!res.ok) {
                console.error("Failed to save spell");
                return;
            }
            const newSpell = await res.json();
            setSpells((prev) => [newSpell, ...prev]);
            setTitle("");
            setNotes("");
        } catch (err) {
            console.error("Error creating spell:", err);
        }
    }

    async function toggleSpell(id) {
        try {
            const res = await fetch(`${API_URL}/todos/${id}/toggle`, {
                method: "PATCH",
            });
            if (!res.ok) return;
            const updated = await res.json();
            setSpells((prev) =>
                prev.map((s) => (s.id === updated.id ? updated : s))
            );
        } catch (err) {
            console.error("Error toggling spell:", err);
        }
    }

    async function deleteSpell(id) {
        try {
            const res = await fetch(`${API_URL}/todos/${id}`, {
                method: "DELETE",
            });
            if (!res.ok && res.status !== 204) return;
            setSpells((prev) => prev.filter((s) => s.id !== id));
        } catch (err) {
            console.error("Error deleting spell:", err);
        }
    }

    return (
        <div>
            <h2 className="ww-section-title">✨ Spells to Cast</h2>
            <p className="ww-section-desc">
                A gentle to-do list for the things Future You would love you for.
            </p>

            <form className="ww-form" onSubmit={handleSubmit}>
                <div className="ww-field-group">
                    <label className="ww-label">Spell name (task title)</label>
                    <input
                        className="ww-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Refill potion, email therapist, drink water..."
                    />
                </div>

                <div className="ww-field-group">
                    <label className="ww-label">Details / incantation (optional)</label>
                    <textarea
                        className="ww-textarea"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any notes or steps for this spell..."
                    />
                </div>

                <button className="ww-button" type="submit">
                    ✨ Add Spell
                </button>
            </form>

            <hr className="ww-divider" />

            <section className="ww-list-section">
                <h3 className="ww-list-title">Spell list</h3>
                {loading && <div>Gathering spell components…</div>}
                {!loading && spells.length === 0 && (
                    <div className="ww-empty">
                        No spells queued. Maybe that’s okay, too. 🌙
                    </div>
                )}

                <div className="ww-card-grid">
                    {spells.map((spell) => (
                        <article
                            key={spell.id}
                            className={
                                spell.is_done
                                    ? "ww-potion-card ww-potion-card--inactive"
                                    : "ww-potion-card"
                            }
                        >
                            <h4 className="ww-potion-name">
                                {spell.is_done ? "✅ " : "⬜️ "}
                                {spell.title}
                            </h4>
                            {spell.notes && (
                                <p className="ww-potion-notes">{spell.notes}</p>
                            )}
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.35rem" }}>
                                <button
                                    type="button"
                                    className="ww-button ww-button--ghost"
                                    onClick={() => toggleSpell(spell.id)}
                                >
                                    {spell.is_done ? "↩️ Mark as not done" : "✔️ Mark as done"}
                                </button>
                                <button
                                    type="button"
                                    className="ww-button ww-button--ghost"
                                    onClick={() => deleteSpell(spell.id)}
                                >
                                    🗑 Remove
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default SpellsTodo;
