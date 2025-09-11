import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from "../components/Hero"; 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth scroll and close menu
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="text-white py-3 fixed top-0 left-0 w-full z-50  ">
      <div className="flex justify-between items-center px-4 md:px-16 py-0">
        {/* Logo */}
        <a href="/" aria-label="Home">
          <img src={logo} width={60} height={60} alt="Logo" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium gap-10">
          <a href="#hero" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
          <a href="#about" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <a href="#skills" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
          <a href="#project" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, '#project')}>Project</a>
          <a href="#contact" className="hover:text-cyan-400 transition" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pr-2">
          <button onClick={toggleMenu} aria-label="Menu Toggle" className="text-white text-3xl">
            {isOpen ? (
              <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <MdClose />
              </motion.div>
            ) : (
              <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
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
            transition={{ duration: 0.4 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 backdrop-blur-md flex flex-col items-center justify-center space-y-10 text-2xl font-medium z-40"
          >
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-4xl">
              <MdClose />
            </button>
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-cyan-400">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-cyan-400">About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-cyan-400">Skills</a>
             <a href="#project" onClick={(e) => handleNavClick(e, '#project')} className="hover:text-cyan-400">Project</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-cyan-400">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
