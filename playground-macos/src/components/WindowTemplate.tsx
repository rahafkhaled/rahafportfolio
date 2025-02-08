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
      <div className="flex flex-col h-full p-6">{children}</div>
    </div>
  );
}

export default WindowTemplate;
