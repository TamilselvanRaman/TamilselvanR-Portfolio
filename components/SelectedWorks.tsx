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

  // Fallback projects if Firebase is not configured
  const fallbackProjects: Project[] = [
    {
      id: '1',
      title: 'LogiTrack',
      description: 'Full-stack logistics tracking system with real-time updates',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
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
      technologies: ['Next.js', 'Tailwind', 'MySQL', 'Prisma'],
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
      technologies: ['React', 'Spring Boot', 'Java', 'PostgreSQL'],
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
    <section id="work" className="bg-brutalist-beige py-24 px-6 border-y-4 border-brutalist-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* CODING PLATFORM TITLE */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-brutalist-black">
              {'>'} projects.fetch()
            </h2>
          </div>
          <p className="text-sm font-mono text-gray-600 ml-6">// Featured work from my portfolio</p>
        </motion.div>

        {/* PROJECTS GRID */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1E1E1E] border-4 border-brutalist-black h-96 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-[#1E1E1E] border-4 border-brutalist-black p-8 text-center">
            <p className="text-red-400 font-mono text-lg">ERROR: {error}</p>
            <p className="text-gray-400 font-mono text-sm mt-2">// Using fallback data</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

      </div>

      {/* Background Code Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none font-mono text-xs text-brutalist-black overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i}>
            {'const project = {...}; '.repeat(10)}
          </div>
        ))}
      </div>
    </section>
  );
}

/* PROJECT CARD - TERMINAL STYLE */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="bg-[#1E1E1E] border-4 border-brutalist-black shadow-[8px_8px_0px_#000] flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: '10px 10px 0px #000' }}
    >
      {/* Terminal Header */}
      <div className="bg-[#323233] border-b-2 border-brutalist-black px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs font-mono">●</span>
          <span className="text-white text-xs font-mono">{project.title.toLowerCase().replace(/\s+/g, '_')}.tsx</span>
        </div>
      </div>

      {/* Project Image or Placeholder */}
      <div className="bg-[#0D1117] border-b-2 border-gray-800 overflow-hidden relative group">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-6xl">
            📦
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent opacity-60"></div>
      </div>

      {/* Terminal Content */}
      <div className="p-5 font-mono text-sm flex-1 flex flex-col">
        {/* Project Title as Code */}
        <div className="mb-3">
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-400">project</span>{' '}
          <span className="text-white">=</span>{' '}
          <span className="text-yellow-300">{'{'}</span>
        </div>

        <div className="ml-4 space-y-2 flex-1">
          <div>
            <span className="text-pink-400">title:</span>{' '}
            <span className="text-green-300">"{project.title}"</span>
            <span className="text-gray-500">,</span>
          </div>
          
          <div>
            <span className="text-pink-400">desc:</span>{' '}
            <span className="text-green-300">"{project.description}"</span>
            <span className="text-gray-500">,</span>
          </div>

          <div>
            <span className="text-pink-400">stack:</span>{' '}
            <span className="text-yellow-300">[</span>
            <div className="ml-4 flex flex-wrap gap-2 mt-1">
              {project.technologies.map((tech, i) => (
                <span key={i} className="text-green-300 bg-green-900/20 border border-green-500 px-2 py-0.5 text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-yellow-300">]</span>
            <span className="text-gray-500">,</span>
          </div>
        </div>

        <div className="text-yellow-300 mb-4">{'};'}</div>

        {/* Action Links */}
        <div className="flex gap-3 mt-auto pt-4 border-t-2 border-gray-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 px-4 py-2 text-white transition-colors"
          >
            <FaGithub />
            <span className="text-xs font-mono">Code</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 border-2 border-blue-800 px-4 py-2 text-white transition-colors"
          >
            <FaExternalLinkAlt />
            <span className="text-xs font-mono">Live</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
