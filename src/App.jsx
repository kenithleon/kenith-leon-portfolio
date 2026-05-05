import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import SplashCursor from "./SplashCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experiances from "./components/Experiances";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Project from "./components/Project";
import CertificatesPage from "./components/CertificatesPage";

/**
 * ScrollToState
 */
function ScrollToState() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state && location.state.scrollTo;
    if (!target) return;

    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);

    return () => clearTimeout(t);
  }, [location]);

  return null;
}

const AppRoutes = ({ isMobileMenuOpen }) => (
  <>
    <ScrollToState />

    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <main className="pt-[64px]">
              <Hero isMobileMenuOpen={isMobileMenuOpen} />
            </main>
            <About />
            <Experiances />
            <Experience />
            <Project />
            <Education />
          </>
        }
      />

      {/* Certificates */}
      <Route path="/certificates" element={<CertificatesPage />} />
    </Routes>
  </>
);

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden antialiased">
      <SplashCursor />

      {/* ✅ WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/917975137211?text=Hi%20Kenith,%20I%20visited%20your%20portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        {/* Tooltip */}
        <div className="hidden group-hover:block absolute right-14 bg-black text-white px-3 py-1 rounded text-sm">
          Chat on WhatsApp
        </div>

        {/* Button */}
        <div className="bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </div>
      </a>

      <Router>
        <Navbar
          setIsOpen={setIsMobileMenuOpen}
          isOpen={isMobileMenuOpen}
        />

        <AppRoutes isMobileMenuOpen={isMobileMenuOpen} />
      </Router>
    </div>
  );
};

export default App;