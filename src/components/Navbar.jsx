import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, profile } from "../data";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isCV = location.pathname === "/cv";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-navy">
          {firstName}{" "}
          <motion.span
            className="text-orange inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {lastName}
          </motion.span>
        </Link>

        {/* Nav links */}
        {!isCV && (
          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-navy">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
              >
                <a
                  href={link.href}
                  className="relative hover:text-orange transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Right buttons */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {!isCV && (
            <Link
              to="/cv"
              className="text-sm font-semibold text-navy/70 hover:text-orange transition-colors px-4 py-2 rounded-full border border-navy/15 hover:border-orange"
            >
              View CV
            </Link>
          )}
          {isCV ? (
            <Link to="/"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
              Portfolio
            </Link>
          ) : (
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center bg-orange hover:bg-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Let's Connect
            </motion.a>
          )}
        </motion.div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-navy p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-navy mb-1.5 origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-navy mb-1.5"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-navy origin-center"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-navy/10 bg-white"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {!isCV && navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-navy font-medium hover:text-orange transition-colors">
                  {link.label}
                </a>
              ))}
              {!isCV && (
                <Link to="/cv" onClick={() => setOpen(false)}
                  className="text-navy font-medium hover:text-orange transition-colors">
                  View CV
                </Link>
              )}
              <a href="#contact" onClick={() => setOpen(false)}
                className="inline-flex justify-center bg-orange text-white font-semibold px-5 py-2.5 rounded-full">
                Let's Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
