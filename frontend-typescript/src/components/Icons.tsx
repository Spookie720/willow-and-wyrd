import React from "react";

type IconProps = {
    size?: number;
    className?: string;
    title?: string;
};

export const TestIcon = () => <div>TEST ICON</div>;

export function MothIcon({ size = 28, className, title = "Moth" }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 128 128"
            className={className}
            role="img"
            aria-label={title}
        >
            <defs>
                <linearGradient id="mothWing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="rgba(245,246,248,0.85)" />
                    <stop offset="1" stopColor="rgba(245,246,248,0.15)" />
                </linearGradient>
                <linearGradient id="mothInk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(10,12,18,0.85)" />
                    <stop offset="1" stopColor="rgba(10,12,18,0.25)" />
                </linearGradient>
            </defs>

            {/* left wing */}
            <path
                d="M60 64 C40 46, 18 36, 10 52 C4 64, 14 78, 30 86 C42 92, 52 92, 60 84"
                fill="url(#mothInk)"
                stroke="rgba(231,223,209,0.35)"
                strokeWidth="2"
            />
            <path
                d="M57 66 C44 56, 26 50, 18 58 C14 64, 20 72, 32 78 C42 82, 50 82, 56 76"
                fill="url(#mothWing)"
                opacity="0.7"
            />

            {/* right wing */}
            <path
                d="M68 64 C88 46, 110 36, 118 52 C124 64, 114 78, 98 86 C86 92, 76 92, 68 84"
                fill="url(#mothInk)"
                stroke="rgba(231,223,209,0.35)"
                strokeWidth="2"
            />
            <path
                d="M71 66 C84 56, 102 50, 110 58 C114 64, 108 72, 96 78 C86 82, 78 82, 72 76"
                fill="url(#mothWing)"
                opacity="0.7"
            />

            {/* body */}
            <path
                d="M60 40 C60 32, 68 32, 68 40 C68 44, 66 48, 64 52 C62 48, 60 44, 60 40Z"
                fill="rgba(231,223,209,0.75)"
            />
            <path
                d="M58 52 C56 68, 56 88, 64 104 C72 88, 72 68, 70 52 C68 58, 60 58, 58 52Z"
                fill="rgba(231,223,209,0.22)"
                stroke="rgba(231,223,209,0.28)"
                strokeWidth="2"
            />
            <path
                d="M60 64 H68"
                stroke="rgba(231,223,209,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M60 76 H68"
                stroke="rgba(231,223,209,0.30)"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* antennae */}
            <path
                d="M62 40 C56 34, 48 28, 42 26"
                stroke="rgba(231,223,209,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M66 40 C72 34, 80 28, 86 26"
                stroke="rgba(231,223,209,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* markings */}
            <circle cx="24" cy="62" r="4" fill="rgba(139,92,246,0.35)" />
            <circle cx="104" cy="62" r="4" fill="rgba(46,204,113,0.28)" />
        </svg>
    );
}

export function PotionIcon({ size = 28, className, title = "Potion" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} role="img" aria-label={title}>
            <defs>
                <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(245,246,248,0.18)" />
                    <stop offset="1" stopColor="rgba(245,246,248,0.03)" />
                </linearGradient>
                <linearGradient id="potion" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="rgba(46,204,113,0.55)" />
                    <stop offset="1" stopColor="rgba(139,92,246,0.35)" />
                </linearGradient>
            </defs>

            <path
                d="M52 12h24v16c0 6 8 10 8 20v52c0 10-8 16-20 16H64c-12 0-20-6-20-16V48c0-10 8-14 8-20V12Z"
                fill="url(#glass)"
                stroke="rgba(231,223,209,0.28)"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M46 72c8 10 14 12 18 12s10-2 18-12v28c0 6-5 10-12 10H58c-7 0-12-4-12-10V72Z"
                fill="url(#potion)"
                opacity="0.85"
            />
            <path
                d="M58 12h12"
                stroke="rgba(231,223,209,0.35)"
                strokeWidth="3"
                strokeLinecap="round"
            />
            <circle cx="80" cy="62" r="4" fill="rgba(245,158,11,0.45)" />
            <circle cx="56" cy="58" r="3" fill="rgba(245,158,11,0.30)" />
        </svg>
    );
}

export function GrimoireIcon({ size = 28, className, title = "Grimoire" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} role="img" aria-label={title}>
            <defs>
                <linearGradient id="leather" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="rgba(10,12,18,0.95)" />
                    <stop offset="1" stopColor="rgba(245,246,248,0.06)" />
                </linearGradient>
            </defs>

            <path
                d="M26 22c0-6 4-10 10-10h56c6 0 10 4 10 10v84c0 6-4 10-10 10H36c-6 0-10-4-10-10V22Z"
                fill="url(#leather)"
                stroke="rgba(231,223,209,0.25)"
                strokeWidth="2"
            />
            <path d="M40 20v88" stroke="rgba(231,223,209,0.18)" strokeWidth="3" />
            <path
                d="M70 52c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10Z"
                fill="rgba(245,158,11,0.10)"
                stroke="rgba(245,158,11,0.35)"
                strokeWidth="2"
            />
            <path d="M70 48v28" stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
            <path d="M56 62h28" stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
        </svg>
    );
}

