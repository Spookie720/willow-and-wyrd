import React from "react";

type Mood = "welcome" | "brew" | "scroll" | "grimoire" | "moonstone";

export default function MascotFlame(props: { mood: Mood; hint: string }) {
    const label =
        props.mood === "brew"
            ? "Brewling"
            : props.mood === "scroll"
                ? "Inkflame"
                : props.mood === "grimoire"
                    ? "PageSpark"
                    : props.mood === "moonstone"
                        ? "Glowwick"
                        : "Hearthflame";

    return (
        <aside className={`flame-wrap mood-${props.mood}`} aria-label="Mascot helper">
            <div className="flame-bubble">
                <div className="flame-name">{label}</div>
                <div className="flame-hint">{props.hint}</div>
            </div>

            <div className="flame" aria-hidden="true">
                <div className="flame-core" />
                <div className="flame-eye left" />
                <div className="flame-eye right" />
                <div className="flame-mouth" />
                <div className="flame-spark s1" />
                <div className="flame-spark s2" />
            </div>
        </aside>
    );
}

/* CSS lives in feature components? We'll place in App.css via global class names below */
