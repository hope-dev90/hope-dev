import { profile, floatingBadges, sideList } from "../data";
import TechIcon from "./TechIcon";
import { Link } from "react-router-dom";
import { FiDownload, FiArrowRight, FiCode } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100vh - 65px)",
        background: "linear-gradient(155deg, #fde0d4 0%, #fdeae2 35%, #fef4f0 65%, #ffffff 100%)",
      }}
    >
      {/* Decorative dots */}
      <span className="hidden md:block absolute top-[12%] left-[28%] w-7 h-7 rounded-full border-2 border-pink-300 opacity-60" />
      <span className="hidden md:block absolute top-[8%] right-[7%] w-3.5 h-3.5 rounded-full border-2 border-rose-300 opacity-50" />
      <span className="hidden md:block absolute bottom-[20%] left-[7%] w-2.5 h-2.5 rounded-full bg-violet-400 opacity-40" />
      <span className="hidden md:block absolute top-[45%] left-[12%] text-emerald-400 text-lg opacity-60">✦</span>
      <span className="hidden md:block absolute top-[58%] right-[26%] text-violet-400 text-sm opacity-40">+</span>

      <div className="max-w-7xl mx-auto px-6 h-full grid lg:grid-cols-2 gap-10 items-center"
        style={{ minHeight: "calc(100vh - 65px)" }}
      >
        {/* LEFT — text */}
        <div className="z-10 py-16 lg:py-0">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
            Hi! I'm
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange leading-tight mb-4">
            {profile.name}
          </h1>
          <p className="text-xl lg:text-2xl font-bold text-navy mb-5">{profile.role}</p>
          <p className="text-navy/60 leading-relaxed max-w-sm text-sm mb-10">
            {profile.intro}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              View My Work <FiArrowRight />
            </a>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 bg-white border border-navy/20 hover:border-orange text-navy font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Download CV <FiDownload />
            </Link>
          </div>
        </div>

        {/* RIGHT — portrait + badges */}
        <div className="relative hidden lg:flex justify-center items-center">
          {/* Portrait */}
          <div className="relative z-10 w-72 xl:w-80">
            <img
              src="/1773993979501.jpg"
              alt="Hope Mutimutuje"
              className="w-full object-cover"
              style={{
                borderRadius: "2rem",
                height: "520px",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </div>

          {/* Spring Boot badge — top right */}
          <div className="flex absolute top-10 right-2 xl:right-4 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[215px]">
            <TechIcon name={floatingBadges[0].icon} size={24} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[0].title}</p>
              <p className="text-xs text-navy/50 leading-snug">{floatingBadges[0].text}</p>
            </div>
          </div>

          {/* Node.js badge — bottom left */}
          <div className="flex absolute bottom-10 -left-4 items-center gap-3 bg-white rounded-2xl shadow-soft px-4 py-3 z-20 max-w-[215px]">
            <TechIcon name={floatingBadges[1].icon} size={24} />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">{floatingBadges[1].title}</p>
              <p className="text-xs text-navy/50 leading-snug">{floatingBadges[1].text}</p>
            </div>
          </div>

          {/* Side pill */}
          <div className="flex flex-col items-center gap-3 absolute -right-24 xl:-right-20 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-soft px-3 py-5 w-[86px] z-20">
            <span className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
              <FiCode size={17} />
            </span>
            <ul className="text-[10px] font-semibold text-navy/60 text-center leading-5">
              {sideList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5 w-full px-2 mt-1">
              <span className="block h-1.5 bg-navy/10 rounded-full w-full" />
              <span className="block h-1.5 bg-navy/10 rounded-full w-3/4 mx-auto" />
              <span className="block h-1.5 bg-navy/10 rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Mobile portrait */}
        <div className="lg:hidden flex justify-center pb-8">
          <img
            src="/1773993979501.jpg"
            alt="Hope Mutimutuje"
            className="w-56 object-cover object-top rounded-3xl shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
