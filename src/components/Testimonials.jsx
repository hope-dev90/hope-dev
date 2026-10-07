import { useState } from "react";
import { motion } from "framer-motion";

const collaborators = [
  {
    name: "Umurerwa Aubierge",
    initials: "UA",
    role: "Co-founder of Umuco Core",
    image: "/aubie.png",
    quote:
      "Hope was one of the best backend developers I worked with on Umuco Core. He brought strong thinking to APIs, data design, and security, while keeping the team focused on building something useful. His openness, reliability, and positive energy made working together a great experience.",
  },
  {
    name: "Irasubiza Sally Nelson",
    initials: "ISN",
    role: "Co-founder of Velora Tech Labs",
    image: "/nelson.png",
    quote:
      "Hope brings more than backend knowledge to a project. He thinks carefully about security and databases, communicates clearly, and works with the whole team to solve problems. His talent and generous, upbeat personality make him someone I would be glad to work with again.",
  },
  {
    name: "Shimirwa Teta Sonia",
    initials: "STS",
    role: "Founder of StaffNet Rwanda",
    image: "/sonia.png",
    quote:
      "Hope is a thoughtful backend developer who looks beyond the code to what a project and its people need. He brings care to database design and security, follows through on his work, and makes collaboration feel easy through his teamwork and great personality.",
  },
  {
    name: "Uwase Mugisha Esther",
    initials: "UME",
    role: "Founder of Dinesphere",
    quote:
      "Working with Hope means having a developer who can think through backend design and security while staying open, supportive, and easy to collaborate with. His technical ability is matched by a great team spirit and personality that bring out the best in a project.",
  },
];

function CollaboratorAvatar({ person }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white/15 ring-2 ring-white/10">
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
    <section id="testimonials" className="scroll-mt-24 bg-[#faf6f2] py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Testimonials</h2>
          <p className="mt-3 max-w-xl text-sm text-navy/55">
            A few words from people Hope has worked with on projects.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {collaborators.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[1.7rem] bg-[#191919] p-6 text-white shadow-xl shadow-black/10 sm:p-7"
            >
              <span className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <p className="relative flex-1 text-[15px] leading-[1.65] tracking-[-0.02em] text-white/90 sm:text-base">
                “{person.quote}”
              </p>
              <div className="relative mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                <CollaboratorAvatar person={person} />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug text-white">{person.name}</h3>
                  <p className="mt-1 text-xs leading-snug text-white/65">{person.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
