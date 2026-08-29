import { useState } from "react";
import { realCertificates } from "../data";
import { FiArrowRight, FiEye, FiX, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

// Category color dot map
const categoryColors = {
  "Achievement":      "bg-pink-400",
  "AI & Tech":        "bg-violet-400",
  "Cybersecurity":    "bg-sky-400",
  "CTF / Competition":"bg-amber-400",
  "Professional":     "bg-emerald-400",
  "Academic":         "bg-green-400",
};

function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10 shrink-0">
          <div>
            <p className="font-extrabold text-navy text-sm leading-tight">{cert.name}</p>
            <p className="text-xs text-navy/50 mt-0.5">{cert.issuer} · {cert.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange border border-orange rounded-full px-3 py-1.5 hover:bg-orange hover:text-white transition-colors"
            >
              <FiExternalLink size={11} /> Open
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-navy/8 hover:bg-navy/15 flex items-center justify-center transition-colors"
            >
              <FiX size={15} className="text-navy" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-navy/5 flex items-center justify-center p-4">
          {cert.type === "image" ? (
            <img
              src={cert.file}
              alt={cert.name}
              className="max-w-full max-h-[70vh] rounded-xl shadow-lg object-contain"
            />
          ) : (
            <iframe
              src={cert.file}
              title={cert.name}
              className="w-full rounded-xl shadow-lg bg-white"
              style={{ height: "65vh" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  // Show first 8 on the homepage card
  const preview = realCertificates.slice(0, 8);

  return (
    <>
      <div id="certifications" className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 p-6 sm:p-7 h-full flex flex-col scroll-mt-24">
        <h2 className="text-base font-extrabold text-navy mb-5">Certifications</h2>

        <ul className="flex flex-col gap-2.5 flex-1">
          {preview.map((cert) => (
            <li key={cert.id}>
              <button
                onClick={() => setActiveCert(cert)}
                className={`w-full text-left flex items-center gap-3 rounded-xl border p-2.5 transition-all hover:shadow-sm hover:-translate-y-px ${cert.color}`}
              >
                {/* category dot */}
                <span className={`w-2 h-2 rounded-full shrink-0 ${categoryColors[cert.category] ?? "bg-navy/30"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy leading-tight line-clamp-1">{cert.name}</p>
                  <p className="text-[10px] text-navy/45 mt-0.5">{cert.issuer} · {cert.date}</p>
                </div>
                <FiEye size={12} className="text-navy/30 shrink-0" />
              </button>
            </li>
          ))}
        </ul>

        <p className="text-[10px] text-navy/40 text-center mt-3 mb-1">
          +{realCertificates.length - preview.length} more on full CV
        </p>

        <Link
          to="/cv"
          className="mt-2 inline-flex items-center justify-center gap-2 border border-orange text-orange hover:bg-orange hover:text-white text-xs font-semibold rounded-full py-2.5 transition-colors"
        >
          View All Certificates <FiArrowRight size={13} />
        </Link>
      </div>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
}
