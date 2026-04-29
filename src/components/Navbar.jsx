// components/Navbar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar
 * Props:
 *  - setIsOpen(fn) optional: function to close mobile menu state in parent
 *  - isOpen boolean optional: current mobile menu state (if you want to control it)
 */
const Navbar = ({ setIsOpen, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle is controlled by parent if provided; otherwise internal fallback
  const handleToggle = () => {
    if (typeof setIsOpen === "function") {
      // parent controls the state
      setIsOpen((v) => !v);
    } else {
      // nothing to do — component can be extended to manage internal state if needed
    }
  };

  /**
   * Navigate / Scroll helper
   * - target may be '#hero' or '#about' etc.
   * - removes leading '#' and uses the raw id when passing state or selecting DOM node.
   */
  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    const raw = (targetHash || "").replace(/^#/, "");

    // try to close mobile menu if parent passed setter
    if (typeof setIsOpen === "function") setIsOpen(false);

    // If already on homepage, attempt to scroll to element immediately
    if (location.pathname === "/") {
      // attempt to find element by id
      const el = document.getElementById(raw) || document.getElementById("home") || document.getElementById("hero");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // if element not present for some reason, still update history state so ScrollToState can handle it
      navigate("/", { state: { scrollTo: raw } });
      return;
    }

    // Not on homepage: navigate to home and pass desired scroll target in location.state
    navigate("/", { state: { scrollTo: raw } });
  };

  // clicking the logo -> go home (no full page reload)
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (typeof setIsOpen === "function") setIsOpen(false);
    navigate("/", { replace: false });
  };

  return (
    <nav className="text-white py-3 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-4 md:px-16 py-0">
        {/* Logo (navigate instead of full reload) */}
        <button onClick={handleLogoClick} aria-label="Home" className="flex items-center gap-3">
          <img src={logo} width={60} height={60} alt="Logo" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium gap-10">
          <a href="#hero" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, "#hero")}>Home</a>
          <a href="#about" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, "#about")}>About</a>
          <a href="#skills" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, "#skills")}>Skills</a>
          <a href="#project" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, "#project")}>Project</a>
          <a href="#contact" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pr-2">
          <button onClick={handleToggle} aria-label="Menu Toggle" className="text-white text-3xl">
            {isOpen ? (
              <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.25 }}>
                <MdClose />
              </motion.div>
            ) : (
              <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.25 }}>
                <MdMenu />
              </motion.div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.35 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 backdrop-blur-md flex flex-col items-center justify-center space-y-10 text-2xl font-medium z-40"
          >
            <button onClick={() => (typeof setIsOpen === "function" ? setIsOpen(false) : null)} className="absolute top-4 right-4 text-white text-4xl">
              <MdClose />
            </button>

            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="hover:text-cyan-400">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-cyan-400">About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, "#skills")} className="hover:text-cyan-400">Skills</a>
            <a href="#project" onClick={(e) => handleNavClick(e, "#project")} className="hover:text-cyan-400">Project</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="hover:text-cyan-400">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
