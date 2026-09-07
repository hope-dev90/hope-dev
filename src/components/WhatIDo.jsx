import { useRef, useState } from "react";
import { whatIDo } from "../data";
import { FiCode, FiServer, FiDatabase, FiShield, FiLock, FiChevronDown } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "../lib/motion";

const iconMap = {
  code: FiCode,
  server: FiServer,
  database: FiDatabase,
  shield: FiShield,
  lock: FiLock,
};

const GRAD_ACTIVE = "linear-gradient(135deg, #f9a8d4 0%, #fb923c 50%, #a78bfa 100%)";

export default function WhatIDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  return (
    <section id="about" ref={ref} className="py-20 scroll-mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — service card stack */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            <div
              className="w-full max-w-sm rounded-[2rem] p-5 flex flex-col gap-4"
              style={{ background: "linear-gradient(160deg, #fde9e0 0%, #fdf3ef 100%)" }}
            >
              {whatIDo.map((item, i) => {
                const isActive = active === i;
                const ItemIcon = iconMap[item.icon];

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    custom={i * 0.08}
                    onClick={() => setActive(i)}
                    style={{
                      background: isActive ? GRAD_ACTIVE : "transparent",
                      borderRadius: "1.25rem",
                      padding: isActive ? "2px" : "0",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    <div
                      className="rounded-[1.15rem] px-5 py-4 flex items-center gap-4"
                      style={{ background: isActive ? "#ffffff" : "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-orange/10">
                        <ItemIcon size={20} className="text-orange" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-navy mb-1">{item.title}</p>
                        <p className="text-xs text-navy/45 leading-relaxed line-clamp-2">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              aria-label="Scroll for more"
              className="mt-6 w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center"
            >
              <FiChevronDown size={16} />
            </button>
          </motion.div>

          {/* RIGHT — text detail */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              <span className="text-navy">My Awesome</span>
              <br />
              <span className="text-orange">Services</span>
            </h2>

            <p className="text-navy/55 text-sm leading-relaxed max-w-md mb-6">
              {whatIDo[active].text}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center bg-orange hover:bg-orange-dark text-white font-bold px-7 py-3 rounded-full text-sm transition-colors"
            >
              Hire CV
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}