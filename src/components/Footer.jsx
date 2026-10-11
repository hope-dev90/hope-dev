import { profile } from "../data";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const socialLinks = [
  { label: "GitHub", href: profile.socials.github, Icon: FiGithub, external: true },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: FiLinkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: FiMail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="overflow-hidden border-t border-[#faf7f4]/10 bg-[#5e070a] text-[#faf7f4]">
      <div className="mx-auto max-w-[1440px] px-6 py-9 sm:px-10 sm:py-12 lg:px-16">
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#faf7f4]/65" style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}>
          <p>© {year}</p>
          <motion.a
            href="#top"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-3 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#faf7f4] text-[#5e070a] transition-colors hover:bg-white">
              <FiArrowUp size={16} aria-hidden="true" />
            </span>
          </motion.a>
        </div>

        <div className="mt-20 sm:mt-28">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#faf7f4]/70" style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}>
            Have a project in mind?
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 block w-fit font-heading text-[clamp(3.8rem,12vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#d9b5b8] transition-colors duration-300 hover:text-white"
          >
            Let&apos;s talk
          </a>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-[#faf7f4]/15 pt-7 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3 }}
                className="inline-flex min-w-28 items-center justify-center gap-2 rounded-full border border-[#faf7f4]/35 px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] transition-colors hover:border-[#faf7f4] hover:bg-[#faf7f4] hover:text-[#5e070a]"
                style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}
              >
                <Icon size={13} aria-hidden="true" />
                {label}
              </motion.a>
            ))}
          </div>

          <p className="text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.06em] text-[#faf7f4]/55" style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}>
            Designed &amp; built by Hope Mutimutuje<br />
            Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}
