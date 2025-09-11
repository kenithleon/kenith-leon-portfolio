import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Data ---
const skillsData = [
  { name: "Html", level: 70 },
  { name: "Tailwind CSS", level: 50 },
  { name: "JavaScript", level: 45 },
  { name: "React", level: 40 },
  { name: "Java", level: 45 },
];

const toolsIcons = [
  "./images/html.png",
  "./images/2.png",
  "./images/11.png",
  "./images/12.png",
  "./images/react.png",
  "./images/3.webp",
  "./images/7.png",
  "./images/5.png",
  "./images/ae.png",
  "./images/pr.png",
  "./images/ps.png",
  "./images/capcut.png",
  "./images/canva.png",
  "./images/pp.png",
  "./images/excel.png",
  "./images/word.png",
];

// --- Framer Motion Variants ---
const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.35 } },
};

// --- Lazy Loading Image Component ---
const LazyImage = ({ src, alt, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      className={className}
      draggable="false"
      loading="lazy"
      decoding="async"
    />
  );
};

// --- Reusable Components ---
const SkillBar = ({ skill, level }) => (
  <motion.div
    variants={itemFadeUp}
    className="flex flex-col sm:flex-row sm:items-center gap-3"
    aria-label={`${skill} proficiency ${level} percent`}
  >
    <div className="w-full sm:w-32 text-sm font-semibold">{skill}</div>
    <div className="flex-1 flex items-center gap-3">
      <div className="flex-1 relative bg-gray-800 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
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
    const calculateConstraint = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.parentElement.offsetWidth;
        const newConstraint = trackWidth - containerWidth;
        setDragConstraint(newConstraint > 0 ? newConstraint : 0);
      }
    };

    calculateConstraint();
    window.addEventListener("resize", calculateConstraint);
    return () => window.removeEventListener("resize", calculateConstraint);
  }, []);

  return (
    <div className="relative w-full overflow-hidden cursor-grab py-6">
      <motion.div
        ref={trackRef}
        className="flex gap-5"
        drag="x"
        dragConstraints={{
          right: 0,
          left: -dragConstraint,
        }}
        onWheel={(event) => {
          event.preventDefault();
          if (trackRef.current) {
            trackRef.current.scrollLeft += event.deltaY;
          }
        }}
      >
        {toolsIcons.map((icon, i) => (
          <LazyImage
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

// --- Main Page Component ---
const ExperiencePage = () => {
  return (
    <div
      id="skills"
      className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 z-30"
    >
      <div className="max-w-7xl mx-auto space-y-20 z-30">
        {/* Skills Section */}
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
              variants={itemFadeUp}
              className="text-5xl md:text-6xl font-extrabold"
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

        {/* Tools Section */}
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
      </div>
    </div>
  );
};

export default ExperiencePage;
