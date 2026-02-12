'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaJava, FaBars, FaTimes } from 'react-icons/fa';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '/ABOUT', href: '#about' },
    { name: '/SKILLS', href: '#threads' },
    { name: '/LOGS', href: '#curated' },
    { name: '/WORK', href: '#work' },
  ];

  // Brutalist Box Button Style
  const baseButton =
    'border-2 border-black bg-[#F5F5DC] px-4 py-2 font-extrabold text-black shadow-[5px_5px_0px_#000] transition-all font-mono';

  const primaryButton =
    'border-2 border-black bg-yellow-400 px-4 py-2 font-extrabold text-black shadow-[5px_5px_0px_#000] transition-all font-mono';

  return (
    <>
      <motion.header
        className="sticky top-0 -mt-16 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          damping: 20,
          stiffness: 100 
        }}
      >
        <div className="w-full px-8 md:px-16">
          <div className="flex items-center justify-between py-6">

            {/* LOGO with coder touch */}
            <motion.div
              className="ml-15 border-2 border-black bg-yellow-300 px-6 py-2 font-black text-black shadow-[6px_6px_0px_#000] font-mono flex items-center gap-2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                damping: 10,
                stiffness: 100
              }}
              whileHover={{ 
                y: -4,
                boxShadow: "8px 8px 0px #000",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-green-600">{'>'}</span>
              TAMILSELVAN.DEV
            </motion.div>

            {/* MOBILE MENU BUTTON */}
            <motion.button
              className="md:hidden text-2xl p-2 border-2 border-black bg-white shadow-[4px_4px_0px_#000]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6">

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={baseButton}
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    damping: 12,
                    stiffness: 100
                  }}
                  whileHover={{
                    y: [-2, -6, -2],
                    boxShadow: ["5px 5px 0px #000", "8px 8px 0px #000", "5px 5px 0px #000"],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className={`mr-15 ${primaryButton} flex items-center gap-2`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8,
                  type: "spring",
                  damping: 10,
                  stiffness: 100
                }}
                whileHover={{
                  y: [-2, -6, -2],
                  boxShadow: ["5px 5px 0px #000", "8px 8px 0px #000", "5px 5px 0px #000"],
                  scale: 1.05,
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-green-600">{'>'}</span>
                HIRE ME
              </motion.a>

            </nav>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden mt-6 flex flex-col gap-5 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000]"
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  damping: 20
                }}
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={baseButton}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      x: [0, 6, 0],
                      boxShadow: ["5px 5px 0px #000", "8px 8px 0px #000", "5px 5px 0px #000"],
                      transition: {
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${primaryButton} flex items-center gap-2`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  whileHover={{ 
                    x: [0, 6, 0],
                    boxShadow: ["5px 5px 0px #000", "8px 8px 0px #000", "5px 5px 0px #000"],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-green-600">{'>'}</span>
                  HIRE ME
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.header>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
