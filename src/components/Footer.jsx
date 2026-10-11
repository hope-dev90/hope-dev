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

  const pages = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Certificates", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const socialColumns = [
    { label: "GitHub", href: profile.socials.github },
    { label: "LinkedIn", href: profile.socials.linkedin },
    { label: "Instagram", href: "https://www.instagram.com/heart._u_t_u_j_e/", external: true },
    { label: "Email", href: "mailto:mutimutujehope90@gmail.com" },
  ];

  return (
    <footer id="footer" className="bg-lavender py-14 text-navy sm:py-20" style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border-[3px] border-[#1d1d2a]/15 bg-[#f7f0ee] px-6 py-8 shadow-[0_18px_40px_rgba(31,34,51,0.08)] sm:px-8 lg:px-10">
          <div className="mb-10 flex items-center gap-3 sm:mb-12" style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}>
            <img src="/logo-touch.png" alt="Hope logo" className="h-10 w-10 rounded-xl object-contain shadow-inner" />
            <span className="text-2xl font-extrabold tracking-[-0.05em] text-navy">Hope</span>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4 text-navy">
              <p className="text-[clamp(2.2rem,4vw,4rem)] font-black leading-[0.95] tracking-[-0.06em] text-navy">
                Walk the
              </p>
              <p className="text-[clamp(2.2rem,4vw,4rem)] font-black leading-[0.95] tracking-[-0.06em] text-orange">
                Walk 🔮
              </p>
            </div>

            <div className="mt-2 grid w-full max-w-[380px] grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold text-navy/75 md:text-base">
              <div>
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/55">Pages</p>
                <ul className="space-y-2.5">
                  {pages.map((page) => (
                    <li key={page.label}>
                      <a href={page.href} className="transition-colors hover:text-orange font-medium">
                        {page.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy/55">Socials</p>
                <ul className="space-y-2.5">
                  {socialColumns.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:text-orange font-medium"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-navy/15 pt-5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-navy/60 sm:flex-row sm:items-center">
            <p>© {year} Hope Mutimutuje. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#top" className="transition-colors hover:text-orange">Back to top</a>
              <a href="#" className="transition-colors hover:text-orange">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
