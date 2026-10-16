import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from "react-icons/fi";
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
  const [direction, setDirection] = useState(1);
  const leavingRef = useRef(false);
  const navigate = useNavigate();
  const active = realCertificates[activeIndex];

  const showCertificate = (nextIndex) => {
    const normalisedIndex = (nextIndex + realCertificates.length) % realCertificates.length;
    setDirection(normalisedIndex > activeIndex ? 1 : -1);
    setActiveIndex(normalisedIndex);
  };

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

      <section className="relative mx-auto mt-10 max-w-5xl px-6 sm:mt-14" aria-label="Certificate carousel">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(247,139,45,0.12),_transparent_58%)]" />
        <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(31,34,51,0.18)] ring-1 ring-navy/10 sm:rounded-[2.5rem]">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.button
              key={active.id}
              type="button"
              custom={direction}
              initial={(travel) => ({ opacity: 0, x: travel * 120, scale: 0.96 })}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={(travel) => ({ opacity: 0, x: travel * -120, scale: 0.96 })}
              transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 || info.velocity.x < -400) showCertificate(activeIndex + 1);
                if (info.offset.x > 70 || info.velocity.x > 400) showCertificate(activeIndex - 1);
              }}
              onClick={() => setActiveCert(active)}
              aria-label={`View ${active.name}`}
              className="group relative block aspect-[16/9] w-full overflow-hidden bg-white text-left"
            >
              <CertificatePreview cert={active} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">{active.category}</p>
                <p className="mt-1 text-base font-extrabold leading-tight sm:text-lg">{active.name}</p>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" onClick={() => showCertificate(activeIndex - 1)} aria-label="Previous certificate" className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/40 bg-white text-orange transition-all hover:-translate-y-0.5 hover:border-orange hover:bg-orange hover:text-white">
            <FiChevronLeft size={19} />
          </button>
          <div className="flex gap-1.5" aria-label={`Certificate ${activeIndex + 1} of ${realCertificates.length}`}>
            {realCertificates.map((cert, index) => (
              <button key={cert.id} type="button" onClick={() => showCertificate(index)} aria-label={`Show ${cert.name}`} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-orange" : "w-1.5 bg-navy/15 hover:bg-navy/35"}`} />
            ))}
          </div>
          <button type="button" onClick={() => showCertificate(activeIndex + 1)} aria-label="Next certificate" className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-white shadow-[0_10px_24px_rgba(247,139,45,0.26)] transition-all hover:-translate-y-0.5 hover:bg-orange-dark">
            <FiChevronRight size={19} />
          </button>
        </div>
      </section>

      <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </motion.main>
  );
}
