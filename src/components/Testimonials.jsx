import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const collaborators = [
  {
    name: "IRASUBIZA Sally Nelson",
    initials: "ISN",
    role: "CEO of Velora Tech Labs",
    image: null,
    quote:
      "Hope is someone I could always count on. On my side, I valued her consistency most. She was also versatile, working on mobile apps, DevOps, and cybersecurity, and handled each well. I enjoyed working with her and would gladly work with her again.",
  },
  {
    name: "Umurerwa Aubierge",
    initials: "UA",
    role: "Co-founder of Umuco Core",
    image: "/aubie.png",
    quote:
      "Hope was one of the best backend developers I worked with on Umuco Core. She brought strong thinking to APIs, data design, and security, while keeping the team focused on building something useful. Her openness, reliability, and positive energy made working together a great experience.",
  },
  {
    name: "Shimirwa Teta Sonia",
    initials: "STS",
    role: "Founder of StaffNet Rwanda",
    image: "/sonia.png",
    quote:
      "Hope is a thoughtful backend developer who looks beyond the code to what a project and its people need. She brings care to database design and security, follows through on her work, and makes collaboration feel easy through her teamwork and great personality.",
  },
  {
    name: "Uwase Mugisha Esther",
    initials: "UME",
    role: "Founder of Dinesphere",
    image: "/esther.png",
    quote:
      "Working with Hope means having a developer who can think through backend design and security while staying open, supportive, and easy to collaborate with. Her technical ability is matched by a great team spirit that brings out the best in a project.",
  },
  {
    name: "Nancy Mizero Stella",
    initials: "NMS",
    role: "Co-founder of ZERO Bite",
    image: "/nancy.png",
    quote:
      "Hope combines strong backend development skills with a careful approach to security and data. She is dependable, communicates well, and brings a positive team spirit that makes it easier to turn ideas into working solutions.",
  },
];

function Avatar({ person }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-orange ring-2 ring-white">
      {person.image && !failed ? (
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
          {person.initials}
        </span>
      )}
    </div>
  );
}

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Testimonials() {
  const [[index, dir], setPage] = useState([0, 0]);
  const total = collaborators.length;

  const paginate = useCallback((newDir) => {
    setPage(([prev]) => [(prev + newDir + total) % total, newDir]);
  }, [total]);

  // auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(() => paginate(1), 5000);
    return () => clearInterval(id);
  }, [paginate]);

  const person = collaborators[index];

  return (
    <section id="testimonials" className="scroll-mt-24 bg-lavender py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="font-heading text-3xl font-black text-navy sm:text-4xl">Testimonials</h2>
          <p className="mt-3 text-sm text-navy/55">
            A few words from people Hope has worked with.
          </p>
        </motion.div>

        {/* single card slideshow */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.article
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[280px] flex-col p-8 sm:p-10"
            >
              {/* quote mark */}
              <span className="mb-4 text-5xl font-black leading-none text-orange/20 select-none">"</span>

              <p className="flex-1 text-base leading-[1.75] tracking-[-0.01em] text-navy/75 sm:text-lg">
                {person.quote}
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-navy/10 pt-6">
                <Avatar person={person} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-snug text-navy">{person.name}</h3>
                  <p className="mt-0.5 text-xs text-navy/55">{person.role}</p>
                </div>
                {/* slide counter */}
                <p className="ml-auto shrink-0 text-xs font-semibold text-navy/30">
                  {index + 1} / {total}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {/* prev */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy/50 transition hover:border-orange hover:text-orange"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* dots */}
          <div className="flex items-center gap-2">
            {collaborators.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(([prev]) => [i, i > prev ? 1 : -1])}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-orange" : "w-2 bg-navy/20 hover:bg-navy/40"}`}
              />
            ))}
          </div>

          {/* next */}
          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy/50 transition hover:border-orange hover:text-orange"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}
