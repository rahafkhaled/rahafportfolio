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

  // Sort articles from newest to oldest by date (descending)
  const sortedArticles = [...newsArticles].sort((a, b) => Number(b.date) - Number(a.date));

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
      <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
        {/* Header */}
        <div className="py-8 px-4 md:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{
              color: '#f4f0ff',
              textShadow: `
                0 0 6px rgba(180, 140, 255, 0.5),
                0 0 12px rgba(180, 140, 255, 0.35),
                0 0 24px rgba(180, 140, 255, 0.25)
              `,
              fontWeight: 400,
              letterSpacing: '-0.01em'
            }}
          >
            In The News
          </h2>
          <p className="text-purple-200/80 text-center mt-2 max-w-3xl mx-auto text-lg font-light">
            A collection of articles, interviews, and media features covering events, projects, and initiatives I've been part of.
          </p>
        </div>
        {/* News Grid */}
        <div className="flex-1 w-full px-2 md:px-8 pb-8 overflow-y-auto max-h-full custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sortedArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group border border-purple-400/20"
              >
                {/* Image */}
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  {/* Source & Year */}
                  <div className="flex justify-between items-center text-sm text-purple-200/80 mt-auto">
                    <span>{article.source}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </WindowTemplate>
  );
};

export default News;
