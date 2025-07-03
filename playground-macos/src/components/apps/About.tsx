import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, easeOut } from "framer-motion";
import WindowTemplate from "../WindowTemplate";

interface AboutProps {
  openApp?: (id: string) => void;
}

const About: React.FC<AboutProps> = ({ openApp }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create a ref for the scrollable container
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Motion values for the parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
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

  // Track mouse movement for various effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const contentElement = contentRef.current;
      if (!contentElement) return;
      
      // Get content element dimensions
      const { left, top, width, height } = contentElement.getBoundingClientRect();
      
      // Calculate normalized mouse position (0 to 1)
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update motion values for parallax
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
  }, []);

  // Scroll to section function - updated for faster scrolling
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    const contentElement = contentRef.current;
    const sectionElement = sectionRef.current;
    
    if (contentElement && sectionElement) {
      const containerRect = contentElement.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();
      const scrollPosition = sectionRect.top - containerRect.top + contentElement.scrollTop;
      
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

  // Transform mouse position for parallax effect
  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  const name = "Hi, I'm Rahaf∆";
  const letters = name.split('');
  const numLetters = letters.length;


  const services = [
    {
      title: "Design Thinking",
      description: "I lead ideation sessions that push technology beyond the buzzwords. It's not just about using the latest tools, it's about applying them with intent.",
      img: "/img/gallery/Ru'ya 4.jpg"
    },
    {
      title: "Product management",
      description: "I thrive in leading product strategy and management in fast-moving spaces like emerging tech, where success isn't about racing to keep up, it's about building with purpose.",
      img: "/img/gallery/metaverse_assembly.jpeg"
    },
    {
      title: "Public speaking",
      description: "I've always been drawn to what makes someone pay attention, or remember something after the meeting is over. Storytelling is about clarity and answering the core question: 'What's in it for us?'",
      img: "/img/gallery/cmu_talking.jpeg"
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

  return (
    <WindowTemplate>
      <div 
        ref={contentRef} 
        className="h-full w-full overflow-y-auto custom-scrollbar relative scroll-smooth bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950"
        style={{
          perspective: "1000px"
        }}
      >
        {/* macOS-style Navigation Bar */}
        <motion.nav 
          className="sticky top-0 z-50 flex justify-center w-full bg-black/70 backdrop-blur-md py-6 border-b border-white/10 relative overflow-visible"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sparkly stars overlay for nav bar */}
          <div className="absolute inset-0 pointer-events-none z-0">
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
                  filter: 'drop-shadow(0 0 6px #a855f7)'
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
          <div className="flex justify-center gap-16 z-10">
            <motion.button 
              onClick={() => scrollToSection(heroRef)}
              className={`px-6 py-3 text-lg font-medium transition-colors ${activeSection === "hero" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => openApp && openApp("artwork-gallery")}
              className="px-6 py-3 text-lg font-medium transition-colors text-gray-400 hover:text-white"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              Events & Engagements
            </motion.button>
            <motion.button 
              onClick={() => openApp && openApp("news")}
              className="px-6 py-3 text-lg font-medium transition-colors text-gray-400 hover:text-white"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
             News Features
            </motion.button>
            <motion.button 
              onClick={() => openApp && openApp("contact")}
              className="px-6 py-3 text-lg font-medium transition-colors text-gray-400 hover:text-white"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
             Contact Me
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section 
          ref={heroRef} 
          className="relative text-white flex items-center justify-center py-20"
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
          {/* Soft gradient fade at bottom to blend sections */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-20" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #1a1333 100%)'}} />
          {/* Content container */}
          <div className="relative flex items-center justify-center w-full">
            <div className="container mx-auto px-8">
              <div className="flex flex-col items-center justify-center text-center space-y-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
<h1
  style={{
    color: '#f4f0ff',
    textShadow: `
      0 0 6px rgba(180, 140, 255, 0.3),
      0 0 12px rgba(180, 140, 255, 0.25),
      0 0 24px rgba(180, 140, 255, 0.2)
    `,
    fontWeight: 400,
    letterSpacing: '-0.01em',
    fontSize: '3.75rem'
  }}
>
  Rahaf Abutarbush
</h1>


<div style={{
  color: '#f4f0ff',
  fontSize: '1.3rem',
  fontWeight: 400,
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  flexWrap: 'wrap'
}}>
  <span>Emerging Technology</span>
  <span style={{
    color: '#caa6ff',
    textShadow: `
      0 0 4px rgba(200, 160, 255, 0.4),
      0 0 8px rgba(200, 160, 255, 0.3)
    `
  }}>▪</span>
  <span>Instinct-led Innovation</span>
  <span style={{
    color: '#caa6ff',
    textShadow: `
      0 0 4px rgba(200, 160, 255, 0.4),
      0 0 8px rgba(200, 160, 255, 0.3)
    `
  }}>▪</span>
  <span>Market Relevance</span>
</div>

                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-lg font-normal leading-relaxed text-purple-100/90">
                    I have always been all about innovation that is lead by instincts, the intersection of technology and human experience. <br></br>
                    The real challenge isn't how fast technology moves, it's cutting
                    through the noise to find what's relevant, impactful, and answering the fundamental question:
                    <br />
                    <span>
                      {"What's in it for us?".split('').map((char, i) => (
                        <span
                          key={i}
                          className="shine-letter"
                          style={{ animationDelay: `${i * 0.07}s` }}
                        >
                          {char === ' ' ? '\u00A0' : char}
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
          className="py-5 px-8 relative text-white mb-14"
        >
          <div className="container mx-auto">
            <h2   style={{
              color: '#f4f0ff',
              textShadow: `
                0 0 6px rgba(180, 140, 255, 0.3),
                0 0 12px rgba(180, 140, 255, 0.25),
                0 0 24px rgba(180, 140, 255, 0.2)
              `,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              fontSize: '2rem',
              textAlign: 'center'
            }} >Expertise</h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 shadow-lg backdrop-blur-lg rounded-xl p-10 border border-purple-400/20 relative overflow-hidden group hover:bg-white/20 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-center" style={{
                    color: '#f4f0ff',
                    textShadow: `
                      0 0 6px rgba(180, 140, 255, 0.3),
                      0 0 12px rgba(180, 140, 255, 0.25),
                      0 0 24px rgba(180, 140, 255, 0.2)
                    `                  }}>
                    {service.title}
                  </h3>
                  <img src={service.img} alt={service.title} className="w-full h-40 object-cover rounded-lg shadow mb-4" />
                  <p className="text-purple-200/80 text-lg leading-[2]">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Release Section */}
        <section className="py-12 px-6 relative text-white mb-14">
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2
              style={{
                color: '#f4f0ff',
                textShadow: `
                  0 0 6px rgba(180, 140, 255, 0.3),
                  0 0 12px rgba(180, 140, 255, 0.25),
                  0 0 24px rgba(180, 140, 255, 0.2)
                `,
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '2rem',
                textAlign: 'center'
              }}
              className="mb-4"
            >
              Latest Release
            </h2>
            <div className="w-full max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 shadow-lg backdrop-blur-lg rounded-2xl border border-purple-400/20 flex flex-col md:flex-row overflow-hidden hover:bg-white/20 transition-all duration-300">
                {/* Image */}
                <div className="md:w-1/3 w-full h-60 md:h-auto flex-shrink-0">
                  <img
                    src="/img/gallery/ai-release-cover.jpg"
                    alt="The evolving AI landscape"
                    className="object-cover w-full h-full md:rounded-l-2xl"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-8 text-left relative">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white" style={{
                      color: '#f4f0ff',
                      textShadow: `
                        0 0 6px rgba(180, 140, 255, 0.3),
                        0 0 12px rgba(180, 140, 255, 0.25),
                        0 0 24px rgba(180, 140, 255, 0.2)
                      `
                    }}>
                      Emerging Technology Trends in the Middle East 2025
                    </h3>
                    <p className="text-purple-100 text-lg leading-relaxed mb-8">
                      The research and writing I did for the Emerging Technology Trends in the Middle East 2025 report sharpened how I think about tech's velocity in the Middle East. Not just <span className="font-semibold text-purple-200">where</span> it's heading, but what it demands from strategy today. It pushed <span className="font-semibold text-purple-200">me</span> to think critically about how trends like AI, immersive tech, and quantum translate into tangible strategies for governments and businesses navigating real transformation.
                    </p>
                  </div>
                  <div className="flex justify-end items-end w-full mt-auto">
                    <motion.a
                      href="https://www.pwc.com/m1/en/publications/2025/docs/emerging-technology-trends-in-the-middle-east-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, boxShadow: '0 0 24px #a855f7' }}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 border border-purple-400/40 text-purple-200 font-semibold shadow-lg hover:bg-white/20 transition-all text-base"
                    >
                      <span className="i-fa-solid:download text-lg" />
                      Download Report
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="pt-8 pb-14 px-8 relative text-white">
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2
              className="mb-4"
              style={{
                color: '#f4f0ff',
                textShadow: `
                  0 0 6px rgba(180, 140, 255, 0.3),
                  0 0 12px rgba(180, 140, 255, 0.25),
                  0 0 24px rgba(180, 140, 255, 0.2)
                `,
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '2rem',
                textAlign: 'center'
              }}
            >
              Let's Connect
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-purple-200/80 mb-4 max-w-2xl mx-auto text-lg font-light"
            >
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-8 mb-8"
            >
              <motion.a
                href="https://www.linkedin.com/in/rahaf-abutarbush/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 24px #a855f7" }}
                className="size-14 flex items-center justify-center rounded-full bg-white/10 border border-purple-400/40 text-purple-200 hover:bg-white/20 transition-all shadow-lg backdrop-blur-lg relative"
              >
                <span className="i-fa-brands:linkedin text-2xl z-10" />
                {/* Always-on subtle glow */}
                <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 0 12px 2px #a855f744', opacity: 0.5 }} />
              </motion.a>
              <motion.a
                href="https://substack.com/@rahaf906630/posts"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 24px #a855f7" }}
                className="size-14 flex items-center justify-center rounded-full bg-white/10 border border-purple-400/40 text-purple-200 hover:bg-white/20 transition-all shadow-lg backdrop-blur-lg relative"
              >
                <span className="i-simple-icons:substack text-2xl z-10" />
                <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 0 12px 2px #a855f744', opacity: 0.5 }} />
              </motion.a>
              <motion.a
                href="mailto:rahaf.k.abutarbush@gmail.com"
                whileHover={{ scale: 1.15, boxShadow: "0 0 24px #a855f7" }}
                className="size-14 flex items-center justify-center rounded-full bg-white/10 border border-purple-400/40 text-purple-200 hover:bg-white/20 transition-all shadow-lg backdrop-blur-lg relative"
              >
                <span className="i-fa-solid:envelope text-2xl z-10" />
                <span className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 0 12px 2px #a855f744', opacity: 0.5 }} />
              </motion.a>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px 5px rgba(168, 85, 247, 0.3)' }}
              className="mt-4 px-8 py-3 rounded-full bg-white/10 border border-purple-400/20 text-purple-200 font-semibold shadow-lg hover:bg-white/20 transition"
              onClick={() => openApp && openApp('contact')}
            >
              Send me a message
            </motion.button>
          </div>
        </section>
      </div>
    </WindowTemplate>
  );
};

export default About;
