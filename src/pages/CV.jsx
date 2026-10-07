import { useState } from "react";
import {
  profile,
  cvEducation,
  cvExperience,
  cvProjects,
  cvAchievements,
  realCertificates,
  techStack,
} from "../data";
import TechIcon from "../components/TechIcon";
import {
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiExternalLink, FiArrowLeft, FiPrinter,
  FiAward, FiStar, FiCode, FiZap, FiX, FiEye,
} from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

const achIconMap = { trophy: FaTrophy, star: FiStar, award: FiAward, code: FiCode };

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-lg font-extrabold text-navy tracking-tight whitespace-nowrap">{children}</h2>
      <span className="flex-1 h-px bg-navy/10" />
    </div>
  );
}

function Pill({ label }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-navy/8 text-navy/70 border border-navy/10">
      {label}
    </span>
  );
}

// ── Certificate viewer modal ──────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy/10 shrink-0">
          <div>
            <p className="font-extrabold text-navy text-sm leading-tight">{cert.name}</p>
            <p className="text-xs text-navy/50 mt-0.5">{cert.issuer} · {cert.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange border border-orange rounded-full px-4 py-1.5 hover:bg-orange hover:text-white transition-colors"
            >
              <FiExternalLink size={12} /> Open
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-navy/8 hover:bg-navy/15 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <FiX size={16} className="text-navy" />
            </button>
          </div>
        </div>

        {/* modal body */}
        <div className="flex-1 overflow-auto bg-navy/5 flex items-center justify-center p-4">
          {cert.type === "image" ? (
            <img
              src={cert.file}
              alt={cert.name}
              className="max-w-full max-h-[70vh] rounded-xl shadow-lg object-contain"
            />
          ) : (
            <iframe
              src={cert.file}
              title={cert.name}
              className="w-full rounded-xl shadow-lg bg-white"
              style={{ height: "70vh" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Category filter pill ──────────────────────────────────────────────────────
const CATEGORIES = ["All", "Achievement", "Cybersecurity", "CTF / Competition", "AI & Tech", "Professional", "Academic"];

export default function CV() {
  const [activeCert, setActiveCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? realCertificates
    : realCertificates.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8f7fc] font-sans">

      {/* top bar */}
      <div className="bg-white border-b border-navy/8 print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy/60 hover:text-orange transition-colors">
            <FiArrowLeft size={15} /> Back to Portfolio
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            <FiPrinter size={14} /> Download / Print
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 print:py-0 print:px-0 print:max-w-none">
        <div className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 overflow-hidden print:rounded-none print:shadow-none">

          {/* ═══ HEADER ═══════════════════════════════════════════════════════ */}
          <div className="relative px-8 sm:px-12 py-10"
            style={{ background: "linear-gradient(135deg,#fde0d4 0%,#fdeae2 50%,#ffffff 100%)" }}>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <img src="/1773993979501.jpg" alt="Hope Mutimutuje"
                className="w-24 h-24 rounded-2xl object-cover object-top shadow-soft shrink-0 border-2 border-white" />
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">{profile.name}</h1>
                <p className="text-orange font-bold text-lg mt-0.5">{profile.role}</p>
                <p className="text-navy/55 text-sm mt-2 max-w-xl leading-relaxed">{profile.intro}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm shrink-0">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-navy/70 hover:text-orange transition-colors">
                  <FiMail size={13} className="text-orange shrink-0" />{profile.email}
                </a>
                <span className="flex items-center gap-2 text-navy/70">
                  <FiPhone size={13} className="text-orange shrink-0" />{profile.phone}
                </span>
                <span className="flex items-center gap-2 text-navy/70">
                  <FiMapPin size={13} className="text-orange shrink-0" />{profile.location}
                </span>
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-navy/70 hover:text-orange transition-colors">
                  <FiGithub size={13} className="text-orange shrink-0" />{profile.github}
                </a>
                <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-navy/70 hover:text-orange transition-colors">
                  <FiLinkedin size={13} className="text-orange shrink-0" />{profile.socials.linkedin}
                </a>
              </div>
            </div>
          </div>

          {/* ═══ BODY ══════════════════════════════════════════════════════════ */}
          <div className="px-8 sm:px-12 py-10 grid lg:grid-cols-[1fr_300px] gap-10">

            {/* ── LEFT ─────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-10">

              {/* EXPERIENCE */}
              <section>
                <SectionTitle>Experience</SectionTitle>
                <div className="flex flex-col gap-7">
                  {cvExperience.map((item) => (
                    <div key={item.role + item.company} className="flex gap-4">
                      <div className="flex flex-col items-center pt-1.5 shrink-0">
                        <span className={`w-3 h-3 rounded-full ${item.dot} shrink-0`} />
                        <span className="w-px flex-1 bg-navy/10 mt-1" />
                      </div>
                      <div className="pb-2">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <p className="font-extrabold text-navy text-sm">{item.role}</p>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-navy/8 text-navy/55">{item.type}</span>
                        </div>
                        <p className="text-orange font-semibold text-xs mb-0.5">{item.company} · {item.location}</p>
                        <p className="text-[11px] text-navy/40 mb-2">{item.period}</p>
                        <ul className="flex flex-col gap-1">
                          {item.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2 text-xs text-navy/60 leading-relaxed">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-orange shrink-0" />{pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section id="projects">
                <SectionTitle>Projects</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cvProjects.map((proj) => (
                    <div key={proj.name} className={`rounded-2xl border p-4 flex flex-col gap-2 ${proj.color}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-extrabold text-navy text-sm">{proj.name}</p>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${proj.badge}`}>
                            {proj.type}
                          </span>
                        </div>
                        {proj.url && (
                          <a href={proj.url} target="_blank" rel="noopener noreferrer"
                            className="text-navy/40 hover:text-orange transition-colors shrink-0 mt-0.5">
                            <FiExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-navy/60 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {proj.tech.map((t) => <Pill key={t} label={t} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATES GALLERY */}
              <section>
                <SectionTitle>Certificates</SectionTitle>

                {/* category filters */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        activeCategory === cat
                          ? "bg-orange text-white border-orange"
                          : "bg-white text-navy/60 border-navy/15 hover:border-orange hover:text-orange"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* cert cards grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {filtered.map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => setActiveCert(cert)}
                      className={`text-left rounded-2xl border p-4 flex items-start gap-3 transition-all hover:shadow-md hover:-translate-y-0.5 ${cert.color}`}
                    >
                      <span className={`mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${cert.badge}`}>
                        {cert.category}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-navy leading-tight line-clamp-2">{cert.name}</p>
                        <p className="text-[10px] text-navy/50 mt-0.5">{cert.issuer} · {cert.date}</p>
                      </div>
                      <FiEye size={13} className="text-navy/30 shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* ── RIGHT ────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-10">

              {/* EDUCATION */}
              <section>
                <SectionTitle>Education</SectionTitle>
                <div className="flex flex-col gap-5">
                  {cvEducation.map((ed) => (
                    <div key={ed.degree} className="border-l-2 border-orange/40 pl-4">
                      <p className="font-extrabold text-navy text-sm leading-tight">{ed.degree}</p>
                      <p className="text-orange font-semibold text-xs mt-0.5">{ed.school}</p>
                      <p className="text-[11px] text-navy/40 mb-1">{ed.period} · {ed.location}</p>
                      <p className="text-xs text-navy/55 leading-relaxed">{ed.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* TECH STACK */}
              <section>
                <SectionTitle>Tech Stack</SectionTitle>
                <div className="grid grid-cols-4 gap-3">
                  {techStack.map((t) => (
                    <div key={t.key} className="flex flex-col items-center gap-1 text-center">
                      <TechIcon name={t.key} size={22} />
                      <span className="text-[9px] font-medium text-navy/55 leading-tight">{t.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ACHIEVEMENTS */}
              <section>
                <SectionTitle>Achievements</SectionTitle>
                <div className="flex flex-col gap-4">
                  {cvAchievements.map((ach) => {
                    const Icon = achIconMap[ach.icon] || FiZap;
                    return (
                      <div key={ach.title} className="flex items-start gap-3">
                        <span className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${ach.color}`}>
                          <Icon size={14} />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-navy leading-tight">{ach.title}</p>
                          <p className="text-[11px] text-navy/55 leading-relaxed mt-0.5">{ach.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>
          </div>

          {/* ═══ FOOTER ════════════════════════════════════════════════════════ */}
          <div className="bg-navy mx-6 sm:mx-12 mb-8 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-xs italic text-center sm:text-left">
              "{profile.quote}" — {profile.quoteAuthor}
            </p>
            <div className="flex items-center gap-4">
              <a href={`https://${profile.socials.github}`} target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors text-xs flex items-center gap-1.5">
                <FiGithub size={12} /> {profile.socials.github}
              </a>
              <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors text-xs flex items-center gap-1.5">
                <FiLinkedin size={12} /> {profile.socials.linkedin}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Certificate modal */}
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </div>
  );
}
