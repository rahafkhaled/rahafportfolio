import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, LegacyRef } from "react";
import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types/index";

import { useMeasure } from "react-use";
import { animate } from "framer-motion";
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
    { id: 12, title: "Artwork 12", description: "Description of artwork 12" }
  ];

  return (
    <WindowTemplate>
      <h3 className="text-2xl font-semibold mb-4 text-white">Artwork Gallery</h3>
      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div
            className="absolute left-0 flex gap-4 px-[100px]"
            ref={ref as LegacyRef<HTMLDivElement>}
          >
            <motion.div className="flex gap-4" style={{ x: xTranslation }}>
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
                    <div
                      className="w-full h-full bg-gray-700/80 backdrop-blur-sm flex items-center justify-center
                      ring-1 ring-blue-500/30 group-hover:ring-blue-500/50"
                    >
                      <span className="text-white/90 text-lg font-medium">
                        Image {artwork.id}
                      </span>
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

export default ArtworkGallery;
