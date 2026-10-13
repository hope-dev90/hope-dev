import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiDownload, FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaJava, FaLinux } from "react-icons/fa";
import { SiDocker, SiPostgresql, SiSpringboot, SiTypo3 } from "react-icons/si";

const MAROON      = "#7a0a0d";
const MAROON_DARK = "#5e070a";
const INK         = "#1f2233";

const rolePhrases = ["Backend Developer", "Typo3 CMS Developer"];

const navLinks = [
  { label: "Home",     href: "#top",           id: "top"            },
  { label: "About",    href: "#about",          id: "about"          },
  { label: "Projects", href: "#projects",       id: "projects"       },
  { label: "Certs",    href: "#certifications", id: "certifications" },
  { label: "Contact",  href: "#contact",        id: "contact"        },
];

const brandLogos = [
  { Icon: FaJava,       color: "#e76f00", label: "Java"        },
  { Icon: SiSpringboot, color: "#6db33f", label: "Spring Boot" },
  { Icon: SiTypo3,      color: "#ff8700", label: "TYPO3"       },
  { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL"  },
  { Icon: SiDocker,     color: "#2496ed", label: "Docker"      },
  { Icon: FaGithub,     color: "#24292f", label: "GitHub"      },
  { Icon: FaLinux,      color: "#111111", label: "Linux"       },
];

function NavIcon({ name, size = 17, strokeWidth = 1.8 }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const p = {
    top:            <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-7h6v7"/></>,
    about:          <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    projects:       <><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M9 9v11M15 9v11"/></>,
    certifications: <><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1 7 4.5-2.5 4.5 2.5-1-7"/><path d="m9.5 9 1.7 1.7 3.5-3.5"/></>,
    contact:        <><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" {...c} aria-hidden="true" focusable="false">{p[name]}</svg>;
}

function Typewriter({ phrases, delay = 620, typingSpeed = 92, deletingSpeed = 52, pause = 1800 }) {
  const reduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState(reduceMotion ? phrases[0] : "");
  useEffect(() => {
    if (reduceMotion) { setTypedText(phrases[0]); return; }
    setTypedText(""); let pi = 0, ci = 0, deleting = false, timer;
    const tick = () => {
      const phrase = phrases[pi];
      if (!deleting) { ci++; setTypedText(phrase.slice(0,ci)); if (ci===phrase.length){ deleting=true; timer=setTimeout(tick,pause); return; } }
      else { ci--; setTypedText(phrase.slice(0,ci)); if (ci===0){ deleting=false; pi=(pi+1)%phrases.length; timer=setTimeout(tick,360); return; } }
      timer = setTimeout(tick, deleting ? deletingSpeed : typingSpeed);
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [deletingSpeed, delay, pause, phrases, reduceMotion, typingSpeed]);
  return (
    <span aria-label={typedText || phrases[0]}>
      <span aria-hidden="true">{typedText}</span>
      {!reduceMotion && <motion.span aria-hidden="true" animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity, ease:"linear" }} className="ml-0.5 inline-block h-[0.78em] w-[0.07em] bg-current align-[-0.05em]" />}
    </span>
  );
}

const enter = (delay = 0) => ({ initial:{opacity:0,y:18}, animate:{opacity:1,y:0}, transition:{delay,duration:0.55,ease:[0.22,1,0.36,1]} });

function HeroNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible]   = useState(true);
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); if (!e.isIntersecting) setMenuOpen(false); }, { threshold: 0.05 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="absolute inset-x-0 top-0 z-40 w-full"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Hope Mutimutuje home">
          <img src="/logo-touch.png" alt="" className="h-9 w-9 rounded-xl object-contain" />
          <span className="font-heading text-sm font-bold sm:text-base" style={{ color: INK }}>Mutimutuje Hope</span>
        </a>
        <nav aria-label="Hero navigation" className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-black/5 hover:text-orange"
              style={{ color: "rgba(31,34,51,0.65)" }}
            >
              <NavIcon name={link.id} size={13} />{link.label}
            </a>
          ))}
        </nav>
        <button type="button" onClick={() => setMenuOpen(v => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-black/5 sm:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} style={{ color: INK }}
        >
          {menuOpen ? <FiX size={20}/> : <FiMenu size={20}/>}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav aria-label="Mobile hero navigation"
            initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}
            className="mx-4 mb-2 overflow-hidden rounded-2xl border border-black/[0.07] bg-white/90 shadow-lg backdrop-blur-xl sm:hidden"
          >
            <ul className="flex flex-col divide-y divide-black/[0.05]">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors hover:text-orange"
                    style={{ color: "rgba(31,34,51,0.75)" }}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.04]" style={{ color: MAROON }}>
                      <NavIcon name={link.id} size={15}/>
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title"
      className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: "#faf7f4" }}
    >
      <HeroNav />
      <span className="pointer-events-none absolute -left-24 bottom-[-4rem] hidden h-64 w-64 rounded-full border-[1.5px] sm:block" style={{ borderColor: "rgba(122,10,13,0.18)" }} />
      <span className="pointer-events-none absolute -right-16 top-16 hidden h-36 w-36 rounded-full border-[1.5px] sm:block" style={{ borderColor: "rgba(122,10,13,0.14)" }} />

      <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 pb-6 pt-20 text-center sm:px-8 sm:pt-24 md:max-w-2xl">
        <motion.div {...enter(0.1)} className="relative mb-6">
          <div className="absolute inset-3 -z-10 rounded-full blur-xl" style={{ backgroundColor: "rgba(122,10,13,0.10)" }} />
          <img src="/pof.png" alt="Hope Mutimutuje" className="h-28 w-28 rounded-full border-4 border-white object-cover object-top shadow-[0_10px_28px_rgba(26,26,46,0.14)] sm:h-36 sm:w-36" />
        </motion.div>
        <motion.p {...enter(0.2)} animate={{ opacity:[1,0.68,1], y:[0,-4,0] }} transition={{ delay:0.75, duration:2.4, repeat:Infinity, ease:"easeInOut" }}
          className="font-heading text-base font-black uppercase tracking-[0.18em] sm:text-xl md:text-2xl" style={{ color: INK }}
        >I am Hope</motion.p>
        <h1 id="hero-title" className="font-heading mt-2 w-full text-[clamp(1.7rem,7vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]" style={{ color: MAROON }}>
          <Typewriter phrases={rolePhrases} />
        </h1>
        <motion.p {...enter(0.36)} className="mt-4 w-full max-w-[420px] text-sm leading-6 sm:text-base sm:leading-7" style={{ color:"rgba(31,34,51,0.60)", fontWeight:300 }}>
          I build robust, scalable and secure backend systems and APIs. Passionate about clean architecture and solving real-world problems.
        </motion.p>
        <motion.div {...enter(0.44)} className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="#contact" className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 sm:w-auto"
            style={{ backgroundColor: MAROON, boxShadow:"0 8px 20px rgba(122,10,13,0.26)" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor=MAROON_DARK}
            onMouseLeave={e => e.currentTarget.style.backgroundColor=MAROON}
          >Get In Touch <FiArrowRight aria-hidden="true" /></a>
          <Link to="/cv" className="flex w-full items-center justify-center gap-2 rounded-full border bg-white px-7 py-3 text-sm font-bold shadow-[0_4px_14px_rgba(26,26,46,0.08)] transition hover:-translate-y-0.5 sm:w-auto"
            style={{ color: INK, borderColor:"rgba(31,34,51,0.10)" }}
          >Download CV <FiDownload aria-hidden="true" /></Link>
        </motion.div>
      </div>

      <motion.div {...enter(0.52)} className="w-full shrink-0 pb-6 pt-3 text-center">
        <div className="mx-auto flex max-w-xs items-center gap-3 px-5 sm:max-w-sm">
          <span className="h-px flex-1" style={{ backgroundColor:"rgba(31,34,51,0.12)" }} />
          <p className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] sm:text-[10px]" style={{ color:"rgba(31,34,51,0.40)" }}>Work for all this brand &amp; client</p>
          <span className="h-px flex-1" style={{ backgroundColor:"rgba(31,34,51,0.12)" }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 px-5 sm:gap-6">
          {brandLogos.map(({ Icon, color, label }) => (
            <span key={label} title={label} aria-label={label} className="transition-transform duration-200 hover:-translate-y-1"><Icon size={20} color={color} /></span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
