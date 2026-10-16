import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiX } from "react-icons/fi";
import { realCertificates } from "../data";

function CertificatePreview({ cert }) {
  if (cert.type === "image") {
    return <img src={cert.file} alt="" className="h-full w-full object-cover" />;
  }

  return (
    <iframe
      src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
      title=""
      tabIndex={-1}
      className="pointer-events-none h-full w-full bg-white"
    />
  );
}

function CertificateModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/75 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-navy/10 px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-extrabold text-navy">{cert.name}</h2>
                <p className="mt-0.5 text-xs text-navy/55">{cert.issuer} · {cert.date}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a href={cert.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-orange px-3 py-1.5 text-xs font-bold text-orange transition-colors hover:bg-orange hover:text-white">
                  Open <FiExternalLink size={12} />
                </a>
                <button type="button" onClick={onClose} aria-label="Close certificate" className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/8 text-navy transition-colors hover:bg-navy/15">
                  <FiX size={17} />
                </button>
              </div>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center bg-navy/5 p-4">
              {cert.type === "image" ? (
                <img src={cert.file} alt={cert.name} className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-lg" />
              ) : (
                <iframe src={cert.file} title={cert.name} className="h-[72vh] w-full rounded-xl bg-white shadow-lg" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(8);
  const [activeCert, setActiveCert] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const leavingRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeCert) return undefined;

    const goToNextSection = () => {
      if (leavingRef.current) return;
      leavingRef.current = true;
      setIsLeaving(true);
      window.setTimeout(() => navigate("/#testimonials"), 260);
    };
    const handleWheel = (event) => {
      if (event.deltaY <= 8) return;
      event.preventDefault();
      goToNextSection();
    };
    let touchStartY = 0;
    const handleTouchStart = (event) => { touchStartY = event.touches[0].clientY; };
    const handleTouchEnd = (event) => {
      if (touchStartY - event.changedTouches[0].clientY > 35) goToNextSection();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeCert, navigate]);

  return (
    <motion.main
      animate={{ opacity: isLeaving ? 0 : 1, y: isLeaving ? -24 : 0 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen overflow-hidden bg-[#fbf8f5] pb-16 pt-28 sm:pt-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-4xl font-black tracking-[-0.045em] text-navy sm:text-6xl">Certificates in focus.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/60">Move across the collection and hover a certificate at either edge to bring it into focus.</p>
          </div>
          <p className="text-sm font-bold text-navy/45">{String(activeIndex + 1).padStart(2, "0")} / {String(realCertificates.length).padStart(2, "0")}</p>
        </div>
      </div>

      <section className="relative mt-10 h-[min(68vw,620px)] min-h-[390px] sm:mt-14" aria-label="Certificate coverflow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(247,139,45,0.12),_transparent_45%)]" />
        <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
          {realCertificates.map((cert, index) => {
            const offset = index - activeIndex;
            const distance = Math.abs(offset);
            const visible = distance <= 3;

            return (
              <motion.button
                key={cert.id}
                type="button"
                initial={false}
                animate={{
                  x: `${offset * 63}%`,
                  scale: offset === 0 ? 1 : 0.76 - Math.min(distance, 3) * 0.04,
                  rotateY: offset * -25,
                  rotateZ: offset * -2,
                  opacity: visible ? 1 : 0,
                  zIndex: 20 - distance,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.8 }}
                onHoverStart={() => visible && setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveCert(cert)}
                aria-label={`View ${cert.name}`}
                className="absolute aspect-[1.42/1] w-[min(82vw,640px)] overflow-hidden rounded-2xl bg-white text-left shadow-[0_24px_60px_rgba(31,34,51,0.22)] ring-1 ring-navy/10 sm:rounded-3xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <CertificatePreview cert={cert} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent px-5 pb-5 pt-14 text-white sm:px-7 sm:pb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">{cert.category}</p>
                  <p className="mt-1 text-sm font-extrabold leading-tight sm:text-base">{cert.name}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </motion.main>
  );
}
