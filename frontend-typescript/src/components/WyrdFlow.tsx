import React, { useMemo, useState } from "react";

type FlowStep = {
    id: string;
    label: string;
    minutes: number;
};

export default function WyrdFlow() {
    const [label, setLabel] = useState<string>("");
    const [minutes, setMinutes] = useState<number>(5);
    const [steps, setSteps] = useState<FlowStep[]>([
        { id: crypto.randomUUID(), label: "Drink water", minutes: 2 },
        { id: crypto.randomUUID(), label: "Quick tidy", minutes: 5 },
        { id: crypto.randomUUID(), label: "Journal (3 lines)", minutes: 5 },
    ]);

    const totalMinutes = useMemo(
        () => steps.reduce((sum, s) => sum + s.minutes, 0),
        [steps]
    );

    const addStep = () => {
        const l = label.trim();
        if (!l) return;

        setSteps((prev) => [
            { id: crypto.randomUUID(), label: l, minutes: clampInt(String(minutes), 1, 180) },
            ...prev,
        ]);
        setLabel("");
        setMinutes(5);
    };

    const removeStep = (id: string) => setSteps((prev) => prev.filter((s) => s.id !== id));

    const updateMinutes = (id: string, value: string) => {
        const m = clampInt(value, 1, 180);
        setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, minutes: m } : s)));
    };

    return (
        <div className="row" style={{ alignItems: "flex-start" }}>
            <section className="card" style={{ flex: 1, minWidth: 320 }}>
                <h3>Build a Flow</h3>
                <p className="small">Tiny steps, real momentum.</p>

                <div className="row">
                    <div style={{ flex: 1, minWidth: 220 }}>
                        <label htmlFor="flow-label">Step</label>
                        <input
                            id="flow-label"
                            value={label}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
                            placeholder="e.g., shower, email, stretch"
                        />
                    </div>

                    <div style={{ width: 140 }}>
                        <label htmlFor="flow-min">Minutes</label>
                        <input
                            id="flow-min"
                            type="number"
                            min={1}
                            max={180}
                            value={minutes}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setMinutes(clampInt(e.target.value, 1, 180))
                            }
                        />
                    </div>

                    <div style={{ alignSelf: "flex-end" }}>
                        <button className="primary" onClick={addStep} disabled={!label.trim()}>
                            Add
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: 12 }} className="small">
                    Total: <strong>{totalMinutes}</strong> minutes
                </div>
            </section>

            <section className="card" style={{ flex: 1, minWidth: 320 }}>
                <h3>Your Steps</h3>
                {steps.length === 0 ? (
                    <p className="small">No steps yet.</p>
                ) : (
                    <ul className="list">
                        {steps.map((s) => (
                            <li key={s.id}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>{s.label}</div>
                                    <div className="small" style={{ marginTop: 6 }}>
                                        <label style={{ margin: 0 }}>
                                            Minutes:{" "}
                                            <input
                                                type="number"
                                                min={1}
                                                max={180}
                                                value={s.minutes}
                                                onChange={(e) => updateMinutes(s.id, e.target.value)}
                                                style={{ width: 90, marginLeft: 8 }}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <button className="danger" onClick={() => removeStep(s.id)}>
                                    Remove
                                </button>
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
