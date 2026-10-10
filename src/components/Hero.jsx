import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaJava, FaLinux } from "react-icons/fa";
import { SiDocker, SiPostgresql, SiSpringboot, SiTypo3 } from "react-icons/si";

const MAROON = "#7a0a0d";
const MAROON_DARK = "#5e070a";
const INK = "#1f2233";

const navLinks = [
  { label: "Home", href: "#top", active: true },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const brandLogos = [
  { Icon: FaJava, color: "#e76f00", label: "Java" },
  { Icon: SiSpringboot, color: "#6db33f", label: "Spring Boot" },
  { Icon: SiTypo3, color: "#ff8700", label: "TYPO3" },
  { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL" },
  { Icon: SiDocker, color: "#2496ed", label: "Docker" },
  { Icon: FaGithub, color: "#24292f", label: "GitHub" },
  { Icon: FaLinux, color: "#111111", label: "Linux" },
];

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

function DotGrid({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute hidden grid-cols-5 gap-[14px] md:grid ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <span
          key={i}
          className="h-[3px] w-[3px] rounded-full"
          style={{ backgroundColor: "rgba(122,10,13,0.22)" }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex h-screen max-h-screen flex-col overflow-hidden"
      style={{ backgroundColor: "#faf7f4" }}
    >
      {/* ---------- Navbar ---------- */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1511px] shrink-0 items-center justify-between px-6 py-4 sm:px-12 lg:px-[72px]">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3"
          aria-label="Hope Mutimutuje home"
        >
          <img src="/logo-touch.png" alt="" className="h-11 w-11 rounded-xl object-contain sm:h-12 sm:w-12" />
          <span
            className="font-heading text-sm font-semibold sm:text-base"
            style={{ color: INK }}
          >
            Mutimutuje Hope
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-7 lg:gap-10">
          {navLinks.map(({ label, href, active }, index) => (
            <a
              key={label}
              href={href}
              className={`relative pb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors sm:text-[12px] sm:tracking-[0.14em] ${index > 0 && index < navLinks.length - 1 ? "hidden sm:inline" : ""}`}
              style={{ color: active ? MAROON : "rgba(31,34,51,0.75)" }}
            >
              {label}
              {active && (
                <span
                  className="absolute inset-x-0 -bottom-px h-[2px]"
                  style={{ backgroundColor: MAROON }}
                />
              )}
            </a>
          ))}
        </nav>
      </header>

      {/* ---------- Decorations ---------- */}
      <DotGrid className="left-[6.8%] top-[20%]" />
      <DotGrid className="bottom-[8%] right-[8.5%]" />

      {/* big arcs, bottom-left */}
      <span
        className="pointer-events-none absolute -left-[22rem] bottom-[-14rem] hidden h-[26rem] w-[26rem] rounded-full border md:block"
        style={{ borderColor: "rgba(122,10,13,0.10)" }}
      />
      <span
        className="pointer-events-none absolute -left-32 bottom-[-6rem] h-72 w-72 rounded-full border-[1.5px] sm:h-[22rem] sm:w-[22rem]"
        style={{ borderColor: "rgba(122,10,13,0.18)" }}
      />
      {/* arc, top-right */}
      <span
        className="pointer-events-none absolute -right-20 top-14 h-44 w-44 rounded-full border-[1.5px]"
        style={{ borderColor: "rgba(122,10,13,0.14)" }}
      />
      {/* small filled dot */}
      <span
        className="pointer-events-none absolute left-[11.4%] top-[45.5%] hidden h-[22px] w-[22px] rounded-full md:block"
        style={{ backgroundColor: "rgba(122,10,13,0.16)" }}
      />

      {/* ---------- Content ---------- */}
      <div className="relative mx-auto flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-8">
        {/* Avatar */}
        <motion.div {...enter(0.1)} className="relative mb-4 sm:mb-5">
          <div
            className="absolute inset-3 -z-10 rounded-full blur-xl"
            style={{ backgroundColor: "rgba(122,10,13,0.10)" }}
          />
          <img
            src="/pof.png"
            alt="Hope Mutimutuje"
            className="h-32 w-32 rounded-full border-4 border-white object-cover object-top shadow-[0_10px_28px_rgba(26,26,46,0.14)] sm:h-40 sm:w-40"
          />
        </motion.div>

        {/* Title */}
        <motion.p
          {...enter(0.2)}
          animate={{ opacity: [1, 0.68, 1], y: [0, -4, 0] }}
          transition={{ delay: 0.75, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="font-heading text-xl font-black uppercase tracking-[0.18em] sm:text-2xl md:text-3xl"
          style={{ color: INK }}
        >
          Backend
        </motion.p>
        <motion.h1
          {...enter(0.28)}
          id="hero-title"
          className="font-heading mt-1 text-[clamp(2.25rem,6vw,4.25rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]"
          style={{ color: MAROON }}
        >
          Developer
        </motion.h1>

        {/* Intro */}
        <motion.p
          {...enter(0.36)}
          className="mt-4 max-w-[520px] text-xs leading-5 sm:mt-5 sm:text-base sm:leading-6"
          style={{ color: "rgba(31,34,51,0.60)", fontWeight: 300 }}
        >
          I build robust, scalable and secure backend systems and APIs using
          cutting-edge technologies. Passionate about clean architecture, system
          design, and solving real-world problems with impactful backend solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div {...enter(0.44)} className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: MAROON, boxShadow: "0 8px 20px rgba(122,10,13,0.26)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MAROON_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = MAROON)}
          >
            Get In Touch <FiArrowRight aria-hidden="true" />
          </a>
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 rounded-full border bg-white px-6 py-2.5 text-sm font-bold shadow-[0_4px_14px_rgba(26,26,46,0.08)] transition hover:-translate-y-0.5"
            style={{ color: INK, borderColor: "rgba(31,34,51,0.10)" }}
          >
            Download CV <FiDownload aria-hidden="true" />
          </Link>
        </motion.div>
      </div>

      {/* ---------- Technologies — pinned to bottom ---------- */}
      <motion.div {...enter(0.52)} className="relative shrink-0 pb-5 pt-3 text-center">
        <div className="mx-auto flex max-w-[480px] items-center gap-4 px-6">
          <span className="h-px flex-1" style={{ backgroundColor: "rgba(31,34,51,0.12)" }} />
          <p
            className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[11px]"
            style={{ color: "rgba(31,34,51,0.40)" }}
          >
            Work for all this brand &amp; client
          </p>
          <span className="h-px flex-1" style={{ backgroundColor: "rgba(31,34,51,0.12)" }} />
        </div>
        <div className="mt-3 flex items-center justify-center gap-5 sm:gap-7">
          {brandLogos.map(({ Icon, color, label }) => (
            <span
              key={label}
              title={label}
              aria-label={label}
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <Icon size={30} color={color} />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
