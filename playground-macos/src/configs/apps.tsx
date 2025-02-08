import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, LegacyRef } from "react";
import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types/index";
import Bear from "~/components/apps/Bear";
import Typora from "~/components/apps/Typora";
import Safari from "~/components/apps/Safari";
import VSCode from "~/components/apps/VSCode";
import FaceTime from "~/components/apps/FaceTime";
import Terminal from "~/components/apps/Terminal";
import { useMeasure } from "react-use";
import { animate } from "framer-motion";
import News from "~/components/apps/News";
import WindowTemplate from "~/components/WindowTemplate";

// Add the ArtworkGallery component
function ArtworkGallery() {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const controls = useRef<any>(null);
  const hoverTimeout = useRef<any>(null);

  useEffect(() => {
    if (!width) return;

    const startAnimation = () => {
      const finalPosition = -width / 2;
      controls.current = animate(xTranslation, finalPosition, {
        ease: "linear",
        duration: 50,
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => {
          xTranslation.set(0);
        }
      });
    };

    if (hoveredCard === null) {
      startAnimation();
    } else if (controls.current) {
      controls.current.stop();
    }

    return () => {
      controls.current?.stop();
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, [width, hoveredCard]);

  const handleHoverStart = (idx: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredCard(idx);
  };

  const handleHoverEnd = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredCard(null);
    }, 100);
  };

  const artworks = [
    { id: 1, title: "Artwork 1", description: "Description of artwork 1" },
    { id: 2, title: "Artwork 2", description: "Description of artwork 2" },
    { id: 3, title: "Artwork 3", description: "Description of artwork 3" },
    { id: 4, title: "Artwork 4", description: "Description of artwork 4" },
    { id: 5, title: "Artwork 5", description: "Description of artwork 5" },
    { id: 6, title: "Artwork 6", description: "Description of artwork 6" },
    { id: 7, title: "Artwork 7", description: "Description of artwork 7" },
    { id: 8, title: "Artwork 8", description: "Description of artwork 8" },
    { id: 9, title: "Artwork 9", description: "Description of artwork 9" },
    { id: 10, title: "Artwork 10", description: "Description of artwork 10" },
    { id: 11, title: "Artwork 11", description: "Description of artwork 11" },
    { id: 12, title: "Artwork 12", description: "Description of artwork 12" },
  ];

  return (
    <WindowTemplate>
      <h3 className="text-2xl font-semibold mb-4 text-white">Artwork Gallery</h3>
      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="absolute left-0 flex gap-4 px-[100px]" ref={ref as LegacyRef<HTMLDivElement>}>
            <motion.div 
              className="flex gap-4"
              style={{ x: xTranslation }}
            >
              {[...artworks, ...artworks].map((artwork, idx) => (
                <motion.div
                  key={idx}
                  className="relative flex-shrink-0 group"
                  style={{
                    width: "min(300px, 30vw)",
                    aspectRatio: "3/2",
                    marginRight: "16px",
                    filter: "drop-shadow(0 0 20px rgba(62,184,255,0.3))",
                    zIndex: hoveredCard === idx ? 10 : 1
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    zIndex: 20,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg overflow-hidden
                      before:absolute before:inset-0 
                      before:shadow-[inset_0_0_30px_rgba(62,184,255,0.3)]
                      group-hover:before:shadow-[inset_0_0_50px_rgba(62,184,255,0.5)]
                      before:transition-all before:duration-300"
                    onHoverStart={() => handleHoverStart(idx)}
                    onHoverEnd={handleHoverEnd}
                  >
                    {/* Base Image/Placeholder */}
                    <div className="w-full h-full bg-gray-700/80 backdrop-blur-sm flex items-center justify-center
                      ring-1 ring-blue-500/30 group-hover:ring-blue-500/50">
                      <span className="text-white/90 text-lg font-medium">Image {artwork.id}</span>
                    </div>

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4
                        backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredCard === idx ? 1 : 0,
                        y: hoveredCard === idx ? 0 : 20
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-lg font-semibold mb-2 text-white">
                        {artwork.title}
                      </h4>
                      <p className="text-sm text-gray-200 text-center">
                        {artwork.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
    </WindowTemplate>
  );
}

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/launchpad.png"
  },
  {
    id: "bear",
    title: "Bear",
    desktop: true,
    width: 860,
    height: 500,
    show: true,
    y: -40,
    img: "img/icons/bear.png",
    content: <Bear />
  },
  {
    id: "typora",
    title: "Typora",
    desktop: true,
    width: 600,
    height: 580,
    y: -20,
    img: "img/icons/typora.png",
    content: <Typora />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    x: -20,
    img: "img/icons/safari.png",
    content: <Safari />
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    width: 900,
    height: 600,
    x: 80,
    y: -30,
    img: "img/icons/vscode.png",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
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
    id: "artwork-gallery",
    title: "Artwork Gallery",
    desktop: true,
    width: 900,
    height: 600,
    show: false,
    minWidth: 850,
    minHeight: 500,
    x: 100,
    y: 100,
    img: "img/icons/gallery.png",
    content: <ArtworkGallery />
  },
  {
    id: "news", 
    title: "News",
    desktop: true,
    width: 800,
    height: 600,
    show: false,
    minWidth: 600,
    minHeight: 400,
    x: 120,
    y: 80,
    img: "img/icons/news.png",
    content: <News />
  }
];

export default apps;
