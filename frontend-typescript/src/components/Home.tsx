import React from "react";

type TabKey = "home" | "brew" | "journal" | "todo" | "wyrdflow";

export default function Home(props: { onNavigate: (t: TabKey) => void }) {
    return (
        <div>
            <div className="home-hero">
                <div className="home-title">Cottage Hearth</div>
                <div className="home-subtitle">
                    A soft place to track the hard things. Your magic can be small.
                </div>

                <div className="home-grid">
                    <HomeCard
                        title="HealingBrew"
                        subtitle="meds, HRT, daily check-in"
                        accent="green"
                        onClick={() => props.onNavigate("brew")}
                        icon="🫖"
                    />
                    <HomeCard
                        title="Journal Scroll"
                        subtitle="doctor notes, symptoms, truth"
                        accent="purple"
                        onClick={() => props.onNavigate("journal")}
                        icon="📜"
                    />
                    <HomeCard
                        title="Spells.todo"
                        subtitle="ingredient list for momentum"
                        accent="amber"
                        onClick={() => props.onNavigate("todo")}
                        icon="📖"
                    />
                    <HomeCard
                        title="WyrdFlow"
                        subtitle="moonstones (spoons) + rituals"
                        accent="green"
                        onClick={() => props.onNavigate("wyrdflow")}
                        icon="🌙"
                    />
                </div>

                <div className="home-note">
                    <span className="badge purple">cottage-core UI</span>{" "}
                    <span className="badge green">animations</span>{" "}
                    <span className="badge amber">TypeScript</span>{" "}
                    <span className="badge">ready for API wiring</span>
                </div>
            </div>
        </div>
    );
}

function HomeCard(props: {
    title: string;
    subtitle: string;
    icon: string;
    accent: "green" | "purple" | "amber";
    onClick: () => void;
}) {
    return (
        <button type="button" className={`home-card accent-${props.accent}`} onClick={props.onClick}>
            <div className="home-card-icon" aria-hidden="true">{props.icon}</div>
            <div className="home-card-title">{props.title}</div>
            <div className="home-card-sub">{props.subtitle}</div>
            <div className="home-card-ink" aria-hidden="true" />
        </button>
    );
}
