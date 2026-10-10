import { techStack } from "../data";
import TechIcon from "./TechIcon";
import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";

const groups = [
  { label: "Backend", keys: ["java", "spring", "node", "express", "typescript"] },
  { label: "Data & CMS", keys: ["postgresql", "mongodb", "php", "typo3"] },
  { label: "Cloud & Delivery", keys: ["docker", "kubernetes", "cicd", "git", "linux"] },
  { label: "Web & Security", keys: ["react", "html", "css", "networking", "cybersecurity"] },
];

const technologiesByKey = Object.fromEntries(techStack.map((tech) => [tech.key, tech]));

export default function TechStack() {
  const ref = useReveal();

  return (
    <section id="skills" className="bg-white py-12 sm:py-16" aria-labelledby="skills-title">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="rounded-3xl border border-navy/8 bg-[#fcfbfa] p-6 shadow-card sm:p-10" data-reveal-item>
          <div className="mb-8 flex flex-col gap-3 border-b border-navy/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange">Technical toolkit</p>
              <h2 id="skills-title" className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Technologies I work with
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-navy/60 sm:text-right">
              A focused stack for reliable backend systems and polished web experiences.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {groups.map((group, index) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="rounded-2xl border border-navy/8 bg-white p-5"
              >
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-navy/55">{group.label}</h3>
                <ul className="grid grid-cols-2 gap-2" aria-label={`${group.label} technologies`}>
                  {group.keys.map((key) => {
                    const tech = technologiesByKey[key];
                    return (
                      <li key={key} className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy/[0.035]">
                          <TechIcon name={tech.key} size={17} />
                        </span>
                        <span className="truncate text-xs font-medium text-navy/75">{tech.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
