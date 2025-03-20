import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WindowTemplate from "../WindowTemplate";

interface NewsArticle {
  title: string;
  source: string;
  date: string;
  link: string;
  category: string;
  image: string;
  page: number;
}

const News: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  
  const newsArticles: NewsArticle[] = [
    {
      title: "PwC Middle East in Qatar, Microsoft host conversation on gender balance in technology industry",
      source: "The Peninsula Qatar",
      date: "2024",
      link: "https://thepeninsulaqatar.com/article/29/02/2024/pwc-middle-east-in-qatar-microsoft-host-conversation-on-gender-balance-in-technology-industry",
      category: "Industry Leadership",
      image: "img/news/pwc x microsoft.png",
      page: 1
    },
    {
      title: "New virtual economy: What does the rise of the metaverse mean?",
      source: "Euronews",
      date: "2022",
      link: "https://www.euronews.com/business/2022/08/17/new-virtual-economy-what-does-the-rise-of-the-metaverse-mean",
      category: "Media Feature",
      image: "img/news/EURONEWS.png",
      page: 1
    },
    {
      title: "Students Present Demos for Tech Startup Launchpad Course",
      source: "CMU-Q News",
      date: "2024",
      link: "https://www.qatar.cmu.edu/news/students-present-demos-for-tech-startup-launchpad-course/",
      category: "Innovation",
      image: "img/news/Tech startup launchpad.jpg",
      page: 1
    },
    {
      title: "Carnegie Mellon Qatar Celebrates Student Success",
      source: "Gulf Times",
      date: "2022",
      link: "https://www.gulf-times.com/story/703440/carnegie-mellon-qatar-celebrates-student-success",
      category: "Achievement",
      image: "img/news/Student Success.jpg",
      page: 2
    },
    {
      title: "Carnegie Mellon Celebrates Women in STEM Fields",
      source: "CMU-Q News",
      date: "2024",
      link: "https://www.qatar.cmu.edu/news/carnegie-mellon-celebrates-women-in-stem-fields/",
      category: "Women in Tech",
      image: "img/news/women_in_stem.jpg",
      page: 2
    },
    {
      title: "Carnegie Mellon Students Win National Debate Contest",
      source: "The Peninsula Qatar",
      date: "2022",
      link: "https://thepeninsulaqatar.com/article/28/04/2022/carnegie-mellon-students-win-national-debate-contest",
      category: "Achievement",
      image: "img/news/national debate champions.jpg",
      page: 2
    },
    {
      title: "CMU-Q team wins Arabic University debate championship",
      source: "Qatar Tribune",
      date: "2022",
      link: "https://www.qatar-tribune.com/article/215327/NATION/CMU-Q-team-wins-Arabic-University-debate-championship",
      category: "Achievement",
      image: "img/news/arabic debate champions.png",
      page: 3
    },
    {
      title: "CMU-Q student club overcomes obstacles to host TEDx event",
      source: "CMU-Q News",
      date: "2021",
      link: "https://www.qatar.cmu.edu/news/cmu-q-student-club-overcomes-obstacles-to-host-tedx-event/",
      category: "Leadership",
      image: "img/news/tedx.png",
      page: 3
    },
    {
      title: "On UN Arabic Language Day, Top CMU-Q Team Reflects on Growth of Arabic Debate",
      source: "CMU-Q News",
      date: "2022",
      link: "https://www.qatar.cmu.edu/news/on-un-arabic-language-day-top-cmu-q-team-reflects-on-growth-of-arabic-debate/",
      category: "Feature",
      image: "img/news/UN arabic language day.jpg",
      page: 3
    }
  ];

  const totalPages = Math.ceil(newsArticles.length / 3);

  const changePage = (newDirection: "left" | "right") => {
    if (isAnimating) return;

    setDirection(newDirection);
    setIsAnimating(true);

    const nextPage = newDirection === "right" ? currentPage + 1 : currentPage - 1;
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }

    setTimeout(() => setIsAnimating(false), 100);
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
            In The News
          </motion.h1>
          <motion.p
            className="text-white/80 text-center mt-3 max-w-3xl mx-auto"
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -10, opacity: 0 }}
            transition={{ delay: 0 }}
          >
            A collection of articles, interviews, and media features covering events, projects, and initiatives I've been part of.
          </motion.p>
        </div>

        {/* Content */}
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

          {/* Articles */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={{
                  enter: (direction: "left" | "right") => ({
                    x: direction === "right" ? 1000 : -1000,
                    opacity: 0
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1
                  },
                  exit: (direction: "left" | "right") => ({
                    zIndex: 0,
                    x: direction === "right" ? -1000 : 1000,
                    opacity: 0
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 700, damping: 50 },
                  opacity: { duration: 0.05 }
                }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-4 md:p-8 lg:p-12 auto-rows-min overflow-auto"
              >
                {newsArticles
                  .filter((article) => article.page === currentPage)
                  .map((article, idx) => (
                    <motion.a
                      key={idx}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.04,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
                        hover:bg-white/15 transition-all duration-300
                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
                    >
                      <div className="relative w-full pt-[56.25%] overflow-hidden">
                        <motion.img
                          src={article.image}
                          alt={article.title}
                          className={`absolute inset-0 w-full h-full object-cover ${
                            article.title.includes("Arabic University debate") ? "object-top" : ""
                          }`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2">
                          <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500/80 rounded">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 p-4 md:p-6">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-300 mt-auto">
                          <span>{article.source}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </motion.a>
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
};

export default News;
