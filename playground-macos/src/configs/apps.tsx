import React from "react";
import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types/configs/apps";
import ArtworkGallery from "~/components/apps/ArtworkGallery";
import Terminal from "~/components/apps/Terminal";
import VSCode from "~/components/apps/VSCode";
import Safari from "~/components/apps/Safari";
import News from "~/components/apps/News";
import Typora from "~/components/apps/Typora";
import FaceTime from "~/components/apps/FaceTime";
import Projects from "~/components/apps/Projects";
import Preview from "~/components/apps/Preview";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/launchpad.png"
  },
  {
    id: "preview",
    title: "My Resume",
    desktop: true,
    width: 800,
    height: 1000,
    img: "img/icons/preview.png",
    content: <Preview />
  },
  {
    id: "projects",
    title: "Projects",
    desktop: true,
    img: "img/icons/folder.svg",
    content: <Projects />
  },
  {
    id: "news",
    title: "News",
    desktop: true,
    width: 1200,
    height: 800,
    img: "img/icons/news-logo.svg",
    content: <News />
  },
  {
    id: "artwork-gallery",
    title: "Artwork Gallery",
    desktop: true,
    width: 1200,
    height: 800,
    img: "img/icons/folder.svg",
    content: <ArtworkGallery />
  },
  {
    id: "typora",
    title: "Typora",
    desktop: true,
    width: 1000,
    height: 700,
    y: -20,
    img: "img/icons/typora.png",
    content: <Typora />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1200,
    height: 800,
    minWidth: 375,
    minHeight: 200,
    img: "img/icons/safari.png",
    content: <Safari />
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    width: 1200,
    height: 800,
    img: "img/icons/vscode.png",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 900,
    height: 700,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    x: -80,
    y: 20,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
    link: "https://github.com/Renovamen/playground-macos"
  }
];

export default apps;
