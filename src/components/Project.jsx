import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projectsData = [
  {
    title: 'Portfolio Website',
    date: '2025',
    tech: [],
    source: '',
    live: 'https://yourdomain.com',
    video: '/video/Pot.mp4', // Video file path
  },
  {
    title: 'Cyberbullying Detection System',
    date: '2025',
    tech: [],
    source: '',
    live: null,
    video: '/video/rp.mp4',
  },
  {
    title: 'Art Gallery Management System',
    date: '2024',
    tech: [],
    source: 'https://github.com/yourusername/cyberbullying-detection',
    live: null,
    video: '/video/agms.mp4',
  },
 
];

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.35 } },
};

const ProjectCard = ({ project }) => (
  <motion.div
    variants={itemFadeUp}
    className="relative group overflow-hidden rounded-xl shadow-lg"
    layout
  >
    {/* Media (Video or Image) */}
    <div className="aspect-[4/3] bg-gray-900 overflow-hidden">
      {project.video ? (
        <video
          src={project.video}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>

    {/* Always visible overlay */}
    <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-t from-black/80 to-transparent transition">
      {/* Title & Date */}
      <div className="flex justify-between items-start">
        <div className="max-w-[70%]">
          <h4 className="text-sm font-semibold text-white truncate">{project.title}</h4>
          <p className="text-[10px] text-gray-300">{project.date}</p>
        </div>
        <div className="text-teal-300 text-xl">
          <FaFolderOpen aria-hidden="true" />
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-2 flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[9px] inline-block bg-gray-700/50 rounded-full px-2 py-1 text-white"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-3 flex flex-wrap gap-2 items-center">
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-medium bg-gray-800/70 hover:bg-gray-800/90 px-2 py-1 rounded-full transition"
          >
            <FaGithub aria-hidden="true" /> Source
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-r from-blue-500 to-teal-400 text-white px-2 py-1 rounded-full transition"
          >
            <FaExternalLinkAlt aria-hidden="true" /> Live
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectsPage = () => {
  return (
    <div
      id="project" // ✅ Added so navbar smooth scroll works
      className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 z-30"
    >
      <div className="max-w-7xl mx-auto space-y-12 z-30">
        <motion.section
          aria-label="Projects"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-30"
        >
          {/* Centered Heading */}
          <div className="mb-6 text-center">
            <motion.h2
              variants={itemFadeUp}
              className="text-5xl font-bold relative pb-12"
            >
              Projects
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-teal-400"></span>
            </motion.h2>
          </div>

          {/* Project Grid */}
          <div className="space-y-12 z-30">
            <motion.div
              variants={containerVariant}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projectsData.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProjectsPage;
