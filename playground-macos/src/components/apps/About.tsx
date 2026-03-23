import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useAnimation,
  useScroll,
  easeOut
} from "framer-motion";
import WindowTemplate from "../WindowTemplate";
import ArtworkGallery from "./ArtworkGallery";
import News from "./News";
import Contact from "./Contact";
import { useWindowSize } from "~/hooks";
import { MOBILE_BREAKPOINT, openPublicAssetInNewTab, resolvePublicAsset } from "~/utils";

interface AboutProps {
  /** Full-page phone layout: no fake window chrome (see Desktop). */
  standaloneMobile?: boolean;
}

const NAV_ABOUT = "About";
const NAV_REPORT = "Report";
const NAV_EVENTS = "Events";
const NAV_PRESS = "Press";
const NAV_RESUME = "Resume";
const NAV_CONTACT = "Contact";
const LETS_CONNECT_HEADING = "Let's Connect";

const About: React.FC<AboutProps> = ({ standaloneMobile }) => {
  const { winWidth } = useWindowSize();
  const [activeSection, setActiveSection] = useState("hero");

  // Create a ref for the scrollable container
  const contentRef = useRef<HTMLDivElement>(null);

  // Refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const releaseRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const newsRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Controls for the floating animation
  const controls = useAnimation();

  // Initialize floating animation
  useEffect(() => {
    controls.start({
      y: [0, -15, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [controls]);

  // Handle scroll events to update active section
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleScroll = () => {
      const position = contentElement.scrollTop;

      // Determine which section is currently in view
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: servicesRef, id: "services" },
        { ref: releaseRef, id: "release" },
        { ref: galleryRef, id: "gallery" },
        { ref: newsRef, id: "news" },
        { ref: resumeRef, id: "resume" },
        { ref: contactRef, id: "contact" }
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const contentRect = contentElement.getBoundingClientRect();
          // Check if the section is in view relative to the content container
          if (rect.top - contentRect.top <= 100 && rect.bottom - contentRect.top >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    contentElement.addEventListener("scroll", handleScroll);
    return () => contentElement.removeEventListener("scroll", handleScroll);
  }, [standaloneMobile]);

  // Scroll to section function - updated for faster scrolling
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    const contentElement = contentRef.current;
    const sectionElement = sectionRef.current;

    if (contentElement && sectionElement) {
      const containerRect = contentElement.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();
      const scrollPosition =
        sectionRect.top - containerRect.top + contentElement.scrollTop;

      contentElement.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
        // @ts-ignore - Adding custom scroll timing
        scrollBehavior: {
          duration: 500 // Reduced from default ~1000ms
        }
      });
    }
  };

  const { scrollYProgress } = useScroll({
    container: contentRef,
    layoutEffect: false
  });
  const scrollParallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, -100]);
  const scrollParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const resumePdf = resolvePublicAsset("/img/ui/Rahaf-Abutarbush-Resume.pdf");
  const resumeIframeSrc =
    resumePdf && winWidth > MOBILE_BREAKPOINT
      ? `${resumePdf}#zoom=150&navpanes=0&view=FitH&quality=2`
      : resumePdf ?? undefined;

  const services: {
    title: string;
    description: string;
    img: string;
    /** Optional `object-position` so faces aren’t cropped oddly under `object-cover`. */
    imgObjectPosition?: string;
    /** Optional taller image area (Tailwind classes) for portrait-style photos. */
    imgHeightClass?: string;
  }[] = [
    {
      title: "Design Thinking",
      description:
        "I lead ideation sessions that push technology beyond the buzzwords. It's not just about using the latest tools, it's about applying them with intent.",
      img: "/img/gallery/Ru'ya 4.jpg"
    },
    {
      title: "Product management",
      description:
        "I thrive in leading product strategy and management in fast-moving spaces like emerging tech, where success isn't about racing to keep up, it's about building with purpose.",
      img: "/img/gallery/metaverse_assembly.jpeg"
    },
    {
      title: "Public speaking",
      description:
        "I've always been drawn to what makes someone pay attention, or remember something after the meeting is over. Storytelling is about clarity and answering the core question: 'What's in it for us?'",
      img: "/img/gallery/cmu_talking.jpeg",
      // Under object-cover, anchor above center so the face (upper/mid frame) stays visible.
      imgObjectPosition: "center 35%",
      imgHeightClass: "h-28 sm:h-32 md:h-[9.5rem]"
    }
  ];

  // Generate sparkly stars for the background
  const generateStars = (count: number) => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      alpha: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 5 + 5
    }));
  };

  const smallStars = generateStars(100);
  const mediumStars = generateStars(30);
  const largeStars = generateStars(10);

  const navStars = generateStars(8);

  const scrollInner = (
      <div
        ref={contentRef}
        id={standaloneMobile ? "portfolio-scroll-root" : undefined}
        className={`w-full relative scroll-smooth bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 ${
          standaloneMobile
            ? "h-full min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain touch-pan-y custom-scrollbar pt-[env(safe-area-inset-top,0px)] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            : "min-h-0"
        }`}
        style={{
          perspective: "1000px",
          ...(standaloneMobile
            ? { minHeight: 0, WebkitOverflowScrolling: "touch" as const }
            : {})
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(70vh,480px)] overflow-hidden opacity-50"
          style={{ y: scrollParallaxY }}
        >
          <div className="absolute -left-[20%] top-8 h-72 w-[140%] rounded-full bg-gradient-to-br from-purple-600/35 via-fuchsia-500/15 to-transparent blur-3xl" />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[20%] z-[1] h-64 overflow-hidden opacity-30"
          style={{ y: scrollParallaxSlow }}
        >
          <div className="absolute -right-[10%] bottom-0 h-48 w-[80%] rounded-full bg-gradient-to-tl from-pink-600/25 to-transparent blur-3xl" />
        </motion.div>
        {/* macOS-style Navigation Bar */}
        <motion.nav
          className={`sticky top-0 z-50 flex justify-center w-full bg-black/70 backdrop-blur-md border-b border-white/10 relative overflow-visible ${
            standaloneMobile ? "py-4" : "py-6"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sparkly stars overlay for nav bar */}
          <div
            className={`absolute inset-0 pointer-events-none z-0 ${standaloneMobile ? "hidden" : ""}`}
          >
            {navStars.map((star) => (
              <motion.div
                key={`nav-star-${star.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.size + 0.5,
                  height: star.size + 0.5,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  opacity: star.alpha,
                  filter: "drop-shadow(0 0 6px #a855f7)"
                }}
                animate={{
                  opacity: [star.alpha, star.alpha * 0.6, star.alpha],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: star.duration * 1.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
          <div className="scrollbar-none z-10 flex max-w-full justify-start gap-1 overflow-x-auto overscroll-x-contain px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 md:flex-wrap md:justify-center md:gap-16 md:px-4 [&::-webkit-scrollbar]:hidden">
            <motion.button
              onClick={() => scrollToSection(heroRef)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg ${activeSection === "hero" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {NAV_ABOUT}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection(releaseRef)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg ${activeSection === "release" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {NAV_REPORT}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection(galleryRef)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg ${activeSection === "gallery" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {NAV_EVENTS}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection(newsRef)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg ${activeSection === "news" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {NAV_PRESS}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection(resumeRef)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg ${activeSection === "resume" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {NAV_RESUME}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection(contactRef)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg ${activeSection === "contact" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {NAV_CONTACT}
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`relative z-[2] flex items-center justify-center text-white px-4 md:px-4 ${
            standaloneMobile ? "py-12 sm:py-14 md:py-20" : "py-12 md:py-20"
          }`}
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
          {/* Soft gradient fade at bottom to blend sections */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 z-20 h-24 w-full sm:h-32"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #1a1333 100%)"
            }}
          />
          {/* Content container */}
          <div className="relative flex w-full items-center justify-center">
            <div className="container mx-auto max-w-2xl px-4 sm:px-6 md:max-w-none md:px-8">
              <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center sm:gap-7 md:max-w-none md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full space-y-4 sm:space-y-5"
                >
                  <h1
                    className="text-balance text-[clamp(1.875rem,6vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#f4f0ff] md:text-[clamp(2rem,8vw,3.75rem)]"
                    style={{
                      textShadow: `
      0 0 6px rgba(180, 140, 255, 0.3),
      0 0 12px rgba(180, 140, 255, 0.25),
      0 0 24px rgba(180, 140, 255, 0.2)
    `
                    }}
                  >
                    Rahaf Abutarbush
                  </h1>

                  {/* Phone: soft pills; scannable, no awkward ▪ wraps */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:hidden">
                    {(
                      [
                        "Emerging Technology",
                        "Instinct-led Innovation",
                        "Market Relevance"
                      ] as const
                    ).map((label) => (
                      <span
                        key={label}
                        className="inline-flex rounded-full border border-purple-400/20 bg-purple-950/35 px-3 py-1.5 text-[11px] font-medium leading-none tracking-wide text-purple-100/95 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  {/* sm+: original inline row */}
                  <div
                    className="hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:flex"
                    style={{
                      color: "#f4f0ff",
                      fontSize: "clamp(1rem, 4vw, 1.3rem)",
                      fontWeight: 400
                    }}
                  >
                    <span>Emerging Technology</span>
                    <span
                      className="text-[#caa6ff]"
                      style={{
                        textShadow: `
      0 0 4px rgba(200, 160, 255, 0.4),
      0 0 8px rgba(200, 160, 255, 0.3)
    `
                      }}
                    >
                      ▪
                    </span>
                    <span>Instinct-led Innovation</span>
                    <span
                      className="text-[#caa6ff]"
                      style={{
                        textShadow: `
      0 0 4px rgba(200, 160, 255, 0.4),
      0 0 8px rgba(200, 160, 255, 0.3)
    `
                      }}
                    >
                      ▪
                    </span>
                    <span>Market Relevance</span>
                  </div>

                  <div
                    className="mx-auto h-px w-14 bg-gradient-to-r from-transparent via-purple-400/45 to-transparent sm:w-20 md:hidden"
                    aria-hidden
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:max-w-none"
                >
                  <p className="text-balance px-0.5 text-center text-[0.9375rem] font-normal leading-[1.7] text-purple-100/[0.88] sm:text-base md:mx-auto md:max-w-3xl md:px-0 md:text-lg md:leading-relaxed">
                    I have always been all about innovation that is led by instincts, the
                    intersection of technology and human experience.{" "}
                    <span className="md:hidden"> </span>
                    <span className="hidden md:inline">
                      <br />
                    </span>
                    The real challenge isn't how fast technology moves, it's cutting
                    through the noise to find what's relevant, impactful, and{" "}
                    <span className="md:hidden"> </span>
                    <span className="hidden md:inline">
                      <br />
                    </span>
                    answering the fundamental question:
                    <br className="hidden md:block" />
                    <span className="md:hidden block h-2" />
                    <span>
                      {"What's in it for us?".split("").map((char, i) => (
                        <span
                          key={i}
                          className="shine-letter text-white"
                          style={{ animationDelay: `${i * 0.07}s` }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </span>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="relative z-[2] py-4 px-4 md:px-8 text-white mb-10 md:mb-12"
        >
          <div className="container mx-auto">
            <h2
              className="mb-4 md:mb-5"
              style={{
                color: "#f4f0ff",
                textShadow: `
                0 0 6px rgba(180, 140, 255, 0.3),
                0 0 12px rgba(180, 140, 255, 0.25),
                0 0 24px rgba(180, 140, 255, 0.2)
              `,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                fontSize: "clamp(1.5rem, 6vw, 2rem)",
                textAlign: "center"
              }}
            >
              Expertise
            </h2>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/10 shadow-lg backdrop-blur-lg rounded-xl border border-purple-400/20 relative overflow-hidden group hover:bg-white/20 transition-all duration-300 p-3.5 sm:p-4 md:p-5 ${
                    index === 2 ? "col-span-2 max-w-lg justify-self-center lg:col-span-1 lg:max-w-none" : ""
                  }`}
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <h3
                    className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-center leading-tight"
                    style={{
                      color: "#f4f0ff",
                      textShadow: `
                      0 0 6px rgba(180, 140, 255, 0.3),
                      0 0 12px rgba(180, 140, 255, 0.25),
                      0 0 24px rgba(180, 140, 255, 0.2)
                    `
                    }}
                  >
                    {service.title}
                  </h3>
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`mb-2.5 w-full object-cover rounded-lg shadow ${
                      service.imgHeightClass ?? "h-24 sm:h-28 md:h-32"
                    }`}
                    style={
                      service.imgObjectPosition
                        ? { objectPosition: service.imgObjectPosition }
                        : undefined
                    }
                  />
                  <p className="text-purple-200/85 text-xs sm:text-sm md:text-base leading-snug md:leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Release Section */}
        <section
          ref={releaseRef}
          className="relative z-[2] mb-10 px-3 py-5 text-white sm:px-4 md:mb-14 md:px-6 md:py-12"
        >
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2
              className="mb-3 text-center text-lg font-normal tracking-tight sm:mb-4 sm:text-2xl md:mb-5 md:text-3xl lg:text-4xl"
              style={{
                color: "#f4f0ff",
                textShadow: `
                  0 0 6px rgba(180, 140, 255, 0.3),
                  0 0 12px rgba(180, 140, 255, 0.25),
                  0 0 24px rgba(180, 140, 255, 0.2)
                `,
                letterSpacing: "-0.01em"
              }}
            >
              Latest Release
            </h2>
            <div className="mx-auto mb-0 w-full max-w-4xl md:mb-12">
              <div className="flex flex-col overflow-hidden rounded-xl border border-purple-400/20 bg-white/10 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20 md:flex-row md:rounded-2xl">
                {/* Image: shorter on phone */}
                <div className="h-32 w-full shrink-0 sm:h-40 md:h-auto md:w-1/3 md:min-h-[180px]">
                  <img
                    src="/img/gallery/ai-release-cover.jpg"
                    alt="The evolving AI landscape"
                    className="h-full w-full object-cover md:rounded-l-2xl"
                  />
                </div>
                {/* Content */}
                <div className="relative flex flex-1 flex-col justify-between p-4 text-left sm:p-5 md:p-8">
                  <div>
                    <h3
                      className="mb-2 text-base font-bold leading-snug text-white sm:text-lg md:mb-4 md:text-2xl md:leading-tight"
                      style={{
                        color: "#f4f0ff",
                        textShadow: `
                        0 0 6px rgba(180, 140, 255, 0.3),
                        0 0 12px rgba(180, 140, 255, 0.25),
                        0 0 24px rgba(180, 140, 255, 0.2)
                      `
                      }}
                    >
                      Emerging Technology Trends in the Middle East 2025
                    </h3>
                    <p className="mb-4 text-xs leading-snug text-purple-100 sm:text-sm md:mb-8 md:text-lg md:leading-relaxed">
                      The research and writing I did for the Emerging Technology Trends in
                      the Middle East 2025 report sharpened how I think about tech's
                      velocity in the Middle East. Not just{" "}
                      <span className="font-semibold text-purple-200">where</span> it's
                      heading, but what it demands from strategy today. It pushed{" "}
                      <span className="font-semibold text-purple-200">me</span> to think
                      critically about how trends like AI, immersive tech, and quantum
                      translate into tangible strategies for governments and businesses
                      navigating real transformation.
                    </p>
                  </div>
                  <div className="mt-2 flex w-full items-end justify-end md:mt-auto">
                    <motion.a
                      href="https://www.pwc.com/m1/en/publications/2025/docs/emerging-technology-trends-in-the-middle-east-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, boxShadow: "0 0 24px #a855f7" }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-white/10 px-4 py-2 text-xs font-semibold text-purple-200 shadow-lg transition-all hover:bg-white/20 sm:gap-2 sm:px-5 sm:text-sm md:px-8 md:py-3 md:text-base"
                    >
                      <span className="i-fa-solid:download text-sm sm:text-base md:text-lg" />
                      Download Report
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={galleryRef} className="relative z-[2] scroll-mt-4">
          <ArtworkGallery embedded />
        </section>

        <section ref={newsRef} className="relative z-[2] scroll-mt-4">
          <News embedded />
        </section>

        <section
          ref={resumeRef}
          className="relative z-[2] scroll-mt-4 px-4 py-10 md:px-8 md:py-14"
        >
          <h2
            className="mb-2 text-center text-[clamp(1.5rem,6vw,2rem)] font-normal tracking-tight"
            style={{
              color: "#f4f0ff",
              textShadow: `
                0 0 6px rgba(180, 140, 255, 0.3),
                0 0 12px rgba(180, 140, 255, 0.25),
                0 0 24px rgba(180, 140, 255, 0.2)
              `
            }}
          >
            Resume
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-center text-sm text-purple-200/65 md:text-base">
            Preview below or open the PDF in a new tab.
          </p>
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-purple-400/25 bg-[#0f0c16] shadow-[0_20px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-black/35 px-3 py-2.5 backdrop-blur-sm sm:px-4">
              <div className="flex shrink-0 gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
                <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
                <span className="size-2.5 rounded-full bg-[#28c840]/85" />
              </div>
              <span className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-white/45 sm:text-xs">
                Rahaf-Abutarbush-Resume.pdf
              </span>
              <button
                type="button"
                onClick={() => openPublicAssetInNewTab("/img/ui/Rahaf-Abutarbush-Resume.pdf")}
                className="shrink-0 rounded-lg border border-purple-400/30 bg-purple-500/15 px-2.5 py-1 text-[11px] font-semibold text-purple-100 transition hover:bg-purple-500/25 sm:px-3 sm:text-xs"
              >
                Open
              </button>
            </div>
            <div className="bg-[#1a1625] p-1 sm:p-2">
              {resumeIframeSrc ? (
                <iframe
                  src={resumeIframeSrc}
                  title="Resume PDF"
                  className="h-[min(72vh,820px)] w-full rounded-lg border-0 bg-neutral-900 sm:h-[min(75vh,880px)]"
                />
              ) : (
                <p className="py-12 text-center text-sm text-purple-200/50">Resume unavailable.</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="relative z-[2] pt-6 md:pt-8 pb-10 md:pb-14 px-4 md:px-8 text-white"
        >
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2
              className="mb-4"
              style={{
                color: "#f4f0ff",
                textShadow: `
                  0 0 6px rgba(180, 140, 255, 0.3),
                  0 0 12px rgba(180, 140, 255, 0.25),
                  0 0 24px rgba(180, 140, 255, 0.2)
                `,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                fontSize: "clamp(1.5rem, 6vw, 2rem)",
                textAlign: "center"
              }}
            >
              {LETS_CONNECT_HEADING}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-purple-200/80 mb-4 max-w-2xl mx-auto text-base md:text-lg font-light"
            ></motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6 md:space-x-8 mb-8"
            >
              <motion.a
                href="https://www.linkedin.com/in/rahaf-abutarbush/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 24px #a855f7" }}
                className="size-12 md:size-14 flex items-center justify-center rounded-full bg-white/10 border border-purple-400/40 text-purple-200 hover:bg-white/20 transition-all shadow-lg backdrop-blur-lg relative"
              >
                <span className="i-fa-brands:linkedin text-xl md:text-2xl z-10" />
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: "0 0 12px 2px #a855f744", opacity: 0.5 }}
                />
              </motion.a>
              <motion.a
                href="mailto:rahaf.k.abutarbush@gmail.com"
                whileHover={{ scale: 1.15, boxShadow: "0 0 24px #a855f7" }}
                className="size-12 md:size-14 flex items-center justify-center rounded-full bg-white/10 border border-purple-400/40 text-purple-200 hover:bg-white/20 transition-all shadow-lg backdrop-blur-lg relative"
              >
                <span className="i-fa-solid:envelope text-xl md:text-2xl z-10" />
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: "0 0 12px 2px #a855f744", opacity: 0.5 }}
                />
              </motion.a>
            </motion.div>
            <div className="w-full max-w-md">
              <Contact embedded />
            </div>
          </div>
        </section>
      </div>
  );

  return (
    <>
      {standaloneMobile ? (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
          {scrollInner}
        </div>
      ) : (
        <WindowTemplate>{scrollInner}</WindowTemplate>
      )}
    </>
  );
};

export default About;
