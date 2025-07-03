import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect, LegacyRef, useCallback } from "react";
import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types/index";

import { useMeasure } from "react-use";
import { animate } from "framer-motion";
import WindowTemplate from "~/components/WindowTemplate";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import useEmblaCarousel from 'embla-carousel-react';

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <WindowTemplate>
      <div className="h-full w-full p-6 overflow-y-auto custom-scrollbar flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
        <h2
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{
              color: '#f4f0ff',
              textShadow: `
                0 0 6px rgba(180, 140, 255, 0.5),
                0 0 12px rgba(180, 140, 255, 0.35),
                0 0 24px rgba(180, 140, 255, 0.25)
              `,
              fontWeight: 400,
              letterSpacing: '-0.01em'
            }}
          >
            Events & Engagements
          </h2>
          <p className="text-base text-purple-200/80 text-center mt-2 max-w-2xl mb-2">
            Speaking at events, leading discussions, and sharing insights on AI, innovation, and the future of technology.
          </p>
        </div>
        {/* Embla Carousel */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Arrows */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-xl border border-gray-300 hover:bg-white"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            aria-label="Previous"
            style={{ pointerEvents: 'auto' }}
            disabled={!canScrollPrev}
          >
            <span className="i-ph:caret-left" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-xl border border-gray-300 hover:bg-white"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            aria-label="Next"
            style={{ pointerEvents: 'auto' }}
            disabled={!canScrollNext}
          >
            <span className="i-ph:caret-right" />
          </button>
          {/* Embla Carousel Track */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-8 py-2 px-8">
              {artworks.map((artwork, idx) => (
                <div
                  key={idx}
                  className="gallery-card flex-shrink-0 w-72 md:w-96 rounded-xl shadow-lg bg-gradient-to-br from-white/10 via-purple-200/5 to-purple-400/10 backdrop-blur-md border border-purple-400/20 overflow-hidden relative"
                  style={{ scrollSnapAlign: 'center' }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-56 md:h-64 object-cover rounded-xl"
                    loading="lazy"
                  />
                  {/* Caption Overlay: only on hover, only on this card, only on md+ */}
                  <div className={`hidden md:block absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded text-xs font-mono uppercase tracking-widest text-purple-100 transition-opacity duration-300 pointer-events-none ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`}>
                    {artwork.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowTemplate>
  );
}

export default ArtworkGallery;
