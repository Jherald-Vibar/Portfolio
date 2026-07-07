import { useEffect, useRef, useState } from "react";
import { SKILLS, PROJECTS, EXPERIENCE } from './constant/data.js';
import Footer from "./components/parts/Footer.jsx";
import Profile from './assets/images/profile.jpg';
import Profile2 from './assets/images/profile2.png';
import Sibol1 from './assets/ProjectImages/Sibol/Sibol-1.png';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFileDownload,
  FaGraduationCap, FaBriefcase, FaCode, FaRocket, FaAward,
  FaTimes, FaPlus, FaHashtag, FaExternalLinkAlt,
} from 'react-icons/fa';
import "./assets/style.css"

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

function normalizeProject(project, i) {
  const images =
    project.images ??
    (project.image ? [project.image] : null) ??
    [Sibol1]; 

  return {
    title: project.title ?? project.name ?? `Project ${i + 1}`,
    year: project.year ?? project.date ?? "",
    summary: project.summary ?? project.description ?? project.desc ?? "",
    fullDescription:
      project.fullDescription ?? project.description ?? project.desc ?? "",
    role: project.role ?? project.myRole ?? "Full Stack Developer",
    tech: project.tech ?? project.stack ?? project.tags ?? [],
    images,
    liveUrl: project.link ?? project.demo ?? project.url ?? null,
    repoUrl: project.github ?? project.repo ?? project.source ?? null,
    stat: project.stat ?? null,
  };
}
function ProjectRow({ project, isOpen, onToggle }) {
  return (
    <div className="proj-row-wrap border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
      <button
        type="button"
        onClick={onToggle}
        className="proj-row-header w-full flex items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline gap-4 min-w-0">
          <h3
            className="proj-title text-xl md:text-2xl font-bold tracking-tight truncate"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.92)" }}
          >
            {project.title}
          </h3>
          {project.year && (
            <span className="text-sm shrink-0" style={{ color: "rgba(255,255,255,0.4)" }}>
              {project.year}
            </span>
          )}
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <span
            className="hidden sm:block text-xs uppercase tracking-wide"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.tech.join(" · ")}
          </span>
          <span
            className="proj-toggle flex items-center justify-center w-6 h-6 shrink-0"
            style={{ color: isOpen ? "#4f8ef7" : "rgba(255,255,255,0.92)" }}
          >
            {isOpen ? <FaTimes size={15} /> : <FaPlus size={13} />}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="proj-row-body pb-10 md:pb-14">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            {/* Sidebar: vertical label, headline stat, role */}
            <div className="flex md:flex-col gap-5 md:gap-6 md:w-32 shrink-0">
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "36px",
                  height: "104px",
                  background: "#4f8ef7",
                  color: "#ffffff",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                PROJECT
              </span>

              <div className="flex flex-col justify-center">
                {project.stat && (
                  <>
                    <span
                      className="text-4xl md:text-5xl font-bold leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.92)" }}
                    >
                      {project.stat.value}
                    </span>
                    <span className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {project.stat.label}
                    </span>
                    <div className="w-full border-t my-4" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
                  </>
                )}
                {project.role && (
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: "rgba(255,255,255,0.92)", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.role}
                  </span>
                )}
              </div>
            </div>

            {/* Main copy */}
            <div className="flex-1 min-w-0">
              <h4
                className="text-3xl md:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.92)" }}
              >
                {project.title}
              </h4>
              {project.summary && (
                <p className="text-lg md:text-xl leading-snug mb-4" style={{ color: "rgba(255,255,255,0.92)" }}>
                  {project.summary}
                </p>
              )}
              {project.fullDescription && project.fullDescription !== project.summary && (
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {project.fullDescription}
                </p>
              )}
            </div>

            {/* Right rail: tags, year, links, thumbnail */}
            <div className="md:w-64 shrink-0 flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-medium border rounded-md"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.92)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.year && (
                <div>
                  <p className="text-[11px] uppercase tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Year
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.92)" }}
                  >
                    {project.year}
                  </p>
                </div>
              )}

              {(project.liveUrl || project.repoUrl) && (
                <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <FaHashtag size={13} />
                  <a
                    href={project.liveUrl ?? project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open project link"
                    className="hover:opacity-70"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <FaExternalLinkAlt size={13} />
                  </a>
                </div>
              )}

              <div className="rounded-lg overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [tapRevealed, setTapRevealed] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState(null);

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
        className="relative min-h-screen flex flex-col lg:flex-row items-center px-8 md:px-20 overflow-hidden pt-24 pb-16 lg:pb-0"
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

        <div className="relative z-10 flex flex-1 justify-center items-center mt-16 lg:mt-0">
          <div
            className={`photo-frame ${tapRevealed ? "is-active" : ""}`}
            onClick={() => setTapRevealed((v) => !v)}
            onMouseEnter={() => {
              // Touch devices fire a phantom mouseenter on tap but never a
              // matching mouseleave, which would otherwise get the photo
              // stuck on the alternate image forever. Only real hover-capable
              // pointers (a mouse) should trigger the crossfade.
              if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(hover: hover)").matches) return;
              setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="orbit-ring" />

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "5.31%", left: "39.82%" }}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "29.2%", left: "84.91%" }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:youremail@example.com"
              className="orbit-badge"
              style={{ top: "85.66%", left: "64.73%" }}
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="orbit-badge"
              style={{ top: "50.8%", left: "5.45%" }}
              aria-label="Download Resume"
            >
              <FaFileDownload />
            </a>

            <div
              className="absolute flex flex-col items-center rounded-3xl overflow-hidden"
              style={{
                top: "11.68%",
                left: "19.82%",
                width: "54.55%",
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

          <div className="proj-panel rounded-2xl px-6 md:px-10 mb-16 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {PROJECTS.map((project, i) => {
              const normalized = normalizeProject(project, i);
              const isOpen = openProjectIndex === i;
              return (
                <ProjectRow
                  key={normalized.title}
                  project={normalized}
                  isOpen={isOpen}
                  onToggle={() => setOpenProjectIndex(isOpen ? null : i)}
                />
              );
            })}
          </div>

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

      <section
        id="contact"
        className="relative px-8 md:px-20 py-28"
      >
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="text-[#4f8ef7] text-sm tracking-[0.15em] uppercase font-medium"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Get in touch
          </span>

          <h2 className="display glow-text text-4xl md:text-6xl font-bold leading-tight mt-4 mb-6">
            Let's build something
          </h2>

          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Open to full-stack, database, and mobile development opportunities.
            Send a message and I'll get back to you.
          </p>

          <a
            href="mailto:youremail@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-medium text-base md:text-lg mb-12 transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #3b77e3, #4f8ef7)",
              boxShadow: "0 0 30px rgba(79,142,247,0.3)",
            }}
          >
            <FaEnvelope /> youremail@example.com
          </a>

          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass w-14 h-14 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass w-14 h-14 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              className="glass w-14 h-14 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
            >
              <FaFileDownload size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}