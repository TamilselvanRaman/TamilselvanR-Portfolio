/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function SelectedWorks() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const fallbackProjects: Project[] = [
    {
      id: '1',
      title: 'LogiTrack',
      description: 'Full-stack logistics tracking system with real-time updates',
      technologies: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      imageUrl: '',
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'UNI_BRAINS',
      description: 'Educational platform for university resource management',
      technologies: ['Next.js', 'Tailwind', 'MySQL'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      imageUrl: '',
      featured: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Student Skill Tracker',
      description: 'Analytics dashboard for tracking student progress',
      technologies: ['React', 'Spring Boot', 'Java'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      imageUrl: '',
      featured: true,
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="work" className="bg-[#F5F5DC] py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-y-4 border-black relative" style={{ overflowX: 'clip' }}>
      <div className="max-w-7xl mx-auto">

        {/* SECTION TITLE */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold text-black">
              {'>'} projects.fetch()
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-gray-600 ml-4 sm:ml-6">
            {'// Featured work from my portfolio'}
          </p>
        </motion.div>

        {/* PROJECTS GRID */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1E1E1E] border-4 border-black h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {displayProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="bg-[#1E1E1E] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] flex flex-col min-w-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      {/* Terminal Header */}
      <div className="bg-[#323233] border-b-2 border-black px-3 sm:px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 flex-shrink-0" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 flex-shrink-0" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-1.5 min-w-0 ml-2">
          <span className="text-green-400 text-xs font-mono flex-shrink-0">●</span>
          <span className="text-white text-[10px] sm:text-xs font-mono truncate max-w-[140px]">
            {project.title.toLowerCase().replace(/\s+/g, '_')}.tsx
          </span>
        </div>
      </div>

      {/* Project Image */}
      <div className="bg-[#0D1117] border-b-2 border-gray-800 relative">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-32 sm:h-40 object-cover"
          />
        ) : (
          <div className="w-full h-32 sm:h-40 flex items-center justify-center text-4xl sm:text-5xl">
            📦
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 font-mono flex-1 flex flex-col min-w-0">
        <div className="text-xs sm:text-sm mb-2 sm:mb-3 space-y-1 min-w-0">
          <div className="flex flex-wrap gap-x-2 min-w-0">
            <span className="text-purple-400 flex-shrink-0">const</span>
            <span className="text-blue-400 flex-shrink-0">title</span>
            <span className="text-white flex-shrink-0">=</span>
            <span className="text-green-300 break-all min-w-0">&quot;{project.title}&quot;</span>
          </div>
          <div className="text-green-300 text-[10px] sm:text-xs break-words min-w-0 opacity-70">
            // {project.description}
          </div>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="text-green-300 bg-green-900/20 border border-green-700 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-500 text-[9px] sm:text-[10px] font-mono px-1">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex gap-2 mt-auto pt-3 border-t-2 border-gray-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 px-2 py-1.5 text-white transition-colors"
          >
            <FaGithub className="text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono">Code</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-500 border-2 border-blue-800 px-2 py-1.5 text-white transition-colors"
          >
            <FaExternalLinkAlt className="text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono">Live</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
