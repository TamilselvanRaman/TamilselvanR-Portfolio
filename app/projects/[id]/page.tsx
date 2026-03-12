'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

// Fallback / demo projects with multiple images
const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1', title: 'LogiTrack', featured: true, order: 1,
    description: 'Full-stack logistics tracking system with real-time updates',
    longDescription: 'LogiTrack is a comprehensive logistics management platform built to streamline delivery operations. It features real-time driver tracking, automated route optimization, a dispatch dashboard, and push notifications for delivery status. The system integrates Google Maps API for live tracking and uses WebSockets for real-time data syncing between the server and clients.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps API', 'JWT Auth'],
    githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#',
    imageUrl: '', images: [],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '2', title: 'UNI_BRAINS', featured: true, order: 2,
    description: 'Medical consultation platform connecting patients with doctors',
    longDescription: 'UNI_BRAINS is a medical consultation platform designed for accessibility and ease of use. Patients can book consultations, share medical records securely, and receive video or chat-based consultations from registered doctors. The platform includes an admin panel for managing appointments, doctor availability, and billing.',
    technologies: ['Next.js', 'Tailwind CSS', 'MySQL', 'Spring Boot', 'JWT', 'REST API'],
    githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#',
    imageUrl: '', images: [],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '3', title: 'RUDY', featured: true, order: 3,
    description: 'Full-featured e-commerce platform with Razorpay integration',
    longDescription: 'RUDY is a handmade skincare product e-commerce application. It supports full product catalog management, cart/wishlist functionality, Razorpay payment gateway, Firebase Authentication, and real-time inventory sync using Firestore. The admin dashboard lets the store owner manage orders, products, and customers.',
    technologies: ['React.js', 'Tailwind CSS', 'Firebase', 'Razorpay', 'React Router DOM', 'Redux Toolkit'],
    githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#',
    imageUrl: '', images: [],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '4', title: 'VASANDHAM_HERBALS', featured: false, order: 4,
    description: 'Herbal product e-commerce with Firebase backend',
    longDescription: 'Vasandham Herbals is a full-stack herbal product e-commerce platform built for a local brand. It includes product listing, category filtering, cart and checkout flow, secure Razorpay payment integration, and an admin CMS for product and order management. Firebase is used for authentication and real-time data.',
    technologies: ['React', 'Firebase', 'GSAP', 'Tailwind', 'Firestore', 'Cloud Functions'],
    githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#',
    imageUrl: '', images: [],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '5', title: 'Student Skill Tracker', featured: false, order: 5,
    description: 'Analytics dashboard for tracking student progress and skills',
    longDescription: 'A comprehensive skill tracking system for educational institutions. Faculty can assign assessments, track individual student progress, and view analytics charts. The platform generates PDF reports and sends email notifications. Built with Spring Boot REST APIs and a React frontend with chart visualizations.',
    technologies: ['React', 'Spring Boot', 'Java', 'MySQL', 'Chart.js', 'PDF Generation'],
    githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#',
    imageUrl: '', images: [],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: '6', title: 'MobileShop e-Commerce', featured: true, order: 6,
    description: 'Full-stack e-commerce platform with product management, order processing',
    longDescription: 'MobileShop is a full-stack e-commerce platform with product management, order processing, and an integrated admin dashboard. It features Stripe payments, JWT authentication, and a recommendation engine.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Stripe', 'JWT'],
    githubUrl: 'https://github.com/TamilselvanRaman', liveUrl: '#',
    imageUrl: '', images: [],
    createdAt: new Date(), updatedAt: new Date(),
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const all = await getProjects();
        const found = all.find(p => p.id === params.id) ||
                      FALLBACK_PROJECTS.find(p => p.id === params.id);
        setProject(found || null);
      } catch {
        const found = FALLBACK_PROJECTS.find(p => p.id === params.id);
        setProject(found || null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [params.id]);

  const allImages = project
    ? [project.imageUrl, ...(project.images || [])].filter(Boolean)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
        <div className="font-mono text-green-400 text-sm animate-pulse">
          {'>'} loading project data...<span className="animate-ping">_</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="font-mono text-4xl">⚠️</div>
        <h1 className="font-mono font-bold text-2xl">PROJECT_NOT_FOUND</h1>
        <p className="text-gray-600 font-mono text-sm">// id: {params.id} does not exist</p>
        <Link href="/projects" className="border-2 border-black bg-yellow-400 px-4 py-2 font-mono font-bold text-sm shadow-[4px_4px_0px_#000]">
          {'<'} Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">

      {/* NAV BAR */}
      <div className="sticky top-0 z-40 bg-[#1E1E1E] border-b-4 border-black px-4 sm:px-6 md:px-10 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/projects"
            className="flex items-center gap-2 text-white font-mono text-xs sm:text-sm hover:text-yellow-300 transition-colors">
            <FaArrowLeft className="flex-shrink-0" />
            <span>All Projects</span>
          </Link>
          <span className="text-gray-400 font-mono text-[10px] sm:text-xs truncate">
            {project.title.toLowerCase().replace(/\s+/g, '_')}.tsx
          </span>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 flex-shrink-0" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">

        {/* TITLE BLOCK */}
        <motion.div
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight">
              {project.title}
            </h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* LEFT: Images + Description */}
          <div className="lg:col-span-2 space-y-6">

            {/* MAIN IMAGE */}
            {allImages.length > 0 ? (
              <motion.div
                className="border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden bg-[#1E1E1E] cursor-zoom-in"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setLightboxIndex(0)}
              >
                <img
                  src={allImages[0]}
                  alt={`${project.title} main screenshot`}
                  className="w-full object-cover max-h-[400px] sm:max-h-[500px]"
                />
              </motion.div>
            ) : (
              <motion.div
                className="border-4 border-black shadow-[8px_8px_0px_#000] bg-[#1E1E1E] h-48 sm:h-64 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">📦</div>
                  <p className="font-mono text-gray-500 text-sm">// no images yet</p>
                </div>
              </motion.div>
            )}

            {/* THUMBNAIL GALLERY */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {allImages.slice(1).map((img, i) => (
                  <motion.div
                    key={i}
                    className="border-2 border-black overflow-hidden cursor-zoom-in shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    onClick={() => setLightboxIndex(i + 1)}
                  >
                    <img src={img} alt={`${project.title} screenshot ${i + 2}`} className="w-full h-24 sm:h-32 object-cover" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* DESCRIPTION */}
            <motion.div
              className="border-4 border-black bg-[#1E1E1E] p-4 sm:p-6 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-green-400 text-xs sm:text-sm mb-3 border-b border-gray-800 pb-2">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">description</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-yellow-300">{'`'}</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {project.longDescription || project.description}
              </p>
              <div className="text-yellow-300 text-xs sm:text-sm mt-3">{'`'}</div>
            </motion.div>
          </div>

          {/* RIGHT: Tech & Links */}
          <div className="space-y-4 sm:space-y-6">

            {/* TECH STACK */}
            <motion.div
              className="border-4 border-black bg-[#1E1E1E] shadow-[6px_6px_0px_#000]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="bg-[#323233] border-b-2 border-black px-3 sm:px-4 py-2">
                <span className="text-white font-mono text-xs sm:text-sm">tech_stack.json</span>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-gray-400 font-mono text-xs mb-3">
                  <span className="text-yellow-300">[</span>
                </div>
                <div className="flex flex-col gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 bg-green-900/20 border border-green-700 px-2 sm:px-3 py-1.5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <span className="text-green-400 font-mono text-[10px] sm:text-xs">{String(i + 1).padStart(2, '0')}.</span>
                      <span className="text-green-300 font-mono text-[10px] sm:text-xs font-bold">{tech}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="text-yellow-300 font-mono text-xs mt-3"><span>]</span></div>
              </div>
            </motion.div>

            {/* LINKS */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full border-4 border-black bg-black text-white py-3 px-4 font-mono font-bold text-xs sm:text-sm shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:translate-y-[-4px] transition-all"
              >
                <FaGithub className="text-lg flex-shrink-0" />
                View Source Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full border-4 border-black bg-blue-600 text-white py-3 px-4 font-mono font-bold text-xs sm:text-sm shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:translate-y-[-4px] transition-all"
              >
                <FaExternalLinkAlt className="text-lg flex-shrink-0" />
                View Live Demo
              </a>
            </motion.div>

            {/* PROJECT META */}
            <motion.div
              className="border-4 border-black bg-white p-3 sm:p-4 shadow-[6px_6px_0px_#000] font-mono text-xs sm:text-sm space-y-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between">
                <span className="text-gray-500">status:</span>
                <span className="text-green-600 font-bold">✓ Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">type:</span>
                <span className="font-bold">{project.featured ? 'Featured' : 'Project'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">stack:</span>
                <span className="font-bold">{project.technologies.length} technologies</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BACK BUTTON */}
        <motion.div
          className="mt-10 sm:mt-14 pt-6 border-t-4 border-black flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/projects"
            className="flex items-center justify-center gap-2 border-2 border-black bg-[#F5F5DC] px-5 py-3 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all">
            <FaArrowLeft />
            All Projects
          </Link>
          <Link href="/#contact"
            className="flex items-center justify-center gap-2 border-2 border-black bg-yellow-400 px-5 py-3 font-mono font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all">
            {'>'} Hire Me
          </Link>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && allImages.length > 0 && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button className="absolute top-4 right-4 text-white bg-gray-800 border-2 border-white p-2 z-10"
              onClick={() => setLightboxIndex(null)}>
              <FaTimes />
            </button>

            {/* Prev */}
            {allImages.length > 1 && (
              <button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-gray-800 border-2 border-white p-2 sm:p-3 z-10"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length); }}
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              src={allImages[lightboxIndex]}
              alt={`Screenshot ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain border-4 border-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {allImages.length > 1 && (
              <button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-gray-800 border-2 border-white p-2 sm:p-3 z-10"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % allImages.length); }}
              >
                <FaChevronRight />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-mono text-xs bg-black/60 px-3 py-1">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
