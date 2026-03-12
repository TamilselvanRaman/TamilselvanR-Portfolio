'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

const FALLBACK: Project[] = [
  { id: '1', title: 'VasandhamHerbals', description: 'A full-stack herbal product e-commerce platform with Firebase backend, secure authentication, and Razorpay payment integration.', technologies: ['React.js (v19)', 'Vite', 'Tailwind CSS', 'React Router DOM', 'Redux Toolkit', 'Firebase (Firestore, Authentication, Cloud Functions)', 'Razorpay Payment Gateway', 'React Toastify'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '/images/projects/vasandham.png', featured: true, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', title: 'MobileShop – E-commerce & Service Platform', description: 'A full-stack e-commerce platform with product management, order processing, and an integrated admin dashboard.', technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '/images/projects/mobileshop.png', featured: true, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', title: 'OmniBill – Smart Billing System for Small Businesses', description: 'OmniBill is a simple web-based billing system that helps small shops generate bills, manage products, and track stock instantly.', technologies: ['ReactJS', 'Node.js', 'Express.js', 'Mongo DB'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '/images/projects/omnibill.png', featured: true, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', title: 'UNI_BRAINS – Medical Abortion Consultation Website', description: 'A responsive medical consultation website designed to provide confidential information and guidance about medical abortion services.', technologies: ['React.js', 'Tailwind CSS', 'GSAP', 'JavaScript'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '/images/projects/unibrains.png', featured: false, order: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', title: 'LogiTrack', description: 'A full-stack logistics tracking system with real-time updates.', technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '/images/projects/logitrack.png', featured: false, order: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: '6', title: 'Rudy – Handmade Skincare E-commerce Platform', description: 'A full-stack React e-commerce application for handmade soaps and skincare products with Firebase authentication and Zoho Inventory sync.', technologies: ['React.js', 'Tailwind CSS', 'Firebase Authentication', 'Zoho Books API'], githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#', imageUrl: '/images/projects/rudy.png', featured: false, order: 6, createdAt: new Date(), updatedAt: new Date() },
];

export default function SelectedWorks() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getProjects();
        setProjects(data.slice(0, 6));
      } catch {
        setProjects(FALLBACK);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const displayProjects = projects.length > 0 ? projects : FALLBACK;

  return (
    <section id="work" className="bg-[#F5F5DC] py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-y-4 border-black" style={{ overflowX: 'clip' }}>
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

        {/* PROJECTS GRID — top 6 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map(i => (
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

        {/* VIEW ALL BUTTON */}
        <motion.div
          className="mt-10 sm:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/projects"
            className="border-4 border-black bg-black text-white px-8 sm:px-12 py-3 sm:py-4 font-mono font-bold text-sm sm:text-base shadow-[6px_6px_0px_#FFD700] hover:shadow-[10px_10px_0px_#FFD700] hover:-translate-y-1 transition-all inline-flex items-center gap-3"
          >
            <span className="text-yellow-400">{'{'}</span>
            VIEW ALL PROJECTS
            <span className="text-yellow-400">{'}'}</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="bg-[#1E1E1E] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] flex flex-col min-w-0 group cursor-pointer"
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
        <span className="text-white text-[10px] sm:text-xs font-mono truncate max-w-[130px] ml-2">
          {project.title.toLowerCase().replace(/[\s–-]+/g, '_').slice(0, 22)}.tsx
        </span>
      </div>

      {/* Image */}
      <div className="bg-[#0D1117] border-b-2 border-gray-800 relative overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-32 sm:h-40 object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-32 sm:h-40 flex items-center justify-center text-4xl sm:text-5xl">📦</div>
        )}
        {/* Click overlay */}
        <Link href={`/projects/${project.id}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-yellow-400 text-black font-mono font-bold text-xs px-3 py-1.5 border-2 border-black">
            VIEW DETAILS →
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 font-mono flex-1 flex flex-col min-w-0">
        <Link href={`/projects/${project.id}`} className="block mb-2">
          <h3 className="text-white font-bold text-xs sm:text-sm line-clamp-2 group-hover:text-yellow-300 transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-green-400 text-[10px] sm:text-xs opacity-60 mb-3 min-w-0 line-clamp-2">
          // {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-green-300 bg-green-900/20 border border-green-700 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-gray-500 text-[9px] sm:text-[10px] font-mono">+{project.technologies.length - 3}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto pt-3 border-t-2 border-gray-800">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 px-3 py-2 text-white transition-colors">
            <FaGithub className="text-sm" />
            <span className="text-[10px] sm:text-xs font-mono">Code</span>
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 border-2 border-blue-800 px-3 py-2 text-white transition-colors">
            <FaExternalLinkAlt className="text-sm" />
            <span className="text-[10px] sm:text-xs font-mono">Live</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
