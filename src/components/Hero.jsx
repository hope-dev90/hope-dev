import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaJava, FaLinux } from "react-icons/fa";
import { SiDocker, SiPostgresql, SiSpringboot, SiTypo3 } from "react-icons/si";

const MAROON = "#7a0a0d";
const MAROON_DARK = "#5e070a";
const INK = "#1f2233";

const rolePhrases = ["Backend Developer", "Typo3 CMS Developer"];

const brandLogos = [
  { Icon: FaJava,       color: "#e76f00", label: "Java"        },
  { Icon: SiSpringboot, color: "#6db33f", label: "Spring Boot" },
  { Icon: SiTypo3,      color: "#ff8700", label: "TYPO3"       },
  { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL"  },
  { Icon: SiDocker,     color: "#2496ed", label: "Docker"      },
  { Icon: FaGithub,     color: "#24292f", label: "GitHub"      },
  { Icon: FaLinux,      color: "#111111", label: "Linux"       },
];

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

function Typewriter({ phrases, delay = 620, typingSpeed = 92, deletingSpeed = 52, pause = 1800 }) {
  const reduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState(reduceMotion ? phrases[0] : "");

  useEffect(() => {
    if (reduceMotion) { setTypedText(phrases[0]); return; }
    setTypedText("");
    let pi = 0, ci = 0, deleting = false, timer;
    const tick = () => {
      const phrase = phrases[pi];
      if (!deleting) {
        ci++;
        setTypedText(phrase.slice(0, ci));
        if (ci === phrase.length) { deleting = true; timer = setTimeout(tick, pause); return; }
      } else {
        ci--;
        setTypedText(phrase.slice(0, ci));
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; timer = setTimeout(tick, 360); return; }
      }
      timer = setTimeout(tick, deleting ? deletingSpeed : typingSpeed);
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [deletingSpeed, delay, pause, phrases, reduceMotion, typingSpeed]);

  return (
    <span aria-label={typedText || phrases[0]}>
      <span aria-hidden="true">{typedText}</span>
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="ml-0.5 inline-block h-[0.78em] w-[0.07em] bg-current align-[-0.05em]"
        />
      )}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: "#faf7f4" }}
    >
      {/* decorations hidden on mobile */}
      <span className="pointer-events-none absolute -left-24 bottom-[-4rem] hidden h-64 w-64 rounded-full border-[1.5px] sm:block" style={{ borderColor: "rgba(122,10,13,0.18)" }} />
      <span className="pointer-events-none absolute -right-16 top-16 hidden h-36 w-36 rounded-full border-[1.5px] sm:block" style={{ borderColor: "rgba(122,10,13,0.14)" }} />

      {/* main content */}
      <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 pb-6 pt-24 text-center sm:px-8 sm:pt-28 md:max-w-2xl">

        {/* Avatar */}
        <motion.div {...enter(0.1)} className="relative mb-6">
          <div className="absolute inset-3 -z-10 rounded-full blur-xl" style={{ backgroundColor: "rgba(122,10,13,0.10)" }} />
          <img
            src="/pof.png"
            alt="Hope Mutimutuje"
            className="h-28 w-28 rounded-full border-4 border-white object-cover object-top shadow-[0_10px_28px_rgba(26,26,46,0.14)] sm:h-36 sm:w-36"
          />
        </motion.div>

        {/* subtitle */}
        <motion.p
          {...enter(0.2)}
          animate={{ opacity: [1, 0.68, 1], y: [0, -4, 0] }}
          transition={{ delay: 0.75, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="font-heading text-base font-black uppercase tracking-[0.18em] sm:text-xl md:text-2xl"
          style={{ color: INK }}
        >
          I am Hope
        </motion.p>

        {/* headline */}
        <h1
          id="hero-title"
          className="font-heading mt-2 w-full text-[clamp(1.7rem,7vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]"
          style={{ color: MAROON }}
        >
          <Typewriter phrases={rolePhrases} />
        </h1>

        {/* intro */}
        <motion.p
          {...enter(0.36)}
          className="mt-4 w-full max-w-[420px] text-sm leading-6 sm:text-base sm:leading-7"
          style={{ color: "rgba(31,34,51,0.60)", fontWeight: 300 }}
        >
          I build robust, scalable and secure backend systems and APIs.
          Passionate about clean architecture and solving real-world problems.
        </motion.p>

        {/* buttons — stacked on mobile, row on sm+ */}
        <motion.div {...enter(0.44)} className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 sm:w-auto"
            style={{ backgroundColor: MAROON, boxShadow: "0 8px 20px rgba(122,10,13,0.26)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MAROON_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = MAROON)}
          >
            Get In Touch <FiArrowRight aria-hidden="true" />
          </a>
          <Link
            to="/cv"
            className="flex w-full items-center justify-center gap-2 rounded-full border bg-white px-7 py-3 text-sm font-bold shadow-[0_4px_14px_rgba(26,26,46,0.08)] transition hover:-translate-y-0.5 sm:w-auto"
            style={{ color: INK, borderColor: "rgba(31,34,51,0.10)" }}
          >
            Download CV <FiDownload aria-hidden="true" />
          </Link>
        </motion.div>
      </div>

      {/* brand logos */}
      <motion.div {...enter(0.52)} className="w-full shrink-0 pb-6 pt-3 text-center">
        <div className="mx-auto flex max-w-xs items-center gap-3 px-5 sm:max-w-sm">
          <span className="h-px flex-1" style={{ backgroundColor: "rgba(31,34,51,0.12)" }} />
          <p className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] sm:text-[10px]" style={{ color: "rgba(31,34,51,0.40)" }}>
            Work for all this brand &amp; client
          </p>
          <span className="h-px flex-1" style={{ backgroundColor: "rgba(31,34,51,0.12)" }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 px-5 sm:gap-6">
          {brandLogos.map(({ Icon, color, label }) => (
            <span key={label} title={label} aria-label={label} className="transition-transform duration-200 hover:-translate-y-1">
              <Icon size={20} color={color} />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
