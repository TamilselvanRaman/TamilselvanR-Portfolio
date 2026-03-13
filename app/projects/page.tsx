'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaTerminal, FaImages, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <div className="min-h-screen bg-[#F5F5DC]">

      {/* HEADER */}
      <div className="bg-[#1E1E1E] border-b-4 border-black px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
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
                {'// Click a project to see full details & screenshots'}
              </p>
            </div>
            <Link href="/"
              className="flex items-center gap-2 border-2 border-gray-600 bg-gray-800 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm transition-colors self-start sm:self-auto flex-shrink-0">
              <FaArrowLeft className="flex-shrink-0" />
              Back to Home
            </Link>
          </div>
          {!loading && (
            <div className="mt-4 font-mono text-xs">
              <span className="text-green-400"><span className="text-gray-500">total:</span> {projects.length} projects</span>
            </div>
          )}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t-4 border-black bg-[#1E1E1E] px-4 sm:px-6 md:px-10 py-4 sm:py-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-xs sm:text-sm text-gray-400">
            <span className="text-green-400">$</span> echo &quot;{projects.length} projects loaded&quot; <span className="animate-pulse">_</span>
          </span>
          <Link href="/#contact"
            className="border-2 border-black bg-yellow-400 px-4 py-2 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all">
            {'>'} Hire Me
          </Link>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const imgCount = (project.imageUrl ? 1 : 0) + (project.images?.length || 0);

  return (
    <motion.div
      className="bg-[#1E1E1E] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] flex flex-col min-w-0 group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.07, 0.5) }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      {/* Terminal Header */}
      <div className="bg-[#323233] border-b-2 border-black px-3 sm:px-4 py-2 flex items-center gap-1.5 flex-shrink-0">
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 flex-shrink-0" />
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 flex-shrink-0" />
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 flex-shrink-0" />
        <span className="text-white text-[10px] sm:text-xs font-mono truncate max-w-[140px] ml-1">
          {project.title.toLowerCase().replace(/[\s–-]+/g, '_').slice(0, 22)}.tsx
        </span>
        {project.featured && (
          <span className="ml-auto flex-shrink-0 bg-yellow-400 text-black text-[8px] font-bold px-1.5 py-0.5 border border-yellow-600">FEATURED</span>
        )}
      </div>

      <div className="block relative overflow-hidden bg-[#0D1117] border-b-2 border-gray-800">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title}
            className="w-full h-36 sm:h-44 object-cover object-top group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-36 sm:h-44 flex items-center justify-center text-4xl">📦</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-yellow-400 text-black font-mono font-bold text-xs px-3 py-1.5 border-2 border-black">
            VIEW PROJECT →
          </span>
        </div>
        {imgCount > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 border border-gray-600 flex items-center gap-1">
            <FaImages className="text-[9px]" /> {imgCount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 font-mono flex-1 flex flex-col min-w-0">
        <h3 className="block mb-1 text-white font-bold text-xs sm:text-sm line-clamp-2 group-hover:text-yellow-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-green-400 text-[10px] sm:text-xs opacity-60 mb-3 min-w-0 line-clamp-2">
          // {project.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-green-300 bg-green-900/20 border border-green-700 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-gray-500 text-[9px] sm:text-[10px] font-mono">+{project.technologies.length - 3}</span>
          )}
        </div>

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

// ── NEW ADVANCED MODAL ──
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = [project.imageUrl, ...(project.images || [])].filter(Boolean);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveImg(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, images.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#F5F5DC] border-4 border-black shadow-[12px_12px_0px_#000] w-full max-w-5xl max-h-full overflow-y-auto flex flex-col relative"
        initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 bg-[#1E1E1E] border-b-4 border-black px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
            <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-gray-400 font-mono text-xs ml-2 truncate max-w-[200px] sm:max-w-none">
              {project.title.toLowerCase().replace(/[\s–]+/g, '_')}.exe
            </span>
          </div>
          <button onClick={onClose}
            className="text-gray-400 hover:text-white bg-gray-800 hover:bg-red-500 p-2 border-2 border-transparent hover:border-black transition-all">
            <FaTimes />
          </button>
        </div>

        <div className="p-4 sm:p-8">
          {/* Main Title */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight">{project.title}</h2>
              {project.featured && (
                <span className="bg-yellow-400 border-2 border-black text-black text-[10px] font-bold px-2 py-1 font-mono shadow-[2px_2px_0px_#000]">FEATURED</span>
              )}
            </div>
            <p className="text-gray-600 font-mono text-sm">
              <span className="text-green-600">{'>'}</span> {project.description}
            </p>
          </div>

          {/* Full-width Image Carousel */}
          <div className="mb-8 group">
            <div className="border-4 border-black shadow-[6px_6px_0px_#000] bg-[#1E1E1E] overflow-hidden relative">
              <div className="bg-[#323233] border-b-2 border-black px-3 py-1.5 flex justify-between items-center">
                <span className="text-gray-400 font-mono text-[10px] truncate">
                  screenshot_{String(activeImg + 1).padStart(2, '0')}.png
                </span>
                {images.length > 1 && <span className="text-gray-500 font-mono text-[10px]">{activeImg + 1}/{images.length}</span>}
              </div>

              <div className="relative bg-[#0D1117] flex items-center justify-center min-h-[250px] sm:min-h-[400px]">
                <AnimatePresence mode="wait">
                  {images.length > 0 ? (
                    <motion.img
                      key={activeImg} src={images[activeImg]} alt={`screenshot ${activeImg + 1}`}
                      className="w-full max-h-[60vh] object-contain object-top"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
                    />
                  ) : <div className="text-4xl">📦</div>}
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white border-2 border-white/20 p-2 sm:p-3 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                      <FaChevronLeft />
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white border-2 border-white/20 p-2 sm:p-3 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Side-Scroll Thumbnail Strip */}
            {images.length > 1 && (
              <div className="mt-3">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                      className={`flex-shrink-0 border-[3px] overflow-hidden transition-all duration-200 ${
                        i === activeImg ? 'border-black shadow-[4px_4px_0px_#000] scale-100 opacity-100' : 'border-gray-400 opacity-50 hover:opacity-80'
                      }`}
                      style={{ width: '100px' }}
                    >
                      <img src={img} alt={`thumb ${i + 1}`} className="w-full h-16 sm:h-20 object-cover object-top" />
                      <div className={`text-center font-mono text-[9px] py-1 ${i === activeImg ? 'bg-black text-yellow-400' : 'bg-[#1E1E1E] text-gray-500'}`}>pg_{i + 1}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tech & Links Row */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex-1">
              <p className="text-[10px] font-mono text-gray-500 mb-2">// Technologies Used</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="border-2 border-black bg-white px-2 py-1 font-mono text-[10px] sm:text-xs font-bold shadow-[2px_2px_0px_#000]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0 self-start">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-4 border-black bg-black text-white px-4 sm:px-6 py-2.5 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all">
                <FaGithub /> Code
              </a>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-4 border-black bg-blue-600 text-white px-4 sm:px-6 py-2.5 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all">
                <FaExternalLinkAlt /> Live
              </a>
            </div>
          </div>

          {/* Long Description Terminal Block */}
          {project.longDescription && (
            <div className="border-4 border-black bg-[#1E1E1E] shadow-[6px_6px_0px_#000] font-mono">
              <div className="bg-[#323233] border-b-2 border-black px-3 py-2 text-xs">
                <span className="text-purple-400">const</span> <span className="text-blue-400">details</span> <span className="text-white">= `</span>
              </div>
              <div className="p-4 sm:p-6 text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {project.longDescription}
              </div>
              <div className="bg-[#1E1E1E] px-4 py-2 text-white text-xs border-t-2 border-black/20">`</div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
