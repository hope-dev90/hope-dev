import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const landingLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isCV = location.pathname === "/cv";

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-24 max-w-[88rem] items-center justify-between px-6 sm:px-10">
        <Link to="/" className="text-4xl font-black leading-none tracking-[-0.08em] text-navy" aria-label="Hope Mutimutuje home">
          HM<span className="text-orange">.</span>
        </Link>

        {isCV ? (
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.12em] text-navy/70 hover:text-orange">
            ← Portfolio
          </Link>
        ) : (
          <>
            <ul className="hidden items-center gap-10 md:flex">
              {landingLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative text-sm font-bold uppercase tracking-[0.08em] transition-colors hover:text-orange ${index === 0 ? "text-orange" : "text-navy/65"}`}
                  >
                    {link.label}
                    {index === 0 && <span className="absolute -bottom-3 left-0 h-px w-full bg-orange" />}
                  </a>
                </li>
              ))}
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
