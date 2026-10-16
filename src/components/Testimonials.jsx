import { useState } from "react";
import { motion } from "framer-motion";

const collaborators = [
  {
    name: "IRASUBIZA Sally Nelson",
    initials: "ISN",
    role: "CEO of Velora Tech Labs",
    image: "/nelson.png",
    quote:
      "Hope is someone I could always count on. On my side, I valued her consistency most. She was also versatile, working on mobile apps, DevOps, and cybersecurity, and handled each well. I enjoyed working with her and would gladly work with her again.",
  },
  {
    name: "Umurerwa Aubierge",
    initials: "UA",
    role: "CEO of Umuco Core",
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
      "Working with Hope means having a developer who can think through backend design and security while staying open, supportive, and easy to collaborate with. Her technical ability is matched by a great team spirit and personality that bring out the best in a project.",
  },
];

function CollaboratorAvatar({ person }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-orange ring-2 ring-white">
      {person.image && !imageFailed ? (
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
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

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-lavender py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="font-heading text-3xl font-black text-navy sm:text-4xl">Testimonials</h2>
          <p className="mt-3 max-w-xl text-sm text-navy/55">
            A few words from people Hope has worked with on projects.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {collaborators.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02, rotate: index % 2 ? 0.6 : -0.6 }}
              whileTap={{ scale: 0.99 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-5 text-navy shadow-card ring-1 ring-black/5 sm:p-6"
            >
              <motion.span
                animate={{ scale: [1, 1.28, 1], x: [0, -8, 0], y: [0, 6, 0] }}
                transition={{ duration: 5 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange/10 blur-2xl"
              />
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + index * 0.12, duration: 0.45 }}
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-2 font-heading text-6xl font-black leading-none text-orange/10 sm:left-6"
              >
                &ldquo;
              </motion.span>
              <p className="relative flex-1 text-[15px] leading-[1.65] tracking-[-0.02em] text-navy/75 sm:text-base">
                "{person.quote}"
              </p>
              <div className="relative mt-6 flex items-center gap-3 border-t border-navy/10 pt-4 transition-transform duration-300 group-hover:translate-x-1">
                <CollaboratorAvatar person={person} />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug text-navy">{person.name}</h3>
                  <p className="mt-1 text-xs leading-snug text-navy/55">{person.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
