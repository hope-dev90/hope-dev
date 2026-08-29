import { cvProjects } from "../data";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Projects() {
  // Show 6 on homepage
  const visible = cvProjects.slice(0, 6);

  return (
    <section id="projects" className="bg-white py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-1">
              What I've Built
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Projects</h2>
          </div>
          <Link
            to="/cv"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-navy/50 hover:text-orange transition-colors"
          >
            View all on CV <FiArrowRight size={14} />
          </Link>
        </div>

        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((proj) => (
            <div
              key={proj.name}
              className={`group rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft ${proj.color}`}
            >
              {/* top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-navy text-sm leading-tight">{proj.name}</h3>
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${proj.badge}`}>
                    {proj.type}
                  </span>
                </div>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-navy/40 hover:text-orange transition-colors shrink-0 shadow-sm"
                    aria-label={`Visit ${proj.name}`}
                  >
                    <FiExternalLink size={14} />
                  </a>
                )}
              </div>

              {/* description */}
              <p className="text-xs text-navy/60 leading-relaxed flex-1">
                {proj.description}
              </p>

              {/* tech pills */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-black/5">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/70 text-navy/60 border border-navy/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* mobile "view all" */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 border border-navy/15 hover:border-orange hover:text-orange text-navy text-sm font-semibold rounded-full px-6 py-2.5 transition-colors"
          >
            View all projects <FiArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
