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
}

interface FileIconsProps {
  openApp: (id: string) => void;
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
    id: "projects",
    title: "Projects",
    icon: "img/icons/folder.svg",
    type: "folder",
    appId: "vscode", // will open VSCode
    position: { x: 40, y: 160 }
  },
  {
    id: "resume",
    title: "Resume",
    icon: "img/icons/folder.svg",
    type: "pdf",
    appId: "safari", // will open in Safari
    position: { x: 40, y: 280 }
  }
  // Add more files as needed
];

const FileIcons: React.FC<FileIconsProps> = ({ openApp }) => {
  const handleOpen = (file: File) => {
    if (file.appId) {
      openApp(file.appId);
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
