declare module "~/components/FileIcon" {
  import React from "react";

  interface FileIconProps {
    title: string;
    icon: string;
    x?: number;
    y?: number;
    onOpen?: () => void;
  }

  const FileIcon: React.FC<FileIconProps>;

  export default FileIcon;
} 