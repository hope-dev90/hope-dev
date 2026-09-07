import { profile, navLinks } from "../data";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white relative overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">

          {/* brand */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-black text-white tracking-tight leading-none">
                Hope<span className="text-orange">.</span>
              </p>
              <p className="text-sm text-white/50 mt-1 font-medium">{profile.role}</p>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Building modern, scalable and secure web applications. Based in Kigali, Rwanda.
            </p>
            {/* social icons */}
            <div className="flex items-center gap-3 mt-1">
              <motion.a
                href={profile.socials.github}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-orange flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={16} />
              </motion.a>
              <motion.a
                href={profile.socials.linkedin}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-orange flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={16} />
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-orange flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <FiMail size={16} />
              </motion.a>
            </div>
          </div>

          {/* nav links */}
          <div>
            <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-orange transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact info */}
          <div>
            <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-orange transition-colors"
              >
                <FiMail size={14} className="shrink-0" />
                {profile.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <FiMapPin size={14} className="shrink-0" />
                {profile.location}
              </div>
              <a
                href={profile.socials.github}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-orange transition-colors"
              >
                <FiGithub size={14} className="shrink-0" />
                github.com/hope-dev90
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-orange transition-colors"
              >
                <FiLinkedin size={14} className="shrink-0" />
                linkedin.com/in/mutimutujehope
              </a>
            </div>

            {/* quote */}
            <div className="mt-8 border-l-2 border-orange/40 pl-3">
              <p className="text-xs text-white/30 italic leading-relaxed">
                "{profile.quote}"
              </p>
              <p className="text-[10px] text-orange/60 font-semibold mt-1">— {profile.quoteAuthor}</p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-white/8" />

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-white/30">
            © {year} <span className="text-white/50 font-semibold">{profile.name}</span>. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Designed & built by Hope
          </p>
          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-9 h-9 rounded-full border border-white/15 hover:border-orange hover:bg-orange/10 flex items-center justify-center transition-colors shrink-0"
            aria-label="Back to top"
          >
            <FiArrowUp size={15} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
