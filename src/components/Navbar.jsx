import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const landingLinks = [
  { label: "Home", href: "#top", id: "top" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Certifications", href: "#certifications", id: "certifications" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sectionIds = landingLinks.map((l) => l.id);

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
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
      return undefined;
    }

    setIsVisible(window.scrollY >= 80);
    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY >= 80);
      if (currentScrollY < 80) setOpen(false);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [isCV]);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) {
      setIsFooterVisible(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [location.pathname]);

  const shouldShow = isVisible && !isFooterVisible;

  return (
    <motion.header
      initial={false}
      animate={{ opacity: shouldShow ? 1 : 0, y: shouldShow ? 0 : -104 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: shouldShow ? "auto" : "none" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 md:inset-x-auto md:right-6 md:top-[18%] md:w-[128px] md:p-0"
    >
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-navy/10 bg-[#faf7f4]/95 px-5 shadow-[0_14px_38px_rgba(31,34,51,0.12)] backdrop-blur-md sm:px-7 md:min-h-[440px] md:w-full md:flex-col md:justify-start md:gap-9 md:rounded-[2rem] md:px-3 md:py-6"
        style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}
      >
        <Link to="/" className="shrink-0" aria-label="Hope Mutimutuje home">
          <img src="/logo-touch.png" alt="" className="h-11 w-11 rounded-xl object-contain" />
        </Link>

        {isCV ? (
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.12em] text-navy/70 hover:text-orange">
            ← Portfolio
          </Link>
        ) : (
          <>
            <ul className="hidden items-center gap-10 md:flex md:flex-col md:gap-8">
              {landingLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative block text-center text-[11px] font-extrabold uppercase tracking-[0.08em] transition-colors hover:text-orange ${isActive ? "text-orange" : "text-navy/65"}`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-1/2 h-px w-7 -translate-x-1/2 bg-orange"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex flex-col gap-1.5 p-2 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="h-0.5 w-6 bg-navy" />
              <span className="h-0.5 w-6 bg-navy" />
            </button>
          </>
        )}
      </nav>

      <AnimatePresence>
        {open && !isCV && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-5xl rounded-3xl border border-navy/10 bg-[#faf7f4]/95 p-5 shadow-[0_14px_38px_rgba(31,34,51,0.12)] backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {landingLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="text-sm font-bold uppercase tracking-[0.1em] text-navy/70 hover:text-orange">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
