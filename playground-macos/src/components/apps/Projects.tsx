import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  images: string[];
}

const projects: Project[] = [
  {
    title: "MacOS Portfolio",
    description: "A pixel-perfect recreation of the macOS interface built with React and TypeScript. Features include window management, dock animations, and system-like interactions. The project demonstrates advanced front-end development skills and attention to detail in creating a realistic user experience.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    images: [
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "AI Chat Application",
    description: "An innovative chat application powered by artificial intelligence. Implements real-time messaging, context awareness, and natural language processing. Features include message threading, code syntax highlighting, and intelligent response generation. Built with a focus on performance and user experience.",
    tech: ["Next.js", "OpenAI", "WebSocket", "MongoDB"],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1673187973546-2db941924c63?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1675271591211-126ad94e495d?w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with advanced product management, real-time inventory tracking, and secure payment processing. Includes features like user authentication, shopping cart management, order tracking, and admin dashboard. Optimized for performance and scalability.",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "Stripe"],
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472437774355-71ab6752b434?w=800&auto=format&fit=crop"
    ]
  }
];

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 bg-transparent">
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Project screenshot"
          className="w-full h-full object-cover rounded-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      
      <motion.button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrevious}
      >
        ←
      </motion.button>
      
      <motion.button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
      >
        →
      </motion.button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 bg-transparent">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>
      
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-black/30 backdrop-blur-md rounded-lg overflow-hidden border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div 
                className="w-full md:w-2/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageCarousel images={project.images} />
              </motion.div>
              
              <div className="w-full md:w-3/5 p-6">
                <motion.h2 
                  className="text-2xl font-bold mb-3 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  {project.title}
                </motion.h2>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 