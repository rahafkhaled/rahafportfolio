import React, { useState, useEffect } from "react";
import { apps, wallpapers } from "~/configs";
import { minMarginY } from "~/utils";
import type { MacActions } from "~/types";
import { useStore } from "~/stores";
import TopBar from "~/components/menus/TopBar";
import AppWindow from "~/components/AppWindow";
import Spotlight from "~/components/Spotlight";
import Launchpad from "~/components/Launchpad";
import Dock from "~/components/dock/Dock";
import FileIcons from "~/components/FileIcons";
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

  // Check if screen is phone-sized (mobile)
  const isPhone = window.innerWidth <= 768;

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

  // Auto-open About Me on launch
  useEffect(() => {
    // Only run once on initial render when apps are loaded
    if (Object.keys(state.showApps).length > 0 && state.currentTitle === "Finder") {
      if (isPhone) {
        // On phone, only show About Me
        openApp("about");
        // Close all other apps
        apps.forEach((app) => {
          if (app.id !== "about") {
            closeApp(app.id);
          }
        });
      } else {
        openApp("about");
      }
    }
  }, [state.showApps, isPhone]);

  const toggleLaunchpad = (target: boolean): void => {
    const r = document.querySelector(`#launchpad`) as HTMLElement;
    if (target) {
      r.style.transform = "scale(1)";
      r.style.transition = "ease-in 0.2s";
    } else {
      r.style.transform = "scale(1.1)";
      r.style.transition = "ease-out 0.2s";
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
    const maxApps = state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    setState({
      ...state,
      maxApps: maxApps,
      hideDockAndTopbar: target
    });
  };

  const setAppMin = (id: string, target?: boolean): void => {
    const minApps = state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    setState({
      ...state,
      minApps: minApps
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
    setAppMax(id, false);
    const showApps = state.showApps;
    showApps[id] = false;
    setState({
      ...state,
      showApps: showApps,
      hideDockAndTopbar: false
    });
  };

  const openApp = (id: string, url?: string): void => {
    const showApps = state.showApps;
    showApps[id] = true;
    const appsZ = state.appsZ;
    const maxZ = state.maxZ + 1;
    appsZ[id] = maxZ;

    const currentApp = apps.find((app) => {
      return app.id === id;
    });
    if (currentApp === undefined) {
      throw new TypeError(`App ${id} is undefined.`);
    }

    // If it's Preview and we have a URL, set it in the state
    if (id === "preview" && url) {
      setState({
        ...state,
        showApps,
        appsZ,
        maxZ,
        currentTitle: currentApp.title,
        previewURL: url
      });
      return;
    }

    setState({
      ...state,
      showApps,
      appsZ,
      maxZ,
      currentTitle: currentApp.title
    });

    // On phone, automatically maximize the About Me app
    if (isPhone && id === "about") {
      setAppMax(id, true);
    }

    const minApps = state.minApps;
    if (minApps[id]) {
      const r = document.querySelector(`#window-${id}`) as HTMLElement;
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      minApps[id] = false;
      setState({ ...state, minApps });
    }
  };

  const renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && state.showApps[app.id]) {
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

        // If it's Preview, pass the URL from the state
        if (app.id === "preview") {
          return (
            <AppWindow key={`desktop-app-${app.id}`} {...props}>
              <Preview url={state.previewURL} />
            </AppWindow>
          );
        }

        // If it's About, pass the openApp function
        if (app.id === "about") {
          return (
            <AppWindow key={`desktop-app-${app.id}`} {...props}>
              {React.cloneElement(app.content as React.ReactElement, { openApp })}
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

  const openResume = () => {
    openApp("preview", "img/ui/Rahaf-Abutarbush-Resume.pdf");
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
    <div
      className="size-full overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        filter: `brightness( ${(brightness as number) * 0.7 + 50}% )`
      }}
    >
      {/* Top Menu Bar */}
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
      {/* App Windows Layer */}
      <div className="window-bound absolute z-10" style={{ top: minMarginY }}>
        {renderAppWindows()}
        <FileIcons openApp={openApp} />
      </div>
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

      {/* Spotlight */}
      {state.spotlight && (
        <Spotlight
          openApp={openApp}
          toggleLaunchpad={toggleLaunchpad}
          toggleSpotlight={toggleSpotlight}
          btnRef={spotlightBtnRef as React.RefObject<HTMLDivElement>}
        />
      )}
      {/* Launchpad */}
      <Launchpad show={state.showLaunchpad} toggleLaunchpad={toggleLaunchpad} />
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
  );
}
