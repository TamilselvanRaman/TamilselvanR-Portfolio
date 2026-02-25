'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: '/ABOUT', href: '#about' },
    { name: '/SKILLS', href: '#threads' },
    { name: '/LOGS', href: '#curated' },
    { name: '/WORK', href: '#work' },
  ];

  const baseButton =
    'border-2 border-black bg-[#F5F5DC] px-3 py-2 font-extrabold text-black shadow-[4px_4px_0px_#000] transition-all font-mono text-sm';

  const primaryButton =
    'border-2 border-black bg-yellow-400 px-3 py-2 font-extrabold text-black shadow-[4px_4px_0px_#000] transition-all font-mono text-sm';

  return (
    <>
      <motion.header
        className={`sticky top-0 -mt-16 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-sm' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          damping: 20,
          stiffness: 100 
        }}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between py-4 md:py-6">

            {/* LOGO */}
            <motion.div
              className="border-2 border-black bg-yellow-300 px-3 sm:px-5 py-1.5 sm:py-2 font-black text-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] font-mono flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
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
              <span className="hidden xs:inline">TAMILSELVAN.DEV</span>
              <span className="xs:hidden">TSR.DEV</span>
            </motion.div>

            {/* MOBILE MENU BUTTON */}
            <motion.button
              className="md:hidden text-xl p-2.5 border-2 border-black bg-white shadow-[4px_4px_0px_#000] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-5">
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
                    y: -4,
                    boxShadow: "8px 8px 0px #000",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className={`${primaryButton} flex items-center gap-2`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8,
                  type: "spring",
                  damping: 10,
                  stiffness: 100
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "8px 8px 0px #000",
                  scale: 1.05,
                  transition: { duration: 0.2 }
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
              <motion.nav
                className="md:hidden flex flex-col gap-3 border-4 border-black bg-white p-4 sm:p-6 shadow-[6px_6px_0px_#000] mb-4"
                initial={{ opacity: 0, y: -20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ 
                  duration: 0.25,
                  type: "spring",
                  damping: 20
                }}
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`${baseButton} text-center`}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    whileHover={{ 
                      x: 6,
                      boxShadow: "8px 8px 0px #000",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  onClick={handleLinkClick}
                  className={`${primaryButton} flex items-center justify-center gap-2`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.07 }}
                  whileHover={{ 
                    x: 6,
                    boxShadow: "8px 8px 0px #000",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-green-600">{'>'}</span>
                  HIRE ME
                </motion.a>
              </motion.nav>
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
