import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, LegacyRef } from "react";
import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types/index";

import { useMeasure } from "react-use";
import { animate } from "framer-motion";
import WindowTemplate from "~/components/WindowTemplate";
import useEmblaCarousel from "embla-carousel-react";
import {
  portfolioControlButtonClassName,
  portfolioSectionHeadingClassName,
  portfolioSectionHeadingStyle,
  portfolioSectionSubtextClassName
} from "~/utils/portfolioStyles";

interface ArtworkGalleryProps {
  /** Render without window chrome (inline on About page). */
  embedded?: boolean;
}

type GalleryArtwork = {
  id: number;
  title: string;
  description: string;
  image: string;
  /** ISO YYYY-MM-DD for ordering (newest first). */
  sortDate: string;
};

function ArtworkGallery({ embedded }: ArtworkGalleryProps) {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [speed, setSpeed] = useState(3600); // Default: 1 hour
  const [isPaused, setIsPaused] = useState(false);
  const controls = useRef<any>(null);
  const hoverTimeout = useRef<any>(null);

  const artworkItems: GalleryArtwork[] = [
    // LEAP 2024 Images
    {
      id: 1,
      title: "LEAP 2024",
      description: "LEAP 2024 - KSA",
      image: "img/gallery/leap 242.jpg",
      sortDate: "2024-03-04"
    },
    {
      id: 2,
      title: "LEAP 2024",
      description: "Future of XR - LEAP 2024 - KSA",
      image: "img/gallery/leap247.jpg",
      sortDate: "2024-03-04"
    },
    {
      id: 3,
      title: "LEAP 2024",
      description: "Future of XR - LEAP 2024 - KSA",
      image: "img/gallery/leap 245.jpg",
      sortDate: "2024-03-04"
    },
    // Women in Tech Events
    {
      id: 4,
      title: "Women in STEM Panel",
      description:
        "Panel for women pursuing careers in STEM - Carnegie Mellon 2023 - Qatar",
      image: "img/gallery/women-in-stem-1.jpg",
      sortDate: "2023-11-08"
    },
    {
      id: 5,
      title: "Women in STEM Panel",
      description:
        "Panel for women pursuing careers in STEM - Carnegie Mellon 2023 - Qatar",
      image: "img/gallery/women_in_stem-2.jpg",
      sortDate: "2023-11-08"
    },
    {
      id: 6,
      title: "Women in Tech",
      description: "PwC X Microsoft Women in Tech - PwC 2024 - Qatar",
      image: "img/gallery/women in tech1.JPG",
      sortDate: "2024-02-15"
    },
    {
      id: 7,
      title: "Women in Tech",
      description: "PwC X Microsoft Women in Tech - PwC 2024 - Qatar",
      image: "img/gallery/women in tech7.JPG",
      sortDate: "2024-02-15"
    },
    // Ru'ya Event Series
    {
      id: 8,
      title: "Ru'ya",
      description: "Showcasing prototypes and innovations - Ru'ya 2024 - UAE",
      image: "img/gallery/Ru'ya 3.jpg",
      sortDate: "2024-10-01"
    },
    {
      id: 9,
      title: "Ru'ya",
      description: "Showcasing prototypes and innovations - Ru'ya 2024 - UAE",
      image: "img/gallery/Ru'ya 4.jpg",
      sortDate: "2024-10-01"
    },
    {
      id: 10,
      title: "Ru'ya",
      description: "Showcasing prototypes and innovations - Ru'ya 2024 - UAE",
      image: "img/gallery/Ru'ya 5.jpg",
      sortDate: "2024-10-01"
    },
    // IDFE Series
    {
      id: 11,
      title: "IDFE DEALS",
      description: "Demonstrating Soft Skill VR training - IDFE 2023 - Spain",
      image: "img/gallery/IDFE 8.png",
      sortDate: "2023-10-12"
    },
    {
      id: 12,
      title: "IDFE DEALS",
      description: "Demonstrating Soft Skill VR training - IDFE 2023 - Spain",
      image: "img/gallery/IDFE 1.png",
      sortDate: "2023-10-12"
    },
    {
      id: 13,
      title: "IDFE DEALS",
      description: "Demonstrating Soft Skill VR training - IDFE 2023 - Spain",
      image: "img/gallery/IDFE.png",
      sortDate: "2023-10-12"
    },
    {
      id: 14,
      title: "IDFE DEALS",
      description: "Presenting on emerging technologies - IDFE 2023 - Spain",
      image: "img/gallery/IDFE .png",
      sortDate: "2023-10-12"
    },
    {
      id: 15,
      title: "IDFE DEALS",
      description: "Presenting on emerging technologies - IDFE 2023 - Spain",
      image: "img/gallery/IDFE 4.png",
      sortDate: "2023-10-12"
    },
    // Lab Visits
    {
      id: 16,
      title: "Emerging Tech Lab",
      description: "Lab Tour & Presentations - PwC Emerging Tech Lab 2022 - Qatar",
      image: "img/gallery/IMG_0432.JPG",
      sortDate: "2022-06-01"
    },
    {
      id: 17,
      title: "Emerging Tech Lab",
      description: "Lab Tour & Presentations - PwC Emerging Tech Lab 2022 - UAE",
      image: "img/gallery/lab visit.JPG",
      sortDate: "2022-06-01"
    },
    {
      id: 18,
      title: "Emerging Tech Lab",
      description: "Lab Tour & Presentations - PwC Emerging Tech Lab 2022 - UAE",
      image: "img/gallery/lab visits.JPG",
      sortDate: "2022-06-01"
    },
    // MWC & Web Summit
    {
      id: 19,
      title: "MWC",
      description: "Connecting with industry - Mobile World Congress 2025",
      image: "img/gallery/MWC.jpeg",
      sortDate: "2025-03-04"
    },
    {
      id: 20,
      title: "MWC25",
      description:
        "Presenting emerging technology prototypes - Mobile World Congress 2025",
      image: "img/gallery/MWC2.png",
      sortDate: "2025-03-04"
    },
    {
      id: 21,
      title: "Web Summit",
      description:
        "Keynote on the future of AI - Web Summit 2026 ",
      image: "img/gallery/websummit_speech.JPG",
      sortDate: "2026-11-04"
    }
  ];

  const artworks = [...artworkItems].sort((a, b) => {
    const byDate = b.sortDate.localeCompare(a.sortDate);
    return byDate !== 0 ? byDate : b.id - a.id;
  });

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
      <div className="flex min-h-0 w-full flex-col items-center bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:p-6 md:pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* Header */}
        <div className="mb-1.5 flex flex-col items-center md:mb-6">
          <h2 className={portfolioSectionHeadingClassName} style={portfolioSectionHeadingStyle}>
            Events Gallery
          </h2>
          <p className={portfolioSectionSubtextClassName}>
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
            className={`${portfolioControlButtonClassName} absolute left-1 top-1/2 z-[50] h-8 w-8 -translate-y-1/2 text-lg md:left-2 md:h-12 md:w-12 md:text-3xl`}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
          >
            <span className="i-ph:caret-left pointer-events-none" />
          </button>
          <button
            type="button"
            className={`${portfolioControlButtonClassName} absolute right-1 top-1/2 z-[50] h-8 w-8 -translate-y-1/2 text-lg md:right-2 md:h-12 md:w-12 md:text-3xl`}
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
