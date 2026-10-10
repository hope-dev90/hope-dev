import { profile } from "../data";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaJava, FaLinux } from "react-icons/fa";
import { SiDocker, SiPostgresql, SiSpringboot } from "react-icons/si";
import { motion } from "framer-motion";

const brandLogos = [
  { Icon: FaJava, color: "#e76f00", label: "Java" },
  { Icon: SiSpringboot, color: "#6db33f", label: "Spring Boot" },
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

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden bg-[#fdfaf7] pt-28 sm:pt-32"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute left-[7%] top-[20%] hidden grid-cols-4 gap-2 opacity-45 md:grid">
        {Array.from({ length: 20 }, (_, index) => <span key={index} className="h-1 w-1 rounded-full bg-orange" />)}
      </div>
      <div className="pointer-events-none absolute bottom-[10%] right-[7%] hidden grid-cols-4 gap-2 opacity-35 md:grid">
        {Array.from({ length: 20 }, (_, index) => <span key={index} className="h-1 w-1 rounded-full bg-orange" />)}
      </div>
      <span className="pointer-events-none absolute -left-16 bottom-[-5rem] h-56 w-56 rounded-full border-2 border-orange/15 sm:h-72 sm:w-72" />
      <span className="pointer-events-none absolute -right-12 top-8 h-36 w-36 rounded-full border-2 border-orange/10" />
      <span className="pointer-events-none absolute left-[10%] top-1/2 hidden h-5 w-5 rounded-full bg-orange/15 md:block" />

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-4xl flex-col items-center px-6 pb-14 text-center sm:px-8">
        <motion.div {...enter(0.1)} className="relative mb-6 sm:mb-7">
          <div className="absolute inset-3 -z-10 rounded-full bg-orange/15 blur-2xl" />
          <img
            src="/1773993979501.jpg"
            alt="Hope Mutimutuje"
            className="h-48 w-48 rounded-full border-[6px] border-white object-cover object-top shadow-[0_18px_40px_rgba(26,26,46,0.16)] sm:h-64 sm:w-64"
          />
        </motion.div>

        <motion.p {...enter(0.2)} className="text-3xl font-medium uppercase tracking-[0.16em] text-navy sm:text-5xl">
          Backend
        </motion.p>
        <motion.h1
          {...enter(0.28)}
          id="hero-title"
          className="mt-1 text-5xl font-black uppercase leading-none tracking-[-0.04em] text-orange sm:text-7xl md:text-8xl"
        >
          Developer
        </motion.h1>

        <motion.p {...enter(0.36)} className="mt-6 max-w-2xl text-sm leading-7 text-navy/60 sm:mt-7 sm:text-lg sm:leading-8">
          {profile.intro}
        </motion.p>

        <motion.div {...enter(0.44)} className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark hover:-translate-y-0.5"
          >
            Get In Touch <FiArrowRight aria-hidden="true" />
          </a>
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-card transition hover:-translate-y-0.5 hover:border-orange/30"
          >
            Download CV <FiDownload aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div {...enter(0.52)} className="mt-10 w-full max-w-xl sm:mt-12">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-navy/10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy/45 sm:text-xs">
              Core technologies
            </p>
            <span className="h-px flex-1 bg-navy/10" />
          </div>
          <div className="mt-5 flex items-center justify-center gap-5 sm:gap-7">
            {brandLogos.map(({ Icon, color, label }) => (
              <span key={label} title={label} className="transition-transform duration-200 hover:-translate-y-1" aria-label={label}>
                <Icon size={30} color={color} />
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
