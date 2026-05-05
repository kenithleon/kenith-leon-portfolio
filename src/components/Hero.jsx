import React, { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagramSquare, FaGithub, FaLinkedin, FaBehanceSquare } from "react-icons/fa";
import RotatingText from "./RotatingText";

gsap.registerPlugin(ScrollTrigger);

const SocialIcons = memo(() => (
  <div className="flex justify-center mt-16">
    <ul className="flex gap-8 lg:gap-32 text-white text-5xl sm:text-5xl lg:text-6xl">
      <li className="hover:scale-125 transition-transform duration-300">
        <a href="https://www.instagram.com/kenith_leon_"><FaInstagramSquare /></a>
      </li>
      <li className="hover:scale-125 transition-transform duration-300">
        <a href="https://github.com/kenithleon"><FaGithub /></a>
      </li>
      <li className="hover:scale-125 transition-transform duration-300">
        <a href="https://www.linkedin.com/in/kenith-leon/"><FaLinkedin /></a>
      </li>
     
    </ul>
  </div>
));

const Hero = () => {
  const heroRef = useRef(null);
  const titles = ["WEB DEVELOPER","UI/UX","FULL STACK"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // GSAP scroll effect
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=50%",
          scrub: 0.5,
          pin: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Rotate main titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex flex-col justify-center items-center min-h-[85vh] overflow-hidden z-10"
    >
      {/* Main Title */}
      <div className="text-center z-10 h-[5rem] sm:h-[6rem] md:h-[8rem] lg:h-[10rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={titles[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-cyan-400 tracking-wider text-6xl sm:text-7xl lg:text-8xl drop-shadow-neon"
          >
            {titles[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Rotating Text in the Middle */}
      <div className="my-12 w-full flex justify-center mt-20">
        <RotatingText
          className="text-5xl sm:text-4xl lg:text-7xl font-bold text-gray-400 text-center"
          texts={["Designer", "Creator", "Editor", "Problem Solver"]}
          mainClassName="px-6 bg-pink-500/30 text-black py-3 rounded-xl inline-block shadow-neon"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.10}
          splitLevelClassName="overflow-hidden pb-1"
          transition={{ type: "spring", damping: 60, stiffness: 400 }}
          rotationInterval={3000}
        />
      </div>

      {/* Social Icons */}
      <SocialIcons />
    </section>
  );
};

export default Hero;
