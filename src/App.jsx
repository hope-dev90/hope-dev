import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import InfoGrid from "./components/InfoGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";
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
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
      <InfoGrid />
      <Contact />
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/cv" element={<PageWrapper><CV /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CursorFollower />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
