import { profile, floatingBadges, sideList } from "../data";
import TechIcon from "./TechIcon";
import { Link } from "react-router-dom";
import { FiDownload, FiArrowRight, FiCode } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeUp, fadeRight, fadeLeft, scaleIn, staggerContainer } from "../lib/motion";

// Floating triangles config — warm palette matching the hero gradient
const TRIANGLES = [
  { id: 0,  size: 38, color: "#e8622c", opacity: 0.85, left: "8%",  delay: 0,    duration: 3.5 },
  { id: 1,  size: 18, color: "#f4a07a", opacity: 0.55, left: "18%", delay: 0.6,  duration: 4.5 },
  { id: 2,  size: 26, color: "#f9c4aa", opacity: 0.45, left: "33%", delay: 0.2,  duration: 5.5 },
  { id: 3,  size: 14, color: "#e8622c", opacity: 0.35, left: "47%", delay: 1.0,  duration: 4   },
  { id: 4,  size: 32, color: "#f87171", opacity: 0.65, left: "60%", delay: 0.4,  duration: 5   },
  { id: 5,  size: 20, color: "#fca5a5", opacity: 0.40, left: "72%", delay: 0.8,  duration: 6.5 },
  { id: 6,  size: 44, color: "#fb923c", opacity: 0.50, left: "82%", delay: 0.1,  duration: 4.5 },
  { id: 7,  size: 16, color: "#fde0d4", opacity: 0.55, left: "91%", delay: 1.2,  duration: 3.5 },
  { id: 8,  size: 22, color: "#e8622c", opacity: 0.30, left: "25%", delay: 1.5,  duration: 6   },
  { id: 9,  size: 30, color: "#f4a07a", opacity: 0.60, left: "55%", delay: 0.9,  duration: 4   },
  { id: 10, size: 12, color: "#f87171", opacity: 0.35, left: "70%", delay: 0.3,  duration: 7   },
  { id: 11, size: 36, color: "#fca5a5", opacity: 0.45, left: "40%", delay: 1.4,  duration: 5   },
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
            borderLeft: `${t.size / 2}px solid transparent`,
            borderRight: `${t.size / 2}px solid transparent`,
            borderBottom: `${t.size * 0.87}px solid ${t.color}`,
            opacity: t.opacity,
          }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight + 100 : 900)],
            rotate: [0, t.id % 2 === 0 ? 15 : -15],
          }}
          transition={{
            y: {
              duration: t.duration,
              repeat: Infinity,
              ease: "linear",
              delay: t.delay,
            },
            rotate: {
              duration: t.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: t.delay,
            },
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100vh - 65px)",
        background: "linear-gradient(155deg, #fde0d4 0%, #fdeae2 35%, #fef4f0 65%, #ffffff 100%)",
      }}
    >
      {/* Floating triangles background */}
      <FloatingTriangles />

      {/* Decorative dots — animated */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="hidden md:block absolute top-[12%] left-[28%] w-7 h-7 rounded-full border-2 border-pink-300"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="hidden md:block absolute top-[8%] right-[7%] w-3.5 h-3.5 rounded-full border-2 border-rose-300"
      />
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:block absolute bottom-[20%] left-[7%] w-2.5 h-2.5 rounded-full bg-violet-400"
      />
      <motion.span
        initial={{ opacity: 0, rotate: -30 }} animate={{ opacity: 0.6, rotate: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="hidden md:block absolute top-[45%] left-[12%] text-emerald-400 text-lg"
      >✦</motion.span>

      <div
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center"
        style={{ minHeight: "calc(100vh - 65px)" }}
      >
        {/* LEFT — staggered text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="z-10 py-16 lg:py-0"
        >
          <motion.p
            variants={fadeUp} custom={0}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight"
          >
            Hi! I'm
          </motion.p>
          <motion.h1
            variants={fadeUp} custom={0.08}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange leading-tight mb-4"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={fadeUp} custom={0.16} className="text-xl lg:text-2xl font-bold text-navy mb-5">
            {profile.role}
          </motion.p>
          <motion.p variants={fadeUp} custom={0.24} className="text-navy/60 leading-relaxed max-w-sm text-sm mb-10">
            {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} custom={0.32} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              View My Work <FiArrowRight />
            </a>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 bg-white border border-navy/20 hover:border-orange text-navy font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Download CV <FiDownload />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — portrait + badges */}
        <div className="relative hidden lg:flex justify-center items-center">
          {/* Portrait */}
          <motion.div
            variants={scaleIn} custom={0.2}
            initial="hidden" animate="show"
            className="relative z-10 w-72 xl:w-80"
          >
            <img
              src="/1773993979501.jpg"
              alt="Hope Mutimutuje"
              className="w-full object-cover"
              style={{ borderRadius: "2rem", height: "520px", objectFit: "cover", objectPosition: "top center" }}
            />
          </motion.div>

          {/* Spring Boot badge */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            className="flex absolute top-10 right-2 xl:right-4 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[215px]"
          >
            <TechIcon name={floatingBadges[0].icon} size={24} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[0].title}</p>
              <p className="text-xs text-navy/50 leading-snug">{floatingBadges[0].text}</p>
            </div>
          </motion.div>

          {/* Node.js badge */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            className="flex absolute bottom-10 -left-4 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[215px]"
          >
            <TechIcon name={floatingBadges[1].icon} size={24} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[1].title}</p>
              <p className="text-xs text-navy/50 leading-snug">{floatingBadges[1].text}</p>
            </div>
          </motion.div>

          {/* TYPO3 badge */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            className="flex absolute top-1/2 -translate-y-1/2 -left-4 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[215px]"
          >
            <TechIcon name={floatingBadges[2].icon} size={24} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[2].title}</p>
              <p className="text-xs text-navy/50 leading-snug">{floatingBadges[2].text}</p>
            </div>
          </motion.div>

          {/* Side pill */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 absolute -right-24 xl:-right-20 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-soft px-3 py-5 w-[86px] z-20"
          >
            <span className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
              <FiCode size={17} />
            </span>
            <ul className="text-[10px] font-semibold text-navy/60 text-center leading-5">
              {sideList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5 w-full px-2 mt-1">
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
          className="lg:hidden flex justify-center pb-8"
        >
          <img
            src="/1773993979501.jpg"
            alt="Hope Mutimutuje"
            className="w-56 object-cover object-top rounded-3xl shadow-soft"
          />
        </motion.div>
      </div>
    </section>
  );
}
