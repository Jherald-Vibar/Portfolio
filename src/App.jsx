import { useEffect, useRef, useState } from "react";
import { SKILLS, PROJECTS, EXPERIENCE } from './constant/data.js';
import Footer from "./components/parts/Footer.jsx";
import Profile from './assets/images/profile.jpg';
import Profile2 from './assets/images/profile2.png';
import Sibol1 from './assets/ProjectImages/Sibol/Sibol-1.png';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFileDownload,
  FaGraduationCap, FaBriefcase, FaCode, FaRocket, FaAward,
  FaTimes, FaChevronLeft, FaChevronRight, FaUserTie,
} from 'react-icons/fa';

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

// Cycles a small, meaningful icon set across experience entries. Falls back
// gracefully if there are more entries than icons.
const EXP_ICONS = [FaGraduationCap, FaCode, FaBriefcase, FaRocket, FaAward];

const GITHUB_USERNAME = "Jherald-Vibar";

function ExperienceStep({ exp, stepLevel, order, isLast }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Icon = EXP_ICONS[stepLevel % EXP_ICONS.length];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="exp-row relative flex items-start gap-6"
      style={{
        marginLeft: `${stepLevel * 40}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${order * 0.08}s, transform 0.6s ease ${order * 0.08}s`,
      }}
    >
      {/* connecting rail */}
      {!isLast && (
        <span
          className="absolute left-[27px] top-[56px] w-[2px]"
          style={{
            height: "calc(100% + 24px)",
            background: "linear-gradient(to bottom, rgba(79,142,247,0.35), rgba(79,142,247,0.02))",
          }}
        />
      )}

      {/* node */}
      <div
        className="exp-node relative flex items-center justify-center shrink-0"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "linear-gradient(155deg, rgba(79,142,247,0.16), rgba(79,142,247,0.03))",
          border: "1px solid rgba(79,142,247,0.28)",
          boxShadow: visible ? "0 0 0 4px rgba(79,142,247,0.06), 0 8px 24px -8px rgba(79,142,247,0.35)" : "none",
        }}
      >
        <Icon style={{ color: "#7eb8ff", fontSize: "18px" }} />
        <span className="exp-pulse" />
      </div>

      {/* card */}
      <div className="exp-card glass flex-1 rounded-2xl px-6 py-5 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <h3
            className="text-white text-lg font-semibold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {exp.role}
          </h3>
          <span
            className="tag"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {exp.year}
          </span>
        </div>
        <p className="text-[#7eb8ff]/80 text-sm font-medium mb-1.5">{exp.org}</p>
        {exp.note && (
          <p className="text-white/40 text-sm leading-relaxed max-w-lg">{exp.note}</p>
        )}
      </div>
    </div>
  );
}

// Normalizes a project object from PROJECTS into a consistent shape, since
// the underlying data file's field names may vary (title/name, tech/stack, etc).
function normalizeProject(project, i) {
  const images =
    project.images ??
    (project.image ? [project.image] : null) ??
    [Sibol1]; // placeholder so the card/modal always has something to show

  return {
    title: project.title ?? project.name ?? `Project ${i + 1}`,
    summary: project.summary ?? project.description ?? project.desc ?? "",
    fullDescription:
      project.fullDescription ?? project.description ?? project.desc ?? "",
    role: project.role ?? project.myRole ?? "",
    tech: project.tech ?? project.stack ?? project.tags ?? [],
    images,
    liveUrl: project.link ?? project.demo ?? project.url ?? null,
    repoUrl: project.github ?? project.repo ?? project.source ?? null,
  };
}

