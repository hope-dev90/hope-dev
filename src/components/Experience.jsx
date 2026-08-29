import { experience } from "../data";

export default function Experience() {
  return (
    <div id="experience" className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 p-6 sm:p-7 h-full scroll-mt-24">
      <h2 className="text-base font-extrabold text-navy mb-5">Experience</h2>
      <ol className="relative border-l-2 border-navy/10 pl-6 flex flex-col gap-7">
        {experience.map((item) => (
          <li key={item.role + item.period} className="relative">
            {/* Colored dot */}
            <span
              className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full ${item.dot} ring-2 ring-white`}
            />
            <p className="text-[11px] font-semibold text-navy/45 mb-0.5">{item.period}</p>
            <p className="font-bold text-navy text-sm">
              {item.role}{" "}
              <span className="text-orange font-semibold">• {item.place}</span>
            </p>
            <p className="text-xs text-navy/55 leading-relaxed mt-1">{item.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
