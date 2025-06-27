import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, easeOut } from "framer-motion";
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

  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Delivered" },
    { number: "3", label: "Countries" },
    { number: "1000+", label: "People Impacted" }
  ];

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

  const portfolio = [
    {
      title: "Emerging Technolgies in the Middle East 2025",
      category: "AI Development",
      image: "img/gallery/project1.jpg"
    },
    {
      title: "Ideation Workshops",
      category: "Extended Reality",
      image: "img/gallery/project2.jpg"
    },
    {
      title: "Smart Cities and Emerging Technologies",
      category: "Innovation",
      image: "img/gallery/project3.jpg"
    },
    {
      title: "National Debates",
      category: "Innovation",
      image: "img/gallery/project3.jpg"
    },
    {
      title: "Executive producer and host of TEDx",
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
              onClick={() => scrollToSection(servicesRef)}
              className={`px-6 py-3 text-lg font-medium transition-colors ${activeSection === "services" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              Services
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection(portfolioRef)}
              className={`px-6 py-3 text-lg font-medium transition-colors ${activeSection === "portfolio" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              Work
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection(contactRef)}
              className={`px-6 py-3 text-lg font-medium transition-colors ${activeSection === "contact" ? "text-white" : "text-gray-400 hover:text-white"}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              Contact
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
                    Hi, I'm <span className="text-purple-300">Rahaf</span>
                  </h1>
                  <h2 className="text-2xl font-light text-purple-200/80">
                    Emerging Technology Innovation Lead
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-lg font-light leading-relaxed text-purple-100/90">
                    I've always been drawn to the intersection of technology and human experience.
                    Working in emerging tech, I've realized that the real challenge isn't how fast technology moves—it's cutting
                    through the noise to find what's relevant, impactful, and worth paying attention to 
                    - all while answering the fundamental question: 'What's in it for us?'
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-full text-sm font-light transition-colors"
                    >
                      View My Work
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border border-purple-500/30 hover:border-purple-500/50 rounded-full text-sm font-light transition-colors"
                    >
                      Contact Me
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => scrollToSection(servicesRef)}
            whileHover={{ scale: 1.2, color: "#fff" }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path 
                d="M12 5L12 19M12 19L5 12M12 19L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
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