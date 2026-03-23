import React from "react";
import { Rnd } from "react-rnd";
import { minMarginX, minMarginY, appBarHeight, MOBILE_BREAKPOINT } from "~/utils";

const FullIcon = ({ size }: { size: number }) => (
  <svg
    className="icon"
    viewBox="0 0 13 13"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
  >
    <path d="M9.26 12.03L.006 2.73v9.3H9.26zM2.735.012l9.3 9.3v-9.3h-9.3z" />
  </svg>
);

const ExitFullIcon = ({ size }: { size: number }) => (
  <svg
    className="icon"
    viewBox="0 0 19 19"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
  >
    <path d="M18.373 9.23L9.75.606V9.23h8.624zM.6 9.742l8.623 8.624V9.742H.599z" />
  </svg>
);

interface TrafficProps {
  id: string;
  max: boolean;
  aspectRatio?: number;
  setMax: (id: string, target?: boolean) => void;
  setMin: (id: string) => void;
  close: (id: string) => void;
}

interface WindowProps extends TrafficProps {
  title: string;
  min: boolean;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  x?: number;
  y?: number;
  z: number;
  focus: (id: string) => void;
  children: React.ReactNode;
}

interface WindowState {
  width: number;
  height: number;
  x: number;
  y: number;
}

const TrafficLights = ({ id, close, aspectRatio, max, setMax, setMin }: TrafficProps) => {
  const disableMax = aspectRatio !== undefined;

  const closeWindow = (e: React.MouseEvent | React.TouchEvent): void => {
    e.stopPropagation();
    close(id);
  };

  return (
    <div className="traffic-lights flex flex-row absolute left-0 space-x-2 pl-2 mt-1.5">
      <button
        className="window-btn bg-red-500 dark:bg-red-400"
        onClick={closeWindow}
        onTouchEnd={closeWindow}
      >
        <span className="icon i-gg:close text-[9px]" />
      </button>
      <button
        className={`window-btn ${max ? "bg-c-400" : "bg-yellow-500 dark:bg-yellow-400"}`}
        onClick={() => setMin(id)}
        onTouchEnd={() => setMin(id)}
        disabled={max}
      >
        <span className={`icon i-fe:minus text-[10px] ${max ? "invisible" : ""}`} />
      </button>
      <button
        className={`window-btn ${
          disableMax ? "bg-c-400" : "bg-green-500 dark:bg-green-400"
        }`}
        onClick={() => setMax(id)}
        onTouchEnd={() => setMax(id)}
        disabled={disableMax}
      >
        {!disableMax && (max ? <ExitFullIcon size={9} /> : <FullIcon size={6} />)}
      </button>
    </div>
  );
};

