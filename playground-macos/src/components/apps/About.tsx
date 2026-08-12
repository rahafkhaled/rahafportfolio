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
import {
  NavIconAbout,
  NavIconContact,
  NavIconGallery,
  NavIconNews,
  NavIconReleases,
  NavIconResume
} from "../PortfolioMobileNavIcons";
import { openPublicAssetInNewTab, resolvePublicAsset, RESUME_PDF_PATH } from "~/utils";
import {
  portfolioBodyEmphasisClassName,
  portfolioBodyTextClassName,
  portfolioCompactSectionHeadingClassName,
  portfolioCompactSectionHeadingStyle,
  portfolioDisplayCardTitleClassName,
  portfolioPillButtonClassName,
  portfolioSectionHeadingStyle,
} from "~/utils/portfolioStyles";

interface AboutProps {
  /** Full-page phone layout: no fake window chrome (see Desktop). */
  standaloneMobile?: boolean;
}

const NAV_ABOUT = "About";
const NAV_LATEST_RELEASES = "Latest Releases";
const NAV_EVENTS = "Events";
const NAV_PRESS = "Press";
const NAV_RESUME = "Resume";
const NAV_CONTACT = "Contact";
const LETS_CONNECT_HEADING = "Let's Connect";
/** Optional: add `public/img/ui/Rahaf_Abutarbush-preview.png` (first-page screenshot) for a clean preview without the PDF viewer UI. */
const RESUME_PREVIEW_SCREENSHOT = "/img/ui/Rahaf_Abutarbush-preview.png";
const RESUME_DISPLAY_FILENAME = "Rahaf_Abutarbush.pdf";
/** PDF viewer: no toolbar/sidebars; fit page width so the full resume reads as a preview. */
const RESUME_PDF_VIEW_FRAG = "toolbar=0&navpanes=0&scrollbar=0&view=FitH";

/** Split `px` so attributify-jsx does not corrupt box-shadow strings in JSX props. */
const MOBILE_NAV_HOVER_SHADOW_ACTIVE =
  "0 0 16" + "px rgba(168, 85, 247, 0.35)";
const MOBILE_NAV_HOVER_SHADOW_INACTIVE =
  "0 0 14" + "px rgba(168, 85, 247, 0.22)";

