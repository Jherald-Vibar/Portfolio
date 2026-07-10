import { useEffect, useState } from "react";

const PROMPT = "root@jhe-dev MINGW64 ~/portfolio";

const BOOT_LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "jherald_vibar" },
  { type: "cmd", text: "git clone https://github.com/Jherald-Vibar/portfolio.git" },
  { type: "out", text: "Cloning into 'portfolio'... done." },
  { type: "cmd", text: "cd portfolio && npm install" },
  { type: "out", text: "added 842 packages in 2.4s" },
  { type: "cmd", text: "npm run dev" },
  { type: "out", text: "➜  Local:   http://localhost:5173/" },
  { type: "out", text: "➜  ready in 612 ms ✓" },
];

export default function TerminalIntro({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [closing, setClosing] = useState(false);
  const [blink, setBlink] = useState(true);

  const current = BOOT_LINES[lineIndex];

  // cursor blink
  useEffect(() => {
    const b = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(b);
  }, []);

  // boot sequence
  useEffect(() => {
    if (!current) {
      const t = setTimeout(() => {
        setClosing(true);
        setTimeout(onComplete, 500);
      }, 550);
      return () => clearTimeout(t);
    }

    if (current.type === "out") {
      const t = setTimeout(() => {
        setHistory((h) => [...h, current]);
        setLineIndex((i) => i + 1);
        setCharCount(0);
      }, 260);
      return () => clearTimeout(t);
    }

    if (charCount < current.text.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 26);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setHistory((h) => [...h, current]);
      setLineIndex((i) => i + 1);
      setCharCount(0);
    }, 240);
    return () => clearTimeout(t);
  }, [lineIndex, charCount, current, onComplete]);

  const handleSkip = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onComplete, 400);
  };

  const renderCmd = (text, showCursor) => (
    <span>
      <span style={{ color: "#4f8ef7" }}>➜</span>{" "}
      <span style={{ color: "#34d399" }}>~/portfolio</span>{" "}
      <span style={{ color: "rgba(255,255,255,0.88)" }}>{text}</span>
      {showCursor && (
        <span style={{ opacity: blink ? 1 : 0, color: "#4f8ef7" }}>▍</span>
      )}
    </span>
  );

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a10] px-4"
      style={{
        opacity: closing ? 0 : 1,
        transition: "opacity 0.45s ease",
        pointerEvents: closing ? "none" : "auto",
      }}
    >
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 md:top-8 md:right-10 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Skip Intro »
      </button>

      <div
        className="w-full max-w-xl rounded-xl overflow-hidden border"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        {/* window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: "#15151d", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
          <span
            className="ml-2 text-[11px] text-white/35 truncate"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            {PROMPT}
          </span>
        </div>

        {/* terminal body */}
        <div
          className="px-5 py-5 text-sm leading-relaxed min-h-[260px]"
          style={{ background: "#0d0d13", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
        >
          {history.map((line, i) => (
            <div key={i} className="mb-1">
              {line.type === "cmd" ? (
                renderCmd(line.text, false)
              ) : (
                <span style={{ color: "rgba(255,255,255,0.42)" }}>{line.text}</span>
              )}
            </div>
          ))}

          {current && (
            <div>
              {current.type === "cmd" ? (
                renderCmd(current.text.slice(0, charCount), true)
              ) : (
                <span style={{ color: "rgba(255,255,255,0.2)" }}>...</span>
              )}
            </div>
          )}

          {!current && (
            <div className="mt-2">
              {renderCmd("", true)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}