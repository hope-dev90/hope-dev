import { useState, useRef, useEffect } from "react";
import { realCertificates } from "../data";
import { FiArrowRight, FiEye, FiX, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

// ── Modal ─────────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                <a href={cert.file} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange border border-orange rounded-full px-4 py-2 hover:bg-orange hover:text-white transition-colors">
                  <FiExternalLink size={13} /> Open
                </a>
                <button onClick={onClose}
                  className="w-9 h-9 rounded-full bg-navy/8 hover:bg-navy/15 flex items-center justify-center transition-colors">
                  <FiX size={17} className="text-navy" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-navy/5 flex items-center justify-center p-4">
              {cert.type === "image" ? (
                <img src={cert.file} alt={cert.name}
                  className="max-w-full max-h-[70vh] rounded-xl shadow-lg object-contain" />
              ) : (
                <iframe src={cert.file} title={cert.name}
                  className="w-full rounded-xl shadow-lg bg-white" style={{ height: "65vh" }} />
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
function CertificateCard({ cert, onOpen, hidden = false }) {
  const accent = categoryAccent[cert.category] ?? "text-navy/60 bg-navy/5";
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(cert)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      tabIndex={hidden ? -1 : undefined}
      className="group relative mr-10 w-[320px] shrink-0 overflow-hidden rounded-3xl bg-white text-left transition-all duration-300 sm:w-[360px]"
      style={{
        border: "2px solid rgba(122,10,13,0.18)",
        boxShadow: "0 4px 24px rgba(31,34,51,0.08), inset 0 0 0 1px rgba(255,255,255,0.6)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = "2px solid rgba(122,10,13,0.72)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(122,10,13,0.18), 0 4px 24px rgba(31,34,51,0.10), inset 0 0 0 1px rgba(255,255,255,0.6)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = "2px solid rgba(122,10,13,0.18)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(31,34,51,0.08), inset 0 0 0 1px rgba(255,255,255,0.6)";
      }}
    >
      {/* thumbnail */}
      <div className="overflow-hidden h-56 w-full">
        {cert.preview ? (
          <img
            src={cert.preview}
            alt={cert.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy/5 to-navy/12">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-navy/10">
                <span className="text-4xl font-extrabold text-navy/30">{cert.issuer.charAt(0)}</span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-navy/30">Certificate</span>
            </div>
          </div>
        )}
      </div>

      {/* info */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${accent}`}>
            {cert.category}
          </span>
          {cert.highlight && (
            <span className="rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-extrabold leading-snug text-navy line-clamp-2">
          {cert.name}
        </h3>

        <p className="text-sm leading-relaxed text-navy/55 line-clamp-2">
          {cert.desc}
        </p>

        <div className="mt-1 flex items-center justify-between border-t border-navy/8 pt-3">
          <span className="text-xs font-semibold text-navy/40">{cert.issuer} · {cert.date}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy/40 transition-colors group-hover:text-orange">
            View <FiEye size={14} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

// ── Auto-scrolling ticker ─────────────────────────────────────────────────────
function CertificateTicker({ certs, onOpen, baseSpeed = 50 }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const setRef = useRef(null);
  const [setWidth, setSetWidth] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const element = setRef.current;
    if (!element) return undefined;
    const measure = () => setSetWidth(element.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [certs.length]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused.current || !setWidth) return;
    x.set(wrap(-setWidth, 0, x.get() - baseSpeed * (delta / 1000)));
  });

  const skip = (travel) => {
    if (!setWidth) return;
    const fourCards = (setWidth / certs.length) * 4;
    x.set(wrap(-setWidth, 0, x.get() + travel * fourCards));
  };

  return (
    <div>
      <div
        className="overflow-hidden py-2 sm:py-4"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
      >
        <motion.div className="flex w-max will-change-transform" style={{ x }}>
          <div ref={setRef} className="flex">
            {certs.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} onOpen={onOpen} />
            ))}
          </div>
          {/* duplicate set for seamless loop */}
          <div className="flex" aria-hidden="true">
            {certs.map((cert) => (
              <CertificateCard key={`dup-${cert.id}`} cert={cert} onOpen={onOpen} hidden />
            ))}
          </div>
        </motion.div>
      </div>

      {/* prev / next */}
      <div className="mx-auto mt-6 flex max-w-7xl justify-center gap-3 px-6">
        <button
          type="button"
          onClick={() => skip(1)}
          aria-label="Scroll back"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 bg-white text-navy transition-all hover:border-orange hover:text-orange"
        >
          <FiChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => skip(-1)}
          aria-label="Scroll forward"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-[0_8px_20px_rgba(31,34,51,0.18)] transition-all hover:-translate-y-0.5 hover:bg-orange"
        >
          <FiChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Featured first, then the rest in order
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
        className="scroll-mt-24 overflow-hidden bg-[#fbf8f5] py-20 sm:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-7xl px-6"
        >
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-navy sm:text-5xl">
                Certifications &amp; Achievements.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/55">
                A focused selection of achievements, cybersecurity training, and hands-on technical learning.
              </p>
            </div>
            <span className="hidden rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-xs font-bold text-navy/55 lg:block">
              {realCertificates.length} certificates earned
            </span>
          </div>
        </motion.div>

        <div className="mt-10">
          <CertificateTicker certs={ordered} onOpen={setActiveCert} />
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl justify-center px-6">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 rounded-full border border-orange px-8 py-3 text-sm font-semibold text-orange transition-colors hover:bg-orange hover:text-white"
          >
            View all certificates <FiArrowRight size={15} />
          </Link>
        </div>
      </section>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
}
