import React from "react";
import type { ReactNode } from 'react';

export interface AppsData {
  id: string;
  title: string;
  desktop: boolean;
  width?: number;
  height?: number;
  show?: boolean;
  x?: number;
  y?: number;
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: number;
  img: string;
  link?: string;
  content?: ReactNode;
}

export interface FileData {
  id: string;
  title: string;
  icon: string;
  x?: number;
  y?: number;
  onOpen?: () => void;
}

export {
  BearMdData,
  BearData,
  LaunchpadData,
  MusicData,
  TerminalData,
  UserData,
  WallpaperData,
  WebsitesData,
  SiteSectionData,
  SiteData
} from "./configs";
