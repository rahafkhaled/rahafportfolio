import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import WindowTemplate from "../WindowTemplate";

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create a ref for the scrollable container
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
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
        { ref: portfolioRef, id: "portfolio" },
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

  // Scroll to section function - updated to scroll within the container
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    const contentElement = contentRef.current;
    const sectionElement = sectionRef.current;
    
    if (contentElement && sectionElement) {
      const containerRect = contentElement.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();
      
      // Calculate the scroll position relative to the container
      const scrollPosition = sectionRect.top - containerRect.top + contentElement.scrollTop;
      
      // Smooth scroll to the section
      contentElement.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }
  };

  // Transform mouse position for parallax effect
  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  const name = "RAHAF";
  const letters = name.split('');
  const numLetters = letters.length;

  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Delivered" },
    { number: "3", label: "Countries" },
    { number: "1000+", label: "People Impacted" }
  ];

  const services = [
    {
      title: "AI Solutions",
      description: "Custom AI development and implementation",
      deliverables: ["Strategy Planning", "Model Development", "Integration", "Training"],
      icon: "💡"
    },
    {
      title: "XR Experiences",
      description: "Immersive virtual and augmented reality",
      deliverables: ["VR Training", "AR Applications", "3D Modeling", "Interactive Design"],
      icon: "🥽"
    },
    {
      title: "Innovation Consulting",
      description: "Digital transformation and strategy",
      deliverables: ["Tech Assessment", "Roadmap Creation", "Implementation", "Training"],
      icon: "🚀"
    }
  ];

  const portfolio = [
    {
      title: "Virtual Humans",
      category: "AI Development",
      image: "img/gallery/project1.jpg"
    },
    {
      title: "VR Training",
      category: "Extended Reality",
      image: "img/gallery/project2.jpg"
    },
    {
      title: "Future Cities",
      category: "Innovation",
      image: "img/gallery/project3.jpg"
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
        className="h-full w-full overflow-y-auto relative"
        style={{
          background: "linear-gradient(45deg, #09041e 0%, #180538 50%, #220450 100%)"
        }}
      >
        {/* Sparkly star background */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          {/* Small sparkling stars */}
          {smallStars.map((star) => (
            <motion.div
              key={`small-star-${star.id}`}
              className="absolute rounded-full bg-white"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: star.alpha
              }}
              animate={{
                opacity: [star.alpha, star.alpha * 0.3, star.alpha],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Medium stars with glow */}
          {mediumStars.map((star) => (
            <motion.div
              key={`medium-star-${star.id}`}
              className="absolute rounded-full bg-purple-300"
              style={{
                width: star.size + 1,
                height: star.size + 1,
                left: `${star.x}%`,
                top: `${star.y}%`,
                boxShadow: "0 0 4px 1px rgba(216, 180, 254, 0.4)",
                opacity: star.alpha
              }}
              animate={{
                opacity: [star.alpha, star.alpha * 0.5, star.alpha],
                boxShadow: [
                  "0 0 4px 1px rgba(216, 180, 254, 0.4)",
                  "0 0 6px 2px rgba(216, 180, 254, 0.6)",
                  "0 0 4px 1px rgba(216, 180, 254, 0.4)"
                ]
              }}
              transition={{
                duration: star.duration * 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Large glowing stars */}
          {largeStars.map((star) => (
            <motion.div
              key={`large-star-${star.id}`}
              className="absolute rounded-full bg-pink-200"
              style={{
                width: star.size + 2,
                height: star.size + 2,
                left: `${star.x}%`,
                top: `${star.y}%`,
                boxShadow: "0 0 8px 2px rgba(244, 114, 182, 0.6)",
                opacity: star.alpha
              }}
              animate={{
                opacity: [star.alpha, star.alpha * 0.6, star.alpha],
                boxShadow: [
                  "0 0 8px 2px rgba(244, 114, 182, 0.6)",
                  "0 0 12px 4px rgba(244, 114, 182, 0.8)",
                  "0 0 8px 2px rgba(244, 114, 182, 0.6)"
                ],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: star.duration * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Subtle nebula clouds */}
          <motion.div
            className="absolute opacity-20 inset-0"
            style={{
              background: "radial-gradient(circle at 30% 70%, rgba(142, 45, 226, 0.2), transparent 40%), radial-gradient(circle at 70% 30%, rgba(86, 26, 170, 0.2), transparent 50%)",
              filter: "blur(40px)"
            }}
            animate={{ 
              opacity: [0.2, 0.15, 0.2],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* macOS-style Navigation Bar */}
        <motion.nav 
          className="sticky top-0 z-50 flex justify-center w-full bg-black/40 backdrop-blur-md py-2 border-b border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center gap-12">
            <motion.button 
              onClick={() => scrollToSection(heroRef)}
              className={`px-4 py-2 text-sm transition-colors ${activeSection === "hero" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection(servicesRef)}
              className={`px-4 py-2 text-sm transition-colors ${activeSection === "services" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Services
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection(portfolioRef)}
              className={`px-4 py-2 text-sm transition-colors ${activeSection === "portfolio" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Work
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection(contactRef)}
              className={`px-4 py-2 text-sm transition-colors ${activeSection === "contact" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen text-white">
          {/* Monogram/Logo with hover effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-12 right-12 w-12 h-12 z-10"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <div className="text-white/80 text-2xl font-light tracking-wider">RA</div>
          </motion.div>

          {/* Full-height rectangle image on right */}
          <div className="absolute top-0 right-0 h-full w-[480px] overflow-hidden border-l border-white/10">
            {/* Photo with parallax effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ 
                translateX: useTransform(mouseX, [0, 1], [-8, 8]),
                translateY: useTransform(mouseY, [0, 1], [-8, 8]) 
              }}
            >
              <motion.img
                src="img/ui/me3.svg"
                alt="Rahaf Abutarbush"
                className="w-full h-full object-cover"
                animate={controls}
              />
            </motion.div>
          </div>

          {/* Text Elements with interactive letters - adjusted for new photo layout */}
          <div className="absolute left-24 right-[480px] top-1/2 -translate-y-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex">
                {letters.map((letter, index) => (
                  <motion.span
                    key={`name-${index}`}
                    className="text-8xl font-extralight tracking-[0.2em] leading-none cursor-default"
                    onMouseEnter={() => setHoveredLetter(index)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    animate={hoveredLetter === index ? { 
                      y: -20, 
                      color: "#EC4899",
                      scale: 1.1,
                      textShadow: "0 0 15px rgba(236, 72, 153, 0.5)"
                    } : { 
                      y: 0, 
                      color: "#FFFFFF",
                      scale: 1,
                      textShadow: "none" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.h2 
                className="text-3xl font-extralight tracking-[0.3em] text-purple-300/70"
                whileHover={{ letterSpacing: "0.35em", color: "#d8b4fe" }}
              >
                PORTFOLIO
              </motion.h2>
            </motion.div>
          </div>

          {/* Title at Bottom with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute bottom-24 left-24"
          >
            <motion.h3 
              className="text-xl font-extralight tracking-[0.15em] text-purple-200/70"
              whileHover={{ 
                color: "#EC4899",
                transition: { duration: 0.3 }
              }}
            >
              Emerging Technology Innovation Lead
            </motion.h3>
          </motion.div>
          
          {/* Animated arrow indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection(servicesRef)}
            whileHover={{ scale: 1.2, color: "#FFFFFF" }}
            style={{ cursor: "pointer" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-24 px-8 relative text-white">
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-16"
            >
              What I Do
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 relative overflow-hidden group"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* Background gradient that moves on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30 opacity-0 group-hover:opacity-100"
                    style={{ 
                      translateX: useTransform(mouseX, [0, 1], [-20, 20]),
                      translateY: useTransform(mouseY, [0, 1], [-20, 20])
                    }}
                  />
                  
                  {/* Service icon */}
                  <motion.div 
                    className="text-4xl mb-4"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  <h3 className="text-xl mb-4 relative z-10">{service.title}</h3>
                  <p className="text-purple-200/70 mb-6 relative z-10">{service.description}</p>
                  <ul className="space-y-2 relative z-10">
                    {service.deliverables.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="text-sm text-blue-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Decorative corner */}
                  <motion.div 
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/30 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} className="py-24 px-8 bg-purple-950/30 backdrop-blur-sm relative text-white">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-16"
            >
              Featured Work
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolio.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-black/40 to-transparent z-10"
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 p-6 z-20"
                    initial={{ y: 0 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="text-sm text-purple-300 mb-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      {item.category}
                    </motion.div>
                    <motion.h3 
                      className="text-xl"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      {item.title}
                    </motion.h3>
                  </motion.div>
                  
                  {/* Animated overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 border-2 border-purple-500/0 rounded-xl z-10"
                    whileHover={{ borderColor: "rgba(168, 85, 247, 0.3)" }}
                    transition={{ duration: 0.2 }}
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