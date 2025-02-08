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

  const [emoji, setEmoji] = useState("");
  const [drops, setDrops] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

  useInterval(rain, 33);

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

export default function Terminal() {
  return (
    <WindowTemplate>
      <div
        className="terminal font-terminal font-normal relative h-full bg-gray-800/90 overflow-y-scroll"
        text="white sm"
      >
        <div p="y-2 x-1.5">
          <span className="text-green-300">ヽ(ˋ▽ˊ)ノ</span>: Hey, you found the terminal!
          Type `help` to get started.
        </div>
        <div id="terminal-content" p="x-1.5 b-2">
          {/* Existing Terminal content */}
        </div>
      </div>
    </WindowTemplate>
  );
}