export function MoonstoneIcon({ size = 28, className, title = "Moonstone" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} role="img" aria-label={title}>
            <defs>
                <radialGradient id="stoneOn" cx="40%" cy="30%" r="65%">
                    <stop offset="0" stopColor="rgba(245,246,248,0.18)" />
                    <stop offset="0.55" stopColor="rgba(46,204,113,0.22)" />
                    <stop offset="1" stopColor="rgba(139,92,246,0.12)" />
                </radialGradient>
            </defs>
            <path
                d="M64 18c22 0 38 16 38 38 0 32-24 54-38 54S26 88 26 56c0-22 16-38 38-38Z"
                fill="url(#stoneOn)"
                stroke="rgba(231,223,209,0.25)"
                strokeWidth="2"
            />
            <circle cx="54" cy="46" r="6" fill="rgba(245,246,248,0.16)" />
            <circle cx="80" cy="64" r="4" fill="rgba(245,246,248,0.12)" />
        </svg>
    );
}

export function VineCorner({
    size = 64,
    className,
    flipX = false,
    flipY = false,
}: IconProps & { flipX?: boolean; flipY?: boolean }) {
    const sx = flipX ? -1 : 1;
    const sy = flipY ? -1 : 1;
    const tx = flipX ? -128 : 0;
    const ty = flipY ? -128 : 0;

    return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden="true">
            <g
                transform={`matrix(${sx},0,0,${sy},${tx},${ty})`}
                fill="none"
                stroke="rgba(231,223,209,0.28)"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <path d="M18 110c14-24 26-36 44-44 18-8 32-6 48-20" />
                <path d="M28 104c4-10 10-18 18-22" />
                <path d="M46 82c-6 0-12 2-16 6 6 2 12 2 18-1" />
                <path d="M66 70c-6 0-12 2-16 6 6 2 12 2 18-1" />
                <path d="M86 58c-6 0-12 2-16 6 6 2 12 2 18-1" />
                <path d="M102 44c-6 0-12 2-16 6 6 2 12 2 18-1" />
            </g>
        </svg>
    );
}

type FlameMood = "welcome" | "brew" | "scroll" | "grimoire" | "moonstone";

export function FlameSprite({
    mood,
    size = 52,
    className,
}: {
    mood: FlameMood;
    size?: number;
    className?: string;
}) {
    const face =
        mood === "brew"
            ? { eyes: "happy", mouth: "smile" }
            : mood === "scroll"
                ? { eyes: "soft", mouth: "o" }
                : mood === "grimoire"
                    ? { eyes: "focused", mouth: "line" }
                    : mood === "moonstone"
                        ? { eyes: "dreamy", mouth: "smile" }
                        : { eyes: "soft", mouth: "smile" };

    return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden="true">
            <defs>
                <radialGradient id="flameGlow" cx="50%" cy="35%" r="65%">
                    <stop offset="0" stopColor="rgba(245,158,11,0.95)" />
                    <stop offset="0.55" stopColor="rgba(239,68,68,0.55)" />
                    <stop offset="1" stopColor="rgba(139,92,246,0.18)" />
                </radialGradient>
            </defs>

            <path
                d="M64 10c10 14 18 24 18 36 0 10-4 16-10 22 12 2 22 10 22 24 0 18-14 30-30 30S34 110 34 92c0-14 10-22 22-24-6-6-10-12-10-22 0-12 8-22 18-36Z"
                fill="url(#flameGlow)"
                stroke="rgba(231,223,209,0.20)"
                strokeWidth="2"
            />
            <circle cx="46" cy="96" r="4" fill="rgba(245,158,11,0.35)" />
            <circle cx="86" cy="88" r="3" fill="rgba(245,158,11,0.25)" />

            {face.eyes === "happy" && (
                <>
                    <path d="M52 74c4 4 8 4 12 0" stroke="rgba(10,12,18,0.85)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M64 74c4 4 8 4 12 0" stroke="rgba(10,12,18,0.85)" strokeWidth="4" strokeLinecap="round" />
                </>
            )}
            {face.eyes === "soft" && (
                <>
                    <circle cx="58" cy="74" r="4" fill="rgba(10,12,18,0.85)" />
                    <circle cx="78" cy="74" r="4" fill="rgba(10,12,18,0.85)" />
                </>
            )}
            {face.eyes === "focused" && (
                <>
                    <path d="M54 72h10" stroke="rgba(10,12,18,0.85)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M74 72h10" stroke="rgba(10,12,18,0.85)" strokeWidth="4" strokeLinecap="round" />
                </>
            )}
            {face.eyes === "dreamy" && (
                <>
                    <circle cx="58" cy="74" r="4" fill="rgba(10,12,18,0.85)" />
                    <circle cx="78" cy="74" r="4" fill="rgba(10,12,18,0.85)" />
                    <path d="M70 62l6-6" stroke="rgba(10,12,18,0.55)" strokeWidth="3" strokeLinecap="round" />
                </>
            )}

            {face.mouth === "smile" && (
                <path d="M58 86c8 8 18 8 26 0" stroke="rgba(10,12,18,0.85)" strokeWidth="4" strokeLinecap="round" />
            )}
            {face.mouth === "o" && <circle cx="71" cy="88" r="6" fill="rgba(10,12,18,0.78)" />}
            {face.mouth === "line" && (
                <path d="M60 88h22" stroke="rgba(10,12,18,0.85)" strokeWidth="4" strokeLinecap="round" />
            )}
        </svg>
    );
}
