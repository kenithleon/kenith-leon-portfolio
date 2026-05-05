import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// --- Skills ---
const skillsData = [
  { name: "HTML", level: 80 },
  { name: "CSS / Tailwind", level: 75 },
  { name: "JavaScript", level: 70 },
  { name: "React", level: 70 },
  { name: "Node.js", level: 55 },
  { name: "Express.js", level: 60 },
  { name: "MongoDB", level: 60 },
  { name: "MySQL", level: 55 },
  { name: "Java (Basic)", level: 50 },
  { name: "Python (Basic)", level: 45 }
];

// --- Tools ---
const toolsIcons = [
  "/images/pngwing.com.webp", "/images/2.webp", "/images/11.webp",
  "/images/12.webp", "/images/pngwing.com (1).webp", "/images/3.webp",
  "/images/7.webp", "/icons8-mongo-db-48.png",
  "/images/pr.webp", "/images/capcut.webp",
  "/images/icons8-canva-app-48.webp", "/icons8-sql-48.png",
  "/images/html.webp", "/images/excel.webp", "/images/word.webp"
];

// --- ALL Certificates ---
const allCertificates = [
  { file: "/certificate/031.pdf", image: "/certificate/031_page-0001.jpg" },
  { file: "/certificate/frontend_developer_react_certificate.pdf", image: "/public/certificate/frontend_developer_react certificate.webp" },
  { file: "/certificate/Kenith_Leon_Bernard_4MT23MC031.pdf", image: "/public/certificate/hzmoNKtzvAzXsEqx8_Accenture North America_YTTjLceSK7M2Kywon_1725379978253_completion_certificate (1)_page-0001.jpg" },
  { file: "/certificate/cert4.pdf", image: "/certificate/cert4.jpg" },
];

// 👉 SHOW ONLY 3
const certificates = allCertificates.slice(0, 3);

// --- Animations ---
const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

// --- Skill Bar ---
const SkillBar = ({ skill, level }) => (
  <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row gap-3 z-50">
    <div className="w-full sm:w-32 text-sm font-semibold z-50">{skill}</div>

    <div className="flex-1 flex items-center gap-3 z-50">
      <div className="flex-1 bg-gray-800 rounded-full h-4 overflow-hidden z-50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.7 }}
          className="h-full rounded-full z-50"
          style={{ background: "linear-gradient(90deg,#6366f1,#14b8a6)" }}
        />
      </div>

      <div className="w-12 text-xs text-gray-300 z-50">{level}%</div>
    </div>
  </motion.div>
);

// --- Tools Slider ---
const ToolsSlider = () => {
  const trackRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.parentElement.offsetWidth;
        setDragConstraint(trackWidth - containerWidth);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div className="overflow-hidden py-6 z-50">
      <motion.div
        ref={trackRef}
        className="flex gap-5 z-50"
        drag="x"
        dragConstraints={{ right: 0, left: -dragConstraint }}
      >
        {toolsIcons.map((icon, i) => (
          <img key={i} src={icon} alt="tool" className="h-16 w-16 object-contain z-50" />
        ))}
      </motion.div>
    </div>
  );
};

// --- Certificates ---
const CertificatesSection = ({ certificates }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-50">
    {certificates.map((cert, i) => (
      <a key={i} href={cert.file} target="_blank" rel="noreferrer">
        <img src={cert.image} alt="certificate" className="rounded-lg shadow-lg hover:scale-105 transition z-50" />
      </a>
    ))}
  </div>
);

// --- MAIN ---
const ExperiencePage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white py-16 px-6 z-50">
      <div className="max-w-7xl mx-auto space-y-20 z-50">

        {/* Skills */}
        <section className="z-50">
          <h2 ref={titleRef} className="text-5xl font-bold text-center z-50">SKILLS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 z-50">
            {skillsData.map((s, index) => (
              <SkillBar key={index} skill={s.name} level={s.level} />
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="z-50">
          <h2 className="text-4xl font-bold text-center z-50">TOOLS</h2>
          <ToolsSlider />
        </section>

        {/* Certificates */}
        <section className="text-center z-50">
          <h2 className="text-4xl font-bold mb-6 z-50">CERTIFICATES</h2>

          <CertificatesSection certificates={certificates} />

          {/* VIEW ALL BUTTON */}
          <div className="mt-8 z-50">
            <Link
              to="/certificates"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full z-50"
            >
              View All Certificates
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ExperiencePage;