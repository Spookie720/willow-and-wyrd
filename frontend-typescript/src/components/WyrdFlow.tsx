import React, { useMemo, useState } from "react";
import { PotionIcon } from "./Icons";


type SpoonEvent = {
    id: string;
    label: string;
    delta: number; // - drains, + restores
    createdAt: string;
};

type Flow = {
    id: string;
    name: string;
    steps: { id: string; label: string; minutes: number; spoonCost?: number }[];
};

export default function WyrdFlow() {
    const [starting, setStarting] = useState<number>(10);
    const [events, setEvents] = useState<SpoonEvent[]>([]);
    const [label, setLabel] = useState("");
    const [delta, setDelta] = useState<number>(-1);

    const [flows, setFlows] = useState<Flow[]>([
        {
            id: crypto.randomUUID(),
            name: "Morning Reset",
            steps: [
                { id: crypto.randomUUID(), label: "Drink water", minutes: 2, spoonCost: 0 },
                { id: crypto.randomUUID(), label: "Shower", minutes: 6, spoonCost: 1 },
                { id: crypto.randomUUID(), label: "Journal (3 lines)", minutes: 5, spoonCost: 1 },
            ],
        },
    ]);

    const [activeRun, setActiveRun] = useState<{ flowId: string; stepIndex: number } | null>(null);

    const used = useMemo(() => {
        const sum = events.reduce((acc, e) => acc + e.delta, 0);
        // delta is negative drain, positive restore. used = starting - current
        return Math.max(0, Math.min(starting, -sum));
    }, [events, starting]);

    const remaining = useMemo(() => {
        const sum = events.reduce((acc, e) => acc + e.delta, 0);
        return Math.max(0, starting + sum);
    }, [events, starting]);

    const addEvent = () => {
        const l = label.trim();
        if (!l) return;
        setEvents((prev) => [{ id: crypto.randomUUID(), label: l, delta, createdAt: new Date().toISOString() }, ...prev]);
        setLabel("");
        setDelta(-1);
    };

    const stones = useMemo(() => Array.from({ length: starting }, (_, i) => i < remaining), [starting, remaining]);

    const startRun = (flowId: string) => setActiveRun({ flowId, stepIndex: 0 });
    const stopRun = () => setActiveRun(null);
    const nextStep = () => {
        if (!activeRun) return;
        const flow = flows.find((f) => f.id === activeRun.flowId);
        if (!flow) return;
        const next = activeRun.stepIndex + 1;
        if (next >= flow.steps.length) {
            setActiveRun(null);
            return;
        }
        setActiveRun({ flowId: flow.id, stepIndex: next });
    };

    const activeFlow = activeRun ? flows.find((f) => f.id === activeRun.flowId) : null;
    const activeStep = activeFlow && activeRun ? activeFlow.steps[activeRun.stepIndex] : null;

    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="h2">Moonstones (Spoons)</div>
                    <div className="small">Glowing stones = energy you can spend. Dull stones = rest.</div>

                    <div className="row">
                        <div className="col" style={{ minWidth: 240 }}>
                            <label>Starting stones</label>
                            <input
                                type="number"
                                min={1}
                                max={30}
                                value={starting}
                                onChange={(e) => setStarting(Math.max(1, Math.min(30, Number(e.target.value))))}
                            />
                        </div>
                        <div className="col" style={{ minWidth: 240 }}>
                            <div style={{ marginTop: 34 }}>
                                <span className="badge green">remaining: {remaining}</span>{" "}
                                <span className="badge purple">used: {used}</span>
                            </div>
                        </div>
                    </div>

                    <div className="moonstones">
                        {stones.map((on, idx) => (
                            <span key={idx} className={`stone ${on ? "on" : "off"}`} aria-hidden="true" />
                        ))}
                    </div>

                    <div className="divider" />

                    <div className="h2">Quick log</div>
                    <label>What happened?</label>
                    <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g., work call, shower, walk, meal" />

                    <div className="row">
                        <div className="col" style={{ minWidth: 240 }}>
                            <label>Effect</label>
                            <select value={String(delta)} onChange={(e) => setDelta(Number(e.target.value))}>
                                <option value="-1">drain (-1)</option>
                                <option value="-2">heavy drain (-2)</option>
                                <option value="1">restore (+1)</option>
                                <option value="2">big restore (+2)</option>
                            </select>
                        </div>
                        <div style={{ alignSelf: "flex-end" }}>
                            <button className="btn primary" onClick={addEvent} disabled={!label.trim()}>
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="h2">Recent</div>
                    {events.length === 0 ? (
                        <p className="small">No events yet.</p>
                    ) : (
                        <ul className="event-list">
                            {events.slice(0, 8).map((e) => (
                                <li key={e.id} className="event-row">
                                    <span className={`badge ${e.delta < 0 ? "amber" : "green"}`}>{e.delta < 0 ? `-${Math.abs(e.delta)}` : `+${e.delta}`}</span>
                                    <span>{e.label}</span>
                                    <span className="small">{new Date(e.createdAt).toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="col">
                <div className="card">
                    <div className="h2">Ritual Flows</div>
                    <div className="small">A sequence of steps for hard days. One step is still a win.</div>

                    {flows.map((f) => {
                        const totalMin = f.steps.reduce((a, s) => a + s.minutes, 0);
                        const cost = f.steps.reduce((a, s) => a + (s.spoonCost ?? 0), 0);
                        return (
                            <div key={f.id} className="flow">
                                <div className="flow-head">
                                    <div>
                                        <div className="flow-title">{f.name}</div>
                                        <div className="small">
                                            <span className="badge purple">{totalMin} min</span>{" "}
                                            <span className="badge green">{cost} stones</span>
                                        </div>
                                    </div>
                                    <button className="btn primary" onClick={() => startRun(f.id)} disabled={!!activeRun}>
                                        Run
                                    </button>
                                </div>

                                <ol className="flow-steps">
                                    {f.steps.map((s) => (
                                        <li key={s.id}>
                                            <span className="muted">{s.minutes}m</span> {s.label}{" "}
                                            {typeof s.spoonCost === "number" && <span className="badge green">{s.spoonCost} stone</span>}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        );
                    })}

                    {activeFlow && activeStep && (
                        <div className="run">
                            <div className="run-title">Active Run: {activeFlow.name}</div>
                            <div className="run-step">
                                <span className="badge purple">
                                    step {activeRun!.stepIndex + 1}/{activeFlow.steps.length}
                                </span>{" "}
                                <strong>{activeStep.label}</strong> <span className="muted">({activeStep.minutes} min)</span>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <button className="btn primary" onClick={nextStep}>Next</button>
                                <button className="btn danger" onClick={stopRun}>Stop</button>
                            </div>
                            <div className="small" style={{ marginTop: 8 }}>
                                Later: timers + completion history.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
