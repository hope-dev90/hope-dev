import { useState } from "react";
import {
  profile,
  cvEducation,
  cvExperience,
  cvProjects,
  cvAchievements,
  cvInterests,
  realCertificates,
  techStack,
} from "../data";
import {
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiExternalLink, FiArrowLeft, FiPrinter, FiX, FiEye,
} from "react-icons/fi";

function SectionTitle({ children }) {
  return (
    <div className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#780000]">{children}</h2>
      <div className="h-px bg-black/20 mt-2" />
    </div>
  );
}

function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 shrink-0">
          <div>
            <p className="font-bold text-black text-base leading-tight">{cert.name}</p>
            <p className="text-sm text-black/50 mt-0.5">{cert.issuer} · {cert.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#780000] border border-[#780000] rounded-full px-4 py-1.5 hover:bg-[#780000] hover:text-white transition-colors"
            >
              <FiExternalLink size={13} /> Open
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/8 hover:bg-black/15 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <FiX size={17} className="text-black" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4">
          {cert.type === "image" ? (
            <img src={cert.file} alt={cert.name}
              className="max-w-full max-h-[70vh] rounded-lg shadow object-contain" />
          ) : (
            <iframe src={cert.file} title={cert.name}
              className="w-full rounded-lg shadow bg-white" style={{ height: "70vh" }} />
          )}
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["All", "Achievement", "Cybersecurity", "CTF / Competition", "AI & Tech", "Professional", "Academic"];

export default function CV() {
  const [activeCert, setActiveCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? realCertificates
    : realCertificates.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white" style={{ fontFamily: "Arial, Calibri, sans-serif" }}>

      {/* top bar */}
      <div className="bg-white border-b border-black/10 print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-black/50 hover:text-[#780000] transition-colors">
            <FiArrowLeft size={15} /> Back to Portfolio
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-[#780000] hover:bg-[#5e0000] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            <FiPrinter size={14} /> Download / Print
          </button>
        </div>
      </div>

      {/* CV sheet */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 print:py-0 print:px-0 print:max-w-none">
        <div className="bg-white shadow-sm print:shadow-none">

          {/* HEADER */}
          <div className="px-10 sm:px-16 pt-12 pb-8 border-b border-black/10">
            <div className="flex items-start gap-8">

              {/* photo */}
              <img
                src="/pof.png"
                alt="Hope Mutimutuje"
                className="w-[88px] h-[116px] object-cover shrink-0"
                style={{ objectPosition: "center 10%" }}
              />

              {/* name + intro + contacts */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                <div>
                  <h1 className="text-4xl font-bold text-black tracking-tight leading-tight">
                    {profile.name}
                  </h1>
                  <p className="text-[#780000] font-semibold text-lg mt-1">{profile.role}</p>
                  <p className="text-black/60 text-sm mt-3 max-w-md leading-relaxed">
                    Backend developer focused on building reliable APIs and server-side systems.
                    Currently studying Software Engineering at Rwanda Coding Academy.
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-black/65 shrink-0 sm:text-right">
                  <a href={`mailto:${profile.email}`} className="flex sm:justify-end items-center gap-2 hover:text-[#780000] transition-colors">
                    <FiMail size={13} /> {profile.email}
                  </a>
                  <span className="flex sm:justify-end items-center gap-2">
                    <FiPhone size={13} /> {profile.phone}
                  </span>
                  <span className="flex sm:justify-end items-center gap-2">
                    <FiMapPin size={13} /> {profile.location}
                  </span>
                  <a href="https://github.com/hope-dev90" target="_blank" rel="noopener noreferrer"
                    className="flex sm:justify-end items-center gap-2 hover:text-[#780000] transition-colors">
                    <FiGithub size={13} /> github.com/hope-dev90
                  </a>
                  <a href="https://www.linkedin.com/in/mutimutujehope" target="_blank" rel="noopener noreferrer"
                    className="flex sm:justify-end items-center gap-2 hover:text-[#780000] transition-colors">
                    <FiLinkedin size={13} /> linkedin.com/in/mutimutujehope
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* BODY */}
          <div className="px-10 sm:px-16 py-10 grid lg:grid-cols-[1fr_280px] gap-12">

            {/* LEFT */}
            <div className="flex flex-col gap-10">

              {/* EXPERIENCE */}
              <section>
                <SectionTitle>Experience</SectionTitle>
                <div className="flex flex-col gap-7">
                  {cvExperience.map((item) => (
                    <div key={item.role + item.company}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-bold text-black text-base">{item.role}</p>
                        <span className="text-sm text-black/45 shrink-0">{item.period}</span>
                      </div>
                      <p className="text-[#780000] text-sm font-semibold mt-0.5">{item.company} · {item.location}</p>
                      <ul className="mt-2.5 flex flex-col gap-2">
                        {item.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-sm text-black/65 leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/35 shrink-0" />{pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <SectionTitle>Projects</SectionTitle>
                <div className="flex flex-col gap-6">
                  {cvProjects.map((proj) => (
                    <div key={proj.name}>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <p className="font-bold text-black text-base">{proj.name}</p>
                          <span className="text-sm text-black/40">{proj.type}</span>
                        </div>
                        {proj.url && (
                          <a href={proj.url} target="_blank" rel="noopener noreferrer"
                            className="text-[#780000] hover:underline text-sm shrink-0 flex items-center gap-1">
                            <FiExternalLink size={12} /> Link
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-black/65 leading-relaxed mt-1">{proj.description}</p>
                      <p className="text-xs text-black/40 mt-1">{proj.tech.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATES — screen only */}
              <section className="print:hidden">
                <SectionTitle>Certificates</SectionTitle>
                <div className="flex flex-wrap gap-2 mb-5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                        activeCategory === cat
                          ? "bg-black text-white border-black"
                          : "bg-white text-black/55 border-black/15 hover:border-black hover:text-black"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {filtered.map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => setActiveCert(cert)}
                      className="text-left border border-black/10 p-4 flex items-start gap-3 hover:border-black/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-black leading-snug line-clamp-2">{cert.name}</p>
                        <p className="text-xs text-black/45 mt-1">{cert.issuer} · {cert.date}</p>
                      </div>
                      <FiEye size={14} className="text-black/25 shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-10">

              {/* EDUCATION */}
              <section>
                <SectionTitle>Education</SectionTitle>
                <div className="flex flex-col gap-6">
                  {cvEducation.map((ed) => (
                    <div key={ed.degree}>
                      <p className="font-bold text-black text-sm leading-snug">{ed.degree}</p>
                      <p className="text-[#780000] text-sm font-semibold mt-1">{ed.school}</p>
                      <p className="text-sm text-black/45 mt-0.5">{ed.period} · {ed.location}</p>
                      <p className="text-sm text-black/55 leading-relaxed mt-1">{ed.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SKILLS */}
              <section>
                <SectionTitle>Skills</SectionTitle>
                <p className="text-sm text-black/65 leading-relaxed">
                  {techStack.map((t) => t.name).join(", ")}
                </p>
              </section>

              {/* ACHIEVEMENTS */}
              <section>
                <SectionTitle>Achievements</SectionTitle>
                <div className="flex flex-col gap-5">
                  {cvAchievements.map((ach) => (
                    <div key={ach.title}>
                      <p className="text-sm font-bold text-black leading-snug">{ach.title}</p>
                      <p className="text-sm text-black/55 leading-relaxed mt-1">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* INTERESTS */}
              <section>
                <SectionTitle>Interests &amp; Extracurricular</SectionTitle>
                <div className="flex flex-col gap-5">
                  {cvInterests.map((item) => (
                    <div key={item.title}>
                      <p className="text-sm font-bold text-black leading-snug">{item.title}</p>
                      <p className="text-sm text-black/55 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

        </div>
      </div>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </div>
  );
}
