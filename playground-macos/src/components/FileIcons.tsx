import React from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { useStore } from "~/stores";

interface FileIconsProps {
  openApp: (id: string) => void;
}

interface FileIconItemProps {
  id: string;
  title: string;
  icon: string;
  mouseY: MotionValue<number>;
  openApp: (id: string) => void;
}

const folders = [
  {
    id: "artwork-gallery",
    title: "Documents",
    icon: "/logo/thisfolder.svg"
  },
  {
    id: "downloads",
    title: "Downloads",
    icon: "/logo/thisfolder.svg"
  },
  {
    id: "pictures",
    title: "Pictures",
    icon: "/logo/thisfolder.svg"
  }
];

function FileIconItem({ id, title, icon, mouseY, openApp }: FileIconItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { dockMag } = useStore((state) => ({ dockMag: state.dockMag }));

  const scale = useTransform(mouseY, (value: number) => {
    if (!ref.current) return 1;
    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    return Math.max(1, dockMag - Math.abs(value - centerY) / 50);
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center cursor-pointer w-20"
      onClick={() => openApp(id)}
      style={{ scale }}
    >
      <img
        className="w-16 h-16"
        src={icon}
        alt={title}
        draggable={false}
      />
      <span className="text-white text-sm mt-1 px-2 py-0.5 rounded bg-black/0 hover:bg-black/20">
        {title}
      </span>
    </motion.div>
  );
}

export default function FileIcons({ openApp }: FileIconsProps) {
  const mouseY = useMotionValue(0);

  return (
    <div 
      className="absolute top-6 left-6 flex flex-col gap-6"
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(0)}
    >
      {folders.map((folder) => (
        <FileIconItem
          key={folder.id}
          {...folder}
          mouseY={mouseY}
          openApp={openApp}
        />
      ))}
    </div>
  );
} 