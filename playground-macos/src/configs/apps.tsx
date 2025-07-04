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
import About from "~/components/apps/About";
import Contact from "~/components/apps/Contact";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/launchpad.png"
  },
  {
    id: "about",
    title: "About Me",
    desktop: true,
    width: 1400,
    height: 900,
    img: "img/icons/safari.png",
    content: <About />,
    show: true
  },
  {
    id: "preview",
    title: "My Resume",
    desktop: true,
    width: 1200,
    height: 800,
    img: "img/icons/preview.png",
    content: <Preview />
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
    title: "Events Gallery",
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
    width: 1200,
    height: 800,
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
    width: 1200,
    height: 800,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    img: "img/icons/facetime.png",
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    width: 1200,
    height: 800,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
    link: "https://github.com/Renovamen/playground-macos"
  },
  {
    id: "contact",
    title: "Contact Me",
    desktop: true,
    width: 600,
    height: 500,
    img: "img/icons/mail.png",
    content: <Contact />
  }
];

export default apps;
