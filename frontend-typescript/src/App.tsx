import React, { useMemo, useState } from "react";
import Home from "./components/Home";
import HealingBrew from "./components/HealingBrews";
import Journal from "./components/Journal";
import SpellsTodo from "./components/SpellsTodo";
import WyrdFlow from "./components/WyrdFlow";
import MascotFlame from "./components/MascotFlame";

type TabKey = "home" | "brew" | "journal" | "todo" | "wyrdflow";

export default function App() {
  const [tab, setTab] = useState<TabKey>("home");
  const title = useMemo(() => {
    switch (tab) {
      case "home":
        return "Cottage Hearth";
      case "brew":
        return "HealingBrew";
      case "journal":
        return "Journal Scroll";
      case "todo":
        return "Spells.todo";
      case "wyrdflow":
        return "WyrdFlow + Spoons";
      default:
        return "Willow & Wyrd";
    }
  }, [tab]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="sigil" aria-hidden="true" />
          <div>
            <div className="brand-title">Willow &amp; Wyrd</div>
            <div className="brand-subtitle">dark cottage tools for soft survival</div>
          </div>
        </div>

        <nav className="nav">
          <NavButton active={tab === "home"} onClick={() => setTab("home")}>Home</NavButton>
          <NavButton active={tab === "brew"} onClick={() => setTab("brew")}>HealingBrew</NavButton>
          <NavButton active={tab === "journal"} onClick={() => setTab("journal")}>Journal</NavButton>
          <NavButton active={tab === "todo"} onClick={() => setTab("todo")}>Spells.todo</NavButton>
          <NavButton active={tab === "wyrdflow"} onClick={() => setTab("wyrdflow")}>WyrdFlow</NavButton>
        </nav>

        <div className="topbar-right">
          <div className="page-title">{title}</div>
        </div>
      </header>

      <main className="stage">
        <div className="glow-orb orb-1" aria-hidden="true" />
        <div className="glow-orb orb-2" aria-hidden="true" />

        <section className="panel">
          {tab === "home" && <Home onNavigate={setTab} />}
          {tab === "brew" && <HealingBrew />}
          {tab === "journal" && <Journal />}
          {tab === "todo" && <SpellsTodo />}
          {tab === "wyrdflow" && <WyrdFlow />}
        </section>

        <MascotFlame
          mood={tab === "home" ? "welcome" : tab === "brew" ? "brew" : tab === "journal" ? "scroll" : tab === "todo" ? "grimoire" : "moonstone"}
          hint={
            tab === "brew"
              ? "Add a dose — watch the cauldron fill."
              : tab === "journal"
                ? "Unroll the scroll. Say one true thing."
                : tab === "todo"
                  ? "Write a spell. Finish one small ingredient."
                  : tab === "wyrdflow"
                    ? "Count your moonstones. Spend them gently."
                    : "You made it. That counts."
          }
        />
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Willow &amp; Wyrd</span>
        <span className="dot" />
        <span className="muted">Local-only demo UI (ready to wire to API)</span>
      </footer>
    </div>
  );
}

function NavButton(props: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={`nav-btn ${props.active ? "active" : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
