import { useState } from "react";
import { profile } from "../data";
import {
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiGlobe, FiSend,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    // mailto fallback — opens email client with pre-filled data
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Portfolio enquiry")}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setTimeout(() => setStatus("sent"), 800);
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-lavender py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <motion.p variants={fadeUp} custom={0} className="text-[11px] font-semibold uppercase tracking-widest text-orange mb-2">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.08} className="text-3xl sm:text-4xl font-extrabold text-navy">
            Contact Me
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* LEFT — Contact info */}
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Info block */}
            <motion.div variants={fadeUp} custom={0} className="bg-white rounded-2xl shadow-card p-7 flex flex-col gap-5">
              <h3 className="text-lg font-bold text-navy">Contact Information</h3>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-9 h-9 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                  <FiMail size={15} className="text-orange" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-navy/40 mb-0.5">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-sm font-medium text-navy hover:text-orange transition-colors break-all">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-9 h-9 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                  <FiPhone size={15} className="text-orange" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-navy/40 mb-0.5">Phone</p>
                  <a href={`tel:${profile.phone}`} className="text-sm font-medium text-navy hover:text-orange transition-colors">
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-9 h-9 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                  <FiMapPin size={15} className="text-orange" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-navy/40 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-navy">{profile.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Let's Connect */}
            <motion.div variants={fadeUp} custom={0.08} className="bg-white rounded-2xl shadow-card p-7 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-navy">Let's Connect</h3>
              <p className="text-sm text-navy/55 leading-relaxed">
                Follow me on social media to stay updated with my latest projects and insights.
              </p>
              <div className="flex flex-col gap-3 mt-1">
                <a href={`https://${profile.socials.github}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-navy hover:text-orange transition-colors">
                  <span className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                    <FiGithub size={14} />
                  </span>
                  {profile.socials.github}
                </a>
                <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-navy hover:text-orange transition-colors">
                  <span className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                    <FiLinkedin size={14} />
                  </span>
                  {profile.socials.linkedin}
                </a>
                <a href={`https://${profile.socials.website}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-navy hover:text-orange transition-colors">
                  <span className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                    <FiGlobe size={14} />
                  </span>
                  {profile.socials.website}
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Message form */}
          <motion.div
            variants={fadeUp} custom={0.1}
            initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-2xl shadow-card p-8"
          >
            <h3 className="text-xl font-bold text-navy mb-6">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-navy">
                  Name
                </label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-navy/15 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:border-orange transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-navy">
                  Email
                </label>
                <input
                  id="email" name="email" type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-navy/15 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:border-orange transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-semibold text-navy">
                  Subject
                </label>
                <input
                  id="subject" name="subject" type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-navy/15 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:border-orange transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-navy">
                  Message
                </label>
                <textarea
                  id="message" name="message"
                  placeholder="Your message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-navy/15 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:border-orange transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
              >
                {status === "sent" ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    Send Message <FiSend size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
