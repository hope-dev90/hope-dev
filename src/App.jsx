import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import InfoGrid from "./components/InfoGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CV from "./pages/CV";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </BrowserRouter>
  );
}
