import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rnd } from "react-rnd";
import { useStore } from "~/stores";
import { useWindowSize } from "~/hooks";
import { minMarginX, minMarginY } from "~/utils";

interface FileIconProps {
  id: string;
  title: string;
  icon: string;
  x?: number;
  y?: number;
  onOpen: () => void;
}

interface IconState {
  x: number;
  y: number;
}

const FileIcon: React.FC<FileIconProps> = ({ id, title, icon, x = 0, y = 0, onOpen }) => {
  const { winWidth, winHeight } = useWindowSize();
  const dockSize = useStore((state) => state.dockSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [state, setState] = useState<IconState>({
    x: x,
    y: y
  });

  useEffect(() => {
    setState({ x, y });
  }, [x, y]);

  const getIconSrc = () => {
    if (isHovered) {
      if (id === "resume") {
        return icon.replace("resume1.png", "resume2.png");
      }
      return icon.replace("folder.svg", "openfolder.svg");
    }
    return icon;
  };

  return (
    <Rnd
      default={{
        x: state.x,
        y: state.y,
        width: 100,
        height: 170
      }}
      position={{
        x: Math.min(winWidth - minMarginX, Math.max(minMarginX, state.x)),
        y: Math.min(
          winHeight - minMarginY - (dockSize + 15 + minMarginY),
          Math.max(0, state.y)
        )
      }}
      onDragStart={() => setIsDragging(true)}
      onDragStop={(e, d) => {
        setIsDragging(false);
        setState({ x: d.x, y: d.y });
      }}
      enableResizing={false}
      bounds="parent"
      dragGrid={[1, 1]}
      dragAxis="both"
      enableUserSelectHack={false}
      dragMomentum={false}
      dragElastic={0}
      className="select-none"
      style={{ willChange: "transform" }}
    >
      <div
        className={`flex flex-col items-center w-full h-full p-1 rounded-lg 
          ${!isDragging ? "hover:bg-white/10" : "bg-white/10"} 
          transition-colors duration-200 ease-out cursor-move`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (!isDragging) onOpen();
        }}
      >
        <img
          src={getIconSrc()}
          alt={title}
          className="w-24 h-28 mb-3 transition-transform duration-200"
          draggable={false}
          style={{
            transform: isDragging ? "rotate(5deg)" : "rotate(0deg)",
            scale: isHovered ? 1.1 : 1
          }}
        />
        <span className="text-white text-lg text-center line-clamp-2 px-2 pointer-events-none">
          {title}
        </span>
      </div>
    </Rnd>
  );
};

export default FileIcon;
