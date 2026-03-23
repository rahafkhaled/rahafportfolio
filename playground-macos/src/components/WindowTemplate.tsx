import React from "react";
import { useWindowSize } from "~/hooks";
import { MOBILE_BREAKPOINT } from "~/utils";

interface WindowTemplateProps {
  children: React.ReactNode;
}

function WindowTemplate({ children }: WindowTemplateProps) {
  const { winWidth } = useWindowSize();
  const isMobile = winWidth <= MOBILE_BREAKPOINT;

  return (
    <div
      className="flex min-h-0 min-w-0 w-full flex-1 flex-col"
      style={{
        backgroundImage: "url('/img/windowbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden touch-pan-y custom-scrollbar ${
          isMobile
            ? "px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
            : "p-3"
        }`}
      >
        {children}
        <footer
          className={`w-full shrink-0 text-center text-purple-300 opacity-70 ${
            isMobile ? "mt-4 pb-1 pt-2 text-xs" : "pt-3 text-sm"
          }`}
        >
          &copy; {new Date().getFullYear()} Rahaf Abutarbush. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default WindowTemplate;
