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
  const [speed, setSpeed] = useState(3600); // Default: 1 hour
  const [isPaused, setIsPaused] = useState(false);
  const controls = useRef<any>(null);
  const hoverTimeout = useRef<any>(null);

  const startAnimation = () => {
    if (!width || isPaused) return;
    
    if (controls.current) controls.current.stop();

    // Calculate the total width of all items plus gap
    const itemWidth = width * 0.4;
    const totalWidth = (itemWidth + 24) * artworks.length;
    
    controls.current = animate(xTranslation, -totalWidth, {
      ease: "linear",
      duration: speed,
      repeat: Infinity,
      repeatType: "loop",
      onRepeat: () => {
        xTranslation.set(0);
      }
    });
  };

  useEffect(() => {
    if (hoveredCard === null && !isPaused) {
      startAnimation();
    } else if (controls.current) {
      controls.current.stop();
    }

    return () => {
      controls.current?.stop();
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, [width, hoveredCard, speed, isPaused]);

  const handleHoverStart = (idx: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredCard(idx);
  };

  const handleHoverEnd = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredCard(null);
    }, 100);
  };

  const handleSpeedChange = (newSpeed: number) => {
    // Convert slider value (0-100) to speed (1800-7200 seconds)
    // Min: 30 minutes, Max: 2 hours
    const actualSpeed = 7200 - (newSpeed * 54); 
    setSpeed(actualSpeed);
  };

  const handleManualNav = (direction: 'left' | 'right') => {
    if (!width) return;
    
    const itemWidth = width * 0.4;
    const moveAmount = itemWidth + 24; // width + gap
    
    if (controls.current) controls.current.stop();
    
    const currentX = xTranslation.get();
    const targetX = direction === 'left' 
      ? currentX + moveAmount 
      : currentX - moveAmount;
    
    animate(xTranslation, targetX, {
      type: "spring",
      stiffness: 150,
      damping: 30
    });

    // Resume auto-scroll after manual navigation
    setTimeout(startAnimation, 1000);
  };

  const artworks = [
    // LEAP 2024 Images
    {
      id: 1,
      title: "LEAP 2024",
      description: "LEAP 2024 - KSA",
      image: "img/gallery/leap 242.jpg"
    },
    {
      id: 2,
      title: "LEAP 2024",
      description: "Future of XR - LEAP 2024 - KSA",
      image: "img/gallery/leap247.jpg"
    },
    {
      id: 3,
      title: "LEAP 2024",
      description: "Future of XR - LEAP 2024 - KSA",
      image: "img/gallery/leap 245.jpg"
    },
    // Women in Tech Events
    {
      id: 4,
      title: "Women in STEM Panel",
      description: "Panel for women pursuing careers in STEM - Carnegie Mellon 2023 - Qatar",
      image: "img/gallery/women-in-stem-1.jpg"
    },
    {
      id: 5,
      title: "Women in STEM Panel",
      description: "Panel for women pursuing careers in STEM - Carnegie Mellon 2023 - Qatar",
      image: "img/gallery/women_in_stem-2.jpg"
    },
    {
      id: 6,
      title: "Women in Tech",
      description: "PwC X Microsoft Women in Tech - PwC 2024 - Qatar",
      image: "img/gallery/women in tech1.JPG"
    },
    {
      id: 7,
      title: "Women in Tech",
      description: "PwC X Microsoft Women in Tech - PwC 2024 - Qatar",
      image: "img/gallery/women in tech7.JPG"
    },
    // Ru'ya Event Series
    {
      id: 8,
      title: "Ru'ya",
      description: "Showcasing prototypes and innovations - Ru'ya 2024 - UAE",
      image: "img/gallery/Ru'ya 3.jpg"
    },
    {
      id: 9,
      title: "Ru'ya",
      description: "Showcasing prototypes and innovations - Ru'ya 2024 - UAE",
      image: "img/gallery/Ru'ya 4.jpg"
    },
    {
      id: 10,
      title: "Ru'ya",
      description: "Showcasing prototypes and innovations - Ru'ya 2024 - UAE",
      image: "img/gallery/Ru'ya 5.jpg"
    },
    // IDFE Series
    {
      id: 11,
      title: "IDFE DEALS",
      description: "Demonstrating Soft Skill VR training - IDFE 2023 - Spain",
      image: "img/gallery/IDFE 8.png"
    },
    {
      id: 12,
      title: "IDFE DEALS",
      description: "Demonstrating Soft Skill VR training - IDFE 2023 - Spain",
      image: "img/gallery/IDFE 1.png"
    },
    {
      id: 13,
      title: "IDFE DEALS",
      description: "Demonstrating Soft Skill VR training - IDFE 2023 - Spain",
      image: "img/gallery/IDFE.png"
    },
    {
      id: 14,
      title: "IDFE DEALS",
      description: "Presenting on emerging technologies - IDFE 2023 - Spain",
      image: "img/gallery/IDFE .png"
    },
    {
      id: 15,
      title: "IDFE DEALS",
      description: "Presenting on emerging technologies - IDFE 2023 - Spain",
      image: "img/gallery/IDFE 4.png"
    },
    // Lab Visits
    {
      id: 16,
      title: "Emerging Tech Lab",
      description: "Lab Tour & Presentations - PwC Emerging Tech Lab 2022 - Qatar",
      image: "img/gallery/IMG_0432.JPG"
    },
    {
      id: 17,
      title: "Emerging Tech Lab",
      description: "Lab Tour & Presentations - PwC Emerging Tech Lab 2022 - UAE",
      image: "img/gallery/lab visit.JPG"
    },
    {
      id: 18,
      title: "Emerging Tech Lab",
      description: "Lab Tour & Presentations - PwC Emerging Tech Lab 2022 - UAE",
      image: "img/gallery/lab visits.JPG"
    }
  ];

  return (
    <WindowTemplate>
      <div className="h-full w-full bg-black/30 backdrop-blur-md p-6 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold text-white mb-3">On Stage & In Action</h2>
          <p className="text-lg text-white/80 text-center max-w-3xl">
            Speaking at events, leading discussions, and sharing insights on AI, innovation, and the future of technology.
          </p>
        </div>

        {/* Gallery */}
        <main className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div
              className="absolute left-0 flex gap-4 px-[100px]"
              ref={ref as LegacyRef<HTMLDivElement>}
            >
              <motion.div className="flex gap-4" style={{ x: xTranslation }}>
                {[...artworks, ...artworks, ...artworks, ...artworks].map((artwork, idx) => (
                  <motion.div
                    key={idx}
                    className="relative flex-shrink-0 group"
                    style={{
                      width: "min(500px, 40vw)",
                      aspectRatio: "16/9",
                      marginRight: "24px",
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
                      {/* Image */}
                      <div className="w-full h-full">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
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
                        <h4 className="text-2xl font-bold mb-3 text-white">
                          {artwork.title}
                        </h4>
                        <p className="text-lg text-gray-200 text-center">
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

        {/* Controls at bottom */}
        <div className="flex justify-center mt-3">
          <div className="flex items-center gap-6">
            {/* Pause/Play Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <span className={`text-xl text-white ${isPaused ? 'i-ph:play-fill' : 'i-ph:pause-fill'}`} />
            </button>

            {/* Speed Control Slider */}
            <div className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-full">
              <span className="text-white/70 text-sm">Speed</span>
              <div className="relative w-32 h-6 flex items-center">
                <div className="absolute w-full h-1 bg-white/20 rounded-full" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <motion.div
                  className="absolute h-3 w-3 bg-white rounded-full"
                  style={{
                    left: `${((7200 - speed) / 54)}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowTemplate>
  );
}

export default ArtworkGallery;
