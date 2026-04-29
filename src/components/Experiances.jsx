import React from "react";
import { motion } from "framer-motion";

const Experiances = () => {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 bg-black relative " id="experience">
      <h2 className="text-5xl sm:text-4xl lg:text-5xl font-bold sm:mb-10 mb-6 text-center text-white z-10 relative">
        Experience
      </h2>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-48 lg:pl-20 ">
          {/* Company Logo Container */}
          <div className="flex-shrink-0 w-80 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 flex items-center justify-center overflow-hidden rounded-[5px] relative z-10 lg:pt-12">
            <img
              src="/images/chipsy.png"
              alt="Chipsy IT Services Pvt. Ltd."
              className="object-contain w-full h-full "
            />
          </div>

          {/* Internship Details Container */}
          <div className="flex-1 text-justify px-2 sm:px-0 relative z-10 lg:pt-12">
            <h3 className="text-3xl sm:text-3xl lg:text-4xl font-semibold text-blue-300 lg:pl-12 mb-4 text-center md:text-left">
              Web Development Intern
            </h3>
            <p className="text-white font-medium sm:text-base text-center">
              Chipsy IT Services Pvt. Ltd. – Udupi
            </p>
            <p className="text-xs sm:text-sm italic text-gray-400 mb-4 text-center">
              Nov 2024 – Jan 2025 (3 Months)
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
              <li>
                Completed a 10-week internship focusing on front-end web development.
              </li>
              <li>
                Worked with <b>HTML, CSS, JavaScript, and React</b> to build dynamic and responsive websites.
              </li>
              <li>
                Gained hands-on experience with modern web technologies and UI/UX principles.
              </li>
              <li>
                Improved skills in clean layouts, simple navigation, and accessible design.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experiances;
