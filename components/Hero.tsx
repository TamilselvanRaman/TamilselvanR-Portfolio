'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiTailwindcss } from 'react-icons/si';

export default function Hero() {
  const techIcons = [
    { icon: <FaReact />, name: 'React' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <SiMongodb />, name: 'MongoDB' },
    { icon: <FaJava />, name: 'Java' },
    { icon: <SiTailwindcss />, name: 'Tailwind' },
  ];

  const scrollItems = [
    "HTML5","CSS3","JAVASCRIPT","REACT","NEXT.JS",
    "TYPESCRIPT","TAILWIND","GSAP","NODE.JS",
    "EXPRESS","SPRING BOOT","JAVA","MONGODB",
    "MYSQL","FIREBASE","GIT","GITHUB",
    "JWT AUTH","DATA STRUCTURES","ALGORITHMS"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100, mass: 0.8 } as any
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
    }
  } as any;

  return (
    /* No negative margin — use pt-16 to account for sticky navbar height instead */
    <div className="relative overflow-x-hidden w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 bg-[#F5F5DC]">

        {/* Background watermark — clipped inside section */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <motion.span
            className="text-[5rem] sm:text-[8rem] md:text-[14rem] lg:text-[18rem] font-black text-black opacity-[0.04] leading-none"
            animate={{ opacity: [0.03, 0.06, 0.03], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            aria-hidden
          >
            CODE
          </motion.span>
        </div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto"
        >
          {/* STATUS BADGE */}
          <motion.div
            variants={fadeUpVariants}
            className="bg-white border-2 border-black px-3 sm:px-4 py-2 mb-6 sm:mb-8 flex items-center gap-2 shadow-[4px_4px_0px_#000]"
            whileHover={{ y: -4, boxShadow: '6px 6px 0px #000', scale: 1.05 }}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"
              animate={{ boxShadow: ['0 0 0 0px rgba(34,197,94,0.7)', '0 0 0 4px rgba(34,197,94,0)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-bold uppercase tracking-wide whitespace-nowrap">
              SYSTEM STATUS: ONLINE
            </span>
          </motion.div>

          {/* TITLE */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 md:mb-10 w-full px-2">
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight"
            >
              FULL STACK
            </motion.h1>
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
              style={{ WebkitTextStroke: '2px black', WebkitTextFillColor: 'transparent' }}
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* TECH ICONS */}
          <motion.div
            variants={containerVariants}
            className="flex gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 flex-wrap justify-center px-2"
          >
            {techIcons.map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                className="flex flex-col items-center text-black"
                whileHover={{ y: -12, scale: 1.2, transition: { type: 'spring', stiffness: 300 } }}
              >
                <motion.div
                  variants={floatVariants}
                  animate="animate"
                  transition={{ duration: 3 + (i % 2), repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: i * 0.2 }}
                >
                  <div className="text-2xl sm:text-3xl mb-1">{tech.icon}</div>
                </motion.div>
                <span className="text-[10px] sm:text-xs font-semibold mt-1">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA BUTTONS — always stacked on mobile */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-sm sm:max-w-none sm:justify-center px-4"
          >
            <motion.a
              href="/projects"
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm border-2 border-black shadow-[6px_6px_0px_#000] relative overflow-hidden group text-center"
              whileHover={{ y: -6, borderColor: '#FFD700', boxShadow: '10px 10px 0px #FFD700' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">VIEW WORK</span>
              <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.a>

            <motion.a
              href="/Resume/TAMIL SELVAN R KSRCE - IT.pdf"
              download="TAMIL_SELVAN_Resume.pdf"
              className="bg-transparent border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm shadow-[6px_6px_0px_#000] relative overflow-hidden group text-center flex items-center justify-center gap-2"
              whileHover={{ y: -6, color: '#fff', boxShadow: '10px 10px 0px #000' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" />
                </svg>
                DOWNLOAD CV
              </span>
              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* SCROLLING TECH BAR */}
      <motion.div
        className="bg-blue-600 text-white py-2.5 sm:py-3 border-y-2 border-black overflow-hidden relative z-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'circOut' }}
      >
        <div className="flex w-max animate-marquee">
          {[...scrollItems, ...scrollItems].map((tech, i) => (
            <span key={i} className="px-4 sm:px-6 text-xs sm:text-sm font-bold whitespace-nowrap">
              /// {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
