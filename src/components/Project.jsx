import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projectsData = [
  {
    title: 'Portfolio Website',
    date: '2025',
    tech: [],
    source: 'https://github.com/kenithleon/kenith-leon-portfolio.git',
    live: 'https://kenith-leon-portfolio-2ckb.vercel.app/',
    image: '/images/PORT.png',
  },
  {
    title: 'Kickless Zone E-commerce MERN Application',
    date: '2026',
    tech: [],
    source: 'https://github.com/kenithleon/kz.git',
    live: 'https://kz-do5h.vercel.app/',
    image: '/images/KICK.png',
    titleColor: 'text-black',
  },
  {
    title: 'Cyberbullying Detection System',
    date: '2025',
    tech: [],
    source: 'https://github.com/kenithleon/cyberbullying.git',
    live: null,
    image: '/images/cyber.png',
     titleColor: 'text-black',
  },
  {
    title: 'Art Gallery Management System',
    date: '2024',
    tech: [],
    source: 'https://github.com/kenithleon/art_gallery.git',
    live: null,
    image: '/images/art.png',
     titleColor: 'text-gray-300'
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
    className="relative group overflow-hidden rounded-xl shadow-lg z-50"
    layout
  >
    {/* Image */}
    <div className="aspect-[4/3] bg-gray-900 overflow-hidden">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-t from-black/80 to-transparent">
      <div className="flex justify-between items-start">
        <div className="max-w-[70%]">
          <h4 className={`text-sm font-semibold ${project.titleColor} truncate`}>
            {project.title}
          </h4>
          <p className="text-[10px] text-gray-300">{project.date}</p>
        </div>
        <div className="text-teal-300 text-xl">
          <FaFolderOpen />
        </div>
      </div>

      {/* Tech (optional) */}
      <div className="mt-2 flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[9px] bg-gray-700/50 rounded-full px-2 py-1 text-white"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-3 flex gap-2 items-center">
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] bg-gray-800/70 hover:bg-gray-800/90 px-2 py-1 rounded-full"
          >
            <FaGithub /> Source
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] bg-gradient-to-r from-blue-500 to-teal-400 text-white px-2 py-1 rounded-full"
          >
            <FaExternalLinkAlt /> Live
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectsPage = () => {
  return (
    <div id="project" className="bg-black text-white py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Title */}
          <div className="mb-4 text-center">
            <motion.h2
              variants={itemFadeUp}
              className="text-4xl sm:text-5xl font-bold relative pb-4"
            >
              Projects
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-teal-400"></span>
            </motion.h2>
          </div>

          {/* Grid */}
          <motion.div
            variants={containerVariant}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projectsData.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProjectsPage;