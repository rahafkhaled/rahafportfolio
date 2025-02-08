import React, { useState } from "react";
import WindowTemplate from "../WindowTemplate";
import { motion, AnimatePresence } from "framer-motion";

interface NewsArticle {
  title: string;
  publication: string;
  date: string;
  description: string;
  link: string;
  image?: string;
  category: "Tech" | "Business" | "Science" | "Media";
  page: number;
}

const newsArticles: NewsArticle[] = [
  {
    title: "Tech Innovator Revolutionizes AI Development",
    publication: "Tech Weekly",
    date: "March 15, 2024",
    description:
      "Groundbreaking developments in artificial intelligence showcase the future of technology and its impact on society. The innovative approach combines traditional methods with cutting-edge research...",
    link: "https://article-link.com",
    image: "/img/news/article1.jpg",
    category: "Tech",
    page: 1
  },
  {
    title: "Future of Digital Transformation",
    publication: "Digital Trends",
    date: "March 12, 2024",
    description:
      "Exploring the intersection of technology and business transformation. How modern solutions are reshaping traditional industries and creating new opportunities for growth and innovation...",
    link: "https://article-link.com",
    image: "/img/news/article2.jpg",
    category: "Business",
    page: 1
  },
  {
    title: "Emerging Technologies in Healthcare",
    publication: "Science Today",
    date: "March 10, 2024",
    description:
      "Revolutionary advancements in medical technology are paving the way for more effective treatments. New research shows promising results in personalized medicine and AI-driven diagnostics...",
    link: "https://article-link.com",
    image: "/img/news/article3.jpg",
    category: "Science",
    page: 2
  },
  {
    title: "The Impact of Social Media on Modern Journalism",
    publication: "Media Insider",
    date: "March 8, 2024",
    description:
      "An in-depth analysis of how social media platforms are transforming the landscape of news reporting and consumption. Experts weigh in on the future of digital journalism...",
    link: "https://article-link.com",
    image: "/img/news/article4.jpg",
    category: "Media",
    page: 2
  },
  {
    title: "Sustainable Tech Solutions",
    publication: "Green Tech Review",
    date: "March 5, 2024",
    description:
      "Innovative approaches to environmental challenges through technology. Companies are leading the charge in developing eco-friendly solutions for a sustainable future...",
    link: "https://article-link.com",
    image: "/img/news/article5.jpg",
    category: "Tech",
    page: 3
  },
  {
    title: "Breakthroughs in Quantum Computing",
    publication: "Science Weekly",
    date: "March 3, 2024",
    description:
      "Recent developments in quantum computing promise to revolutionize data processing and security. Researchers achieve new milestones in quantum supremacy...",
    link: "https://article-link.com",
    image: "/img/news/article6.jpg",
    category: "Science",
    page: 3
  },
  {
    title: "The Evolution of Digital Marketing",
    publication: "Marketing Today",
    date: "March 1, 2024",
    description:
      "How AI and machine learning are transforming digital marketing strategies. New tools and technologies are enabling more personalized and effective campaigns...",
    link: "https://article-link.com",
    image: "/img/news/article7.jpg",
    category: "Business",
    page: 4
  },
  {
    title: "Future of Remote Work Technology",
    publication: "Tech Insider",
    date: "February 28, 2024",
    description:
      "Exploring the latest innovations in remote collaboration tools and virtual office technologies. How companies are adapting to the new normal of distributed teams...",
    link: "https://article-link.com",
    image: "/img/news/article8.jpg",
    category: "Tech",
    page: 4
  }
];

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const totalPages = Math.ceil(newsArticles.length / 2);

  const changePage = (newDirection: "left" | "right") => {
    if (isAnimating) return;

    setDirection(newDirection);
    setIsAnimating(true);

    const nextPage = newDirection === "right" ? currentPage + 1 : currentPage - 1;
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  const pageTransition = {
    enter: (direction: "left" | "right") => ({
      position: "absolute",
      opacity: 0,
      x: direction === "right" ? 10 : -10,
      transition: {
        opacity: { duration: 0.5 }
      }
    }),
    center: {
      position: "absolute",
      zIndex: 1,
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 0.5 },
        x: { duration: 0.3 }
      }
    },
    exit: (direction: "left" | "right") => ({
      position: "absolute",
      zIndex: 0,
      opacity: 0,
      x: direction === "right" ? -10 : 10,
      transition: {
        opacity: { duration: 0.5 }
      }
    })
  };

  return (
    <WindowTemplate>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="relative z-10 py-4 md:py-6 px-8 flex-shrink-0">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white text-center"
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -20, opacity: 0 }}
          >
            Featured Articles
          </motion.h1>
        </div>

        {/* Content - Updated with aspect ratio container */}
        <div className="flex-1 relative min-h-0">
          {/* Navigation Buttons */}
          <button
            onClick={() => changePage("left")}
            disabled={currentPage === 1 || isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white disabled:opacity-30 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/10 p-3 rounded-full backdrop-blur-sm"
            >
              <span className="i-ph:caret-left text-3xl" />
            </motion.div>
          </button>

          <button
            onClick={() => changePage("right")}
            disabled={currentPage === totalPages || isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white disabled:opacity-30 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/10 p-3 rounded-full backdrop-blur-sm"
            >
              <span className="i-ph:caret-right text-3xl" />
            </motion.div>
          </button>

          {/* Articles - Updated grid */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={{
                  enter: (direction: "left" | "right") => ({
                    position: "absolute" as const,
                    opacity: 0,
                    x: direction === "right" ? 1000 : -1000,
                    transition: {
                      opacity: { duration: 0.2 }
                    }
                  }),
                  center: {
                    position: "absolute" as const,
                    zIndex: 1,
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5
                    }
                  },
                  exit: (direction: "left" | "right") => ({
                    position: "absolute" as const,
                    opacity: 0,
                    x: direction === "right" ? -1000 : 1000,
                    transition: {
                      opacity: { duration: 0.2 }
                    }
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-8 lg:p-12 auto-rows-min overflow-auto"
              >
                {newsArticles
                  .filter((article) => article.page === currentPage)
                  .map((article, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.1,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                      className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
                        hover:bg-white/15 transition-all duration-300 group
                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                        dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                        dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                    >
                      {article.image && (
                        <div className="relative w-full pt-[56.25%] overflow-hidden">
                          {" "}
                          {/* 16:9 aspect ratio */}
                          <motion.img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            whileHover={{
                              scale: 1.03,
                              transition: { duration: 0.4 }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                      <motion.div
                        className="flex-1 p-4 md:p-6 flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <motion.h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                          {article.title}
                        </motion.h3>
                        <p className="text-gray-300 text-sm line-clamp-2 md:line-clamp-3 mb-4 flex-1">
                          {article.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm mt-auto">
                          <span className="text-blue-400">{article.publication}</span>
                          <span className="text-gray-400">{article.date}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center gap-2 py-4 flex-shrink-0">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                currentPage === idx + 1 ? "bg-blue-500" : "bg-gray-600"
              }`}
              animate={{
                scale: currentPage === idx + 1 ? 1.2 : 1,
                opacity: currentPage === idx + 1 ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>
    </WindowTemplate>
  );
}

export default News;
