import { techStack } from "../data";
import TechIcon from "./TechIcon";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useReveal } from "../hooks/useReveal";

const groups = [
  { label: "Backend", keys: ["java", "spring", "node", "express", "typescript","nest"] },
  { label: "Data & CMS", keys: ["postgresql", "mongodb", "php", "typo3"] },
  { label: "Cloud & Delivery", keys: ["docker", "kubernetes", "cicd", "git", "linux"] },
  { label: "Web & Security", keys: ["react", "html", "css", "networking", "cybersecurity"] },
];

const technologiesByKey = Object.fromEntries(techStack.map((tech) => [tech.key, tech]));

const ease = [0.22, 1, 0.36, 1];

/* ---------- Variants ---------- */

// Header pieces fade up one after another
const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

// Grid staggers the 4 cards, each card staggers its own list items
const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease, staggerChildren: 0.06, delayChildren: 0.2 },
  },
  hover: {
    y: -6,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};
const itemVariant = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
  hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 20 } },
};
const iconVariant = {
  hover: {
    scale: 1.18,
    rotate: [0, -10, 10, -4, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Card-level hover children (accent bar + spotlight)
const accentVariant = { hover: { scaleX: 1, transition: { duration: 0.45, ease } } };
const spotlightVariant = { hover: { opacity: 1, transition: { duration: 0.25 } } };

/* ---------- Card with cursor spotlight ---------- */

function GroupCard({ group }) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  // Soft orange glow that follows the cursor inside the card
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(249, 115, 22, 0.10), transparent 70%)`;

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-2xl border border-navy/8 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(31,34,51,0.10)]"
    >
      {/* Orange accent bar draws across the top on hover */}
      <motion.span
        variants={accentVariant}
        style={{ scaleX: 0, originX: 0 }}
        className="pointer-events-none absolute left-0 top-0 h-0.5 w-full bg-orange"
        aria-hidden="true"
      />
      {/* Cursor-following glow */}
      <motion.span
        variants={spotlightVariant}
        style={{ opacity: 0, background: spotlight }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <h3 className="relative mb-4 text-xs font-bold uppercase tracking-[0.14em] text-navy/55">{group.label}</h3>
      <ul className="relative grid grid-cols-2 gap-2" aria-label={`${group.label} technologies`}>
        {group.keys.map((key) => {
          const tech = technologiesByKey[key] ?? {
            key,
            name: key.charAt(0).toUpperCase() + key.slice(1),
          };

          return (
            <motion.li
              key={key}
              variants={itemVariant}
              className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1.5"
            >
              <motion.span
                variants={iconVariant}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy/[0.035]"
              >
                <TechIcon name={tech.key} size={17} />
              </motion.span>
              <span className="truncate text-xs font-medium text-navy/75">{tech.name}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export default function TechStack() {
  const ref = useReveal();

  return (
    // reducedMotion="user" turns off movement for people who prefer less motion
    <MotionConfig reducedMotion="user">
      <section id="skills" className="bg-white py-12 sm:py-16" aria-labelledby="skills-title">
        <div className="max-w-7xl mx-auto px-6" ref={ref}>
          <div className="rounded-3xl border border-navy/8 bg-[#fcfbfa] p-6 shadow-card sm:p-10" data-reveal-item>
            <motion.div
              variants={headerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="relative mb-8 flex flex-col gap-3 pb-7 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <motion.p
                  variants={headerItem}
                  className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange"
                >
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    
                  </span>
               
                </motion.p>
                <motion.h2
                  id="skills-title"
                  variants={headerItem}
                  className="font-heading text-2xl font-black tracking-tight text-navy sm:text-3xl"
                >
                  Technologies I work with
                </motion.h2>
              </div>
              <motion.p variants={headerItem} className="max-w-sm text-sm leading-6 text-navy/60 sm:text-right">
                A focused stack for reliable backend systems and polished web experiences.
              </motion.p>

              {/* Divider line draws in from the left */}
              <motion.span
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.3 } },
                }}
                style={{ originX: 0 }}
                className="absolute bottom-0 left-0 h-px w-full bg-navy/10"
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {groups.map((group) => (
                <GroupCard key={group.label} group={group} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}