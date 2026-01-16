import React from "react";
import { FlameSprite } from "./Icons";

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
        <aside className={`mascot mood-${props.mood}`} aria-label="Flame familiar helper">
            <div className="mascot-bubble">
                <div className="mascot-name">{label}</div>
                <div className="mascot-hint">{props.hint}</div>
            </div>

            <div className="mascot-flame" aria-hidden="true">
                <FlameSprite mood={props.mood} size={52} />
            </div>
        </aside>
    );
}
