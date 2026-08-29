import { techStack } from "../data";
import TechIcon from "./TechIcon";

export default function TechStack() {
  // Split into two rows like the screenshot: 12 on top, 8 on bottom
  const row1 = techStack.slice(0, 12);
  const row2 = techStack.slice(12);

  return (
    <section id="skills" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 px-8 sm:px-10 py-8">
          <p className="text-sm font-semibold text-navy/60 mb-7">Technologies I work with</p>

          {/* Row 1 */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-y-7 gap-x-2 mb-7">
            {row1.map((tech) => (
              <div key={tech.key} className="flex flex-col items-center gap-2 text-center">
                <TechIcon name={tech.key} size={28} />
                <span className="text-[10px] font-medium text-navy/65 leading-tight">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-navy/8 mb-7" />

          {/* Row 2 */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-y-7 gap-x-2">
            {row2.map((tech) => (
              <div key={tech.key} className="flex flex-col items-center gap-2 text-center">
                <TechIcon name={tech.key} size={28} />
                <span className="text-[10px] font-medium text-navy/65 leading-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
