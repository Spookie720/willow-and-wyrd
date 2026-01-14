import React, { useMemo, useState } from "react";

type BrewEntry = {
    id: string;
    createdAt: string; // ISO
    mood: number; // 1-10
    energy: number; // 1-10
    notes: string;
};

export default function HealingBrew() {
    const [mood, setMood] = useState<number>(5);
    const [energy, setEnergy] = useState<number>(5);
    const [notes, setNotes] = useState<string>("");
    const [entries, setEntries] = useState<BrewEntry[]>([]);

    const canSave = useMemo(() => notes.trim().length > 0, [notes]);

    const onSave = () => {
        if (!canSave) return;
        const now = new Date().toISOString();
        const entry: BrewEntry = {
            id: crypto.randomUUID(),
            createdAt: now,
            mood,
            energy,
            notes: notes.trim(),
        };
        setEntries((prev) => [entry, ...prev]);
        setNotes("");
        setMood(5);
        setEnergy(5);
    };

    return (
        <div className="row" style={{ alignItems: "flex-start" }}>
            <section className="card" style={{ flex: 1, minWidth: 320 }}>
                <h3>Today’s Brew</h3>

                <div className="row">
                    <div style={{ flex: 1, minWidth: 140 }}>
                        <label htmlFor="mood">Mood (1–10)</label>
                        <input
                            id="mood"
                            type="number"
                            min={1}
                            max={10}
                            value={mood}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setMood(clampInt(e.target.value, 1, 10))
                            }
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: 140 }}>
                        <label htmlFor="energy">Energy (1–10)</label>
                        <input
                            id="energy"
                            type="number"
                            min={1}
                            max={10}
                            value={energy}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEnergy(clampInt(e.target.value, 1, 10))
                            }
                        />
                    </div>
                </div>

                <div style={{ marginTop: 12 }}>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                        placeholder="What’s true today? What would help?"
                    />
                </div>

                <div className="row" style={{ marginTop: 12 }}>
                    <button className="primary" onClick={onSave} disabled={!canSave}>
                        Save
                    </button>
                    <span className="small">Saved entries are local for now (until wired to API).</span>
                </div>
            </section>

            <section className="card" style={{ flex: 1, minWidth: 320 }}>
                <h3>Recent Brews</h3>
                {entries.length === 0 ? (
                    <p className="small">No entries yet. Your first one can be small.</p>
                ) : (
                    <ul className="list">
                        {entries.map((e) => (
                            <li key={e.id}>
                                <div>
                                    <div className="small">{new Date(e.createdAt).toLocaleString()}</div>
                                    <div style={{ marginTop: 6 }}>{e.notes}</div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                                    <span className="badge ok">Mood: {e.mood}</span>
                                    <span className="badge warn">Energy: {e.energy}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

function clampInt(value: string, min: number, max: number): number {
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n)) return min;
    return Math.max(min, Math.min(max, n));
}
