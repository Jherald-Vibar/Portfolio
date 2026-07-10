import { useEffect, useState } from "react";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function ProjectDetails({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    setActiveImage(0);
  }, [project]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setActiveImage((i) =>
          project?.images?.length ? (i + 1) % project.images.length : i
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveImage((i) =>
          project?.images?.length
            ? (i - 1 + project.images.length) % project.images.length
            : i
        );
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, project]);

  if (!project) return null;

  const images = project.images?.length ? project.images : [];
  const hasMultiple = images.length > 1;

  const goNext = () =>
    setActiveImage((i) => (i + 1) % images.length);
  const goPrev = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center px-4 py-8 md:py-12 overflow-y-auto"
      style={{ background: "rgba(9,9,15,0.85)", backdropFilter: "blur(6px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border"
        style={{
          background: "rgba(16,16,24,0.98)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <FaTimes size={16} />
        </button>

        {/* Image carousel */}
        {images.length > 0 && (
          <div className="relative w-full h-56 md:h-96 overflow-hidden rounded-t-2xl group">
            <img
              key={activeImage}
              src={images[activeImage]}
              alt={`${project.title} screenshot ${activeImage + 1}`}
              className="w-full h-full object-cover"
            />

            <div
              className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(16,16,24,0.98))",
              }}
            />

            {hasMultiple && (
              <>
                {/* Prev / Next arrows */}
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "rgba(9,9,15,0.6)",
                    color: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "rgba(9,9,15,0.6)",
                    color: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <FaChevronRight size={14} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className="rounded-full transition-all"
                      style={{
                        width: i === activeImage ? "20px" : "6px",
                        height: "6px",
                        background:
                          i === activeImage
                            ? "#4f8ef7"
                            : "rgba(255,255,255,0.35)",
                      }}
                    />
                  ))}
                </div>

                {/* Counter */}
                <span
                  className="absolute top-4 left-4 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(9,9,15,0.6)",
                    color: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(4px)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {activeImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        )}

        <div className="px-6 md:px-12 pb-12 pt-2 md:pt-4">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                {project.title}
              </h2>
              {project.role && (
                <p className="text-[#7eb8ff] text-sm font-medium mt-2">
                  {project.role}
                </p>
              )}
            </div>
            {project.year && (
              <span
                className="tag"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {project.year}
              </span>
            )}
          </div>

          {/* Tech stack */}
          {project.tech?.length > 0 && (
            <div className="mb-8">
              <p
                className="text-[11px] uppercase tracking-wide mb-2.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Tools & Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-medium border rounded-md"
                    style={{
                      borderColor: "rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Body: description + sidebar */}
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              {project.summary && (
                <p
                  className="text-lg leading-snug mb-4"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {project.summary}
                </p>
              )}
              {project.fullDescription &&
                project.fullDescription !== project.summary && (
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {project.fullDescription}
                  </p>
                )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {project.stat && (
                <div>
                  <span
                    className="block text-4xl font-bold leading-none"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    {project.stat.value}
                  </span>
                  <span
                    className="text-xs mt-2 block"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {project.stat.label}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #3b77e3, #4f8ef7)",
                      boxShadow: "0 0 20px rgba(79,142,247,0.3)",
                    }}
                  >
                    <FaExternalLinkAlt size={13} /> Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <FaGithub size={15} /> View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}