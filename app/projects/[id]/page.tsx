'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    async function fetchProject() {
      try {
        const all = await getProjects();
        const found = all.find(p => p.id === params.id) || null;
        setProject(found);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [params.id]);

  const images = project
    ? [project.imageUrl, ...(project.images || [])].filter(Boolean)
    : [];

  const prev = () => setActiveImg(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg(i => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="font-mono text-black animate-pulse text-sm">{'>'} loading...<span className="animate-ping">_</span></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-4xl">⚠️</div>
        <h1 className="font-mono font-bold text-2xl">PROJECT_NOT_FOUND</h1>
        <Link href="/projects" className="border-2 border-black bg-yellow-400 px-4 py-2 font-mono font-bold text-sm shadow-[4px_4px_0px_#000]">
          {'<'} Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">

      {/* ── STICKY NAVBAR ── */}
      <div className="sticky top-0 z-40 bg-[#1E1E1E] border-b-4 border-black px-4 sm:px-6 md:px-10 py-3 sm:py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link href="/projects"
            className="flex items-center gap-2 text-white font-mono text-xs sm:text-sm hover:text-yellow-300 transition-colors">
            <FaArrowLeft className="flex-shrink-0" />
            <span>All Projects</span>
          </Link>
          <div className="flex gap-2 items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">

        {/* ── TITLE ── */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight">{project.title}</h1>
            {project.featured && (
              <span className="bg-yellow-400 border-2 border-black text-black text-xs font-bold px-2 py-1 font-mono shadow-[3px_3px_0px_#000] flex-shrink-0">
                FEATURED
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-mono">
            <span className="text-green-600">{'>'}</span> {project.description}
          </p>
        </motion.div>

        {/* ── IMAGE CAROUSEL ── */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Main Viewer */}
          <div className="relative border-4 border-black shadow-[8px_8px_0px_#000] bg-[#1E1E1E] overflow-hidden group">
            {/* Terminal header bar */}
            <div className="bg-[#323233] border-b-2 border-black px-3 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-gray-400 font-mono text-xs ml-2 truncate">
                {project.title.toLowerCase().replace(/[\s–]+/g, '_')}_screenshot_{activeImg + 1}.png
              </span>
              {images.length > 1 && (
                <span className="ml-auto text-gray-500 font-mono text-xs flex-shrink-0">
                  {activeImg + 1} / {images.length}
                </span>
              )}
            </div>

            {/* Image */}
            <div className="relative" style={{ minHeight: '280px' }}>
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={`${project.title} screenshot ${activeImg + 1}`}
                    className="w-full object-cover object-top max-h-[60vh]"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-5xl">📦</div>
                )}
              </AnimatePresence>

              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white border-2 border-white/30 p-2 sm:p-3 transition-all opacity-0 group-hover:opacity-100">
                    <FaChevronLeft />
                  </button>
                  <button onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white border-2 border-white/30 p-2 sm:p-3 transition-all opacity-0 group-hover:opacity-100">
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="mt-2 sm:mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 border-2 overflow-hidden transition-all ${
                    i === activeImg ? 'border-black shadow-[3px_3px_0px_#000] scale-105' : 'border-gray-400 opacity-60 hover:opacity-100'
                  }`}>
                  <img src={img} alt={`thumb ${i + 1}`}
                    className="w-16 h-12 sm:w-24 sm:h-16 object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── TECH TAGS + LINKS ROW ── */}
        <motion.div
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {/* Tech Tags */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-gray-500 mb-2">// Technologies</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i}
                  className="border-2 border-black bg-white px-2 sm:px-3 py-1 font-mono text-[10px] sm:text-xs font-bold shadow-[2px_2px_0px_#000]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border-4 border-black bg-black text-white px-4 sm:px-6 py-2.5 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all">
              <FaGithub /> Code
            </a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border-4 border-black bg-blue-600 text-white px-4 sm:px-6 py-2.5 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all">
              <FaExternalLinkAlt /> Live
            </a>
          </div>
        </motion.div>

        {/* ── LONG DESCRIPTION ── */}
        {project.longDescription && (
          <motion.div
            className="border-4 border-black bg-[#1E1E1E] shadow-[6px_6px_0px_#000] font-mono mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#323233] border-b-2 border-black px-3 sm:px-4 py-2 text-xs text-gray-400">
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">overview</span>{' '}
              <span className="text-white">= `</span>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{project.longDescription}</p>
              <div className="text-white text-xs mt-3">`</div>
            </div>
          </motion.div>
        )}

        {/* ── BACK / HIRE ME ── */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-4 border-black">
          <Link href="/projects"
            className="flex items-center justify-center gap-2 border-2 border-black bg-[#F5F5DC] px-5 py-3 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all">
            <FaArrowLeft /> All Projects
          </Link>
          <Link href="/#contact"
            className="flex items-center justify-center gap-2 border-2 border-black bg-yellow-400 px-5 py-3 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all">
            {'>'} Hire Me
          </Link>
        </div>
      </div>
    </div>
  );
}
