import React from "react";
import { motion } from "framer-motion";
import WindowTemplate from "../WindowTemplate";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Virtual AI Humans & Clickable Videos",
      description: "Built and showcased innovation in distance learning for government client",
      category: "AI & Education",
      icon: "🤖",
      tech: ["AI", "Video", "Education"]
    },
    {
      title: "GenAI Use Case Inventory",
      description: "Compiled a comprehensive list of 500+ use cases for various industries and lines of service",
      category: "AI Research",
      icon: "🧠",
      tech: ["AI", "Research", "Industry Analysis"]
    },
    {
      title: "Tourism Authority R&D Playbook",
      description: "Created framework and KPIs to measure success of the new department",
      category: "Strategy",
      icon: "📊",
      tech: ["Strategy", "KPIs", "Framework"]
    },
    {
      title: "Conversational AI",
      description: "Built agent utilizing Realtime API and engineered prompts to ensure an intuitive tone",
      category: "AI Development",
      icon: "💬",
      tech: ["AI", "NLP", "API Integration"]
    },
    {
      title: "Emerging Technologies in the Middle East 2025",
      description: "Authored thought leadership piece on the future of technology in the region",
      category: "Research",
      icon: "📱",
      tech: ["Research", "Technology Trends", "Middle East"]
    }
  ];

  const engagements = [
    { event: "LEAP 2024", topic: "Future of XR", icon: "🎪" },
    { event: "Smart Cities Doha", topic: "Shaping Future Cities", icon: "🌆" },
    { event: "Women in Tech", topic: "PwC x Microsoft", icon: "👩‍💻" },
    { event: "Euronews", topic: "Into the Metaverse", icon: "📺" }
  ];

  return (
    <WindowTemplate>
      <div className="h-full overflow-y-auto p-6 bg-transparent">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
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
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="text-4xl"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h2 
                      className="text-2xl font-bold mb-2 text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.title}
                    </motion.h2>
                    
                    <p className="text-gray-300 mb-4">
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
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2 
          className="text-2xl font-bold mt-12 mb-6 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Recent Speaking Engagements
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.event}
              className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {engagement.icon}
                </motion.span>
                <div>
                  <h3 className="font-semibold text-white">
                    {engagement.event}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {engagement.topic}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </WindowTemplate>
  );
};

export default Projects; 