// A compact box that expands to fill the full row width on hover, revealing
// its cover image and a short summary. Click opens the full project modal.
function ProjectRow({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="project-row group relative w-full text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]"
    >
      <div
        className="project-row-bg absolute inset-0"
        style={{
          backgroundImage: `url(${project.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="project-row-scrim absolute inset-0" />

      <div className="relative z-10 flex items-center gap-5 px-6 py-5">
        <div className="project-row-thumb shrink-0 rounded-xl overflow-hidden border border-white/10">
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="text-white text-base md:text-lg font-semibold truncate"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.title}
          </h3>
          <p className="project-row-summary text-white/45 text-sm mt-1 line-clamp-1">
            {project.summary}
          </p>
          <div className="project-row-tech flex flex-wrap gap-2 mt-3">
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        <span className="project-row-cta shrink-0 text-sm font-medium text-[#7eb8ff] whitespace-nowrap">
          View project →
        </span>
      </div>
    </button>
  );
}

// Full-screen overlay: image carousel, full description, role, and tech stack.
function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const images = project.images;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(5,5,9,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="modal-panel glass relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="modal-close absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Carousel */}
        <div className="relative w-full h-64 md:h-80 bg-black/30">
          <img
            src={images[index]}
            alt={`${project.title} screenshot ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="carousel-arrow absolute left-3 top-1/2 -translate-y-1/2"
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={next}
                className="carousel-arrow absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="carousel-dot"
                    style={{ opacity: i === index ? 1 : 0.35 }}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 md:p-8">
          <h3
            className="text-white text-xl md:text-2xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.title}
          </h3>

          {project.fullDescription && (
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              {project.fullDescription}
            </p>
          )}

          {project.role && (
            <div className="flex items-start gap-3 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] shrink-0">
                <FaUserTie style={{ color: "#7eb8ff", fontSize: "13px" }} />
              </span>
              <div>
                <p className="text-white/85 text-sm font-medium">My Role</p>
                <p className="text-white/45 text-sm">{project.role}</p>
              </div>
            </div>
          )}

          {project.tech.length > 0 && (
            <div className="mb-6">
              <p className="text-white/85 text-sm font-medium mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #3b77e3, #4f8ef7)",
                  boxShadow: "0 0 20px rgba(79,142,247,0.28)",
                }}
              >
                Live demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white flex items-center gap-2"
              >
                <FaGithub /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // Track mouse across the ENTIRE window, not just one section,
  // so the glow layer (which is fixed to the viewport) works everywhere.
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative isolate min-h-screen bg-[#09090f] text-white font-sans">
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
        .tech-card {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .tech-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.12);
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

        /* --- Projects section --- */
        .project-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(79,142,247,0.28);
          box-shadow: 0 16px 36px -16px rgba(79,142,247,0.3);
        }
        .github-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .github-link-btn {
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.02);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .github-link-btn:hover {
          color: #fff;
          border-color: rgba(57,211,83,0.4);
          background: rgba(57,211,83,0.08);
        }
        .legend-swatch {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          display: inline-block;
        }

        /* --- Experience section --- */
        .exp-card {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .exp-row:hover .exp-card {
          transform: translateY(-3px);
          border-color: rgba(79,142,247,0.3);
          box-shadow: 0 14px 32px -14px rgba(79,142,247,0.28);
        }
        .exp-node {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .exp-row:hover .exp-node {
          transform: scale(1.06);
          border-color: rgba(79,142,247,0.55);
        }
        .exp-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 20px;
          border: 1px solid rgba(79,142,247,0.4);
          opacity: 0;
          animation: expPulse 2.8s ease-out infinite;
        }
        @keyframes expPulse {
          0%   { opacity: 0.5; transform: scale(0.85); }
          70%  { opacity: 0; transform: scale(1.25); }
          100% { opacity: 0; transform: scale(1.25); }
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-pulse { animation: none; opacity: 0; }
          .exp-row { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
        @media (max-width: 768px) {
          .exp-row { margin-left: 0 !important; }
        }
      `}</style>

      {/* Fixed ambient background: covers the whole viewport, sits behind
          every section (z-index -1), and stays put while you scroll, so
          the glow/orbs are visible on every part of the homepage. */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <div className="cursor-glow" style={{ left: mouse.x, top: mouse.y }} />
        <div
          className="orb-1 absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #4f8ef7 0%, transparent 60%)", filter: "blur(100px)" }}
        />
        <div
          className="orb-2 absolute bottom-1/3 left-1/5 w-[380px] h-[380px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 60%)", filter: "blur(90px)" }}
        />
        <div
          className="orb-3 absolute top-2/3 right-1/3 w-[340px] h-[340px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #34d399 0%, transparent 60%)", filter: "blur(90px)" }}
        />
      </div>

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
          {["About", "Skills", "Experience", "Projects", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
      </nav>

      <section
        id="about"
        className="relative min-h-screen flex flex-row items-center px-8 md:px-20 overflow-hidden pt-24"
      >
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
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "30px", left: "219px" }}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "165px", left: "467px" }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:youremail@example.com"
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
      </section>

      <section
        id="skills"
        className="relative px-8 md:px-20 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="display text-2xl md:text-3xl font-bold text-white mb-1">
            Tech Stack
          </h2>
          <p className="text-white/40 text-sm mb-10">
            Tools and languages I use to build databases, web, and mobile systems.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.label ?? i}
                  className="tech-card flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04]">
                    {Icon && <Icon style={{ color: skill.color, fontSize: "20px" }} />}
                  </span>
                  <span
                    className="text-white/75 text-sm font-medium text-center"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {skill.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="relative px-8 md:px-20 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="display text-2xl md:text-3xl font-bold text-white mb-1">
            Experience
          </h2>
          <p className="text-white/40 text-sm mb-14">
            A path that started in college and kept climbing.
          </p>

          <div className="flex flex-col">
            {[...EXPERIENCE].reverse().map((exp, displayIndex, arr) => {
              // EXPERIENCE is stored oldest → newest. We display newest → oldest
              // (present at the top), but the staircase indent should still climb
              // toward the present, so the step level is the original chronological
              // index, not the display index.
              const chronoIndex = EXPERIENCE.length - 1 - displayIndex;
              return (
                <ExperienceStep
                  key={exp.year}
                  exp={exp}
                  stepLevel={chronoIndex}
                  order={displayIndex}
                  isLast={displayIndex === arr.length - 1}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="relative px-8 md:px-20 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="display text-2xl md:text-3xl font-bold text-white mb-1">
            Projects
          </h2>
          <p className="text-white/40 text-sm mb-10">
            A few things I've built, end to end.
          </p>

          <div className="flex flex-col gap-4 mb-16">
            {PROJECTS.map((project, i) => {
              const normalized = normalizeProject(project, i);
              return (
                <ProjectRow
                  key={normalized.title}
                  project={normalized}
                  onOpen={() => setActiveProject(normalized)}
                />
              );
            })}
          </div>

          {activeProject && (
            <ProjectModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}

          {/* GitHub activity — simple, professional, GitHub-green contribution graph */}
          <div className="github-panel rounded-2xl px-6 py-6 md:px-8 md:py-7">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5 pb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <FaGithub style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }} />
                </span>
                <div>
                  <h3
                    className="text-white/85 text-sm font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    GitHub Activity
                  </h3>
                  <p className="text-white/35 text-xs">@{GITHUB_USERNAME}</p>
                </div>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link-btn px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
              >
                View Profile →
              </a>
            </div>

            <div className="w-full overflow-x-auto">
              <img
                src={`https://ghchart.rshah.org/39d353/${GITHUB_USERNAME}`}
                alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
                className="w-full min-w-[640px] opacity-90"
              />
            </div>

            <div className="flex items-center justify-end gap-1.5 mt-3 text-white/30 text-[11px]">
              <span>Less</span>
              <span className="legend-swatch" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="legend-swatch" style={{ background: "rgba(57,211,83,0.3)" }} />
              <span className="legend-swatch" style={{ background: "rgba(57,211,83,0.6)" }} />
              <span className="legend-swatch" style={{ background: "#39d353" }} />
              <span>More</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}