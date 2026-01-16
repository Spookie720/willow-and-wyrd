import React from "react";
import { GrimoireIcon, MoonstoneIcon, MothIcon, PotionIcon, VineCorner } from "./Icons";

type TabKey = "home" | "brew" | "journal" | "todo" | "wyrdflow";

export default function Home(props: { onNavigate: (t: TabKey) => void }) {
    return (
        <div className="home">
            <div className="home-corners" aria-hidden="true">
                <VineCorner size={84} className="corner tl" />
                <VineCorner size={84} className="corner tr" flipX />
                <VineCorner size={84} className="corner bl" flipY />
                <VineCorner size={84} className="corner br" flipX flipY />
            </div>

            <header className="home-hero">
                <div className="home-title">Cottage Hearth</div>
                <div className="home-subtitle">
                    Dark, gentle tools for hard days. Small rituals. Clear records. Soft survival.
                </div>

                <div className="home-grid">
                    <HomeCard
                        title="HealingBrew"
                        subtitle="meds + dose logs"
                        onClick={() => props.onNavigate("brew")}
                        icon={<PotionIcon size={26} />}
                        accent="green"
                    />
                    <HomeCard
                        title="Journal Scroll"
                        subtitle="doctor notes + symptoms"
                        onClick={() => props.onNavigate("journal")}
                        icon={<MothIcon size={26} />}
                        accent="violet"
                    />
                    <HomeCard
                        title="Spells.todo"
                        subtitle="ingredient list for momentum"
                        onClick={() => props.onNavigate("todo")}
                        icon={<GrimoireIcon size={26} />}
                        accent="candle"
                    />
                    <HomeCard
                        title="WyrdFlow"
                        subtitle="moonstones (spoons) + rituals"
                        onClick={() => props.onNavigate("wyrdflow")}
                        icon={<MoonstoneIcon size={26} />}
                        accent="moss"
                    />
                </div>

                <div className="home-note">
                    <span className="chip">cottagecore</span>
                    <span className="chip">animated transitions</span>
                    <span className="chip">original SVG assets</span>
                    <span className="chip">TypeScript</span>
                </div>
            </header>
        </div>
    );
}

function HomeCard(props: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    onClick: () => void;
    accent: "green" | "violet" | "candle" | "moss";
}) {
    return (
        <button type="button" className={`home-card a-${props.accent}`} onClick={props.onClick}>
            <div className="home-card-icon" aria-hidden="true">
                {props.icon}
            </div>
            <div className="home-card-title">{props.title}</div>
            <div className="home-card-sub">{props.subtitle}</div>
            <div className="home-card-ink" aria-hidden="true" />
        </button>
    );
}
