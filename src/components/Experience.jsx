import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const skillsData = [
  { name: "Html", level: 70 },
  { name: "Tailwind CSS", level: 50 },
  { name: "JavaScript", level: 45 },
  { name: "React", level: 40 },
  { name: "Java", level: 45 },
];

const toolsIcons = [
  "/images/pngwing.com.webp", "/images/2.webp", "/images/11.webp",
  "/images/12.webp", "/images/pngwing.com (1).webp", "/images/3.webp",
  "/images/7.webp", "/images/5.webp", "/images/ae.webp",
  "/images/pr.webp", "/images/adobe-photoshop_5210800.webp", "/images/capcut.webp",
  "/images/icons8-canva-app-48.webp", "/images/html.webp", "/images/excel.webp", 
  "/images/word.webp",
];

// Only show first 3 certificates on this page
const certificates = [
  { file: "/certificate/031.pdf", image: "/certificate/031_page-0001.jpg" },
  { file: "/certificate/frontend_developer_react certificate.pdf", image: "/certificate/frontend_developer_react certificate.webp" },
  { file: "/certificate/Kenith Leon Bernard 4MT23MC031.pdf", image: "/certificate/Kenith Leon Bernard 4MT23MC031_page-0001.jpg" },
];

// --- Animations ---
const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.35 } },
};

// --- Reusable Components ---
const Img = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} draggable="false" />
);

const SkillBar = ({ skill, level }) => (
  <motion.div
    variants={itemFadeUp}
    className="flex flex-col sm:flex-row sm:items-center gap-3"
  >
    <div className="w-full sm:w-32 text-sm font-semibold">{skill}</div>
    <div className="flex-1 flex items-center gap-3">
      <div className="flex-1 relative bg-gray-800 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="h-full rounded-full"
          style={{
            minWidth: level > 0 ? "6px" : "0",
            background: "linear-gradient(90deg,#6366f1,#14b8a6)",
          }}
        />
      </div>
      <div className="w-12 text-right text-xs font-medium text-gray-300">
        {level}%
      </div>
    </div>
  </motion.div>
);

const ToolsSlider = () => {
  const trackRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.parentElement.offsetWidth;
        const newConstraint = trackWidth - containerWidth;
        setDragConstraint(newConstraint > 0 ? newConstraint : 0);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <motion.div
        ref={trackRef}
        className="flex gap-5"
        drag="x"
        dragConstraints={{ right: 0, left: -dragConstraint }}
        onWheel={(e) => {
          if (trackRef.current) {
            e.preventDefault();
            trackRef.current.scrollLeft += e.deltaY;
          }
        }}
      >
        {toolsIcons.map((icon, i) => (
          <Img
            key={`${icon}-${i}`}
            src={icon}
            alt={`Tool icon ${i + 1}`}
            className="h-16 w-16 sm:h-24 sm:w-24 object-contain flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

// Certificates (desktop = slider, mobile = static grid)
const CertificatesSection = ({ certificates }) => {
  const trackRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const calc = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.parentElement.offsetWidth;
        const newConstraint = trackWidth - containerWidth;
        setDragConstraint(newConstraint > 0 ? newConstraint : 0);
      }
    };
    calc();
    window.addEventListener("resize", calc);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", calc);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="w-full grid grid-cols-1 gap-6">
        {certificates.map((cert, i) => (
          <a
            key={i}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
          >
            <Img
              src={cert.image}
              alt={`Certificate ${i + 1}`}
              className="w-full h-full object-contain bg-black"
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing flex justify-center">
      <motion.div
        ref={trackRef}
        className="flex gap-6 py-4 justify-center"
        drag="x"
        dragConstraints={{ right: 0, left: -dragConstraint }}
        onWheel={(e) => {
          if (trackRef.current) {
            e.preventDefault();
            trackRef.current.scrollLeft += e.deltaY;
          }
        }}
      >
        {certificates.map((cert, i) => (
          <a
            key={i}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-80 rounded-lg overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
          >
            <Img
              src={cert.image}
              alt={`Certificate ${i + 1}`}
              className="w-full h-full object-contain bg-black"
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Page ---
const ExperiencePage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      id="skills"
      ref={sectionRef}
      className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 z-30 rounded-t-[4rem]"
    >
      <div className="max-w-7xl mx-auto space-y-20 z-30">
        {/* Skills */}
        <motion.section
          aria-label="Skills"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-30"
        >
          <div className="mb-8 text-center relative z-30">
            <motion.h2
              ref={titleRef}
              variants={itemFadeUp}
              className="text-5xl md:text-6xl font-extrabold opacity-0"
            >
              Skills
            </motion.h2>
            <motion.p variants={itemFadeUp} className="mt-2 text-gray-400">
              Core technologies and your proficiency.
            </motion.p>
          </div>
          <motion.div
            variants={containerVariant}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-30"
          >
            {skillsData.map((s) => (
              <SkillBar key={s.name} skill={s.name} level={s.level} />
            ))}
          </motion.div>
        </motion.section>

        {/* Tools */}
        <motion.section
          aria-label="Tools"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-30 mt-20"
        >
          <div className="mb-6 relative z-50">
            <motion.h2
              variants={itemFadeUp}
              className="text-4xl font-extrabold pt-12"
            >
              Tools
            </motion.h2>
            <motion.p variants={itemFadeUp} className="mt-2 text-gray-400">
              Technologies, design platforms, and utilities I frequently use.
            </motion.p>
          </div>
          <ToolsSlider />
        </motion.section>

        {/* Certificates */}
        <motion.section
          aria-label="Certificates"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-30 mt-20 flex flex-col items-center"
        >
          <div className="mb-8 text-center">
            <motion.h2
              variants={itemFadeUp}
              className="text-4xl font-extrabold"
            >
              Certificates
            </motion.h2>
            <motion.p variants={itemFadeUp} className="mt-2 text-gray-400">
              My professional achievements and learning milestones.
            </motion.p>
          </div>
          <CertificatesSection certificates={certificates} />

          {/* Link to All Certificates Page */}
          <motion.div variants={itemFadeUp} className="mt-8">
            <a
              href="/certificates"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full transition"
            >
              View All Certificates
            </a>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default ExperiencePage;
