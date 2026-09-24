import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { nfcCardLinks, nfcCardProfile } from "~/configs/card";
import {
  portfolioBodyTextClassName,
  portfolioPillButtonClassName,
  portfolioSectionHeadingStyle
} from "~/utils/portfolioStyles";
import { openPublicAssetInNewTab } from "~/utils";
import { downloadVCard } from "~/utils/vcard";

function handleLinkClick(link: (typeof nfcCardLinks)[number]) {
  switch (link.kind) {
    case "vcard":
      downloadVCard(nfcCardProfile);
      break;
    case "mailto":
      if (link.href) window.location.href = link.href;
      break;
    case "external":
      if (link.href) window.open(link.href, "_blank", "noopener,noreferrer");
      break;
    case "internal":
      if (!link.href) break;
      if (link.href.endsWith(".pdf")) {
        openPublicAssetInNewTab(link.href);
      } else {
        window.location.href = link.href;
      }
      break;
  }
}

export default function Card() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${nfcCardProfile.name} · Contact`;
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 px-5 py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.7), transparent)," +
            "radial-gradient(1px 1px at 80% 20%, rgba(168,85,247,0.5), transparent)," +
            "radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,0.5), transparent)"
        }}
      />
      <div className="pointer-events-none absolute -left-1/4 top-0 h-72 w-[140%] rounded-full bg-gradient-to-br from-purple-600/30 via-fuchsia-500/10 to-transparent blur-3xl" />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div
              className="absolute inset-[-6px] rounded-full opacity-60 blur-md"
              style={{ boxShadow: "0 0 28px rgba(168, 85, 247, 0.45)" }}
              aria-hidden
            />
          </div>
          <h1
            className="text-balance text-center font-normal leading-[1.12] tracking-[-0.02em] text-[clamp(1.875rem,7vw,3rem)] sm:text-[clamp(2.25rem,8vw,3.5rem)]"
            style={portfolioSectionHeadingStyle}
          >
            {nfcCardProfile.name}
          </h1>
          <p className={`mt-3 max-w-xs text-balance ${portfolioBodyTextClassName}`}>
            {nfcCardProfile.title}
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {nfcCardLinks.map((link, index) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.06 }}
            >
              <button
                type="button"
                onClick={() => handleLinkClick(link)}
                className={
                  portfolioPillButtonClassName +
                  " w-full " +
                  (link.primary
                    ? "border-purple-400/55 bg-white/15 shadow-[0_0_24px_rgba(168,85,247,0.25)]"
                    : "")
                }
              >
                {link.label}
              </button>
            </motion.li>
          ))}
        </ul>


      </motion.main>
    </div>
  );
}
