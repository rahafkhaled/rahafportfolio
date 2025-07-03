import React from "react";

interface WindowTemplateProps {
  children: React.ReactNode;
}

function WindowTemplate({ children }: WindowTemplateProps) {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: "url('/img/windowbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="flex flex-col h-full p-6 overflow-y-auto">{children}
        <footer className="w-full text-center py-4 text-purple-300 text-sm opacity-70">
          &copy; {new Date().getFullYear()} Rahaf Abutarbush. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default WindowTemplate;
