import React from "react";
import apps from "~/configs/apps";
import { useWindowSize } from "~/hooks";
import { MOBILE_BREAKPOINT, openPublicAssetInNewTab } from "~/utils";
import FileIcon from "./FileIcon";

interface File {
  id: string;
  title: string;
  icon: string;
  type: string;
  appId?: string; // app to open when double clicked
  position?: {
    x: number;
    y: number;
  };
  link?: string; // Optional link to the PDF
}

interface FileIconsProps {
  openApp: (id: string, url?: string) => void;
}

const files: File[] = [
  {
    id: "about",
    title: "About Me",
    icon: "img/icons/folder.svg",
    type: "text",
    appId: "about", // changed from terminal to about
    position: { x: 20, y: 40 }
  },
  {
    id: "Events Gallery",
    title: "Events Gallery",
    icon: "img/icons/folder.svg",
    type: "folder",
    appId: "artwork-gallery",
    position: { x: 20, y: 340 }
  },
  {
    id: "news",
    title: "News",
    icon: "img/icons/folder.svg",
    type: "folder",
    appId: "news",
    position: { x: 20, y: 200 }
  },
  {
    id: "resume",
    title: "Resume",
    icon: "img/icons/resume1.png",
    type: "pdf",
    appId: "preview",
    link: "/img/ui/Rahaf-Abutarbush-Resume.pdf",
    position: { x: 20, y: 540 }
  }
  // Add more files as needed
];

const FileIcons: React.FC<FileIconsProps> = ({ openApp }) => {
  const { winWidth } = useWindowSize();
  const isMobile = winWidth <= MOBILE_BREAKPOINT;

  const handleOpen = (file: File) => {
    if (!file.appId) return;
    if (file.type === "pdf" && file.link) {
      openPublicAssetInNewTab(file.link);
      return;
    }
    openApp(file.appId);
  };

  /* Phone home is the About page (see Desktop); no icon grid. */
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "auto" }}>
      {files.map((file) => (
        <FileIcon
          key={file.id}
          id={file.id}
          title={file.title}
          icon={file.icon}
          x={file.position?.x}
          y={file.position?.y}
          onOpen={() => handleOpen(file)}
        />
      ))}
    </div>
  );
};

export default FileIcons;
