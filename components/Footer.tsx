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
    { icon: <FaEnvelope />, label: 'Email', url: 'ceittamilselvanr26@gmail.com' },
  ];

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1E1E1E] border-t-4 border-brutalist-black relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-20">
        
        {/* Terminal Header Style */}
        <div className="bg-[#323233] border-4 border-brutalist-black shadow-[8px_8px_0px_#000] mb-8">
          <div className="bg-[#323233] border-b-2 border-brutalist-black px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
            <span className="text-white text-sm font-mono ml-2">footer.tsx</span>
          </div>

          {/* Footer Content */}
          <div className="p-8 grid md:grid-cols-3 gap-8">
            
            {/* About Section */}
            <div>
              <div className="font-mono text-sm mb-4">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">developer</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-yellow-300">{'{'}</span>
              </div>
              <div className="ml-4 space-y-1 font-mono text-sm">
                <div>
                  <span className="text-pink-400">name:</span>{' '}
                  <span className="text-green-300">"TAMIL SELVAN"</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div>
                  <span className="text-pink-400">role:</span>{' '}
                  <span className="text-green-300">"Full Stack Developer"</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div>
                  <span className="text-pink-400">location:</span>{' '}
                  <span className="text-green-300">"DHARMAPURI"</span>
                  <span className="text-gray-500">,</span>
                </div>
              </div>
              <div className="text-yellow-300 font-mono text-sm mt-2">{'};'}</div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-green-400 font-mono font-bold mb-4 text-sm">
                $ cat navigation.txt
              </h3>
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="block text-gray-300 hover:text-brutalist-yellow font-mono text-sm transition-colors"
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
            <div>
              <h3 className="text-green-400 font-mono font-bold mb-4 text-sm">
                $ ls socials/
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#0D1117] border-2 border-gray-700 hover:border-brutalist-yellow px-3 py-2 text-white transition-colors group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg group-hover:text-brutalist-yellow transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-xs font-mono">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 border-gray-700 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 font-mono text-xs">
              <span className="text-green-400">$</span> echo "© {currentYear} All rights reserved"
            </div>
            
            <div className="text-gray-400 font-mono text-xs">
              Built with{' '}
              <span className="text-red-400">{'<3'}</span>{' '}
              using{' '}
              <span className="text-blue-400">Next.js</span>,{' '}
              <span className="text-purple-400">TypeScript</span> &{' '}
              <span className="text-yellow-400">Firebase</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-brutalist-yellow border-2 border-brutalist-black px-4 py-2 hover:bg-yellow-300 transition-colors group"
            >
              <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-xs font-mono font-bold">BACK TO TOP</span>
            </button>
          </div>
        </div>

        {/* Terminal Command Line */}
        <div className="flex items-center gap-2 font-mono text-sm text-gray-500">
          <span className="text-green-400">$</span>
          <span>exit 0 // Thanks for visiting!</span>
          <span className="animate-pulse">_</span>
        </div>

      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none font-mono text-xs text-white overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>
            {'// '.repeat(50)}
          </div>
        ))}
      </div>
    </footer>
  );
}