const Window = (props: WindowProps) => {
  const dockSize = useStore((state) => state.dockSize);
  const { winWidth, winHeight } = useWindowSize();

  const isPhone = winWidth <= MOBILE_BREAKPOINT;
  /** Narrow screens: one fullscreen app at a time (see Desktop openApp). */
  const isMobileLayout = isPhone && props.max;

  // Calculate responsive dimensions based on screen size
  const getResponsiveDimensions = () => {
    const screenWidth = winWidth;
    const screenHeight = winHeight;

    if (isMobileLayout) {
      return {
        width: screenWidth,
        height: screenHeight
      };
    }

    // Base dimensions that scale with screen size
    let baseWidth = Math.min(screenWidth * 0.8, props.width || 640);
    let baseHeight = Math.min(screenHeight * 0.97, props.height || 400);

    // Ensure minimum sizes
    baseWidth = Math.max(baseWidth, props.minWidth || 200);
    baseHeight = Math.max(baseHeight, props.minHeight || 150);

    // Ensure maximum sizes don't exceed screen bounds
    baseWidth = Math.min(baseWidth, screenWidth - 100);
    baseHeight = Math.min(baseHeight, screenHeight - 150);

    return { width: baseWidth, height: baseHeight };
  };

  const responsiveDimensions = getResponsiveDimensions();
  const initWidth = responsiveDimensions.width;
  const initHeight = responsiveDimensions.height;

  // Calculate responsive positioning
  const getResponsivePosition = () => {
    const screenWidth = winWidth;
    const screenHeight = winHeight;

    if (isMobileLayout) {
      return {
        x: screenWidth, // because of boundary
        y: -minMarginY // because of boundary
      };
    }

    // Center the window with some offset for visual appeal
    const centerX = screenWidth + (screenWidth - initWidth) / 2 + (props.x || 0) + 60; // shift right by 60px
    const centerY =
      (screenHeight - initHeight - dockSize - minMarginY) / 2 + (props.y || 0);

    // Ensure window doesn't go off-screen
    const maxX = screenWidth * 2 - initWidth - minMarginX;
    const maxY = screenHeight - initHeight - dockSize - minMarginY;

    return {
      x: Math.min(maxX, Math.max(winWidth + minMarginX, centerX)),
      y: Math.min(maxY, Math.max(minMarginY, centerY))
    };
  };

  const responsivePosition = getResponsivePosition();

  const [state, setState] = useState<WindowState>({
    width: initWidth,
    height: initHeight,
    x: responsivePosition.x,
    y: responsivePosition.y
  });

  // Update dimensions and position when screen size changes
  useEffect(() => {
    const newDimensions = getResponsiveDimensions();
    const newPosition = getResponsivePosition();

    setState({
      width: Math.min(winWidth, newDimensions.width),
      height: Math.min(winHeight, newDimensions.height),
      x: newPosition.x,
      y: newPosition.y
    });
  }, [winWidth, winHeight, props.max]);

  const round = props.max ? "rounded-none" : "rounded-lg";
  const minimized = props.min
    ? "opacity-0 invisible transition-opacity duration-300"
    : "";
  const border = props.max ? "" : "border border-gray-500/30";
  const width = props.max ? winWidth : state.width;
  const height = props.max ? winHeight : state.height;
  const disableMax = props.aspectRatio !== undefined;

  const children = React.cloneElement(props.children as React.ReactElement, {
    width: width
  });

  return (
    <Rnd
      bounds="parent"
      size={{
        width: width,
        height: height
      }}
      position={{
        x: props.max
          ? winWidth // because of boundary
          : Math.min(
              // "winWidth * 2" because of the boundary for windows
              winWidth * 2 - minMarginX,
              Math.max(
                // "+ winWidth" because we add a boundary for windows
                winWidth - state.width + minMarginX,
                state.x
              )
            ),
        y: props.max
          ? -minMarginY // because of boundary
          : Math.min(
              // "- minMarginY" because of the boundary for windows
              winHeight - minMarginY - (dockSize + 15 + minMarginY),
              Math.max(0, state.y)
            )
      }}
      onDragStop={(e, d) => {
        setState({ ...state, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setState({
          ...state,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...position
        });
      }}
      minWidth={props.minWidth ? props.minWidth : 200}
      minHeight={props.minHeight ? props.minHeight : 150}
      dragHandleClassName="window-bar"
      disableDragging={props.max || isMobileLayout}
      enableResizing={!props.max && !isMobileLayout}
      lockAspectRatio={props.aspectRatio}
      lockAspectRatioExtraHeight={props.aspectRatio ? appBarHeight : undefined}
      style={{
        zIndex: props.z,
        willChange: "transform",
        // react-rnd merges display:inline-block last; that overrides Tailwind `flex` and breaks flex-1 / scroll. Force column flex on the window shell.
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
      onMouseDown={() => props.focus(props.id)}
      className={`flex h-full min-h-0 flex-col overflow-hidden ${round} ${border} shadow-lg shadow-black/50 bg-gray-800/30 backdrop-blur-sm ${minimized}`}
      id={`window-${props.id}`}
      dragGrid={[1, 1]}
      dragAxis="both"
      enableUserSelectHack={false}
      dragMomentum={false}
      dragElastic={0}
    >
      <div
        className="window-bar relative flex min-h-[40px] shrink-0 items-center justify-center py-0.5 text-center text-[13px] text-white md:h-6 md:min-h-0 md:py-0 md:text-sm bg-[#1a1625]/80 dark:bg-[#1a1625]/80 backdrop-blur-lg"
        onDoubleClick={() => !disableMax && props.setMax(props.id)}
      >
        <TrafficLights
          id={props.id}
          max={props.max}
          aspectRatio={props.aspectRatio}
          setMax={props.setMax}
          setMin={props.setMin}
          close={props.close}
        />
        <span className="font-semibold text-white">{props.title}</span>
      </div>
      {/* overflow-hidden: single scroll inside WindowTemplate / app body; avoids nested overflow-y-auto + broken % heights */}
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
      <footer className="hidden shrink-0 py-3 text-center text-sm text-purple-300 opacity-70 md:block md:py-4">
        &copy; {new Date().getFullYear()} Rahaf Abutarbush. All rights reserved.
      </footer>
    </Rnd>
  );
};

export default Window;
