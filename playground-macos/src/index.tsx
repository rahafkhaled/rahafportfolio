import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Desktop from "~/pages/Desktop";
import Boot from "~/pages/Boot";
import Card from "~/pages/Card";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "katex/dist/katex.min.css";
import "~/styles/index.css";

function isCardRoute(): boolean {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/card" || path === "/nfc";
}

export default function App() {
  if (isCardRoute()) {
    return <Card />;
  }

  const [booting, setBooting] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [sleep, setSleep] = useState<boolean>(false);

  const shutMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setBooting(true);
  };

  const restartMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setBooting(true);
  };

  const sleepMac = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setBooting(true);
  };

  if (booting) {
    return <Boot restart={restart} sleep={sleep} setBooting={setBooting} />;
  } else {
    return (
      <div className="h-full min-h-[100dvh] w-full">
        <Desktop
          setLogin={() => {}} // Dummy function since login is removed
          shutMac={shutMac}
          sleepMac={sleepMac}
          restartMac={restartMac}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
