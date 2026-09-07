import Experience from "./Experience";
import Certifications from "./Certifications";

export default function InfoGrid() {
  return (
    <section className="py-12" style={{ background: "#f0eefa" }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-5 items-stretch">
        <Experience />
        <Certifications />
      </div>
    </section>
  );
}
