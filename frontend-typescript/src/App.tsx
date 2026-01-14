import React, { useMemo, useState } from "react";
import HealingBrew from "./components/healingbrew";
import Journal from "./components/journal";
import SpellsTodo from "./components/spellstodo";
import WyrdFlow from "./components/wyrdflow";

type TabKey = "healingbrew" | "journal" | "todo" | "wyrdflow";

export default function App() {
  const [tab, setTab] = useState<TabKey>("healingbrew");

  const title = useMemo(() => {
    switch (tab) {
      case "healingbrew":
        return "HealingBrew";
      case "journal":
        return "Journal";
      case "todo":
        return "Spells.todo";
      case "wyrdflow":
        return "WyrdFlow";
      default:
        return "App";
    }
  }, [tab]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>Willow & Wyrd</h1>
          <p className="subtitle">gentle tools for hard days</p>
        </div>

        <nav className="tabs" aria-label="Primary navigation">
          <TabButton active={tab === "healingbrew"} onClick={() => setTab("healingbrew")}>
            HealingBrew
          </TabButton>
          <TabButton active={tab === "journal"} onClick={() => setTab("journal")}>
            Journal
          </TabButton>
          <TabButton active={tab === "todo"} onClick={() => setTab("todo")}>
            Spells.todo
          </TabButton>
          <TabButton active={tab === "wyrdflow"} onClick={() => setTab("wyrdflow")}>
            WyrdFlow
          </TabButton>
        </nav>
      </header>

      <main className="app-main">
        <div className="panel">
          <h2 className="panel-title">{title}</h2>

          {tab === "healingbrew" && <HealingBrew />}
          {tab === "journal" && <Journal />}
          {tab === "todo" && <SpellsTodo />}
          {tab === "wyrdflow" && <WyrdFlow />}
        </div>
      </main>

      <footer className="app-footer">
        <small>© {new Date().getFullYear()} Willow & Wyrd</small>
      </footer>
    </div>
  );
}

function TabButton(props: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`tab ${props.active ? "active" : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
