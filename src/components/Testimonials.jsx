import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";

const collaborators = [
  { name: "Umurerwa Aubierge", initials: "UA", accent: "from-orange-400 to-rose-400" },
  { name: "Uwase Mugisha Esther", initials: "UME", accent: "from-violet-400 to-indigo-400" },
  { name: "Shimirwa Teta Sonia", initials: "STS", accent: "from-emerald-400 to-teal-400" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-[#f0eefa] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-orange mb-2">
            Project Teammates
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Testimonials</h2>
          <p className="text-sm text-navy/55 mt-3 max-w-xl">
            People I’ve had the chance to work alongside on projects.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {collaborators.map((person, index) => (
            <motion.article
              key={person.name}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -7, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-card ring-1 ring-black/5"
            >
              <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-orange/5 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative flex items-center gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${person.accent} text-sm font-extrabold text-white shadow-lg shadow-navy/10`}>
                  {person.initials}
                </div>
                <div>
                  <h3 className="font-extrabold text-navy">{person.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-orange/80">
                    Project collaborator
                  </p>
                </div>
              </div>
              <div className="relative mt-6 flex items-start gap-3 border-t border-navy/8 pt-5">
                <FiUsers className="mt-0.5 shrink-0 text-orange" size={17} aria-hidden="true" />
                <p className="text-sm leading-relaxed text-navy/60">
                  Worked alongside Hope on project work and collaboration.
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
