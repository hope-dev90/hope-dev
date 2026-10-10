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
  const location = useLocation();
  const isCV = location.pathname === "/cv";
  const activeSection = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/5 bg-[#faf7f4]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[88rem] items-center justify-between px-6 sm:px-10">
        <Link to="/" className="shrink-0" aria-label="Hope Mutimutuje home">
          <img src="/logo-touch.png" alt="" className="h-11 w-11 rounded-xl object-contain" />
        </Link>

        {isCV ? (
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.12em] text-navy/70 hover:text-orange">
            ← Portfolio
          </Link>
        ) : (
          <>
            <ul className="hidden items-center gap-10 md:flex">
              {landingLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative text-sm font-bold uppercase tracking-[0.08em] transition-colors hover:text-orange ${isActive ? "text-orange" : "text-navy/65"}`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-3 left-0 h-px w-full bg-orange"
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
            className="mx-6 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft md:hidden"
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
    </header>
  );
}
