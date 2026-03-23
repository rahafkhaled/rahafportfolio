import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

interface NewsProps {
  embedded?: boolean;
}

const News: React.FC<NewsProps> = ({ embedded }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const sortedArticles = [...newsArticles].sort((a, b) => Number(b.date) - Number(a.date));

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  const body = (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
      <div className="px-3 pb-1 pt-4 md:px-8 md:pb-2 md:pt-8">
        <h2
          className="mb-1.5 text-center text-xl font-normal md:mb-2 md:text-3xl lg:text-4xl"
          style={{
            color: "#f4f0ff",
            textShadow: `
              0 0 6px rgba(180, 140, 255, 0.5),
              0 0 12px rgba(180, 140, 255, 0.35),
              0 0 24px rgba(180, 140, 255, 0.25)
            `,
            letterSpacing: "-0.01em"
          }}
        >
          In The News
        </h2>
        <p className="mx-auto mt-1.5 max-w-2xl text-center text-xs font-light text-purple-200/75 md:mt-2 md:text-base">
          Press and media: swipe or use the controls to browse stories.
        </p>
      </div>

      <div className="relative pb-1 pt-2 md:pb-6 md:pt-4">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {sortedArticles.map((article, idx) => (
              <div
                key={idx}
                className="min-w-0 flex-[0_0_100%] px-2 sm:px-6"
              >
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-cyan-500/25 bg-gradient-to-br from-slate-950/95 via-[#1a1030]/90 to-slate-950/95 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/5 transition hover:border-cyan-400/40 hover:ring-cyan-500/20 md:flex-row md:items-stretch md:gap-8 md:rounded-2xl md:p-8"
                >
                  <div className="relative w-full shrink-0 overflow-hidden rounded-lg border border-white/10 md:w-[42%] md:rounded-xl">
                    <div className="h-[clamp(132px,38vw,196px)] w-full md:h-full md:min-h-[200px]">
                      <img
                        src={article.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center text-left">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/85 md:mb-2 md:text-[11px] md:tracking-[0.2em]">
                      {article.category}
                    </p>
                    <h3 className="mb-3 text-base font-semibold leading-snug text-white md:mb-4 md:text-xl lg:text-2xl">
                      {article.title}
                    </h3>
                    <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/10 pt-3 text-xs text-purple-200/75 md:pt-4 md:text-sm">
                      <span className="font-medium text-purple-100/90">{article.source}</span>
                      <span className="text-purple-300/50">·</span>
                      <time className="tabular-nums text-purple-200/60">{article.date}</time>
                    </div>
                    <p className="mt-2 text-[11px] text-cyan-200/50 group-hover:text-cyan-200/70 md:mt-3 md:text-xs">
                      Read article →
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-col items-center gap-3 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:mt-6 sm:gap-4 sm:px-4 md:pb-8">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {sortedArticles.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`h-2 rounded-full transition-all ${
                  i === selectedIndex
                    ? "w-8 bg-cyan-400/90 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                    : "w-2 bg-white/20 hover:bg-white/35"
                }`}
                aria-label={`Go to article ${i + 1}`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/35 bg-cyan-950/40 px-3 py-1.5 text-xs font-medium text-cyan-100/90 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-300/50 hover:bg-cyan-900/30 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous article"
            >
              <span className="i-ph:caret-left text-base sm:text-lg" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/35 bg-cyan-950/40 px-3 py-1.5 text-xs font-medium text-cyan-100/90 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-300/50 hover:bg-cyan-900/30 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next article"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="i-ph:caret-right text-base sm:text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) return body;
  return <WindowTemplate>{body}</WindowTemplate>;
};

export default News;
