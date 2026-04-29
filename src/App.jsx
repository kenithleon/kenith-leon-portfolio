// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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
 * - reads location.state.scrollTo and attempts to scroll to the element
 *   after navigation. Put this inside Router so useLocation works.
 */
function ScrollToState() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state && location.state.scrollTo;
    if (!target) return;

    // small timeout to allow the target elements/components to mount
    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // fallback: scroll to top if element not found
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Clear the navigation state so subsequent back/forward doesn't re-scroll
      // Note: we can't directly mutate location.state; it's fine to leave it.
    }, 80);

    return () => clearTimeout(t);
  }, [location]);

  return null;
}

const AppRoutes = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <>
    {/* Helper that triggers scroll after navigation with state */}
    <ScrollToState />

    <Routes>
      {/* Home Route */}
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

      {/* Certificates Route */}
      <Route path="/certificates" element={<CertificatesPage />} />
    </Routes>
  </>
);

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden antialiased">
      <SplashCursor />
      <Router>
        <Navbar setIsOpen={setIsMobileMenuOpen} isOpen={isMobileMenuOpen} />

        <AppRoutes isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </Router>
    </div>
  );
};

export default App;
