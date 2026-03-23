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
      <div className="bg-transparent p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white md:mb-8 md:text-3xl lg:text-4xl">
          Featured Projects
        </h1>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-lg transition-all duration-300 hover:border-purple-400/40 hover:shadow-2xl sm:flex-row sm:gap-6 sm:p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon/Emoji */}
                  <motion.div 
                className="block sm:hidden text-4xl flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 group-hover:bg-purple-400/20 transition-all duration-300"
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {project.icon}
                  </motion.div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="mb-1 text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
                  {project.title}
                </h2>
                <p className="mb-3 text-base font-light leading-relaxed text-purple-200/80 md:text-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map(tech => (
                    <span
                          key={tech}
                      className="px-3 py-1 border border-white/10 rounded-full text-sm text-white bg-white/5 transition-all duration-200 hover:shadow-[0_0_8px_2px_rgba(168,85,247,0.25)] hover:border-purple-400/40 cursor-default"
                        >
                          {tech}
                    </span>
                      ))}
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