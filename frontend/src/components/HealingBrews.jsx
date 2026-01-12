import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function HealingBrews() {
    const [meds, setMeds] = useState([]);
    const [form, setForm] = useState({
        name: "",
        dosage: "",
        schedule: "",
        notes: "",
    });
    const [loading, setLoading] = useState(false);

    async function fetchMeds() {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/meds/`);
            const data = await res.json();
            setMeds(data);
        } catch (err) {
            console.error("Error fetching meds:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMeds();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name.trim()) return;

        try {
            const res = await fetch(`${API_URL}/meds/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, is_active: true }),
            });

            if (!res.ok) {
                console.error("Failed to save potion");
                return;
            }

            const newMed = await res.json();
            setMeds((prev) => [...prev, newMed]);
            setForm({ name: "", dosage: "", schedule: "", notes: "" });
        } catch (err) {
            console.error("Error creating med:", err);
        }
    }

    async function toggleActive(id) {
        try {
            const res = await fetch(`${API_URL}/meds/${id}/toggle`, {
                method: "PATCH",
            });
            if (!res.ok) return;
            const updated = await res.json();
            setMeds((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
            );
        } catch (err) {
            console.error("Error toggling med:", err);
        }
    }

    return (
        <div>
            <h2 className="ww-section-title">🧪 Healing Brews</h2>
            <p className="ww-section-desc">
                Track your medications as potions: names, doses, and when they’re taken.
            </p>

            <form className="ww-form" onSubmit={handleSubmit}>
                <div className="ww-field-group">
                    <label className="ww-label">Potion name</label>
                    <input
                        className="ww-input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Sertraline, Vitamin D, Pain potion..."
                    />
                </div>

                <div className="ww-field-row">
                    <div className="ww-field-group">
                        <label className="ww-label">Dosage</label>
                        <input
                            className="ww-input"
                            name="dosage"
                            value={form.dosage}
                            onChange={handleChange}
                            placeholder="10mg, 1 tablet..."
                        />
                    </div>
                    <div className="ww-field-group">
                        <label className="ww-label">Schedule</label>
                        <input
                            className="ww-input"
                            name="schedule"
                            value={form.schedule}
                            onChange={handleChange}
                            placeholder="morning + evening"
                        />
                    </div>
                </div>

                <div className="ww-field-group">
                    <label className="ww-label">Notes</label>
                    <textarea
                        className="ww-textarea"
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Take with food, avoid caffeine, doctor’s notes..."
                    />
                </div>

                <button className="ww-button" type="submit">
                    ✨ Save Potion
                </button>
            </form>

            <hr className="ww-divider" />

            <section className="ww-list-section">
                <h3 className="ww-list-title">Potion cabinet</h3>
                {loading && <div>Distilling brews…</div>}
                {!loading && meds.length === 0 && (
                    <div className="ww-empty">
                        Your potion cabinet is empty. Start by adding a brew. 🌙
                    </div>
                )}

                <div className="ww-card-grid">
                    {meds.map((med) => (
                        <article
                            key={med.id}
                            className={
                                med.is_active
                                    ? "ww-potion-card"
                                    : "ww-potion-card ww-potion-card--inactive"
                            }
                        >
                            <div className="ww-pill">
                                {med.is_active ? "Active" : "Paused"}
                            </div>
                            <h4 className="ww-potion-name">{med.name}</h4>
                            {med.dosage && (
                                <div className="ww-potion-meta">
                                    <strong>Dosage:</strong> {med.dosage}
                                </div>
                            )}
                            {med.schedule && (
                                <div className="ww-potion-meta">
                                    <strong>Schedule:</strong> {med.schedule}
                                </div>
                            )}
                            {med.notes && (
                                <p className="ww-potion-notes">{med.notes}</p>
                            )}
                            <button
                                type="button"
                                className="ww-button ww-button--ghost"
                                onClick={() => toggleActive(med.id)}
                            >
                                {med.is_active ? "⏸ Pause brew" : "▶️ Resume brew"}
                            </button>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HealingBrews;
