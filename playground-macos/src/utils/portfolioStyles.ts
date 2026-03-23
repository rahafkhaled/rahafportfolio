import type { CSSProperties } from "react";

/** Shared purple glow for section titles across About, News, Gallery, etc. */
export const PORTFOLIO_HEADING_SHADOW =
  "0 0 6px rgba(180, 140, 255, 0.3), 0 0 12px rgba(180, 140, 255, 0.25), 0 0 24px rgba(180, 140, 255, 0.2)";

export const portfolioSectionHeadingStyle: CSSProperties = {
  color: "#f4f0ff",
  textShadow: PORTFOLIO_HEADING_SHADOW,
  letterSpacing: "-0.01em",
  fontWeight: 400
};

/** Section h2s: primary page hierarchy — larger than in-card titles. */
export const portfolioSectionHeadingClassName =
  "mb-2 text-center font-normal tracking-tight text-[clamp(1.45rem,4.8vw,2.05rem)] md:mb-4 md:text-[clamp(1.65rem,4vw,2.45rem)]";

/** Semibold modest scale (swapped with `portfolioDisplayCardTitleClassName` on About expertise). */
export const portfolioCompactSectionHeadingClassName =
  "mb-2 text-center text-base font-semibold leading-tight sm:text-lg md:text-xl md:mb-4";

export const portfolioCompactSectionHeadingStyle: CSSProperties = {
  color: "#f4f0ff",
  textShadow: PORTFOLIO_HEADING_SHADOW
};

/** Large clamp title for card headers when using section-heading typography. */
export const portfolioDisplayCardTitleClassName =
  "mb-2 flex flex-col items-center text-center font-normal tracking-tight text-[clamp(1.45rem,4.8vw,2.05rem)] md:text-[clamp(1.65rem,4vw,2.45rem)] leading-tight";

/** Primary body copy (matches Latest Release report blurb on About). */
export const portfolioBodyTextClassName =
  "text-xs leading-snug text-purple-100 sm:text-sm md:text-lg md:leading-relaxed";

/** Inline emphasis inside `portfolioBodyTextClassName` blocks. */
export const portfolioBodyEmphasisClassName = "font-semibold text-purple-200";

export const portfolioSectionSubtextClassName =
  "mx-auto max-w-2xl px-2 text-center text-xs leading-snug text-purple-100 sm:text-sm md:px-4 md:text-lg md:leading-relaxed";

/** Primary actions: Send, Download, etc. */
export const portfolioPillButtonClassName =
  "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-purple-400/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-purple-100 shadow-md backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400/50 disabled:opacity-60 sm:min-h-[48px] sm:w-auto sm:px-6 sm:py-3 sm:text-base sm:shadow-lg";

/** Compact controls (carousel prev/next). Light icon color for dark portfolio backgrounds. */
export const portfolioControlButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-purple-400/40 bg-white/15 text-purple-100 shadow-lg backdrop-blur-sm transition hover:bg-white/25 hover:text-white";
