import { useRef, useEffect, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import psImage from "../assets/ps.png";

// Lazy load ProfileCard for performance
const ProfileCard = lazy(() => import("./ProfileCard"));

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleResumeClick = () => {
    window.open("/kenithleonresume.pdf", "_blank"); // Make sure PDF is in /public
  };

  const handleContactClick = () => {
    window.open("https://www.linkedin.com/in/kenith-leon/", "_blank");
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-black text-white px-4 flex items-center justify-center scroll-mt-20"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center gap-20">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center opacity-0 z-40"
        >
          About Me
        </h1>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12 md:gap-20">
          {/* Left Side */}
          <div className="text-center md:text-left max-w-2xl z-40">
            <h3 className="text-5xl sm:text-2xl md:text-6xl font-semibold mb-4">
              I'm Kenith Leon,<br className="hidden sm:block" /> 
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-justify mb-6">
              Passionate frontend developer skilled in HTML, Tailwind CSS, JavaScript, and React, with basic
              UI/UX knowledge in clean layouts, simple navigation, and accessible design. Dedicated to creating
              responsive, user-friendly web applications and eager to grow into full-stack development while
              continuously learning and contributing to impactful projects.
            </p>

            {/* Resume Button */}
            <motion.button
              onClick={handleResumeClick}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 font-semibold text-lg text-white 
                         bg-white/10 backdrop-blur-md border border-white/20 
                         rounded-full shadow-lg transition-all duration-300 
                         hover:shadow-cyan-500/50 hover:bg-white/20
                         focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span className="relative z-10">📄 View Resume</span>
              <span className="absolute inset-0 rounded-full 
                               bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 
                               opacity-0 hover:opacity-30 transition-opacity duration-300 blur-md">
              </span>
            </motion.button>
          </div>

          {/* Right Side: Lazy-loaded ProfileCard */}
          <div className="w-full pl-6 max-w-xs sm:max-w-sm md:max-w-md z-40">
            <Suspense fallback={<div className="text-gray-400">Loading profile...</div>}>
              <ProfileCard
                name="Kenith Leon"
                title=""
                handle="kenithleon"
                status="Online"
                contactText="Contact Me"
                avatarUrl={psImage}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={handleContactClick}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
