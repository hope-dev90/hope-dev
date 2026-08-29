import { useRef } from "react";
import { cvProjects } from "../data";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/motion";

const visible = cvProjects.slice(0, 6);

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="bg-white py-16 scroll-mt-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* heading */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-1">What I've Built</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Projects</h2>
          </div>
          <Link
            to="/cv"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-navy/50 hover:text-orange transition-colors"
          >
            View all on CV <FiArrowRight size={14} />
          </Link>
        </motion.div>

        {/* staggered grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {visible.map((proj, i) => (
            <motion.div
              key={proj.name}
              variants={fadeUp}
              custom={i * 0.06}
              whileHover={{ y: -8, boxShadow: "0 20px 48px -12px rgba(27,42,74,0.18)" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`group rounded-2xl border p-5 flex flex-col gap-3 cursor-default ${proj.color}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-navy text-sm leading-tight">{proj.name}</h3>
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${proj.badge}`}>
                    {proj.type}
                  </span>
                </div>
                {proj.url && (
                  <motion.a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-navy/40 hover:text-orange shadow-sm shrink-0"
                    aria-label={`Visit ${proj.name}`}
                  >
                    <FiExternalLink size={14} />
                  </motion.a>
                )}
              </div>

              <p className="text-xs text-navy/60 leading-relaxed flex-1">{proj.description}</p>

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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center sm:hidden"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 border border-navy/15 hover:border-orange hover:text-orange text-navy text-sm font-semibold rounded-full px-6 py-2.5 transition-colors"
          >
            View all projects <FiArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
