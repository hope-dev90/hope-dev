import { useRef } from "react";
import { profile, floatingBadges, sideList } from "../data";
import TechIcon from "./TechIcon";
import { Link } from "react-router-dom";
import { FiDownload, FiArrowRight, FiCode } from "react-icons/fi";
import {
  SiReact, SiNodedotjs, SiSpringboot, SiPostgresql, SiDocker,
} from "react-icons/si";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer } from "../lib/motion";

// ── Floating triangles ──────────────────────────────────────────────────────
const TRIANGLES = [
  { id: 0,  size: 38, color: "#e8622c", opacity: 0.85, left: "8%",  delay: 0,   duration: 3.5 },
  { id: 1,  size: 18, color: "#f4a07a", opacity: 0.55, left: "18%", delay: 0.6, duration: 4.5 },
  { id: 2,  size: 26, color: "#f9c4aa", opacity: 0.45, left: "33%", delay: 0.2, duration: 5.5 },
  { id: 3,  size: 14, color: "#e8622c", opacity: 0.35, left: "47%", delay: 1.0, duration: 4   },
  { id: 4,  size: 32, color: "#f87171", opacity: 0.65, left: "60%", delay: 0.4, duration: 5   },
  { id: 5,  size: 20, color: "#fca5a5", opacity: 0.40, left: "72%", delay: 0.8, duration: 6.5 },
  { id: 6,  size: 44, color: "#fb923c", opacity: 0.50, left: "82%", delay: 0.1, duration: 4.5 },
  { id: 7,  size: 16, color: "#fde0d4", opacity: 0.55, left: "91%", delay: 1.2, duration: 3.5 },
  { id: 8,  size: 22, color: "#e8622c", opacity: 0.30, left: "25%", delay: 1.5, duration: 6   },
  { id: 9,  size: 30, color: "#f4a07a", opacity: 0.60, left: "55%", delay: 0.9, duration: 4   },
  { id: 10, size: 12, color: "#f87171", opacity: 0.35, left: "70%", delay: 0.3, duration: 7   },
  { id: 11, size: 36, color: "#fca5a5", opacity: 0.45, left: "40%", delay: 1.4, duration: 5   },
];

function FloatingTriangles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {TRIANGLES.map((t) => (
        <motion.div
          key={t.id}
          style={{
            position: "absolute",
            left: t.left,
            bottom: "-60px",
            width: 0,
            height: 0,
            borderLeft:   `${t.size / 2}px solid transparent`,
            borderRight:  `${t.size / 2}px solid transparent`,
            borderBottom: `${t.size * 0.87}px solid ${t.color}`,
            opacity: t.opacity,
          }}
          animate={{ y: [0, -1100], rotate: [0, t.id % 2 === 0 ? 15 : -15] }}
          transition={{
            y:      { duration: t.duration, repeat: Infinity, ease: "linear",    delay: t.delay },
            rotate: { duration: t.duration, repeat: Infinity, ease: "easeInOut", delay: t.delay },
          }}
        />
      ))}
    </div>
  );
}

