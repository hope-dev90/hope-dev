import { useRef } from "react";
import { techStack } from "../data";
import TechIcon from "./TechIcon";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "../lib/motion";

// Duplicate items for seamless infinite loop
const track = [...techStack, ...techStack];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="bg-white py-10 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 px-8 sm:px-10 pt-8 pb-6 overflow-hidden"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-sm font-semibold text-navy/60 mb-7"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Technologies I work with
          </motion.p>

          {/* ── Infinite marquee track ── */}
          <div className="relative">
            {/* left fade */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
              style={{ background: "linear-gradient(to right, white, transparent)" }} />
            {/* right fade */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
              style={{ background: "linear-gradient(to left, white, transparent)" }} />

            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
              whileHover={{ animationPlayState: "paused" }}
              style={{ willChange: "transform" }}
            >
              {track.map((tech, i) => (
                <motion.div
                  key={`${tech.key}-${i}`}
                  whileHover={{ scale: 1.18, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex flex-col items-center gap-2 text-center w-16 shrink-0 cursor-default"
                >
                  <TechIcon name={tech.key} size={30} />
                  <span className="text-[10px] font-medium text-navy/65 leading-tight">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
