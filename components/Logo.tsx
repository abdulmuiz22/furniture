import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const isDark = variant === "dark";
  const textColor = isDark ? "#ffffff" : "#18181b";
  const subtextColor = isDark ? "#a1a1aa" : "#71717a";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Armchair Insignia Badge matching design */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform hover:scale-105 shadow-2xs"
        style={{
          background: isDark ? "rgba(184, 131, 68, 0.2)" : "#f4ebd9",
          border: isDark ? "1px solid rgba(184, 131, 68, 0.4)" : "1px solid #e5d5be",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b37e44"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized Modern Armchair */}
          <path d="M6 19v2" />
          <path d="M18 19v2" />
          <path d="M4 11a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5Z" />
          <path d="M4 12h2a2 2 0 0 1 2 2v2H4v-4Z" />
          <path d="M20 12h-2a2 2 0 0 0-2 2v2h4v-4Z" />
          <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className="text-base sm:text-[1.063rem] font-bold tracking-[0.14em] uppercase"
          style={{ color: textColor }}
        >
          SASSY
        </span>
        <span
          className="text-[0.563rem] font-semibold tracking-[0.24em] uppercase"
          style={{ color: subtextColor }}
        >
          FURNITURE
        </span>
      </div>
    </div>
  );
}
