import React, { useState } from "react";
import Journal from "./components/Journal";
import HealingBrews from "./components/HealingBrews";
import SpellsTodo from "./components/SpellsTodo";
import WyrdFlow from "./components/WyrdFlow";
import "./styles.css";

function App() {
  const [activeTab, setActiveTab] = useState("journal");

  return (
    <div className="ww-app">
      <div className="ww-card">
        <header className="ww-header">
          <div className="ww-title">
            <span role="img" aria-label="leaf">
              🌿
            </span>{" "}
            WILLOW & WYRD{" "}
            <span role="img" aria-label="moon">
              🌙
            </span>
          </div>
          <div className="ww-subtitle">a Wispmire project</div>
          <div className="ww-tagline">where healing meets the strange</div>
        </header>

        <nav className="ww-tabs">
          <button
            className={
              activeTab === "journal" ? "ww-tab ww-tab--active" : "ww-tab"
            }
            onClick={() => setActiveTab("journal")}
          >
            📖 Grimoire
          </button>
          <button
            className={
              activeTab === "meds" ? "ww-tab ww-tab--active" : "ww-tab"
            }
            onClick={() => setActiveTab("meds")}
          >
            🧪 Healing Brews
          </button>
          <button
            className={
              activeTab === "todos" ? "ww-tab ww-tab--active" : "ww-tab"
            }
            onClick={() => setActiveTab("todos")}
          >
            ✨ Spells to Cast
          </button>
          <button
            className={
              activeTab === "wyrd" ? "ww-tab ww-tab--active" : "ww-tab"
            }
            onClick={() => setActiveTab("wyrd")}
          >
            🌕 Wyrd Flow
          </button>
        </nav>

        <main className="ww-main">
          {activeTab === "journal" && <Journal />}
          {activeTab === "meds" && <HealingBrews />}
          {activeTab === "todos" && <SpellsTodo />}
          {activeTab === "wyrd" && <WyrdFlow />}
        </main>
      </div>
    </div>
  );
}

export default App;
