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

  const [state, setState] = useState<IconState>({
    x: x,
    y: y
  });

  useEffect(() => {
    setState({ x, y });
  }, [x, y]);

  return (
    <Rnd
      default={{
        width: 90,
        height: 110
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
      dragGrid={[10, 10]}
      className="select-none"
    >
      <AnimatePresence>
        <motion.div
          className={`flex flex-col items-center w-full h-full p-1 rounded-lg 
            ${!isDragging ? "hover:bg-white/10" : "bg-white/10"} 
            transition-all duration-200 ease-out cursor-move`}
          initial={{ scale: 1 }}
          animate={{
            scale: isDragging ? 1.05 : 1,
            transition: { duration: 0.2 }
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (!isDragging) onOpen();
          }}
        >
          <motion.img
            src={icon}
            alt={title}
            className="w-14 h-14 mb-1 pointer-events-none"
            draggable={false}
            animate={{ rotate: isDragging ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <span className="text-white text-sm text-center line-clamp-2 px-1 pointer-events-none">
            {title}
          </span>
        </motion.div>
      </AnimatePresence>
    </Rnd>
  );
};

export default FileIcon;
