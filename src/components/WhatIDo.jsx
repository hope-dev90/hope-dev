import { useRef } from "react";
import { whatIDo } from "../data";
import { FiCode, FiServer, FiDatabase, FiShield, FiLock } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/motion";

const iconMap = { code: FiCode, server: FiServer, database: FiDatabase, shield: FiShield, lock: FiLock };

export default function WhatIDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 p-6 sm:p-7 h-full scroll-mt-24"
    >
      <h2 className="text-base font-extrabold text-navy mb-5">What I Do</h2>

      <motion.div
        className="flex flex-col gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {whatIDo.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i * 0.07}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex items-start gap-3"
            >
              <motion.span
                whileHover={{ scale: 1.15, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={16} />
              </motion.span>
              <div>
                <p className="font-bold text-navy text-sm leading-tight mb-0.5">{item.title}</p>
                <p className="text-xs text-navy/55 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
