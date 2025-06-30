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
      title: "Ideation and Design Thinking",
      description: "We can come up with high-impact ideas that stem from real-world problems",
      deliverables: ["Strategy Planning", "Model Development", "Integration", "Training"],
      icon: "💡"
    },
    {
      title: "Product management",
      description: " From zero to MVP, I manage the full arc - connecting user needs, business goals, and technical feasibility to shape products that actually make sense. Tech moves fast, but the real challenge isn't keeping up - it's making it matter.",
      deliverables: ["VR Training", "AR Applications", "3D Modeling", "Interactive Design"],
      icon: "🥽"
    },
    {
      title: "Public speaking & Storytelling",
      description: "Being a national debate champion, whether it's a keynote, client pitch, demo, or presentation, I translate complex ideas into compelling narratives that people remember.",
      deliverables: ["Tech Assessment", "Roadmap Creation", "Implementation", "Training"],
      icon: "🚀"
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

  return (
    <WindowTemplate>
      <div 
        ref={contentRef} 
        className="h-full w-full overflow-y-auto relative scroll-smooth bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950"
        style={{
          perspective: "1000px"
        }}
      >
        {/* macOS-style Navigation Bar */}
        <motion.nav 
          className="sticky top-0 z-50 flex justify-center w-full bg-black/40 backdrop-blur-md py-6 border-b border-white/5 relative overflow-visible"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sparkly stars overlay for nav bar */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {generateStars(18).map((star) => (
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
                  opacity: [star.alpha, star.alpha * 0.3, star.alpha],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: star.duration * 0.7,
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
              onClick={() => openApp && openApp("projects")}
              className="px-6 py-3 text-lg font-medium transition-colors text-gray-400 hover:text-white"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
             Projects
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
                  <h1 className="text-6xl font-light tracking-tight">
                  Rahaf Abutarbush
                  </h1>
                  <h2 className="text-2xl font-light text-purple-200/80">
                    Emerging Technology <span className="square-separator">▪</span> Instinct-led Innovation <span className="square-separator">▪</span> Market Relevance
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-lg font-light leading-relaxed text-purple-100/90">
                    I have always been all about innovation that is lead by instincts, the intersection of technology and human experience.
                    The real challenge isn't how fast technology moves, it's cutting
                    through the noise to find what's relevant, impactful, and worth paying attention to – all while answering the fundamental question:
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
          className="py-32 px-8 relative text-white"
        >
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-light mb-16 text-center"
            >
              My Areas of Expertise
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 relative overflow-hidden group hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* Simplified background gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Service icon */}
                  <motion.div 
                    className="text-4xl mb-4 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  <h3 className="text-xl mb-4 relative z-10">{service.title}</h3>
                  <p className="text-purple-200/70 mb-6 relative z-10">{service.description}</p>
                  <ul className="space-y-2 relative z-10">
                    {service.deliverables.map((item, i) => (
                      <li 
                        key={i} 
                        className="text-sm text-blue-300 transition-transform duration-200 group-hover:translate-x-1"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Decorative corner */}
                  <motion.div 
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-24 px-8 relative text-white">
          <div className="container mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-8"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-purple-200/70 mb-12 max-w-2xl mx-auto"
            >
              Interested in collaborating or learning more about my work in emerging technologies?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="size-12 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/30 text-purple-300 hover:bg-white/10 transition-colors relative"
              >
                {/* Animated glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    boxShadow: '0 0 15px 5px rgba(168, 85, 247, 0.3)'
                  }}
                />
                <span className="i-fa-brands:linkedin text-xl relative z-10" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="size-12 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/30 text-purple-300 hover:bg-white/10 transition-colors relative"
              >
                {/* Animated glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    boxShadow: '0 0 15px 5px rgba(168, 85, 247, 0.3)'
                  }}
                />
                <span className="i-fa-brands:github text-xl relative z-10" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="size-12 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/30 text-purple-300 hover:bg-white/10 transition-colors relative"
              >
                {/* Animated glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    boxShadow: '0 0 15px 5px rgba(168, 85, 247, 0.3)'
                  }}
                />
                <span className="i-fa-solid:envelope text-xl relative z-10" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </WindowTemplate>
  );
};

export default About; 