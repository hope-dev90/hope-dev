import { useRef } from "react";
import { experience } from "../data";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/motion";
import { useReveal } from "../hooks/useReveal";

export default function Experience() {
  const revealRef = useReveal({ stagger: 0.13, duration: 1 });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      id="experience"
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 p-6 sm:p-7 h-full scroll-mt-24"
    >
      <div ref={revealRef}>
      <h2 className="text-base font-extrabold text-navy mb-5" data-reveal-heading>Experience</h2>

      <motion.ol
        className="relative border-l-2 border-navy/10 pl-6 flex flex-col gap-7"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {experience.map((item, i) => (
          <motion.li
            key={item.role + item.period}
            data-reveal-item
            variants={fadeUp}
            custom={i * 0.08}
            className="relative"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300 }}
              className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full ${item.dot} ring-2 ring-white`}
            />
            <p className="text-[11px] font-semibold text-navy/45 mb-0.5">{item.period}</p>
            <p className="font-bold text-navy text-sm">
              {item.role}{" "}
              <span className="text-orange font-semibold">• {item.place}</span>
            </p>
            <p className="text-xs text-navy/55 leading-relaxed mt-1">{item.text}</p>
          </motion.li>
        ))}
      </motion.ol>
      </div>
    </motion.div>
  );
}
