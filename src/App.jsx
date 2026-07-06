import { useEffect, useRef, useState } from "react";
import { SKILLS, PROJECTS } from './constant/data.js';
import Footer from "./components/parts/Footer.jsx";
import Profile from './assets/images/profile.jpg';
import Profile2 from './assets/images/profile2.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

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
  const [isHovering, setIsHovering] = useState(false);
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
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(79,142,247,0.12) 0%,
            rgba(167,139,250,0.06) 40%,
            transparent 65%
          );
          filter: blur(20px);
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

        /* Outer hit-area now fully encloses the photo AND all 4 badges,
           so moving the cursor between them never leaves a hoverable element. */
        .photo-frame {
          position: relative;
          width: 550px;
          height: 565px;
        }
        .orbit-ring {
          position: absolute;
          top: 36px;
          left: 29px;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          border: 1.5px dashed rgba(79,142,247,0.35);
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }
        .photo-frame:hover .orbit-ring {
          opacity: 1;
          transform: scale(1);
        }
        .orbit-badge {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #14141f;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
          transition: opacity 0.35s ease, transform 0.35s ease, background 0.2s ease, border-color 0.2s ease;
          pointer-events: none;
          z-index: 20;
        }
        .photo-frame:hover .orbit-badge {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          pointer-events: auto;
        }
        .orbit-badge:hover {
          background: rgba(79,142,247,0.15);
          border-color: rgba(79,142,247,0.4);
          transform: translate(-50%, -50%) scale(1.12);
        }
        .orbit-badge:nth-of-type(1) { transition-delay: 0.05s; }
        .orbit-badge:nth-of-type(2) { transition-delay: 0.1s; }
        .orbit-badge:nth-of-type(3) { transition-delay: 0.15s; }
        .orbit-badge:nth-of-type(4) { transition-delay: 0.2s; }
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
          className="orb-1 absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.10] pointer-events-none"
          style={{ background: "radial-gradient(circle, #4f8ef7 0%, transparent 60%)", filter: "blur(100px)" }}
        />
        <div
          className="orb-2 absolute bottom-1/3 left-1/5 w-[380px] h-[380px] rounded-full opacity-[0.08] pointer-events-none"
          style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 60%)", filter: "blur(90px)" }}
        />
        <div
          className="orb-3 absolute top-2/3 right-1/3 w-[340px] h-[340px] rounded-full opacity-[0.08] pointer-events-none"
          style={{ background: "radial-gradient(circle, #34d399 0%, transparent 60%)", filter: "blur(90px)" }}
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
            className="photo-frame"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="orbit-ring" />

            <a
              href="https://github.com/Jherald-Vibar"
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "30px", left: "219px" }}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/jherald-vibar-319741285"
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "165px", left: "467px" }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:vibar_jherald@spcc.edu.ph"
              className="orbit-badge"
              style={{ top: "484px", left: "356px" }}
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "287px", left: "30px" }}
              aria-label="Download Resume"
            >
              <FaFileDownload />
            </a>

            <div
              className="absolute flex flex-col items-center w-[300px] rounded-3xl overflow-hidden"
              style={{
                top: "66px",
                left: "109px",
                background: isHovering ? "transparent" : "rgba(255,255,255,0.03)",
                border: isHovering ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                backdropFilter: isHovering ? "none" : "blur(20px)",
                WebkitBackdropFilter: isHovering ? "none" : "blur(20px)",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
            >
              <div className="w-full h-100 overflow-hidden relative">
                <img
                  src={Profile}
                  alt="Jherald D. Vibar"
                  className="w-full h-full object-cover object-top absolute inset-0"
                  style={{
                    boxShadow: "0 0 40px rgba(79,142,247,0.35)",
                    opacity: isHovering ? 0 : 1,
                    transition: "opacity 0.4s ease",
                  }}
                />
                <img
                  src={Profile2}
                  alt="Jherald D. Vibar alternate"
                  className="w-full h-full object-cover object-top absolute inset-0"
                  style={{
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                />
                <div
                  className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(9,9,15,0.85))",
                    opacity: isHovering ? 0 : 1,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #09090f)" }}
        />
      </section>

      <section
        id="skills"
        className="relative px-8 md:px-20 py-28"
        style={{ background: "#09090f" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="accent-dot" />
            <span
              className="text-[#4f8ef7] text-sm tracking-[0.15em] uppercase font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Tech Stack
            </span>
          </div>

          <h2 className="display text-3xl md:text-4xl font-bold mb-4 text-white">
            Programming Languages & Tools
          </h2>
          <p className="text-white/40 mb-12 max-w-xl">
            Technologies I work with regularly, from database engineering to web and mobile development.
          </p>

          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, i) => {
              const label = typeof skill === "string" ? skill : skill.label;
              return (
                <span
                  key={label ?? i}
                  className="skill-chip px-5 py-2.5 rounded-xl text-sm text-white/80 font-medium"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}