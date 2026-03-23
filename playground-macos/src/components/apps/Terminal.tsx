import React from "react";
import { terminal } from "~/configs";
import type { TerminalData } from "~/types";
import WindowTemplate from "../WindowTemplate";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789落霞与孤鹜齐飞秋水共长天一色";
const EMOJIS = ["\\(o_o)/", "(˚Δ˚)b", "(^-^*)", "(╯‵□′)╯", "\\(°ˊДˋ°)/", "╰(‵□′)╯"];

const getEmoji = () => {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
};

interface TerminalState {
  rmrf: boolean;
  content: JSX.Element[];
}

// rain animation is adopted from: https://codepen.io/P3R0/pen/MwgoKv
const HowDare = ({ setRMRF }: { setRMRF: (value: boolean) => void }) => {
  const FONT_SIZE = 12;

  const [emoji, setEmoji] = React.useState("");
  const [drops, setDrops] = React.useState<number[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;

    const columns = Math.floor(canvas.width / FONT_SIZE);
    setDrops(Array(columns).fill(1));

    setEmoji(getEmoji());
  }, []);

  const rain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#2e9244";
    ctx.font = `${FONT_SIZE}px arial`;

    drops.forEach((y, x) => {
      const text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      ctx.fillText(text, x * FONT_SIZE, y * FONT_SIZE);
    });

    setDrops(
      drops.map((y) => {
        // sends the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) return 1;
        // increments Y coordinate
        else return y + 1;
      })
    );
  };

  React.useInterval(rain, 33);

  return (
    <div
      ref={containerRef}
      className="fixed size-full bg-black text-white"
      onClick={() => setRMRF(false)}
    >
      <canvas ref={canvasRef}></canvas>
      <div className="font-avenir absolute h-28 text-center space-y-4 m-auto inset-0">
        <div text-4xl>{emoji}</div>
        <div text-3xl>HOW DARE YOU!</div>
        <div>Click to go back</div>
      </div>
    </div>
  );
};

const Terminal: React.FC = () => {
  return (
    <WindowTemplate>
      <div className="w-full bg-black p-4 pb-[max(1rem,env(safe-area-inset-bottom))] font-mono text-[15px] leading-relaxed text-white md:text-sm">
        <div className="space-y-5 md:space-y-4">
          <div>
            <span className="text-green-500">➜</span> <span className="text-blue-400">whoami</span>
            <p className="mt-2">
              Hi! I'm Rahaf, an Emerging Tech Innovation Lead based in the Middle East, passionate about bridging technology and user experience.
            </p>
          </div>

          <div>
            <span className="text-green-500">➜</span> <span className="text-blue-400">education</span>
            <p className="mt-2">
              🎓 Carnegie Mellon University (2018-2022)<br />
              BSc. in Information Systems<br />
              Minor: Business Administration<br />
              Concentration: Human-computer Interaction & User Experience<br />
              Honors: Senior Leadership Award, Dean's list 2021
            </p>
          </div>

          <div>
            <span className="text-green-500">➜</span> <span className="text-blue-400">current_role</span>
            <p className="mt-2">
              💼 PwC Middle East - Emerging Tech Innovation Lead & Qatar Lead<br />
              • Leading Qatar's Emerging Technology lab<br />
              • Driving innovation and digital transformation<br />
              • Bridging technology with business value
            </p>
        </div>

          <div>
            <span className="text-green-500">➜</span> <span className="text-blue-400">skills</span>
            <p className="mt-2">
              💻 Technical: Python, Java, Ruby on Rails, SQL, PHP, R, Web Development, Prompt Engineering<br />
              🎨 Design: Figma, Video & Photo Editing, Podcast Production, Script Writing<br />
              🗣️ Languages: Arabic (Native), English (Fluent)
            </p>
      </div>

          <div>
            <span className="text-green-500">➜</span> <span className="text-blue-400">leadership</span>
            <p className="mt-2">
              🎯 Captain - CMU Arabic Debate Team<br />
              🎤 President & Executive Producer - TEDxCMUQ<br />
              📱 Media Manager - TEDxyouthAlDafna<br />
              👥 Outreach Director - Information Systems Association
            </p>
      </div>

          <div>
            <span className="text-green-500">➜</span> <span className="text-blue-400">recent_engagements</span>
            <p className="mt-2">
              🎪 LEAP 2024 - Future of XR<br />
              🌆 Smart Cities Doha - Shaping the Smart Cities of the Future<br />
              👩‍💻 Women in Tech PwC x Microsoft<br />
              📺 Euronews - Into the Metaverse<br />
              🚀 Ru'ya - Transforming the Workforce with Emerging Tech
            </p>
        </div>
        </div>
      </div>
    </WindowTemplate>
    );
};

export default Terminal;
