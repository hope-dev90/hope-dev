import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiKey, FiEye, FiEyeOff, FiArrowRight, FiX, FiAlertCircle,
} from "react-icons/fi";
import cvPdfUrl from "../private/Hope-Mutimutuje-CV.pdf";

const MAROON      = "#7a0a0d";
const MAROON_DARK = "#5e070a";
const INK         = "#0f1428";
const CARD_BG     = "#faf5f3";

// Files in /public are served from the site root.
const LOGO_URL = `${import.meta.env.BASE_URL}logo-icon.png`;

// ── Only the SHA-256 hash is stored here, never the plaintext. ───────────────
// The hash is injected from the environment (VITE_CV_PASSWORD_HASH) at build
// time. Note: this is a client-side gate, not real protection.
const CV_PASSWORD_HASH = import.meta.env.VITE_CV_PASSWORD_HASH || "";
const CV_DOWNLOAD_NAME = "Hope Mutimutuje - Fullstack Developer.pdf";

function sanitizeInput(value) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/["'`]/g, "")
    .trim();
}

async function sha256(text) {
  const encoder  = new TextEncoder();
  const data     = encoder.encode(text);
  const hashBuf  = await crypto.subtle.digest("SHA-256", data);
  const hashArr  = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Fetch the CV as a Blob so it downloads with a friendly file name.
async function downloadCvBlob() {
  const res = await fetch(cvPdfUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load CV file");
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = CV_DOWNLOAD_NAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

export default function CvPasswordModal({ isOpen, onClose }) {
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPwd]  = useState(false);
  const [status, setStatus]         = useState("idle");
  const [errMsg, setErrMsg]         = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setShowPwd(false);
      setStatus("idle");
      setErrMsg("");
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    const clean = sanitizeInput(password);
    if (!clean) {
      setStatus("error");
      setErrMsg("Please enter the password.");
      return;
    }
    setStatus("loading");
    setErrMsg("");
    try {
      const hash = await sha256(clean);
      if (hash === CV_PASSWORD_HASH) {
        await downloadCvBlob();
        onClose();
      } else {
        setStatus("error");
        setErrMsg("Incorrect password. Contact me to request access to my CV.");
      }
    } catch (err) {
      setStatus("error");
      setErrMsg("Something went wrong. Please contact me directly.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex overflow-y-auto p-4"
          style={{ backgroundColor: "rgba(238,224,222,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            className="relative m-auto w-full max-w-[448px]"
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 22 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden rounded-[22px] border border-white/80 px-6 pb-7 pt-5 shadow-[0_24px_60px_rgba(80,30,35,0.18)] sm:px-9"
              style={{ backgroundColor: CARD_BG }}
            >
              {/* Soft corner shapes */}
              <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-28 w-28" viewBox="0 0 100 100">
                <path d="M0 0H78C66 8 52 12 40 24C24 40 22 66 0 82Z" fill={MAROON} fillOpacity="0.06" />
              </svg>
              <svg aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-32 w-32" viewBox="0 0 100 100">
                <path d="M100 8C86 26 94 48 76 66C60 82 36 80 18 100H100Z" fill={MAROON} fillOpacity="0.06" />
              </svg>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#0f1428]/60 transition-colors hover:bg-black/5 hover:text-[#0f1428]"
              >
                <FiX size={22} />
              </button>

              <div className="relative">
                {/* Logo with fading divider lines */}
                <div className="mx-auto flex max-w-[280px] items-center gap-3">
                  <span className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(122,10,13,0.35))" }} />
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#7a0a0d]/15 bg-white p-1 shadow-[0_6px_18px_rgba(122,10,13,0.14)]">
                    <img src={LOGO_URL} alt="" className="h-full w-full rounded-full object-cover" />
                  </span>
                  <span className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(122,10,13,0.35))" }} />
                </div>

                <h2
                  id="cv-modal-title"
                  className="mt-3 text-center text-[29px] font-extrabold leading-[1.1] tracking-tight sm:text-[36px]"
                  style={{ color: INK }}
                >
                  <span className="block">A closer look.</span>
                  <span className="block" style={{ color: MAROON }}>My experience.</span>
                </h2>
                <p className="mt-2 text-center text-[14px] leading-relaxed text-[#0f1428]/55">
                  Enter password to unlock my CV.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-4">
                  <div
                    className={`flex h-12 items-center rounded-full border bg-white/70 px-4 transition-colors ${
                      status === "error" ? "border-red-600" : "border-[#0f1428]/15 focus-within:border-[#7a0a0d]"
                    }`}
                  >
                    <FiKey size={20} className="shrink-0 text-[#0f1428]/50" />
                    <input
                      ref={inputRef}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (status === "error") { setStatus("idle"); setErrMsg(""); }
                      }}
                      placeholder="Enter password"
                      aria-label="CV password"
                      aria-invalid={status === "error"}
                      autoComplete="off"
                      spellCheck="false"
                      className="mx-3 min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#0f1428] placeholder:font-normal placeholder:text-[#0f1428]/40 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="shrink-0 text-[#0f1428]/55 transition-colors hover:text-[#7a0a0d]"
                    >
                      {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div role="alert" className="mt-2 flex items-center gap-2 rounded-lg bg-red-600/10 px-3 py-2 text-[13px] text-red-600">
                          <FiAlertCircle size={15} className="shrink-0" />
                          <span>{errMsg}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <a
                      href="#contact"
                      onClick={onClose}
                      className="whitespace-nowrap text-sm font-bold underline underline-offset-4 transition-opacity hover:opacity-70"
                      style={{ color: MAROON }}
                    >
                      Contact me
                    </a>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex h-12 w-[188px] items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                      style={{ backgroundColor: MAROON, boxShadow: "0 10px 22px rgba(122,10,13,0.30)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MAROON_DARK)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = MAROON)}
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Unlocking…
                        </>
                      ) : (
                        <>Unlock CV <FiArrowRight size={18} /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}