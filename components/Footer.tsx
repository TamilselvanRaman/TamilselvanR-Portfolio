'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com/TamilselvanRaman' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com/in/tamilselvan-raman-758a45291' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com/TamilselvanRaman' },
    { icon: <FaEnvelope />, label: 'Email', url: 'mailto:ceittamilselvanr26@gmail.com' },
  ];

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#curated' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1E1E1E] border-t-4 border-black relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-20">
        
        {/* Terminal Style Card */}
        <div className="bg-[#323233] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] mb-6 sm:mb-8">
          {/* Terminal Header */}
          <div className="bg-[#323233] border-b-2 border-black px-3 sm:px-4 py-2 flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-red-700 flex-shrink-0"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 border border-yellow-700 flex-shrink-0"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 border border-green-700 flex-shrink-0"></div>
            <span className="text-white text-xs sm:text-sm font-mono ml-1 sm:ml-2">footer.tsx</span>
          </div>

          {/* Footer Content - responsive grid: 1 col mobile, 3 col md+ */}
          <div className="p-5 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* About Section */}
            <div>
              <div className="font-mono text-xs sm:text-sm mb-3 sm:mb-4">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">developer</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-yellow-300">{'{'}</span>
              </div>
              <div className="ml-3 sm:ml-4 space-y-1 font-mono text-xs sm:text-sm">
                <div>
                  <span className="text-pink-400">name:</span>{' '}
                  <span className="text-green-300">&quot;TAMIL SELVAN&quot;</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div>
                  <span className="text-pink-400">role:</span>{' '}
                  <span className="text-green-300">&quot;Full Stack Dev&quot;</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div>
                  <span className="text-pink-400">location:</span>{' '}
                  <span className="text-green-300">&quot;DHARMAPURI&quot;</span>
                  <span className="text-gray-500">,</span>
                </div>
              </div>
              <div className="text-yellow-300 font-mono text-xs sm:text-sm mt-2">{'};'}</div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-green-400 font-mono font-bold mb-3 sm:mb-4 text-xs sm:text-sm">
                $ cat navigation.txt
              </h3>
              <nav className="space-y-1.5 sm:space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="block text-gray-300 hover:text-yellow-300 font-mono text-xs sm:text-sm transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-gray-500">{'>'}</span> {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-green-400 font-mono font-bold mb-3 sm:mb-4 text-xs sm:text-sm">
                $ ls socials/
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 bg-[#0D1117] border-2 border-gray-700 hover:border-yellow-300 px-2 sm:px-3 py-1.5 sm:py-2 text-white transition-colors group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm sm:text-lg group-hover:text-yellow-300 transition-colors flex-shrink-0">
                      {social.icon}
                    </span>
                    <span className="text-[9px] sm:text-xs font-mono">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 border-gray-700 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-gray-400 font-mono text-[10px] sm:text-xs text-center sm:text-left">
              <span className="text-green-400">$</span> echo &quot;© {currentYear} All rights reserved&quot;
            </div>
            
            <div className="text-gray-400 font-mono text-[10px] sm:text-xs text-center">
              Built with{' '}
              <span className="text-red-400">{'<3'}</span>{' '}
              using{' '}
              <span className="text-blue-400">Next.js</span>,{' '}
              <span className="text-purple-400">TypeScript</span> &{' '}
              <span className="text-yellow-400">Firebase</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 sm:gap-2 bg-yellow-300 border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-yellow-200 transition-colors group"
            >
              <FaArrowUp className="group-hover:-translate-y-1 transition-transform text-sm flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap">BACK TO TOP</span>
            </button>
          </div>
        </div>

        {/* Terminal Command Line */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-gray-500">
          <span className="text-green-400">$</span>
          <span>exit 0 // Thanks for visiting!</span>
          <span className="animate-pulse">_</span>
        </div>

      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none font-mono text-xs text-white overflow-hidden select-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>
            {'// '.repeat(50)}
          </div>
        ))}
      </div>
    </footer>
  );
}
