import { useRef, useState } from "react";
import { cvProjects } from "../data";
import { FiExternalLink, FiArrowRight, FiGithub, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── device mockups ──────────────────────────────────────────────────────────

function DesktopMockup({ src, alt, color }) {
  return (
    <div className="relative w-full select-none">
      {/* wrapper that gives the monitor image its natural aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: "462 / 332" }}>
        {/* screenshot sits inside the screen area using exact pixel percentages */}
        <div
          className="absolute overflow-hidden bg-white"
          style={{
            left:   "2.8%",
            top:    "3%",
            right:  "0.6%",
            bottom: "23%",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-left-top"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${color}`}>
              <span className="text-navy/20 text-xs font-semibold tracking-widest uppercase">Preview</span>
            </div>
          )}
        </div>

        {/* monitor frame on top — must be absolute + full size so it overlays the screenshot */}
        <img
          src="/projects/monitor.png"
          alt="monitor frame"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

function PhoneMockup({ src, alt, color }) {
  return (
    <div className="relative mx-auto w-44 select-none">
      {/* phone shell */}
      <div className="relative rounded-[2.4rem] border-[5px] border-[#1a1a2e] bg-[#1a1a2e] shadow-2xl overflow-hidden">
        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a2e] rounded-b-2xl z-10" />
        {/* screen */}
        <div className="rounded-[1.9rem] overflow-hidden aspect-[9/19] bg-navy/10">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${color}`}>
              <span className="text-navy/20 text-[10px] font-semibold tracking-widest uppercase">Preview</span>
            </div>
          )}
        </div>
        {/* home bar */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

// ─── featured project row ─────────────────────────────────────────────────────

function FeaturedProject({ proj, index, inView }) {
  const isPhone = proj.device === "phone";
  const isEven = index % 2 === 0;

  const isGithub = proj.url?.includes("github.com");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16 py-12 border-b border-navy/8 last:border-0`}
    >
      {/* device mockup */}
      <div className={`w-full ${isPhone ? "lg:w-64 shrink-0" : "lg:w-[58%] shrink-0"}`}>
        <motion.div
          whileHover={{ y: -6, rotate: isEven ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {isPhone ? (
            <PhoneMockup src={proj.preview} alt={proj.name} color={proj.color} />
          ) : (
            <DesktopMockup src={proj.preview} alt={proj.name} color={proj.color} />
          )}
        </motion.div>
      </div>

      {/* info */}
      <div className="flex flex-col gap-4 flex-1 text-center lg:text-left">
        {/* number + badge */}
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <span className="text-[11px] font-black text-orange/60 tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${proj.badge}`}>
            {proj.type}
          </span>
        </div>

        {/* title */}
        <h3 className="text-2xl sm:text-3xl font-black text-navy leading-tight">
          {proj.name}
        </h3>

        {/* description — styled as a pull quote */}
        <p className={`text-sm text-navy/60 leading-relaxed border-l-2 border-orange/40 pl-3 text-left`}>
          {proj.description}
        </p>

        {/* tech pills */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {proj.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-navy/5 text-navy/60 border border-navy/10"
            >
              {t}
            </span>
          ))}
        </div>

        {/* cta */}
        {proj.url && (
          <div className="flex justify-center lg:justify-start">
            <motion.a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-flex items-center gap-2 text-sm font-bold text-orange hover:text-orange/80 transition-colors"
            >
              {isGithub ? <FiGithub size={15} /> : <FiExternalLink size={15} />}
              {isGithub ? "View on GitHub" : "Visit Project"}
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── compact row (no preview) ─────────────────────────────────────────────────

function CompactProject({ proj, index, inView, delay = 0 }) {
  const isGithub = proj.url?.includes("github.com");
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex items-center gap-4 py-4 border-b border-navy/8 last:border-0 group"
    >
      {/* index dot */}
      <span className="text-[11px] font-black text-orange/50 tracking-widest w-6 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* name + tech */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-navy text-sm">{proj.name}</span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${proj.badge}`}>{proj.type}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {proj.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] text-navy/40 font-medium">{t}</span>
          )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`dot-${i}`} className="text-navy/20 text-[10px]">·</span>, el], [])}
        </div>
      </div>

      {/* link */}
      {proj.url && (
        <a
          href={proj.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-8 h-8 rounded-full border border-navy/10 flex items-center justify-center text-navy/30 hover:text-orange hover:border-orange transition-colors"
          aria-label={`Visit ${proj.name}`}
        >
          {isGithub ? <FiGithub size={13} /> : <FiExternalLink size={13} />}
        </a>
      )}
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Projects() {
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-80px" });
  const [showMore, setShowMore] = useState(false);

  const featured = cvProjects.filter((p) => p.showOnHome && p.preview);
  const compact  = cvProjects.filter((p) => p.showOnHome && !p.preview);
  const hidden   = cvProjects.filter((p) => !p.showOnHome);

  return (
    <section id="projects" className="bg-white py-16 scroll-mt-24" ref={inViewRef}>
      <div className="max-w-5xl mx-auto px-6">

        {/* heading */}
        <motion.div
          className="flex items-end justify-between mb-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-1">What I've Built</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Projects</h2>
          </div>
          <Link
            to="/cv"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-navy/40 hover:text-orange transition-colors"
          >
            Full CV <FiArrowRight size={14} />
          </Link>
        </motion.div>

        {/* ── featured rows (with device mockup) ── */}
        <div className="mt-6">
          {featured.map((proj, i) => (
            <FeaturedProject key={proj.name} proj={proj} index={i} inView={inView} />
          ))}
        </div>

        {/* ── compact rows (no preview) ── */}
        {compact.length > 0 && (
          <div className="mt-8">
            <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest mb-2">Also built</p>
            {compact.map((proj, i) => (
              <CompactProject key={proj.name} proj={proj} index={i} inView={inView} delay={i * 0.08} />
            ))}
          </div>
        )}

        {/* ── show more ── */}
        <div className="mt-8">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="flex items-center gap-2 text-xs font-bold text-navy/40 hover:text-orange transition-colors"
          >
            {showMore ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            {showMore ? "Show less" : `Show ${hidden.length} more projects`}
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                key="hidden-projects"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  {hidden.map((proj, i) => (
                    <CompactProject key={proj.name} proj={proj} index={i} inView={showMore} delay={i * 0.08} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* mobile "full cv" link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 border border-navy/15 hover:border-orange hover:text-orange text-navy text-sm font-semibold rounded-full px-6 py-2.5 transition-colors"
          >
            View full CV <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
