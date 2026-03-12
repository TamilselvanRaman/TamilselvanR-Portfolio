'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTerminal } from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const fallbackProjects: Project[] = [
    { id: '1', title: 'LogiTrack', description: 'Full-stack logistics tracking system with real-time updates, driver management, and admin dashboard', technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '', featured: true, order: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: '2', title: 'UNI_BRAINS', description: 'Medical consultation platform connecting patients with doctors including appointment scheduling', technologies: ['Next.js', 'Tailwind', 'MySQL', 'Spring Boot'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '', featured: true, order: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: '3', title: 'RUDY', description: 'Full-featured e-commerce platform with Razorpay integration and inventory management', technologies: ['React', 'Node.js', 'MySQL', 'Stripe'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '', featured: true, order: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: '4', title: 'VASANDHAM_HERBALS', description: 'Herbal product e-commerce platform with Firebase backend and secure authentication', technologies: ['React', 'Firebase', 'GSAP', 'Tailwind'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '', featured: false, order: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: '5', title: 'Student Skill Tracker', description: 'Analytics dashboard for tracking student progress and skills with visual reports', technologies: ['React', 'Spring Boot', 'Java', 'MySQL'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '', featured: false, order: 5, createdAt: new Date(), updatedAt: new Date() },
    { id: '6', title: 'Portfolio v2', description: 'Personal portfolio website with terminal aesthetic, Firebase contact form and GitHub stats', technologies: ['Next.js', 'TypeScript', 'Firebase', 'Framer Motion'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '', featured: true, order: 6, createdAt: new Date(), updatedAt: new Date() },
  ];

  const displayProjects = loading ? [] : (projects.length > 0 ? projects : fallbackProjects);

  // Collect all unique tech tags
  const allTags = ['all', ...Array.from(new Set(displayProjects.flatMap(p => p.technologies)))];

  const filtered = filter === 'all'
    ? displayProjects
    : displayProjects.filter(p => p.technologies.includes(filter));

  return (
    <div className="min-h-screen bg-[#F5F5DC]">

      {/* HEADER */}
      <div className="bg-[#1E1E1E] border-b-4 border-black px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Terminal bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400 font-mono text-xs ml-2">all_projects.tsx</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <FaTerminal className="text-green-400 text-lg sm:text-2xl flex-shrink-0" />
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-white">
                  {'>'} projects.all()
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-mono text-gray-400 ml-7 sm:ml-10">
                {'// All projects from Tamil Selvan\'s portfolio'}
              </p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 border-2 border-gray-600 bg-gray-800 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm transition-colors self-start sm:self-auto flex-shrink-0"
            >
              <FaArrowLeft className="flex-shrink-0" />
              Back to Home
            </Link>
          </div>

          {/* Stats row */}
          {!loading && (
            <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs">
              <span className="text-green-400">
                <span className="text-gray-500">total:</span> {displayProjects.length} projects
              </span>
              <span className="text-yellow-400">
                <span className="text-gray-500">featured:</span> {displayProjects.filter(p => p.featured).length}
              </span>
              <span className="text-blue-400">
                <span className="text-gray-500">showing:</span> {filtered.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* FILTER TAGS */}
      <div className="bg-[#F5F5DC] border-b-2 border-black px-4 sm:px-6 md:px-10 py-3 sm:py-4 sticky top-0 z-30" style={{ overflowX: 'clip' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {allTags.slice(0, 12).map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`flex-shrink-0 px-3 py-1 border-2 border-black font-mono text-[10px] sm:text-xs font-bold transition-all ${
                  filter === tag
                    ? 'bg-black text-white shadow-[3px_3px_0px_#FFD700]'
                    : 'bg-white text-black hover:bg-yellow-300'
                }`}
              >
                {tag === 'all' ? '# ALL' : tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#1E1E1E] border-4 border-black h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 font-mono">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-gray-600">// No projects found for &quot;{filter}&quot;</p>
            <button onClick={() => setFilter('all')} className="mt-4 underline text-blue-600 text-sm">
              Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER PROMPT */}
      <div className="border-t-4 border-black bg-[#1E1E1E] px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-xs sm:text-sm text-gray-400">
            <span className="text-green-400">$</span> echo &quot;{filtered.length} projects rendered successfully&quot; <span className="animate-pulse">_</span>
          </span>
          <Link
            href="/#contact"
            className="border-2 border-black bg-yellow-400 px-4 py-2 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all"
          >
            {'>'} Hire Me
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="bg-[#1E1E1E] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] flex flex-col min-w-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.07, 0.5) }}
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
          <span className="text-green-400 text-xs flex-shrink-0">●</span>
          <span className="text-white text-[10px] sm:text-xs font-mono truncate max-w-[140px]">
            {project.title.toLowerCase().replace(/\s+/g, '_')}.tsx
          </span>
        </div>
        {project.featured && (
          <span className="ml-auto flex-shrink-0 bg-yellow-400 text-black text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 border border-yellow-600">
            FEATURED
          </span>
        )}
      </div>

      {/* Image */}
      <div className="bg-[#0D1117] border-b-2 border-gray-800">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-32 sm:h-40 object-cover" />
        ) : (
          <div className="w-full h-32 sm:h-40 flex items-center justify-center text-4xl sm:text-5xl">📦</div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 font-mono flex-1 flex flex-col min-w-0">
        <h3 className="text-white font-bold text-sm sm:text-base mb-1 truncate">{project.title}</h3>
        <p className="text-green-400 text-[10px] sm:text-xs opacity-70 mb-3 break-words min-w-0 line-clamp-2">
          // {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="text-green-300 bg-green-900/20 border border-green-700 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-500 text-[9px] sm:text-[10px] font-mono px-1">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto pt-3 border-t-2 border-gray-800">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 px-2 py-1.5 text-white transition-colors">
            <FaGithub className="text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono">Code</span>
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-500 border-2 border-blue-800 px-2 py-1.5 text-white transition-colors">
            <FaExternalLinkAlt className="text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono">Live</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
