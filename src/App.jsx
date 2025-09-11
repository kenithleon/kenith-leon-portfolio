import React, { useState } from 'react';
import SplashCursor from "./SplashCursor";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Project from './components/Project';


const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='overflow-x-hidden antialiased overflow-hidden'>
      <SplashCursor />

      <Navbar setIsOpen={setIsMobileMenuOpen} />

      <main className="pt-[64px]">
        <Hero isMobileMenuOpen={isMobileMenuOpen} />
      </main>

      <About />
      <Experience />

       <Project />
       
      <Education />
      
       {/* This includes both Tools and Technologies */}
    </div>
  );
};

export default App;
