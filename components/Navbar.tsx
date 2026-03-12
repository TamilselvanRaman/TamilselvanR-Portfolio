'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: '/ABOUT', href: '#about' },
    { name: '/SKILLS', href: '#threads' },
    { name: '/LOGS', href: '#curated' },
    { name: '/WORK', href: '#work' },
  ];

  const baseButton =
    'border-2 border-black bg-[#F5F5DC] px-3 py-2 font-extrabold text-black shadow-[4px_4px_0px_#000] transition-all font-mono text-xs sm:text-sm whitespace-nowrap';

  const primaryButton =
    'border-2 border-black bg-yellow-400 px-3 py-2 font-extrabold text-black shadow-[4px_4px_0px_#000] transition-all font-mono text-xs sm:text-sm whitespace-nowrap';

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full transition-colors duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20, stiffness: 100 }}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* LOGO */}
            <motion.a
              href="#"
              className="border-2 border-black bg-yellow-300 px-3 sm:px-4 py-1.5 font-black text-black shadow-[4px_4px_0px_#000] font-mono flex items-center gap-1.5 text-sm sm:text-base flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', damping: 10, stiffness: 100 }}
              whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-green-600">{'>'}</span>
              <span className="hidden sm:inline">TAMILSELVAN.DEV</span>
              <span className="sm:hidden">TSR.DEV</span>
            </motion.a>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={baseButton}
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, type: 'spring', damping: 12, stiffness: 100 }}
                  whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
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
                transition={{ delay: 0.9, type: 'spring', damping: 10, stiffness: 100 }}
                whileHover={{ y: -4, boxShadow: '8px 8px 0px #000', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-green-600">{'>'}</span>
                HIRE ME
              </motion.a>
            </nav>

            {/* MOBILE HAMBURGER */}
            <motion.button
              className="md:hidden text-xl p-2.5 border-2 border-black bg-white shadow-[4px_4px_0px_#000] flex items-center justify-center flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU — Fixed full-screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleLinkClick}
            />

            {/* Drawer */}
            <motion.nav
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white border-l-4 border-black z-50 flex flex-col p-6 gap-3 md:hidden shadow-[-8px_0_0px_#000] overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close button */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono font-bold text-sm text-green-600">{'> MENU'}</span>
                <button
                  onClick={handleLinkClick}
                  className="p-2 border-2 border-black bg-[#F5F5DC] shadow-[3px_3px_0px_#000]"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`${baseButton} text-center w-full block`}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                href="/Resume/TAMIL SELVAN R KSRCE - IT.pdf"
                download="TAMIL_SELVAN_Resume.pdf"
                onClick={handleLinkClick}
                className={`${baseButton} flex items-center justify-center gap-2 w-full`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="text-xs flex-shrink-0" />
                DOWNLOAD CV
              </motion.a>

              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                className={`${primaryButton} flex items-center justify-center gap-2 w-full`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-green-600">{'>'}</span>
                HIRE ME
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
