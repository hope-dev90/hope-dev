import { profile } from "../data";
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60 py-5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="italic text-center sm:text-left text-white/50">
          "{profile.quote}" — <span className="not-italic font-semibold text-white/60">{profile.quoteAuthor}</span>
        </p>
        <p className="text-white/50">
          © {new Date().getFullYear()}{" "}
          <span className="underline underline-offset-2 text-white/70">{profile.name}</span>. All rights reserved.
        </p>
        <a
          href="#top"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
          aria-label="Back to top"
        >
          <FiArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
