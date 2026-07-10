import { useEffect } from "react";
import { FaTimes, FaDownload, FaExternalLinkAlt } from "react-icons/fa";

const RESUME_PATH = "/Resume.pdf";

export default function ResumeViewer({ onClose }) {
  // lock background scroll while open, allow Esc to close
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6 md:py-10"
      style={{ background: "rgba(6,6,10,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-full rounded-2xl overflow-hidden border flex flex-col"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0d0d13" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div
          className="flex items-center justify-between gap-4 px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="min-w-0">
            <h3
              className="text-white/90 text-sm font-semibold truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Jherald D. Vibar — Resume
            </h3>
            <p className="text-white/35 text-xs mt-0.5">resume.pdf</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={RESUME_PATH}
              download
              className="glass flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <FaDownload size={12} /> <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <FaExternalLinkAlt size={11} /> <span className="hidden sm:inline">Open</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>

        {/* body: embedded PDF */}
        <div className="flex-1 min-h-0 bg-[#1a1a22]">
          <object
            data={`${RESUME_PATH}#toolbar=0`}
            type="application/pdf"
            className="w-full h-full"
          >
            {/* fallback for browsers that can't render the PDF inline (e.g. some mobile browsers) */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="text-white/50 text-sm max-w-xs">
                Your browser can't preview PDFs inline. You can still view or download it directly.
              </p>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #3b77e3, #4f8ef7)",
                  boxShadow: "0 0 20px rgba(79,142,247,0.3)",
                }}
              >
                Open Resume
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}