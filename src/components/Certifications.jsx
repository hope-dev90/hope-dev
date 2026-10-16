import { useState, useRef, useEffect } from "react";
import { realCertificates } from "../data";
import { FiArrowRight, FiEye, FiX, FiExternalLink, FiAward, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

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
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10 shrink-0">
              <div>
                <p className="font-extrabold text-navy text-sm leading-tight">{cert.name}</p>
                <p className="text-xs text-navy/50 mt-0.5">{cert.issuer} · {cert.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <a href={cert.file} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange border border-orange rounded-full px-3 py-1.5 hover:bg-orange hover:text-white transition-colors">
                  <FiExternalLink size={11} /> Open
                </a>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full bg-navy/8 hover:bg-navy/15 flex items-center justify-center transition-colors">
                  <FiX size={15} className="text-navy" />
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

const categoryDescriptions = {
  "Achievement": "Recognition for outstanding progress and participation in technology programmes.",
  "AI & Tech": "Practical learning in modern AI tools, software, and emerging technology.",
  "Cybersecurity": "Training focused on secure systems, risk awareness, and defensive practice.",
  "CTF / Competition": "Hands-on problem solving through a competitive cybersecurity challenge.",
  "Professional": "Professional development experience and career-focused technical learning.",
  "Academic": "Academic work and learning completed as part of formal technical education.",
};

function CertificateCard({ cert, index, onOpen, hidden = false }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(cert)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      tabIndex={hidden ? -1 : undefined}
      className="group relative mr-5 w-[290px] shrink-0 overflow-hidden rounded-[1.75rem] bg-white text-left shadow-[0_12px_32px_rgba(31,34,51,0.09)] ring-1 ring-navy/10 transition-shadow duration-300 hover:shadow-[0_20px_46px_rgba(31,34,51,0.16)] sm:w-[320px]"
    >
      <div className={`relative flex min-h-[340px] flex-col overflow-hidden border ${cert.color} p-6`}>
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/55" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full border-[18px] border-white/35" />

        <div className="relative flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-navy/70 shadow-sm">
            {cert.category}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-navy/65 shadow-sm">
            <FiAward size={17} aria-hidden="true" />
          </span>
        </div>

        <div className="relative mt-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45">Credential {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-xl font-extrabold leading-[1.12] tracking-[-0.025em] text-navy">
            {cert.name}
          </h3>
          <p className="mt-3 text-xs font-bold text-orange">{cert.issuer}</p>
          <p className="mt-2 text-xs leading-relaxed text-navy/55">{categoryDescriptions[cert.category]}</p>
        </div>

        <div className="relative mt-auto flex items-center justify-between border-t border-navy/10 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-navy/45">{cert.date}</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-navy transition-colors group-hover:text-orange">
            View <FiEye size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

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
    const fourCertificates = (setWidth / certs.length) * 4;
    x.set(wrap(-setWidth, 0, x.get() + travel * fourCertificates));
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
            {certs.map((cert, index) => (
              <CertificateCard key={cert.id} cert={cert} index={index} onOpen={onOpen} />
            ))}
          </div>
          <div className="flex" aria-hidden="true">
            {certs.map((cert, index) => (
              <CertificateCard key={`duplicate-${cert.id}`} cert={cert} index={index} onOpen={onOpen} hidden />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-5 flex max-w-7xl justify-center gap-2 px-6">
        <button type="button" onClick={() => skip(1)} aria-label="Skip back four certificates" className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy transition-all hover:border-orange hover:text-orange">
          <FiChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => skip(-1)} aria-label="Skip forward four certificates" className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white shadow-[0_8px_20px_rgba(31,34,51,0.18)] transition-all hover:-translate-y-0.5 hover:bg-orange">
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const featuredCertificateIds = [10, 15, 16, 1];
  const featuredCertificates = featuredCertificateIds
    .map((certificateId) => realCertificates.find((certificate) => certificate.id === certificateId))
    .filter(Boolean);
  const displayedCertificates = [
    ...featuredCertificates,
    ...realCertificates.filter((certificate) => !featuredCertificates.includes(certificate)),
  ];

  return (
    <>
      <section
        id="certifications"
        ref={ref}
        className="scroll-mt-24 overflow-hidden bg-[#fbf8f5] py-20 sm:py-24"
      >
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mx-auto max-w-7xl px-6">

          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-navy sm:text-5xl">Certifications And Acheivements.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/55">A focused selection of achievements, cybersecurity training, and hands-on technical learning.</p>
            </div>
            <span className="hidden rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-xs font-bold text-navy/55 lg:block">{realCertificates.length} credentials earned</span>
          </div>
        </motion.div>

        <div className="mt-8">
          <CertificateTicker certs={displayedCertificates} onOpen={setActiveCert} />
        </div>

        <div className="mx-auto mt-6 flex max-w-7xl justify-center px-6">
          <Link to="/certificates" className="inline-flex items-center gap-2 rounded-full border border-orange px-6 py-2.5 text-xs font-semibold text-orange transition-colors hover:bg-orange hover:text-white">
            View all certificates <FiArrowRight size={13} />
          </Link>
        </div>
      </section>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
}
