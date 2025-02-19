import React from "react";
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
    appId: "terminal", // specify which app to open
    position: { x: 40, y: 40 }
  },
  {
    id: "gallery",
    title: "Gallery",
    icon: "img/icons/folder.svg",
    type: "folder",
    appId: "artwork-gallery",
    position: { x: 40, y: 240 }
  },
  {
    id: "news",
    title: "News",
    icon: "img/icons/folder.svg",
    type: "folder",
    appId: "news",
    position: { x: 40, y: 440 }
  },
  {
    id: "projects",
    title: "Projects",
    icon: "img/icons/folder.svg",
    type: "folder",
    appId: "projects",
    position: { x: 40, y: 640 }
  },
  {
    id: "resume",
    title: "Resume",
    icon: "img/icons/folder.svg",
    type: "pdf",
    appId: "preview",
    link: "img/ui/Rahaf-Abutarbush-Resume.pdf",
    position: { x: 40, y: 840 }
  }
  // Add more files as needed
];

const FileIcons: React.FC<FileIconsProps> = ({ openApp }) => {
  const handleOpen = (file: File) => {
    if (file.appId) {
      if (file.type === 'pdf' && file.link) {
        openApp(file.appId, file.link);
      } else {
        openApp(file.appId);
      }
    }
  };

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