// ── Brand / tech logos row ──────────────────────────────────────────────────
const brandLogos = [
  { Icon: SiReact,      color: "#61dafb", label: "React"      },
  { Icon: SiNodedotjs,  color: "#3c873a", label: "Node.js"    },
  { Icon: SiSpringboot, color: "#6db33f", label: "Spring"     },
  { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL" },
  { Icon: SiDocker,     color: "#2496ed", label: "Docker"     },
];

// ── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #fde0d4 0%, #fdeae2 30%, #fef4f0 60%, #f9f5ff 100%)",
      }}
    >
      <FloatingTriangles />

      {/* ── Decorative scattered shapes ── */}
      {/* top-left star */}
      <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="hidden md:block absolute top-[18%] left-[6%] text-2xl select-none pointer-events-none">⭐</motion.span>
      {/* top-right circle outline */}
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="hidden md:block absolute top-[10%] right-[12%] w-4 h-4 rounded-full border-2 border-blue-400 pointer-events-none" />
      {/* mid-left dot */}
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="hidden md:block absolute top-[55%] left-[4%] w-3 h-3 rounded-full bg-violet-400 pointer-events-none" />
      {/* sparkle */}
      <motion.span initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 0.7, rotate: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="hidden md:block absolute top-[40%] left-[14%] text-emerald-400 text-xl select-none pointer-events-none">✦</motion.span>
      {/* bottom-right circle */}
      <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="hidden md:block absolute bottom-[22%] right-[6%] w-5 h-5 rounded-full border-2 border-pink-300 pointer-events-none" />

      {/* ── Main content ── */}
      <div
        className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-8 items-center pt-24"
        style={{ minHeight: "100vh" }}
      >
        {/* LEFT — text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="z-10 pt-16 pb-8 lg:py-0 flex flex-col"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeUp} custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-navy/80 leading-tight mb-1"
          >
            Hi! I Am
          </motion.p>

          {/* Name — big, two colors */}
          <motion.h1
            variants={fadeUp} custom={0.08}
            className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-tight mb-4"
          >
            <span className="text-navy">{profile.name.split(" ")[0]} </span>
            <span className="text-orange">{profile.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Role tag */}
          <motion.p variants={fadeUp} custom={0.14}
            className="text-base lg:text-lg font-bold text-navy/70 mb-4">
            {profile.role}
          </motion.p>

          {/* Intro */}
          <motion.p variants={fadeUp} custom={0.2}
            className="text-sm text-navy/55 leading-relaxed max-w-sm mb-10">
            {profile.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={0.28} className="flex flex-wrap gap-3 mb-14">
            <motion.a
              href="#contact"
              data-magnetic
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg shadow-orange/30 transition-colors"
            >
              Hire Me <FiArrowRight />
            </motion.a>
            <Link
              to="/cv"
              data-magnetic
              className="inline-flex items-center gap-2 bg-white border border-navy/15 hover:border-orange text-navy font-bold px-7 py-3 rounded-full text-sm transition-colors"
            >
              Download CV <FiDownload />
            </Link>
          </motion.div>

          {/* Brand logos row */}
          <motion.div variants={fadeUp} custom={0.36}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-navy/35 mb-3">
              Work For All This Brand &amp; Client
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              {brandLogos.map(({ Icon, color, label }) => (
                <motion.span
                  key={label}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  title={label}
                  className="text-navy/30 hover:text-current transition-colors cursor-default"
                  style={{ color: "inherit" }}
                >
                  <Icon size={26} color={color} style={{ opacity: 0.65 }} />
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — portrait + floating cards */}
        <div className="relative hidden lg:flex justify-center items-center">

          {/* Portrait */}
          <motion.div
            variants={scaleIn} custom={0.15}
            initial="hidden" animate="show"
            className="relative z-10 w-72 xl:w-[300px]"
          >
            {/* Soft blob behind portrait */}
            <div
              className="absolute inset-0 -z-10 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] blur-2xl opacity-40"
              style={{ background: "radial-gradient(circle, #fca5a5 0%, #fdba74 60%, transparent 100%)" }}
            />
            <img
              src="/1773993979501.jpg"
              alt="Hope Mutimutuje"
              className="w-full object-cover object-top"
              style={{
                height: "480px",
                borderRadius: "2rem",
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* Spring Boot badge — top right */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            className="flex absolute top-8 -right-4 xl:right-0 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[210px]"
          >
            <TechIcon name={floatingBadges[0].icon} size={22} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[0].title}</p>
              <p className="text-xs text-navy/45 leading-snug">{floatingBadges[0].text}</p>
            </div>
          </motion.div>

          {/* TYPO3 badge — mid left */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            className="flex absolute top-1/2 -translate-y-1/2 -left-6 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[210px]"
          >
            <TechIcon name={floatingBadges[2].icon} size={22} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[2].title}</p>
              <p className="text-xs text-navy/45 leading-snug">{floatingBadges[2].text}</p>
            </div>
          </motion.div>

          {/* Node.js badge — bottom left */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            className="flex absolute bottom-10 -left-6 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[210px]"
          >
            <TechIcon name={floatingBadges[1].icon} size={22} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[1].title}</p>
              <p className="text-xs text-navy/45 leading-snug">{floatingBadges[1].text}</p>
            </div>
          </motion.div>

          {/* Side pill — far right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 absolute -right-24 xl:-right-20 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-soft px-3 py-5 w-[82px] z-20"
          >
            <span className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
              <FiCode size={16} />
            </span>
            <ul className="text-[10px] font-semibold text-navy/55 text-center leading-[1.6]">
              {sideList.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="flex flex-col gap-1.5 w-full px-2">
              <span className="block h-1.5 bg-navy/10 rounded-full w-full" />
              <span className="block h-1.5 bg-navy/10 rounded-full w-3/4 mx-auto" />
              <span className="block h-1.5 bg-navy/10 rounded-full w-full" />
            </div>
          </motion.div>
        </div>

        {/* Mobile portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="lg:hidden flex justify-center pb-10"
        >
          <img
            src="/1773993979501.jpg"
            alt="Hope Mutimutuje"
            className="w-56 h-72 object-cover object-top rounded-3xl shadow-soft"
          />
        </motion.div>
      </div>

    </section>
  );
}
