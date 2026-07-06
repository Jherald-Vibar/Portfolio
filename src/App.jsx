import { useEffect, useRef, useState } from "react";
import { SKILLS, PROJECTS } from './constant/data.js';
import Footer from "./components/parts/Footer.jsx";
import Profile from './assets/images/profile.jpg';

function GameTypewriter({ text, speed = 150 }) {
  const [count, setCount] = useState(0);
  const [blink, setBlink] = useState(true);
  const letters = text.split("");

  useEffect(() => {
    if (count >= letters.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [count, letters.length, speed]);

  useEffect(() => {
    const b = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(b);
  }, []);

  return (
    <span className="tracking-[0.3em]">
      {letters.map((char, i) => (
        <span
          key={i}
          style={{ opacity: i < count ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          {char}
        </span>
      ))}
      {count < letters.length && (
        <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
      )}
    </span>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090f] text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        h1, h2, h3, .display { font-family: 'Space Grotesk', sans-serif; }
        .glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(100, 160, 255, 0.2);
          transition: all 0.3s ease;
        }
        .glow-text {
          background: linear-gradient(135deg, #fff 0%, #a0c4ff 60%, #6b9fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tag {
          background: rgba(79, 142, 247, 0.12);
          border: 1px solid rgba(79, 142, 247, 0.25);
          color: #7eb8ff;
          font-size: 11px;
          padding: 2px 10px;
          border-radius: 999px;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.03em;
        }
        .skill-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          transition: all 0.2s ease;
        }
        .skill-chip:hover {
          background: rgba(79, 142, 247, 0.1);
          border-color: rgba(79, 142, 247, 0.3);
          transform: translateY(-2px);
        }
        .nav-link {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          transition: color 0.2s;
        }
        .nav-link:hover { color: rgba(255,255,255,0.95); }

        @keyframes hueShift {
          0%   { filter: hue-rotate(0deg); }
          50%  { filter: hue-rotate(180deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .cursor-glow {
          pointer-events: none;
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(79,142,247,0.14) 0%,
            rgba(123,140,250,0.10) 25%,
            rgba(167,139,250,0.07) 45%,
            rgba(206,127,216,0.04) 60%,
            rgba(244,114,182,0.02) 75%,
            transparent 100%
          );
          transform: translate(-50%, -50%);
          transition: left 0.08s ease, top 0.08s ease;
          animation: hueShift 12s ease-in-out infinite;
          z-index: 0;
        }
        .orb-1 { animation: hueShift 14s ease-in-out infinite; }
        .orb-2 { animation: hueShift 18s ease-in-out infinite reverse; }
        .orb-3 { animation: hueShift 16s ease-in-out infinite; }

        .section-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .accent-dot {
          width: 6px; height: 6px;
          background: #4f8ef7;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
        }
      `}</style>

      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: "rgba(9,9,15,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="display font-semibold text-sm tracking-widest uppercase text-white/70">
          Jhe<span className="text-[#4f8ef7]">.</span>dev
        </span>
        <div className="flex gap-8">
          {["About", "Projects", "Skills", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
      </nav>

      <section
        id="about"
        ref={heroRef}
        className="relative min-h-screen flex flex-row items-center px-8 md:px-20 overflow-hidden pt-24"
        style={{ background: "linear-gradient(160deg, #09090f 0%, #0d0d1a 100%)" }}
      >
        <div className="cursor-glow" style={{ left: mouse.x, top: mouse.y }} />

        <div
          className="orb-1 absolute top-1/4 right-1/4 w-[380px] h-[380px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #4f8ef7 0%, rgba(79,142,247,0.4) 35%, rgba(79,142,247,0.1) 60%, transparent 100%)", filter: "blur(40px)" }}
        />
        <div
          className="orb-2 absolute bottom-1/3 left-1/5 w-[260px] h-[260px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: "radial-gradient(circle, #f472b6 0%, rgba(244,114,182,0.4) 35%, rgba(244,114,182,0.1) 60%, transparent 100%)", filter: "blur(30px)" }}
        />
        <div
          className="orb-3 absolute top-2/3 right-1/3 w-[220px] h-[220px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: "radial-gradient(circle, #34d399 0%, rgba(52,211,153,0.4) 35%, rgba(52,211,153,0.1) 60%, transparent 100%)", filter: "blur(35px)" }}
        />

        <div className="relative z-10 flex-1 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-[#4f8ef7] text-sm tracking-[0.15em] uppercase font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              IT Professional · Full-Stack Developer
            </span>
          </div>

          <h1 className="display glow-text text-5xl md:text-7xl font-bold leading-[1.08] mb-6">
            <GameTypewriter text="JHERALD D. VIBAR" speed={150} />
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light">
            BS Information Technology, Magna Cum Laude. I build databases, web apps,
            and mobile systems — from MS Access to Laravel to Flutter.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #3b77e3, #4f8ef7)",
                boxShadow: "0 0 24px rgba(79,142,247,0.3)",
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="glass px-6 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { value: "4+", label: "Projects deployed" },
              { value: "Magna", label: "Cum Laude" },
              { value: "5+", label: "Tech stacks" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl px-5 py-4 flex flex-col gap-1 min-w-[120px]">
                <span className="display text-2xl font-bold text-white">{s.value}</span>
                <span className="text-white/40 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 hidden lg:flex flex-1 justify-center items-center">
          <div
            className="relative flex flex-col items-center w-[300px] rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="w-full h-100 overflow-hidden relative">
              <img
                src={Profile}
                alt="Jherald D. Vibar"
                className="w-full h-full object-cover object-top"
                style={{ boxShadow: "0 0 40px rgba(79,142,247,0.35)" }}
              />
              <div
                className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(9,9,15,0.85))" }}
              />
            </div>
            </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #09090f)" }}
        />
      </section>
      <Footer />
    </div>
  );
}