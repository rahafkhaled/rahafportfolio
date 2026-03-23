import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, LegacyRef } from "react";
import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types/index";

import { useMeasure } from "react-use";
import { animate } from "framer-motion";
import WindowTemplate from "~/components/WindowTemplate";
import useEmblaCarousel from "embla-carousel-react";

interface ArtworkGalleryProps {
  /** Render without window chrome (inline on About page). */
  embedded?: boolean;
}

function ArtworkGallery({ embedded }: ArtworkGalleryProps) {
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
    const actualSpeed = 7200 - newSpeed * 54;
    setSpeed(actualSpeed);
  };

  const handleManualNav = (direction: "left" | "right") => {
    if (!width) return;

    const itemWidth = width * 0.4;
    const moveAmount = itemWidth + 24; // width + gap

    if (controls.current) controls.current.stop();

    const currentX = xTranslation.get();
    const targetX = direction === "left" ? currentX + moveAmount : currentX - moveAmount;

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
      description:
        "Panel for women pursuing careers in STEM - Carnegie Mellon 2023 - Qatar",
      image: "img/gallery/women-in-stem-1.jpg"
    },
    {
      id: 5,
      title: "Women in STEM Panel",
      description:
        "Panel for women pursuing careers in STEM - Carnegie Mellon 2023 - Qatar",
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
    },
    // MWC & Web Summit
    {
      id: 19,
      title: "MWC",
      description: "Connecting with industry - Mobile World Congress 2025",
      image: "img/gallery/MWC.jpeg"
    },
    {
      id: 20,
      title: "MWC25",
      description:
        "Presenting emerging technology prototypes - Mobile World Congress 2025",
      image: "img/gallery/MWC2.png"
    },
    {
      id: 21,
      title: "Web Summit",
      description:
        "Keynote on the future of AI - Web Summit 2026 ",
      image: "img/gallery/websummit_speech.JPG"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false
  });
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, artworks.length]);

  const body = (
      <div className="flex min-h-0 w-full flex-col items-center bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 p-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
        {/* Header */}
        <div className="mb-2 flex flex-col items-center md:mb-6">
          <h2
            className="mb-1 text-center text-2xl font-bold md:mb-2 md:text-3xl lg:text-4xl"
            style={{
              color: "#f4f0ff",
              textShadow: `
                0 0 6px rgba(180, 140, 255, 0.5),
                0 0 12px rgba(180, 140, 255, 0.35),
                0 0 24px rgba(180, 140, 255, 0.25)
              `,
              fontWeight: 400,
              letterSpacing: "-0.01em"
            }}
          >
            Events Gallery
          </h2>
          <p className="max-w-2xl px-2 text-center text-sm leading-snug text-purple-200/80 md:px-4 md:text-base md:leading-normal">
            Speaking at events, leading discussions, and sharing insights on AI,
            innovation, and the future of technology.
          </p>
        </div>
        {/* Embla Carousel: no flex-1 / min-h on mobile (avoids huge gap under header) */}
        <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-start md:min-h-0 md:flex-1 md:justify-center">
          {/* Embla viewport first so arrow buttons (below) paint on top and receive taps */}
          <div ref={emblaRef} className="relative z-0 overflow-hidden">
            <div className="flex gap-4 px-2 py-1 md:gap-8 md:px-8 md:py-3">
              {artworks.map((artwork, idx) => (
                <div
                  key={idx}
                  className="gallery-card relative w-[min(88vw,22rem)] shrink-0 overflow-hidden rounded-xl border border-purple-400/20 bg-gradient-to-br from-white/10 via-purple-200/5 to-purple-400/10 shadow-lg backdrop-blur-md sm:w-72 lg:w-96"
                  style={{ scrollSnapAlign: "center" }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="h-44 w-full rounded-xl object-cover sm:h-56 lg:h-64"
                    loading="lazy"
                  />
                  {/* Caption Overlay: always visible on mobile, hover only on desktop */}
                  <div
                    className={`pointer-events-none absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-mono uppercase tracking-widest text-purple-100 transition-opacity duration-300 md:px-3 ${hoveredCard === idx ? "opacity-100" : "opacity-100 md:opacity-0"}`}
                  >
                    {artwork.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="absolute left-1 top-1/2 z-[50] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-xl text-gray-900 shadow-xl hover:bg-white md:left-2 md:h-12 md:w-12 md:text-3xl"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
          >
            <span className="i-ph:caret-left pointer-events-none" />
          </button>
          <button
            type="button"
            className="absolute right-1 top-1/2 z-[50] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-xl text-gray-900 shadow-xl hover:bg-white md:right-2 md:h-12 md:w-12 md:text-3xl"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
          >
            <span className="i-ph:caret-right pointer-events-none" />
          </button>
        </div>
      </div>
  );

  if (embedded) return body;
  return <WindowTemplate>{body}</WindowTemplate>;
}

export default ArtworkGallery;