const About: React.FC<AboutProps> = ({ standaloneMobile }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [resumePreviewImageFailed, setResumePreviewImageFailed] = useState(false);

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

  const resumePdf = resolvePublicAsset(RESUME_PDF_PATH);
  const resumePreviewImageSrc = resolvePublicAsset(RESUME_PREVIEW_SCREENSHOT);
  const resumePdfEmbedSrc = resumePdf
    ? `${resumePdf}#${RESUME_PDF_VIEW_FRAG}`
    : undefined;

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
      title: "Product Management",
      description:
        "I thrive in leading product strategy and management in fast-moving spaces like emerging tech, where success isn't about racing to keep up, it's about building with purpose.",
      img: "/img/gallery/metaverse_assembly.jpeg"
    },
    {
      title: "Public Speaking",
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
  const mobileNavStars = generateStars(8);

  /** Built as string concat so attributify-jsx does not mangle `sm:text-center`. */
  const heroStackClass =
    "mx-auto flex w-full flex-col md:max-w-none md:gap-8 " +
    (standaloneMobile
      ? "max-w-[22rem] gap-5 text-left sm:max-w-md sm:gap-6 sm:text-center"
      : "max-w-md items-center gap-6 text-center sm:gap-7");
  const heroH1Class =
    "text-balance font-normal leading-[1.12] tracking-[-0.02em] text-[#f4f0ff] " +
    (standaloneMobile
      ? "text-[clamp(1.5rem,5.5vw,2.25rem)] sm:text-[clamp(1.875rem,6vw,2.75rem)] md:text-[clamp(2rem,8vw,3.75rem)] text-left sm:text-center"
      : "text-[clamp(1.875rem,6vw,2.75rem)] md:text-[clamp(2rem,8vw,3.75rem)] text-center");

  const navItemClass = (sectionId: string) =>
    [
      "shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-6 md:py-3 md:text-lg",
      activeSection === sectionId ? "text-white" : "text-gray-400 hover:text-white"
    ].join(" ");

  const mobileNavEntries = [
    ["hero", heroRef, NAV_ABOUT, NavIconAbout] as const,
    ["release", releaseRef, "Releases", NavIconReleases] as const,
    ["gallery", galleryRef, NAV_EVENTS, NavIconGallery] as const,
    ["news", newsRef, NAV_PRESS, NavIconNews] as const,
    ["resume", resumeRef, NAV_RESUME, NavIconResume] as const,
    ["contact", contactRef, NAV_CONTACT, NavIconContact] as const
  ] as const;

  const scrollInner = (
    <>
      <div
        ref={contentRef}
        id={standaloneMobile ? "portfolio-scroll-root" : undefined}
        className={`relative w-full scroll-smooth bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 ${
          standaloneMobile
            ? "h-full min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain touch-pan-y custom-scrollbar pt-[env(safe-area-inset-top,0px)] pb-[calc(4.35rem+env(safe-area-inset-bottom,0px))]"
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
        {/* Desktop: sticky nav + stars. Phone: bottom tab bar instead (see fragment below). */}
        {!standaloneMobile && (
          <motion.nav
            className="sticky top-0 z-50 flex w-full justify-center overflow-visible border-b border-white/10 bg-black/70 py-6 backdrop-blur-md relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pointer-events-none absolute inset-0 z-0">
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
            <div className="scrollbar-none z-10 flex max-w-full justify-start gap-1 overflow-x-auto overscroll-x-contain px-2 pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 md:flex-wrap md:justify-center md:gap-16 md:px-4 md:pb-1 [&::-webkit-scrollbar]:hidden">
              {(
                [
                  ["hero", heroRef, NAV_ABOUT] as const,
                  ["release", releaseRef, NAV_LATEST_RELEASES] as const,
                  ["gallery", galleryRef, NAV_EVENTS] as const,
                  ["news", newsRef, NAV_PRESS] as const,
                  ["resume", resumeRef, NAV_RESUME] as const,
                  ["contact", contactRef, NAV_CONTACT] as const
                ] as const
              ).map(([id, ref, label]) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(ref)}
                  className={navItemClass(id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}

        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`relative z-[2] flex items-center justify-center text-white px-4 md:px-4 ${
            standaloneMobile ? "py-8 sm:py-12 md:py-20" : "py-10 md:py-20"
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
              <div className={heroStackClass}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`w-full ${standaloneMobile ? "space-y-3 sm:space-y-5" : "space-y-4 sm:space-y-5"}`}
                >
                  <h1
                    className={heroH1Class}
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

                  {/* Phone: compact tagline */}
                  <p className="text-balance text-[11px] font-medium uppercase tracking-[0.12em] text-purple-300/80 sm:hidden">
                    Emerging Technology <span className="text-purple-500/60">·</span> Instinct-led
                    Innovation <span className="text-purple-500/60">·</span> Market Relevance
                  </p>
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
                    className="h-px w-10 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent sm:mx-auto sm:w-14 md:hidden"
                    aria-hidden
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:max-w-none"
                >
                  {standaloneMobile ? (
                    <div
                      className={`flex flex-col gap-3.5 sm:hidden ${portfolioBodyTextClassName}`}
                    >
                      <p className="text-balance">
                        I have always been all about innovation that is led by instincts, the
                        intersection of technology and human experience.
                      </p>
                      <p className="text-balance">
                        The real challenge isn&apos;t how fast technology moves, it&apos;s cutting
                        through the noise to find what&apos;s relevant, impactful, and answering the
                        fundamental question:{" "}
                        <span className="mt-1.5 block font-medium text-white/95">
                          {"What's in it for us?".split("").map((char, i) => (
                            <span
                              key={i}
                              className="shine-letter"
                              style={{ animationDelay: `${i * 0.07}s` }}
                            >
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </span>
                      </p>
                    </div>
                  ) : null}
                  <div
                    className={`${standaloneMobile ? "hidden sm:block" : "block"} text-balance px-0.5 text-center ${portfolioBodyTextClassName} md:mx-auto md:max-w-3xl md:px-0`}
                  >
                    <p>
                      I have always been all about innovation that is led by instincts, the
                      intersection of technology and human experience.{" "}
                      <span className="hidden md:inline">
                        <br />
                      </span>
                      The real challenge isn&apos;t how fast technology moves, it&apos;s cutting
                      through the noise to find what&apos;s relevant, impactful, and{" "}
                      <span className="hidden md:inline">
                        <br />
                      </span>
                      answering the fundamental question:
                      <br className="hidden md:block" />
                      <span className="md:hidden"> </span>
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
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="relative z-[2] mb-8 px-3 py-3 text-white md:mb-12 md:px-8 md:py-4"
        >
          <div className="container mx-auto">
            <h2
              className={portfolioCompactSectionHeadingClassName}
              style={portfolioCompactSectionHeadingStyle}
            >
              Expertise
            </h2>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-lg border border-purple-400/12 bg-white/[0.04] shadow-sm backdrop-blur-sm transition-all duration-300 group hover:border-purple-400/18 hover:bg-white/[0.08] p-2 sm:p-3 md:p-4 ${
                    index === 2 ? "col-span-2 max-w-lg justify-self-center lg:col-span-1 lg:max-w-none" : ""
                  }`}
                  whileHover={{
                    y: -2,
                    boxShadow:
                      "0 8px 20px -6px rgba(0, 0, 0, 0.25), 0 2px 8px -2px rgba(0, 0, 0, 0.12)"
                  }}
                >
                  <h3
                    className={portfolioDisplayCardTitleClassName}
                    style={portfolioSectionHeadingStyle}
                  >
                    {service.title.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h3>
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`mb-2 w-full object-cover rounded-md shadow-sm ${
                      service.imgHeightClass ?? "h-24 sm:h-28 md:h-32"
                    }`}
                    style={
                      service.imgObjectPosition
                        ? { objectPosition: service.imgObjectPosition }
                        : undefined
                    }
                  />
                  <p className={portfolioBodyTextClassName}>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Release Section */}
        <section
          ref={releaseRef}
          className="relative z-[2] mb-8 px-3 py-6 text-white sm:px-4 md:mb-12 md:px-6 md:py-10"
        >
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2
              className={portfolioCompactSectionHeadingClassName}
              style={portfolioCompactSectionHeadingStyle}
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
                    <p className={`mb-4 md:mb-8 ${portfolioBodyTextClassName}`}>
                      The research and writing I did for the Emerging Technology Trends in
                      the Middle East 2025 report sharpened how I think about tech's
                      velocity in the Middle East. Not just{" "}
                      <span className={portfolioBodyEmphasisClassName}>where</span> it's
                      heading, but what it demands from strategy today. It pushed{" "}
                      <span className={portfolioBodyEmphasisClassName}>me</span> to think
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
                      whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(168,85,247,0.35)" }}
                      className={`${portfolioPillButtonClassName} gap-1.5 text-xs sm:text-sm md:text-base`}
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
          className="relative z-[2] scroll-mt-4 px-3 py-8 md:px-8 md:py-12"
        >
          <h2
            className={portfolioCompactSectionHeadingClassName}
            style={portfolioCompactSectionHeadingStyle}
          >
            Resume
          </h2>
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-purple-400/25 bg-[#0f0c16] shadow-[0_20px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-black/35 px-3 py-2.5 backdrop-blur-sm sm:px-4">
              <div className="flex shrink-0 gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
                <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
                <span className="size-2.5 rounded-full bg-[#28c840]/85" />
              </div>
              <span className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-white/45 sm:text-xs">
                {RESUME_DISPLAY_FILENAME}
              </span>
              <button
                type="button"
                onClick={() => openPublicAssetInNewTab(RESUME_PDF_PATH)}
                className="shrink-0 rounded-lg border border-purple-400/30 bg-purple-500/15 px-2.5 py-1 text-[11px] font-semibold text-purple-100 transition hover:bg-purple-500/25 sm:px-3 sm:text-xs"
              >
                Open
              </button>
            </div>
            <div className="bg-[#1a1625] p-1 sm:p-2">
              {resumePreviewImageSrc && !resumePreviewImageFailed ? (
                <div className="flex max-h-[min(72vh,820px)] min-h-[200px] items-start justify-center overflow-auto rounded-lg bg-[#1e1a28] sm:max-h-[min(75vh,880px)]">
                  <img
                    src={resumePreviewImageSrc}
                    alt="Resume preview"
                    className="h-auto w-full max-w-3xl object-contain object-top"
                    onError={() => setResumePreviewImageFailed(true)}
                  />
                </div>
              ) : resumePdfEmbedSrc ? (
                <iframe
                  src={resumePdfEmbedSrc}
                  title="Resume PDF"
                  className="h-[min(72vh,820px)] w-full rounded-lg border-0 bg-[#2a2635] sm:h-[min(75vh,880px)]"
                />
              ) : (
                <p className={`py-12 text-center ${portfolioBodyTextClassName} text-purple-100/70`}>
                  Resume unavailable.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="relative z-[2] px-3 pb-8 pt-5 text-white md:px-8 md:pb-12 md:pt-8"
        >
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2
              className={portfolioCompactSectionHeadingClassName}
              style={portfolioCompactSectionHeadingStyle}
            >
              {LETS_CONNECT_HEADING}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`mb-4 max-w-2xl mx-auto ${portfolioBodyTextClassName}`}
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
                className="relative flex size-12 items-center justify-center rounded-full border border-purple-400/40 bg-white/10 text-purple-200 shadow-lg backdrop-blur-lg transition-all hover:bg-white/20 md:size-14"
              >
                <span className="i-fa-brands:linkedin z-10 text-xl md:text-2xl" />
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: "0 0 12px 2px #a855f744", opacity: 0.5 }}
                />
              </motion.a>
              <motion.a
                href="mailto:rahaf.k.abutarbush@gmail.com"
                whileHover={{ scale: 1.15, boxShadow: "0 0 24px #a855f7" }}
                className="relative flex size-12 items-center justify-center rounded-full border border-purple-400/40 bg-white/10 text-purple-200 shadow-lg backdrop-blur-lg transition-all hover:bg-white/20 md:size-14"
              >
                <span className="i-fa-solid:envelope z-10 text-xl md:text-2xl" />
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

      {standaloneMobile && (
        <nav
          aria-label="Portfolio sections"
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-[60] overflow-hidden border-t border-white/10 bg-black/70 pb-[max(0.2rem,env(safe-area-inset-bottom,0px))] pt-1 shadow-[0_-6px_28px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          {/* Same star treatment as desktop sticky nav (`navStars`). */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {mobileNavStars.map((star) => (
              <motion.div
                key={`mobile-nav-star-${star.id}`}
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
          <div className="pointer-events-auto relative z-10 mx-auto grid w-full max-w-lg grid-cols-6 gap-0 px-0.5">
            {mobileNavEntries.map(([id, ref, shortLabel, Icon]) => {
              const active = activeSection === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(ref)}
                  whileHover={
                    active
                      ? { scale: 1.02, boxShadow: MOBILE_NAV_HOVER_SHADOW_ACTIVE }
                      : { scale: 1.03, boxShadow: MOBILE_NAV_HOVER_SHADOW_INACTIVE }
                  }
                  whileTap={{ scale: 0.98 }}
                  className={
                    "relative flex min-h-0 min-w-0 flex-col items-center justify-center gap-0 rounded-lg px-0.5 py-1 transition-colors duration-200 " +
                    (active
                      ? "text-white"
                      : "text-purple-400/50 hover:text-purple-200/90 active:text-purple-100")
                  }
                >
                  <span
                    className={
                      "mb-0.5 flex h-7 w-7 items-center justify-center rounded-lg transition-colors " +
                      (active
                        ? "bg-white/[0.08] ring-1 ring-purple-400/25"
                        : "bg-transparent hover:bg-white/[0.04]")
                    }
                    aria-hidden
                  >
                    <Icon
                      className={
                        "h-[1.05rem] w-[1.05rem] shrink-0 " +
                        (active
                          ? "text-purple-100 drop-shadow-[0_0_8px_rgba(168,85,247,0.45)]"
                          : "text-purple-400/70")
                      }
                    />
                  </span>
                  <span
                    className={
                      "max-w-full truncate text-[7px] font-medium uppercase tracking-[0.06em] " +
                      (active ? "text-purple-100/95" : "text-purple-500/55")
                    }
                  >
                    {shortLabel}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );

  return (
    <>
      {standaloneMobile ? (
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
          {scrollInner}
        </div>
      ) : (
        <WindowTemplate>{scrollInner}</WindowTemplate>
      )}
    </>
  );
};

export default About;
