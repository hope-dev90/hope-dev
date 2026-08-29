import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, profile } from "../data";

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-navy">
          {firstName} <span className="text-orange">{lastName}</span>
        </Link>

        {/* Nav links — only on portfolio page */}
        {!isCV && (
          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-navy">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-orange transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!isCV && (
            <Link
              to="/cv"
              className="text-sm font-semibold text-navy/70 hover:text-orange transition-colors px-4 py-2 rounded-full border border-navy/15 hover:border-orange"
            >
              View CV
            </Link>
          )}
          {isCV ? (
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Portfolio
            </Link>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center bg-orange hover:bg-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Let's Connect
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-navy p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-navy mb-1.5" />
          <span className="block w-6 h-0.5 bg-navy mb-1.5" />
          <span className="block w-6 h-0.5 bg-navy" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-white border-t border-navy/10">
          {!isCV && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-navy font-medium hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          {!isCV && (
            <Link
              to="/cv"
              onClick={() => setOpen(false)}
              className="text-navy font-medium hover:text-orange transition-colors"
            >
              View CV
            </Link>
          )}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center bg-orange text-white font-semibold px-5 py-2.5 rounded-full"
          >
            Let's Connect
          </a>
        </div>
      )}
    </header>
  );
}
