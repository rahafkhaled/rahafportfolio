import React, { useState, useEffect, useRef } from "react";
import { apps, wallpapers } from "~/configs";
import { minMarginY, MOBILE_BREAKPOINT } from "~/utils";
import { useWindowSize } from "~/hooks";
import type { MacActions } from "~/types";
import { useStore } from "~/stores";
import TopBar from "~/components/menus/TopBar";
import AppWindow from "~/components/AppWindow";
import Spotlight from "~/components/Spotlight";
import Launchpad from "~/components/Launchpad";
import Dock from "~/components/dock/Dock";
import FileIcons from "~/components/FileIcons";
import About from "~/components/apps/About";
import Preview from "~/components/apps/Preview";
import AppleNotification from "~/components/AppleNotification";

interface DesktopState {
  showApps: {
    [key: string]: boolean;
  };
  appsZ: {
    [key: string]: number;
  };
  maxApps: {
    [key: string]: boolean;
  };
  minApps: {
    [key: string]: boolean;
  };
  maxZ: number;
  showLaunchpad: boolean;
  currentTitle: string;
  hideDockAndTopbar: boolean;
  spotlight: boolean;
  previewURL?: string;
}

export default function Desktop(props: MacActions) {
  const [state, setState] = useState({
    showApps: {},
    appsZ: {},
    maxApps: {},
    minApps: {},
    maxZ: 2,
    showLaunchpad: false,
    currentTitle: "Finder",
    hideDockAndTopbar: false,
    spotlight: false,
    previewURL: ""
  } as Omit<DesktopState, "showNotif">);

  const { winWidth } = useWindowSize();
  const isPhone = winWidth <= MOBILE_BREAKPOINT;
  const didBootOpenAbout = useRef(false);
  // Notifications array for stacking
  const [notifications, setNotifications] = useState<
    {
      id: string;
      type: string;
      title: string;
      message: string;
      icon: string;
      onClick: () => void;
    }[]
  >([]);
  // Helper to remove notification by id
  const closeNotification = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const [spotlightBtnRef, setSpotlightBtnRef] =
    useState<React.RefObject<HTMLDivElement> | null>(null);

  const { dark, brightness } = useStore((state) => ({
    dark: state.dark,
    brightness: state.brightness
  }));

  const getAppsData = (): void => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: !!app.show
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2
      };
      maxApps = {
        ...maxApps,
        [app.id]: false
      };
      minApps = {
        ...minApps,
        [app.id]: false
      };
    });

    setState({ ...state, showApps, appsZ, maxApps, minApps });
  };

  useEffect(() => {
    getAppsData();
  }, []);

  // Auto-open About on launch (desktop only; phone uses a single-page shell, no app windows)
  useEffect(() => {
    if (isPhone) return;
    if (Object.keys(state.showApps).length === 0 || state.currentTitle !== "Finder") return;
    if (didBootOpenAbout.current) return;
    didBootOpenAbout.current = true;
    openApp("about");
  }, [state.showApps, state.currentTitle, isPhone]);

  const toggleLaunchpad = (target: boolean): void => {
    const r = document.querySelector("#launchpad") as HTMLElement | null;
    // Opening: Launchpad isn't mounted yet; #launchpad doesn't exist until after setState.
    if (r) {
      if (target) {
        r.style.transform = "scale(1)";
        r.style.transition = "ease-in 0.2s";
      } else {
        r.style.transform = "scale(1.1)";
        r.style.transition = "ease-out 0.2s";
      }
    }
    setState({ ...state, showLaunchpad: target });
  };

  const toggleSpotlight = (): void => {
    setState({ ...state, spotlight: !state.spotlight });
  };

  const setWindowPosition = (id: string): void => {
    const r = document.querySelector(`#window-${id}`) as HTMLElement;
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      // "+ window.innerWidth" because of the boundary for windows
      (window.innerWidth + rect.x).toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      // "- minMarginY" because of the boundary for windows
      (rect.y - minMarginY).toFixed(1).toString() + "px"
    );
  };

  const setAppMax = (id: string, target?: boolean): void => {
    setState((prev) => {
      const nextTarget = target === undefined ? !prev.maxApps[id] : target;
      return {
        ...prev,
        maxApps: { ...prev.maxApps, [id]: nextTarget },
        hideDockAndTopbar: nextTarget
      };
    });
  };

  const setAppMin = (id: string, target?: boolean): void => {
    setState((prev) => {
      const nextTarget = target === undefined ? !prev.minApps[id] : target;
      return {
        ...prev,
        minApps: { ...prev.minApps, [id]: nextTarget }
      };
    });
  };

  const minimizeApp = (id: string): void => {
    setWindowPosition(id);

    // get the corrosponding dock icon's position
    let r = document.querySelector(`#dock-${id}`) as HTMLElement;
    const dockAppRect = r.getBoundingClientRect();

    r = document.querySelector(`#window-${id}`) as HTMLElement;
    // const appRect = r.getBoundingClientRect();
    const posY = window.innerHeight - r.offsetHeight / 2 - minMarginY;
    // "+ window.innerWidth" because of the boundary for windows
    const posX = window.innerWidth + dockAppRect.x - r.offsetWidth / 2 + 25;

    // translate the window to that position
    r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`;
    r.style.transition = "ease-out 0.3s";

    // add it to the minimized app list
    setAppMin(id, true);
  };

  const closeApp = (id: string): void => {
    setState((prev) => ({
      ...prev,
      maxApps: { ...prev.maxApps, [id]: false },
      showApps: { ...prev.showApps, [id]: false },
      hideDockAndTopbar: false
    }));
  };

  const openApp = (id: string, url?: string): void => {
    const showApps = { ...state.showApps };
    showApps[id] = true;
    const appsZ = { ...state.appsZ };
    const maxZ = state.maxZ + 1;
    appsZ[id] = maxZ;

    const currentApp = apps.find((app) => {
      return app.id === id;
    });
    if (currentApp === undefined) {
      throw new TypeError(`App ${id} is undefined.`);
    }

    let minApps = { ...state.minApps };
    if (minApps[id]) {
      const r = document.querySelector(`#window-${id}`) as HTMLElement;
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      minApps[id] = false;
    }

    const next: DesktopState = {
      ...state,
      showApps,
      appsZ,
      maxZ,
      minApps,
      currentTitle: currentApp.title,
      ...(id === "preview" && url ? { previewURL: url } : {})
    };

    if (id === "preview" && url) {
      if (isPhone) {
        const maxApps = { ...state.maxApps };
        apps.forEach((a) => {
          maxApps[a.id] = a.id === id;
        });
        setState({ ...next, maxApps, hideDockAndTopbar: true });
      } else {
        setState(next);
      }
      return;
    }

    // Phone: fullscreen the opened app in one setState (avoids stale max state on mobile).
    if (isPhone) {
      const maxApps = { ...state.maxApps };
      apps.forEach((a) => {
        maxApps[a.id] = a.id === id;
      });
      setState({
        ...next,
        maxApps,
        hideDockAndTopbar: true
      });
    } else {
      setState(next);
    }
  };

  const renderAppWindows = () => {
    if (isPhone) return null;
    return apps.map((app) => {
      if (app.desktop && state.showApps[app.id]) {
        if (isPhone && app.id === "about") {
          return <div key={`desktop-app-${app.id}`} />;
        }
        const props = {
          id: app.id,
          title: app.title,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          aspectRatio: app.aspectRatio,
          x: app.x,
          y: app.y,
          z: state.appsZ[app.id],
          max: state.maxApps[app.id],
          min: state.minApps[app.id],
          close: closeApp,
          setMax: setAppMax,
          setMin: minimizeApp,
          focus: openApp
        };

        if (app.id === "preview") {
          return (
            <AppWindow key={`desktop-app-${app.id}`} {...props}>
              <Preview url={state.previewURL} />
            </AppWindow>
          );
        }

        if (app.id === "about") {
          return (
            <AppWindow key={`desktop-app-${app.id}`} {...props}>
              {app.content}
            </AppWindow>
          );
        }

        return (
          <AppWindow key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </AppWindow>
        );
      } else {
        return <div key={`desktop-app-${app.id}`} />;
      }
    });
  };

  useEffect(() => {
    // First notification after 2.5s
    const timer1 = setTimeout(() => {
      setNotifications((prev) => {
        if (prev.some((n) => n.type === "welcome")) return prev;
        return [
          ...prev,
          {
            id: "welcome",
            type: "welcome",
            title: "Welcome to my portfolio...",
            message: "Feel free to look around my desktop :)",
            icon: "img/ui/rk-logo.png",
            onClick: () => {}
          }
        ];
      });
    }, 2500);

    // Mobile-specific notification after 5 seconds
    const timerMobile = setTimeout(() => {
      if (isPhone) {
        setNotifications((prev) => {
          if (prev.some((n) => n.type === "mobile")) return prev;
          return [
            ...prev,
            {
              id: "mobile",
              type: "mobile",
              title: "Mobile Experience",
              message: "Check out the desktop version for the full macOS experience!",
              icon: "img/ui/rk-logo.png",
              onClick: () => {}
            }
          ];
        });
      }
    }, 5000);

    // Second notification after 15 seconds
    const timer2 = setTimeout(() => {
      setNotifications((prev) => {
        if (prev.some((n) => n.type === "thought")) return prev;
        return [
          ...prev,
          {
            id: "thought",
            type: "thought",
            title: "Thought Leadership Release",
            message: "Check out my latest report on Emerging Tech in the Middle East!",
            icon: "img/ui/rk-logo.png",
            onClick: () => {
              window.open(
                "https://www.pwc.com/m1/en/publications/2025/docs/emerging-technology-trends-in-the-middle-east-2025.pdf",
                "_blank"
              );
              closeNotification("thought");
            }
          }
        ];
      });
    }, 15000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timerMobile);
      clearTimeout(timer2);
      setNotifications([]); // Clear notifications on unmount
    };
  }, [isPhone]);

  return (
    <div className="relative flex h-full min-h-[100dvh] w-full flex-col overflow-hidden">
      {/* Brightness on a layer that does not wrap interactive UI; filter on a parent breaks clicks/taps in WebKit */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-center bg-cover"
        aria-hidden
        style={{
          backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
          filter: `brightness( ${(brightness as number) * 0.7 + 50}% )`
        }}
      />
      <div className="relative z-10 flex h-full w-full min-h-[100dvh] flex-1 flex-col">
      {/* Desktop menu bar; hidden on phone; portfolio shell is full-viewport below */}
      <TopBar
        title={state.currentTitle}
        setLogin={props.setLogin}
        shutMac={props.shutMac}
        sleepMac={props.sleepMac}
        restartMac={props.restartMac}
        toggleSpotlight={toggleSpotlight}
        hide={state.hideDockAndTopbar}
        setSpotlightBtnRef={setSpotlightBtnRef}
      />
      {/* Phone: full-viewport portfolio; scroll root adds safe-area padding for notch */}
      {isPhone && (
        <div className="fixed inset-x-0 top-0 bottom-0 z-[15] flex flex-col overflow-hidden bg-gray-950">
          <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden">
            <About standaloneMobile />
          </div>
        </div>
      )}
      {/* App windows + desktop icons; not used on phone (single-page portfolio shell) */}
      {!isPhone && (
        <div className="window-bound absolute z-10" style={{ top: minMarginY }}>
          <FileIcons openApp={openApp} />
          {renderAppWindows()}
        </div>
      )}
      {/* Render each notification in its own fixed position, dynamically offset */}
      {!isPhone &&
        notifications
          .sort((a, b) => {
            // Welcome always first, then thought
            if (a.type === "welcome") return -1;
            if (b.type === "welcome") return 1;
            return 0;
          })
          .map((notif, idx) => (
            <div
              key={notif.id}
              style={{ top: 40 + idx * 95, right: 24, zIndex: 50, position: "fixed" }}
            >
              <AppleNotification
                show={true}
                onClose={() => closeNotification(notif.id)}
                onClick={notif.onClick}
                title={notif.title}
                message={notif.message}
                icon={notif.icon}
              />
            </div>
          ))}

      {/* Spotlight / Launchpad: desktop only (phone is one page, no app switching) */}
      {state.spotlight && !isPhone && (
        <Spotlight
          openApp={openApp}
          toggleLaunchpad={toggleLaunchpad}
          toggleSpotlight={toggleSpotlight}
          btnRef={spotlightBtnRef as React.RefObject<HTMLDivElement>}
        />
      )}
      {state.showLaunchpad && !isPhone && <Launchpad toggleLaunchpad={toggleLaunchpad} />}
      {/* Dock 
      <Dock
        open={openApp}
        showApps={state.showApps}
        showLaunchpad={state.showLaunchpad}
        toggleLaunchpad={toggleLaunchpad}
        hide={state.hideDockAndTopbar}
      />
      */}
      </div>
    </div>
  );
}
