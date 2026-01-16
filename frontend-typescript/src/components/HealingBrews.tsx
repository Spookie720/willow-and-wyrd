import React, { useMemo, useState } from "react";
import { PotionIcon } from "./Icons";



type Med = {
    id: string;
    name: string;
    dose: string;
    time: "morning" | "midday" | "evening" | "night";
    color: "green" | "purple" | "amber";
};

type DoseLog = {
    id: string;
    medId: string;
    status: "taken" | "skipped" | "missed";
    at: string;
};

export default function HealingBrew() {
    const [meds, setMeds] = useState<Med[]>([
        { id: crypto.randomUUID(), name: "Estradiol", dose: "2mg", time: "morning", color: "purple" },
        { id: crypto.randomUUID(), name: "Spironolactone", dose: "50mg", time: "evening", color: "green" },
    ]);
    const [logs, setLogs] = useState<DoseLog[]>([]);
    const [name, setName] = useState("");
    const [dose, setDose] = useState("");
    const [time, setTime] = useState<Med["time"]>("morning");
    const [color, setColor] = useState<Med["color"]>("green");

    const brewLevel = useMemo(() => {
        const taken = logs.filter((l) => l.status === "taken").length;
        return Math.min(100, taken * 10 + meds.length * 5);
    }, [logs, meds]);

    const ingredients = useMemo(() => {
        // ingredients appear as meds + “taken” sparks
        const base = meds.map((m) => ({ key: m.id, label: `${m.name} ${m.dose}`, color: m.color }));
        const sparks = logs
            .filter((l) => l.status === "taken")
            .slice(0, 8)
            .map((l, idx) => ({ key: `${l.id}-${idx}`, label: "dose", color: "teal" as any }));
        return [...base, ...sparks];
    }, [meds, logs]);

    const addMed = () => {
        const n = name.trim();
        const d = dose.trim();
        if (!n || !d) return;
        setMeds((prev) => [
            { id: crypto.randomUUID(), name: n, dose: d, time, color },
            ...prev,
        ]);
        setName("");
        setDose("");
        setTime("morning");
        setColor("green");
    };

    const logDose = (medId: string, status: DoseLog["status"]) => {
        setLogs((prev) => [
            { id: crypto.randomUUID(), medId, status, at: new Date().toISOString() },
            ...prev,
        ]);
    };

    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="h2 feature-title">
                        <PotionIcon size={22} />
                        The Cauldron
                    </div>

                    <div className="small">Add meds = ingredients. Logging doses makes the brew glow.</div>

                    <div className="cauldron-stage">
                        <div className="cauldron-ring" aria-hidden="true" />
                        <div className="cauldron" aria-label="Animated cauldron">
                            <div className="brew" style={{ height: `${brewLevel}%` }} />
                            {ingredients.slice(0, 14).map((ing, i) => (
                                <span
                                    key={ing.key}
                                    className={`ingredient ig-${i % 8} c-${ing.color}`}
                                    title={ing.label}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="h2">Add ingredient</div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Sertraline" />
                    <label>Dose</label>
                    <input value={dose} onChange={(e) => setDose(e.target.value)} placeholder="e.g., 25mg" />

                    <div className="row">
                        <div className="col" style={{ minWidth: 180 }}>
                            <label>Time</label>
                            <select value={time} onChange={(e) => setTime(e.target.value as Med["time"])}>
                                <option value="morning">morning</option>
                                <option value="midday">midday</option>
                                <option value="evening">evening</option>
                                <option value="night">night</option>
                            </select>
                        </div>
                        <div className="col" style={{ minWidth: 180 }}>
                            <label>Essence</label>
                            <select value={color} onChange={(e) => setColor(e.target.value as Med["color"])}>
                                <option value="green">green</option>
                                <option value="purple">purple</option>
                                <option value="amber">amber</option>
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 10 }}>
                        <button className="btn primary" onClick={addMed} disabled={!name.trim() || !dose.trim()}>
                            Add to brew
                        </button>
                        <span className="small">Later: wire to API.</span>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card">
                    <div className="h2">Your Ingredients</div>
                    <div className="small">Mark doses — the cauldron brightens.</div>

                    {meds.length === 0 ? (
                        <p className="small">No meds yet.</p>
                    ) : (
                        <ul className="brew-list">
                            {meds.map((m) => (
                                <li key={m.id} className="brew-item">
                                    <div>
                                        <div className="brew-name">
                                            <span className={`dot-essence c-${m.color}`} aria-hidden="true" />
                                            {m.name} <span className="muted">({m.dose})</span>
                                        </div>
                                        <div className="small">Time: <span className="badge purple">{m.time}</span></div>
                                    </div>

                                    <div className="brew-actions">
                                        <button className="btn primary" onClick={() => logDose(m.id, "taken")}>Taken</button>
                                        <button className="btn" onClick={() => logDose(m.id, "skipped")}>Skipped</button>
                                        <button className="btn danger" onClick={() => logDose(m.id, "missed")}>Missed</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="divider" />

                    <div className="h2">Recent Dose Logs</div>
                    {logs.length === 0 ? (
                        <p className="small">No logs yet. Start with one.</p>
                    ) : (
                        <ul className="log-list">
                            {logs.slice(0, 8).map((l) => {
                                const med = meds.find((m) => m.id === l.medId);
                                return (
                                    <li key={l.id} className="log-item">
                                        <span className={`badge ${l.status === "taken" ? "green" : l.status === "skipped" ? "purple" : "amber"}`}>
                                            {l.status}
                                        </span>
                                        <span className="muted">{med ? med.name : "Unknown"}</span>
                                        <span className="small">{new Date(l.at).toLocaleString()}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
