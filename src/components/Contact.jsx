import { profile } from "../data";
import {
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiGlobe, FiArrowRight,
} from "react-icons/fi";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24" style={{ background: "#f0eefa" }}>
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div
          className="rounded-3xl px-8 sm:px-14 py-12 grid md:grid-cols-2 gap-10"
          style={{ background: "linear-gradient(135deg, #1b2a4a 0%, #243460 60%, #2e3f78 100%)" }}
        >
          {/* Left */}
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Let's Connect</h2>
            <p className="text-white/60 text-sm max-w-xs mb-8 leading-relaxed">
              I'm always open to discussing new opportunities, collaborations, or interesting projects.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Let's Connect <FiArrowRight />
            </a>
          </div>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center shrink-0">
                  <FiMail size={14} className="text-orange" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-white/45 mb-0.5">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-sm font-medium text-white hover:text-orange transition-colors break-all">
                    {profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center shrink-0">
                  <FiPhone size={14} className="text-orange" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-white/45 mb-0.5">Phone</p>
                  <a href={`tel:${profile.phone}`} className="text-sm font-medium text-white hover:text-orange transition-colors">
                    {profile.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center shrink-0">
                  <FiMapPin size={14} className="text-orange" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-white/45 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-white">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Social links — no Twitter */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-wide text-white/45 mb-1">Find me online</p>
              <a
                href={`https://${profile.socials.github}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-white hover:text-orange transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <FiGithub size={13} />
                </span>
                {profile.socials.github}
              </a>
              <a
                href={`https://${profile.socials.linkedin}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-white hover:text-orange transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <FiLinkedin size={13} />
                </span>
                {profile.socials.linkedin}
              </a>
              <a
                href={`https://${profile.socials.website}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-white hover:text-orange transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <FiGlobe size={13} />
                </span>
                {profile.socials.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
