import { useRef } from "react";
import { motion } from "framer-motion";

const About = () => {
  const sectionRef = useRef(null);

  return (
    <section id="about" ref={sectionRef} className="relative scroll-mt-20">
      {/* ---- Glass background layer ---- */}
      <div
        className="
          absolute inset-0
          bg-gray-400/30
          backdrop-blur-xl
          border-t border-white/20
          rounded-t-3xl
        "
      />

      {/* ---- Content ---- */}
      <motion.div
        className="
          relative z-10
          max-w-6xl mx-auto
          flex flex-col lg:flex-row
          items-center lg:items-start
          gap-12 lg:gap-20
          px-6 sm:px-8 lg:px-12
          py-12 sm:py-16 lg:py-20
          text-black
        "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* ----- Text area ----- */}
        <div className="order-1 lg:order-1 w-full lg:w-1/2 text-center lg:text-left lg:pt-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 text-blue-700">
            About Me
          </h1>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            I'm Kenith Leon,
          </h3>

          {/* ---- Image appears right after the sub-heading on mobile ---- */}
          <div className="mb-6 lg:hidden flex justify-center">
            <motion.img
              src="/images/leo.PNG"
              alt="Kenith Leon"
              className="
                w-64 sm:w-72 md:w-80
                rounded-3xl shadow-xl
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-2xl
              "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-justify mb-8 text-white">
            Full Stack Developer specializing in the MERN stack, with hands-on
            experience building and deploying real-world web applications. I
            focus on creating scalable backends, responsive user interfaces, and
            seamless user experiences.

            I’ve developed projects like a full-featured e-commerce platform
            with payment integration and a machine learning model for
            cyberbullying detection achieving 84.86% accuracy. I enjoy solving
            real-world problems through clean, efficient code and continuously
            expanding my skills in both full-stack development and machine
            learning.
          </p>

          {/* ---- Resume Button ---- */}
          <a
            href="/public/kenith-leon.pdf.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="
                px-8 py-3 font-semibold text-lg text-white
                bg-black/80 border border-white/20
                rounded-full shadow-lg duration-300
                hover:bg-black hover:shadow-cyan-500/50
                focus:outline-none focus:ring-2 focus:ring-cyan-400
              "
            >
              📄 View Resume
            </motion.button>
          </a>
        </div>

        {/* ----- Desktop image (shows only on lg+) ----- */}
        <div className="hidden lg:flex order-2 w-full lg:w-1/2 justify-center lg:justify-end">
          <motion.img
            src="/images/leo.PNG"
            alt="Kenith Leon"
            className="
              w-72 md:w-[22rem] lg:w-[18rem] xl:w-[24rem]
              rounded-3xl shadow-xl
              transition-transform duration-300 ease-in-out
              hover:scale-105 hover:shadow-2xl
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>

      {/* ---- Education Section ---- */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 text-white">
          🎓 My Education
        </h2>

        {/* Card Grid */}
        <div className="grid gap-6 sm:gap-10 md:grid-cols-2">
          {/* MCA */}
          <motion.div
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group bg-black/70 border border-cyan-400/30 
                       rounded-3xl shadow-lg p-6 sm:p-8 
                       hover:shadow-cyan-500/50 
                       transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 to-cyan-700/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full 
                              bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg text-2xl sm:text-3xl"
              >
                🎓
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Master of Computer Application
              </h3>

              <p className="text-white/80 text-sm sm:text-base text-center">
                Mangalore Institute Of Technology & Engineering, Moodabidri
              </p>

              <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-cyan-500/20 text-cyan-400 rounded-full">
                Feb 2024 – Nov 2025
              </span>
            </div>
          </motion.div>

          {/* BCA */}
          <motion.div
            whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group bg-black/70 border border-cyan-400/30 
                       rounded-3xl shadow-lg p-6 sm:p-8 
                       hover:shadow-cyan-500/50 
                       transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 to-cyan-700/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full 
                              bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg text-2xl sm:text-3xl"
              >
                🏫
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Bachelor of Computer Application
              </h3>

              <p className="text-white/80 text-sm sm:text-base text-center">
                Milagres College, Kallianpur, Udupi
              </p>

              <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-cyan-500/20 text-cyan-400 rounded-full">
                Sep 2020 – Aug 2023
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;