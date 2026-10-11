
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const landingLinks = [
  { label: "Home", href: "#top", id: "top" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Certificates", href: "#certifications", id: "certifications" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// Lightweight SVG icons. No icon library required.
function NavIcon({ name, size = 19, strokeWidth = 1.8 }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const paths = {
    top: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    about: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    projects: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M9 9v11M15 9v11" />
      </>
    ),
    certifications: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14-1 7 4.5-2.5 4.5 2.5-1-7" />
        <path d="m9.5 9 1.7 1.7 3.5-3.5" />
      </>
    ),
    contact: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    arrow: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    back: (
      <>
        <path d="m15 18-6-6 6-6" />
        <path d="M9 12h11" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...common}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const elements = landingLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const location = useLocation();
  const isCV = location.pathname === "/cv";
  const activeSection = useActiveSection();

  useEffect(() => {
    if (isCV) {
      setIsVisible(true);
      setOpen(false);
      return;
    }

    const updateVisibility = () => {
      const visible = window.scrollY >= 80;
      setIsVisible(visible);

      if (!visible) setOpen(false);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", updateVisibility);
  }, [isCV]);

  useEffect(() => {
    if (isCV) {
      setIsFooterVisible(false);
      return;
    }

    const footer = document.getElementById("footer");

    if (!footer) {
      setIsFooterVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, [location.pathname, isCV]);

  const shouldShow = isCV
    ? isVisible
    : isVisible && !isFooterVisible;

  const closeMenu = () => setOpen(false);

  const handleNavClick = (id) => {
    setOpen(false);
    setActiveFromClick(id);
  };

  // Keep clicked navigation responsive before the observer updates.
  function setActiveFromClick(id) {
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <motion.header
      initial={false}
      animate={{
        opacity: shouldShow ? 1 : 0,
      }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        pointerEvents: shouldShow ? "auto" : "none",
        y: shouldShow ? "-50%" : "calc(-50% - 24px)",
      }}
      className="
        fixed inset-x-0 top-0 z-50 px-4 pt-4
        sm:px-6
        md:inset-x-auto md:right-4 md:top-1/2
        md:w-[76px] md:p-0
      "
    >
      <nav
        aria-label="Main navigation"
        className="
          mx-auto mb-5 flex h-14 max-w-5xl items-center
          justify-between rounded-full border border-[#24243a]/[0.09]
          bg-[#faf8f6]/95 px-4
          shadow-[0_10px_35px_rgba(31,34,51,0.09)]
          backdrop-blur-xl
          sm:px-5
          md:h-auto md:min-h-0 md:max-h-[calc(100dvh-24px)] md:w-full md:flex-col
          md:justify-start md:gap-1 md:overflow-y-auto md:rounded-[24px]
          md:px-1.5 md:py-2.5
        "
        style={{
          fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Brand / Home */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Hope Mutimutuje home"
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-2xl transition-transform duration-200
            hover:scale-105 focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-orange
            md:mb-1
          "
        >
          <img
            src="/logo-touch.png"
            alt=""
            className="h-9 w-9 rounded-xl object-contain"
          />
        </Link>

        {isCV ? (
          <Link
            to="/"
            className="
              inline-flex items-center gap-1.5 rounded-full
              px-2 py-2 text-[10px] font-bold uppercase
              tracking-wide text-[#24243a]/70
              transition-colors hover:text-orange
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-orange
              md:flex md:flex-col md:gap-1
            "
          >
            <NavIcon name="back" size={17} />
            <span className="md:text-[8px]">Portfolio</span>
          </Link>
        ) : (
          <>
            {/* Desktop navigation */}
            <ul className="hidden w-full flex-col gap-0.5 md:flex">
              {landingLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <li key={link.id} className="w-full">
                    <a
                      href={link.href}
                      aria-label={link.label}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => handleNavClick(link.id)}
                      className={`
                        group relative flex w-full flex-col
                        items-center justify-center gap-1.5
                        rounded-xl px-1 py-1.5
                        transition-all duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-orange
                        ${
                          isActive
                            ? "bg-orange/[0.08] text-orange"
                            : "text-[#24243a]/60 hover:bg-[#24243a]/[0.04] hover:text-orange"
                        }
                      `}
                    >
                      {/* Active indicator */}
                      <motion.span
                        aria-hidden="true"
                        className="
                          absolute left-0 top-1/2 h-6 w-[3px]
                          -translate-y-1/2 rounded-full bg-orange
                        "
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scaleY: isActive ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      <span
                        className={`
                          flex h-8 w-8 items-center justify-center
                          rounded-xl transition-all duration-200
                          ${
                            isActive
                              ? "bg-orange text-white shadow-[0_5px_14px_rgba(232,98,44,0.22)]"
                              : "bg-transparent text-current group-hover:bg-white"
                          }
                        `}
                      >
                        <NavIcon name={link.id} size={19} />
                      </span>

                      <span
                        className="
                          text-center text-[8px] font-bold
                          uppercase tracking-[0.055em]
                        "
                      >
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl text-[#24243a]
                transition-colors hover:bg-black/[0.04]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-orange
                md:hidden
              "
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <NavIcon name={open ? "close" : "menu"} size={23} />
            </button>
          </>
        )}
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && !isCV && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="
              mx-auto mt-3 max-w-5xl overflow-hidden
              rounded-3xl border border-[#24243a]/[0.09]
              bg-[#faf8f6]/95 p-3
              shadow-[0_14px_38px_rgba(31,34,51,0.12)]
              backdrop-blur-xl md:hidden
            "
          >
            <ul className="flex flex-col gap-1">
              {landingLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => handleNavClick(link.id)}
                      className={`
                        flex items-center justify-between
                        rounded-2xl px-4 py-3
                        text-sm font-semibold
                        transition-colors duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-orange
                        ${
                          isActive
                            ? "bg-orange/[0.09] text-orange"
                            : "text-[#24243a]/75 hover:bg-black/[0.03] hover:text-orange"
                        }
                      `}
                    >
                      <span>{link.label}</span>
                      <NavIcon name={link.id} size={19} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
