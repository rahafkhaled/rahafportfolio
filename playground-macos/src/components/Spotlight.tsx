import React from "react";
import { format } from "date-fns";
import searchIndex from "~/utils/searchIndex";

const getRandom = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const timeStamp = new Date().getTime();
  const randomStamp = getRandom(0, timeStamp);
  const date = format(randomStamp, "MM/dd/yyyy");
  return date;
};

interface SpotlightProps {
  toggleSpotlight: () => void;
  openApp: (id: string) => void;
  toggleLaunchpad: (target: boolean) => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

interface SearchIndexItem {
  title: string;
  description?: string;
  section: string;
  appId: string;
  url?: string;
}

export default function Spotlight({
  toggleSpotlight,
  openApp,
  toggleLaunchpad,
  btnRef
}: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [clickedID, setClickedID] = useState("");
  const [doubleClicked, setDoubleClicked] = useState<boolean>(false);

  const [searchText, setSearchText] = useState("");
  const [curDetails, setCurDetails] = useState<any>(null);

  const [appIdList, setAppIdList] = useState<string[]>([]);
  const [appList, setAppList] = useState<JSX.Element | null>(null);

  const [results, setResults] = useState<SearchIndexItem[]>([]);

  const textWhite = "text-white";
  const textBlack = "text-c-black";
  const textSelected = "bg-blue-500";

  useClickOutside(spotlightRef, toggleSpotlight, [btnRef]);

  useEffect(() => {
    if (!searchText) {
      setResults([]);
      return;
    }
    const text = searchText.toLowerCase();
    setResults(
      searchIndex.filter(item =>
        item.title.toLowerCase().includes(text) ||
        (item.description && item.description.toLowerCase().includes(text))
      )
    );
  }, [searchText]);

  useEffect(() => {
    if (doubleClicked) {
      launchSelectedApp();
      setDoubleClicked(false);
    }
  }, [doubleClicked]);

  const launchSelectedApp = () => {
    if (curDetails.type === "app" && !curDetails.link) {
      const id = curDetails.id;
      if (id === "launchpad") toggleLaunchpad(true);
      else openApp(id);
      toggleSpotlight();
    } else {
      window.open(curDetails.link);
      toggleSpotlight();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = e.key;
    const numApps = appIdList.length;

    // ----------- select next app -----------
    if (keyCode === "ArrowDown" && selectedIndex < numApps - 1) {
      updateHighlight(selectedIndex, selectedIndex + 1);
      setSelectedIndex(selectedIndex + 1);
    }
    // ----------- select previous app -----------
    else if (keyCode === "ArrowUp" && selectedIndex > 0) {
      updateHighlight(selectedIndex, selectedIndex - 1);
      setSelectedIndex(selectedIndex - 1);
    }
    // ----------- launch app -----------
    else if (keyCode === "Enter") {
      if (!curDetails) return;
      launchSelectedApp();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update highlighted line
    updateHighlight(selectedIndex, 0);
    // current selected id go back to 0
    setSelectedIndex(0);
    // update search text and associating app list
    setSearchText(e.target.value);
  };

  const updateHighlight = (prevIndex: number, curIndex: number) => {
    if (appIdList.length === 0) return;

    // remove highlight
    const prevAppId = appIdList[prevIndex];
    const prev = document.querySelector(`#spotlight-${prevAppId}`) as HTMLElement;
    prev.className = prev.className
      .replace(textWhite, textBlack)
      .replace(textSelected, "bg-transparent");

    // add highlight
    const curAppId = appIdList[curIndex];
    const cur = document.querySelector(`#spotlight-${curAppId}`) as HTMLElement;
    cur.className = cur.className
      .replace(textBlack, textWhite)
      .replace("bg-transparent", textSelected);
  };

  return (
    <div className="spotlight bg-[#232136]/80 backdrop-blur-2xl rounded-xl shadow-xl font-avenir p-0 flex flex-col items-center">
      <input
        ref={inputRef}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="w-[420px] max-w-full px-6 py-3 rounded-xl bg-[#232136]/80 backdrop-blur-2xl border-none text-white text-left font-avenir text-lg shadow-xl focus:outline-none placeholder-white/50 transition-all duration-300"
        placeholder="Spotlight Search"
        autoFocus
      />
      <ul className="mt-4 w-full max-w-full px-2">
        {results.length === 0 && searchText && (
          <li className="text-white/60 text-left">No results found.</li>
        )}
        {results.map((item: SearchIndexItem, idx) => (
          <li
            key={idx}
            className="p-3 rounded hover:bg-white/10 cursor-pointer text-white text-left"
            onClick={() => {
              if (
                (item.title.toLowerCase() === "resume" || item.title.toLowerCase() === "cv") &&
                item.url
              ) {
                window.open(item.url, "_blank");
              } else if (item.url) {
                openApp(item.appId, item.url);
              } else {
                openApp(item.appId);
              }
              toggleSpotlight();
            }}
          >
            <div className="font-semibold text-white text-left">{item.title}</div>
            {item.description && (
              <div className="text-white/70 text-sm text-left">{item.description}</div>
            )}
            <div className="text-xs text-white/40 mt-1 text-left">{item.section}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
