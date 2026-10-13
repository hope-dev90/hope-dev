import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const landingLinks = [
  { label: "Home",     href: "#top",            id: "top"            },
  { label: "About",    href: "#about",           id: "about"          },
  { label: "Projects", href: "#projects",        id: "projects"       },
  { label: "Certs",    href: "#certifications",  id: "certifications" },
  { label: "Contact",  href: "#contact",         id: "contact"        },
];

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */
function NavIcon({ name, size = 19, strokeWidth = 1.8 }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    top: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-7h6v7" /></>,
    about: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    projects: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9 9v11M15 9v11" /></>,
    certifications: <><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1 7 4.5-2.5 4.5 2.5-1-7" /><path d="m9.5 9 1.7 1.7 3.5-3.5" /></>,
    contact: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
    back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h11" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...common} aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

/* ── Active section tracker ───────────────────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const elements = landingLinks.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ── Main Navbar ──────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const location = useLocation();
  const isCV = location.pathname === "/cv";
  const activeSection = useActiveSection();

  /* show/hide on scroll */
  useEffect(() => {
    if (isCV) { setIsVisible(true); return; }
    const update = () => {
      const visible = window.scrollY >= 80;
      setIsVisible(visible);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isCV]);

  /* hide when footer visible */
  useEffect(() => {
    if (isCV) { setIsFooterVisible(false); return; }
    const footer = document.getElementById("footer");
    if (!footer) { setIsFooterVisible(false); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [location.pathname, isCV]);

  const shouldShow = isCV ? isVisible : isVisible && !isFooterVisible;

  const handleNavClick = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          MOBILE — bottom tab bar (hidden on md+)
      ════════════════════════════════════════════════════════════════ */}
      <motion.nav
        aria-label="Main navigation"
        initial={false}
        animate={{ opacity: shouldShow ? 1 : 0, y: shouldShow ? 0 : 20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: shouldShow ? "auto" : "none" }}
        className="
          fixed bottom-0 inset-x-0 z-50
          md:hidden
          border-t border-[#24243a]/[0.08]
          bg-[#faf8f6]/95 backdrop-blur-xl
          shadow-[0_-8px_24px_rgba(31,34,51,0.08)]
        "
      >
        {/* safe-area padding for iPhone home indicator */}
        <div className="flex items-stretch justify-around px-1 pb-safe pt-1" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
          {isCV ? (
            <Link
              to="/"
              className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[#24243a]/60 transition-colors hover:text-orange"
            >
              <NavIcon name="back" size={20} />
              <span className="text-[9px] font-bold uppercase tracking-wide">Back</span>
            </Link>
          ) : (
            landingLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => handleNavClick(link.id)}
                  className={`
                    relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2
                    transition-colors duration-200
                    ${isActive ? "text-orange" : "text-[#24243a]/50 hover:text-orange"}
                  `}
                >
                  {/* active dot indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="bottom-tab-indicator"
                      className="absolute top-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-orange"
                    />
                  )}
                  <span className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all duration-200 ${isActive ? "bg-orange/10" : ""}`}>
                    <NavIcon name={link.id} size={18} />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.04em]">
                    {link.label}
                  </span>
                </a>
              );
            })
          )}
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP — right-side vertical pill (hidden below md)
      ════════════════════════════════════════════════════════════════ */}
      <motion.aside
        initial={false}
        animate={{ opacity: shouldShow ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{
          pointerEvents: shouldShow ? "auto" : "none",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        className="fixed right-4 z-50 hidden md:block"
      >
        <nav
          aria-label="Main navigation"
          className="
            flex h-auto w-[76px] flex-col
            items-center gap-1 overflow-y-auto
            rounded-[24px] border border-[#24243a]/[0.09]
            bg-[#faf8f6]/95 px-1.5 py-2.5
            shadow-[0_10px_35px_rgba(31,34,51,0.09)]
            backdrop-blur-xl
          "
          style={{ maxHeight: "calc(100dvh - 24px)" }}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="Hope Mutimutuje home"
            className="mb-1 flex h-10 w-10 items-center justify-center rounded-2xl transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
          >
            <img src="/logo-touch.png" alt="" className="h-9 w-9 rounded-xl object-contain" />
          </Link>

          {isCV ? (
            <Link
              to="/"
              className="flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[#24243a]/70 transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              <NavIcon name="back" size={17} />
              <span className="text-[8px] font-bold uppercase tracking-wide">Portfolio</span>
            </Link>
          ) : (
            <ul className="flex w-full flex-col gap-0.5">
              {landingLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="w-full">
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => handleNavClick(link.id)}
                      className={`
                        group relative flex w-full flex-col items-center justify-center gap-1.5
                        rounded-xl px-1 py-1.5 transition-all duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange
                        ${isActive ? "bg-orange/[0.08] text-orange" : "text-[#24243a]/60 hover:bg-[#24243a]/[0.04] hover:text-orange"}
                      `}
                    >
                      <motion.span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-orange"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${isActive ? "bg-orange text-white shadow-[0_5px_14px_rgba(120,0,0,0.22)]" : "bg-transparent text-current group-hover:bg-white"}`}>
                        <NavIcon name={link.id} size={19} />
                      </span>
                      <span className="text-center text-[8px] font-bold uppercase tracking-[0.055em]">
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </motion.aside>
    </>
  );
}
