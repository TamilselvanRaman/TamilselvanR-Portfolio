'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaBars } from 'react-icons/fa';
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

  // Enhanced Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      }
    }
  };

  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150
      } as any
    }
  };

  const fadeUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.8
      } as any
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  } as any;

  return (
    <div className="relative overflow-hidden  -mt-16">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-10 bg-[#F5F5DC]">

        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.03, 0.06, 0.03], 
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1]
          }}
        >
          <h1 className="text-[6rem] md:text-[18rem] font-black text-black select-none opacity-80">
            CODE
          </h1>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center"
        >
          {/* STATUS BADGE - Pops in */}
          <motion.div
            variants={fadeUpVariants}
            className="bg-white border-2 border-black px-4 py-2 mb-8 flex items-center gap-2 shadow-[4px_4px_0px_#000]"
            whileHover={{ 
              y: -4, 
              boxShadow: "6px 6px 0px #000",
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ 
                boxShadow: ["0 0 0 0px rgba(34, 197, 94, 0.7)", "0 0 0 4px rgba(34, 197, 94, 0)"],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1]
              }}
            />
            <span className="text-xs font-bold uppercase tracking-wide">
              SYSTEM STATUS: ONLINE
            </span>
          </motion.div>

          {/* TITLE */}
          <div className="flex flex-col items-center mb-8 md:mb-10 overflow-hidden px-4">
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-black text-black leading-tight"
            >
              FULL STACK
            </motion.h1>

            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-black"
              style={{
                WebkitTextStroke: '1px black',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* TECH ICONS - Staggered & Floating */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-8 mb-12 flex-wrap justify-center"
          >
            {techIcons.map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                custom={i}
                className="flex flex-col items-center text-black cursor-pointer"
                whileHover={{ 
                  y: -12, 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div
                  variants={floatVariants}
                  animate="animate"
                  // Randomize float duration slightly for organic feel
                  transition={{ 
                    duration: 3 + (i % 2), 
                    repeat: Infinity, 
                    ease: [0.42, 0, 0.58, 1],
                    delay: i * 0.2 
                  }}
                >
                  <div className="text-3xl mb-1">
                    {tech.icon}
                  </div>
                </motion.div>
                <span className="text-xs font-semibold mt-2">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA BUTTONS - Pop in with bounce */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex gap-6 flex-wrap justify-center"
          >
            <motion.a
              href="#work"
              className="bg-black text-white px-8 py-4 font-bold text-sm border-2 border-black shadow-[6px_6px_0px_#000] relative overflow-hidden group"
              whileHover={{ 
                y: -6,
                borderColor: "#FFD700",
                boxShadow: "10px 10px 0px #FFD700",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">VIEW WORK</span>
              <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
            </motion.a>

            <motion.a
              href="#"
              className="bg-transparent border-2 border-black text-black px-8 py-4 font-bold text-sm shadow-[6px_6px_0px_#000] relative overflow-hidden group"
              whileHover={{ 
                y: -6,
                color: "#fff",
                boxShadow: "10px 10px 0px #000",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">DOWNLOAD CV</span>
              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
            </motion.a>
          </motion.div>
        </motion.div>

      </section>

      {/* SCROLLING TECH BAR - Smooth slide up */}
      <motion.div 
        className="bg-blue-600 text-white py-3 border-y-2 border-black overflow-hidden relative z-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.2,
          ease: "circOut"
        }}
      >
        <div className="flex w-max animate-marquee">
          {[...scrollItems, ...scrollItems].map((tech, i) => (
            <span
              key={i}
              className="px-6 text-sm font-bold whitespace-nowrap"
            >
              /// {tech}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
