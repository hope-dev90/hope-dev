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
      className="relative isolate min-h-screen overflow-hidden"
      style={{ backgroundColor: "#faf7f4" }}
    >
      {/* ---------- Navbar ---------- */}
      <header className="relative z-10 mx-auto flex max-w-[1511px] items-center justify-between px-6 py-5 sm:px-12 sm:py-6 lg:px-[72px]">
        <a
          href="#top"
          className="shrink-0"
          aria-label="Hope Mutimutuje home"
        >
          <img src="/logo-touch.png" alt="" className="h-11 w-11 rounded-xl object-contain sm:h-12 sm:w-12" />
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
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-7 text-center sm:px-8 sm:pb-8">
        {/* Avatar */}
        <motion.div {...enter(0.1)} className="relative mb-4 sm:mb-5">
          <div
            className="absolute inset-4 -z-10 rounded-full blur-2xl"
            style={{ backgroundColor: "rgba(122,10,13,0.12)" }}
          />
          <img
            src="/pof.png"
            alt="Hope Mutimutuje"
            className="h-56 w-56 rounded-full border-[5px] border-white object-cover object-top shadow-[0_18px_40px_rgba(26,26,46,0.16)] sm:h-72 sm:w-72"
          />
        </motion.div>

        {/* Title */}
        <motion.p
          {...enter(0.2)}
          className="font-heading text-4xl font-black uppercase tracking-[0.18em] sm:text-5xl md:text-6xl"
          style={{ color: INK, letterSpacing: "0.18em" }}
        >
          Backend
        </motion.p>
        <motion.h1
          {...enter(0.28)}
          id="hero-title"
          className="font-heading mt-1 text-7xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-8xl md:text-[108px]"
          style={{ color: MAROON }}
        >
          Developer
        </motion.h1>

        {/* Intro */}
        <motion.p
          {...enter(0.36)}
          className="mt-5 max-w-[640px] text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8"
          style={{ color: "rgba(31,34,51,0.62)", fontWeight: 300 }}
        >
          I build robust, scalable and secure backend systems and APIs using
          cutting-edge technologies. Passionate about clean architecture, system
          design, and solving real-world problems with impactful backend
          solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...enter(0.44)}
          className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5"
            style={{
              backgroundColor: MAROON,
              boxShadow: "0 10px 24px rgba(122,10,13,0.28)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MAROON_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = MAROON)}
          >
            Get In Touch <FiArrowRight aria-hidden="true" />
          </a>
          <Link
            to="/cv"
            className="inline-flex items-center gap-2.5 rounded-full border bg-white px-8 py-3.5 text-base font-bold shadow-[0_8px_22px_rgba(26,26,46,0.08)] transition hover:-translate-y-0.5"
            style={{ color: INK, borderColor: "rgba(31,34,51,0.08)" }}
          >
            Download CV <FiDownload aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Technologies */}
        <motion.div {...enter(0.52)} className="mt-7 w-full max-w-[540px] sm:mt-8">
          <div className="flex items-center gap-5">
            <span className="h-px flex-1" style={{ backgroundColor: "rgba(31,34,51,0.12)" }} />
            <p
              className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]"
              style={{ color: "rgba(31,34,51,0.45)" }}
            >
              Work for all this brand &amp; client
            </p>
            <span className="h-px flex-1" style={{ backgroundColor: "rgba(31,34,51,0.12)" }} />
          </div>

          <div className="mt-4 flex items-center justify-center gap-5 sm:gap-8">
            {brandLogos.map(({ Icon, color, label }) => (
              <span
                key={label}
                title={label}
                aria-label={label}
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <Icon size={32} color={color} />
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
