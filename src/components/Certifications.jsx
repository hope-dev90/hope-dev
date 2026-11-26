import { useState, useRef } from "react";
import { realCertificates } from "../data";
import { FiArrowRight, FiEye, FiX, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Modal ─────────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-navy/10 shrink-0">
              <div>
                <p className="font-extrabold text-navy text-base leading-tight">{cert.name}</p>
                <p className="text-sm text-navy/50 mt-1">{cert.issuer} · {cert.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange border border-orange rounded-full px-4 py-2 hover:bg-orange hover:text-white transition-colors"
                >
                  <FiExternalLink size={13} /> Open
                </a>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-navy/8 hover:bg-navy/15 flex items-center justify-center transition-colors"
                >
                  <FiX size={17} className="text-navy" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-navy/5 flex items-center justify-center p-4">
              {cert.type === "image" ? (
                <img
                  src={cert.file}
                  alt={cert.name}
                  className="max-w-full max-h-[70vh] rounded-xl shadow-lg object-contain"
                />
              ) : (
                <iframe
                  src={cert.file}
                  title={cert.name}
                  className="w-full rounded-xl shadow-lg bg-white"
                  style={{ height: "65vh" }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Category accent colours ───────────────────────────────────────────────────
const categoryAccent = {
  "Achievement":       "text-amber-600 bg-amber-50",
  "AI & Tech":         "text-violet-600 bg-violet-50",
  "Cybersecurity":     "text-sky-700 bg-sky-50",
  "CTF / Competition": "text-orange-600 bg-orange-50",
  "Professional":      "text-emerald-700 bg-emerald-50",
  "Academic":          "text-navy/70 bg-navy/5",
};

// ── Card ──────────────────────────────────────────────────────────────────────
function CertificateCard({ cert, onOpen, index }) {
  const accent = categoryAccent[cert.category] ?? "text-navy/60 bg-navy/5";
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(cert)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.09, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white text-left transition-shadow duration-300 w-full"
      style={{
        border: "1.5px solid rgba(31,34,51,0.11)",
        boxShadow: "0 4px 24px rgba(31,34,51,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(122,10,13,0.55)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(122,10,13,0.14), 0 4px 16px rgba(31,34,51,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(31,34,51,0.11)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(31,34,51,0.07)";
      }}
    >
      {/* ── Preview — fixed 260px, image contained (never cropped) ── */}
      <div
        className="shrink-0 w-full flex items-center justify-center overflow-hidden"
        style={{ height: "260px", backgroundColor: "#f4f4f4" }}
      >
        {cert.preview ? (
          <img
            src={cert.preview}
            alt={cert.name}
            style={{
              maxHeight: "240px",
              maxWidth: "90%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 opacity-25">
            <div className="h-20 w-20 rounded-2xl bg-navy/10 flex items-center justify-center">
              <span className="text-4xl font-black text-navy">{cert.issuer.charAt(0)}</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-navy">No Preview</span>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-1 flex-col px-7 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${accent}`}>
            {cert.category}
          </span>
          {cert.highlight && (
            <span className="rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold leading-snug text-navy line-clamp-2 mb-3">
          {cert.name}
        </h3>

        <p className="text-sm leading-relaxed text-navy/55 line-clamp-3 flex-1">
          {cert.desc}
        </p>

        <div className="flex items-center justify-between border-t border-navy/8 pt-4 mt-5">
          <span className="text-sm font-semibold text-navy/40">
            {cert.issuer} · {cert.date}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy/40 transition-colors group-hover:text-orange">
            View <FiEye size={15} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const featuredIds = [10, 15, 16, 1];
  const featured = featuredIds
    .map((id) => realCertificates.find((c) => c.id === id))
    .filter(Boolean);
  const rest = realCertificates.filter((c) => !featured.includes(c));
  const ordered = [...featured, ...rest];

  return (
    <>
      <section
        id="certifications"
        ref={ref}
        className="scroll-mt-24 bg-[#fbf8f5] py-20 sm:py-28"
      >
        {/* ── Heading — contained ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[1440px] px-8 sm:px-12 lg:px-16"
        >
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-4xl font-extrabold tracking-[-0.035em] text-navy sm:text-6xl">
                Certifications &amp; Achievements.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/55">
                A focused selection of achievements, cybersecurity training, and hands-on technical learning.
              </p>
            </div>
            <span className="hidden rounded-full border border-navy/10 bg-white/80 px-5 py-2.5 text-sm font-bold text-navy/55 lg:block shrink-0">
              {realCertificates.length} certificates earned
            </span>
          </div>
        </motion.div>

        {/* ── Grid — full bleed with gutters ── */}
        <div className="mx-auto w-full max-w-[1440px] px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((cert, i) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                onOpen={setActiveCert}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
     
      </section>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
}
