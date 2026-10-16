import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import WhatIDo from "./components/WhatIDo";
import Projects from "./components/Projects";
import InfoGrid from "./components/InfoGrid";
import Testimonials from "./components/Testimonials";
import Certificates from "./pages/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CV from "./pages/CV";

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3,  ease: [0.22, 1, 0.36, 1] } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}

function Portfolio() {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;
    const timeout = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TechStack />
      <WhatIDo />
      <Projects />
      <InfoGrid />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(location.pathname === "/");

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsLoading(false);
      return undefined;
    }

    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/cv" element={<PageWrapper><CV /></PageWrapper>} />
          <Route path="/certificates" element={<PageWrapper><Certificates /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="portfolio-loader"
            role="status"
            aria-label="Loading portfolio"
            initial={{ backgroundColor: "#090b12" }}
            animate={{ backgroundColor: "#fdf6f0" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.15 }}
              animate={{ opacity: [0, 0, 1, 0.35], scale: [0.15, 0.15, 0.9, 1.45] }}
              transition={{ duration: 1.85, times: [0, 0.24, 0.65, 1], ease: "easeOut" }}
              className="absolute h-[72vmax] w-[72vmax] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.98)_0%,_rgba(253,246,240,0.82)_32%,_rgba(253,246,240,0)_70%)]"
            />
            <div className="relative flex flex-col items-center gap-3">
              <motion.img
                src="/logo.png"
                alt=""
                initial={{ opacity: 0, scale: 0.62, rotate: 0 }}
                animate={{ opacity: [0, 0.3, 1, 1], scale: [0.62, 0.72, 0.94, 1], rotate: [0, 18, 150, 720] }}
                transition={{ duration: 1.85, times: [0, 0.38, 0.67, 1], ease: "easeInOut" }}
                className="h-20 w-20 rounded-full object-cover shadow-[0_14px_36px_rgba(31,34,51,0.22)]"
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 0, 1], y: [8, 8, 0] }}
                transition={{ duration: 1.85, times: [0, 0.55, 1], ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-sm font-bold tracking-[0.12em] text-[#1f2233]"
              >
                Mutimutuje Hope
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
