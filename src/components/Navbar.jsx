import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isCV = location.pathname === "/cv";

  // Track scrolled state for background change only — navbar always stays visible
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (isCV) return;
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [isCV]);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 will-change-transform">
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_24px_-4px_rgba(27,42,74,0.15)] border border-white/60"
      >
      <nav className="flex items-center justify-between px-6 md:px-8 h-14">

        {/* ── Logo (circular avatar) ── */}
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-11 w-11 rounded-full object-cover"
          />
        </Link>

        {/* ── Right group: nav links + CTA ── */}
        <div className="hidden lg:flex items-center gap-8">
          {!isCV && (
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setActive(id)}
                      className={`relative text-sm font-semibold transition-colors duration-200
                        ${isActive ? "text-navy" : "text-navy/55 hover:text-navy"}`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-orange rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              {!isCV && (
                <li>
                  <Link
                    to="/cv"
                    className="text-sm font-semibold text-navy/55 hover:text-navy transition-colors"
                  >
                    CV
                  </Link>
                </li>
              )}
            </ul>
          )}

          {isCV ? (
            <Link
              to="/"
              className="bg-orange hover:bg-orange-dark text-white text-sm font-bold px-6 py-2.5 transition-colors"
              style={{ borderRadius: "10px" }}
            >
              ← Portfolio
            </Link>
          ) : (
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              data-magnetic
              className="bg-orange hover:bg-orange-dark text-white text-sm font-bold px-6 py-2.5 transition-colors"
              style={{ borderRadius: "10px" }}
            >
              Contact Us
            </motion.a>
          )}
        </div>

        {/* ── Hamburger ── */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-navy origin-center" />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }}           className="block w-6 h-0.5 bg-navy" />
          <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-navy origin-center" />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden rounded-b-3xl border-t border-navy/8 bg-white/95"
          >
            <div className="px-10 py-5 flex flex-col gap-4">
              {!isCV && navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-navy/70 hover:text-orange transition-colors">
                  {link.label}
                </a>
              ))}
              {!isCV && (
                <Link to="/cv" onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-navy/70 hover:text-orange transition-colors">
                  CV
                </Link>
              )}
              <a href="#contact" onClick={() => setOpen(false)}
                className="bg-orange text-white text-sm font-bold text-center px-5 py-3"
                style={{ borderRadius: "10px" }}>
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </div>
  );
  
}