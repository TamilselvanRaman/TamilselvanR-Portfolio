'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaPaperPlane, FaTerminal, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', projectDetails: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await addDoc(collection(db, 'messages'), { ...formData, createdAt: serverTimestamp() });
      setStatus('success');
      setFormData({ name: '', email: '', projectDetails: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f2f0e6]" style={{ overflowX: 'clip' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section Title */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <FaTerminal className="text-xl sm:text-3xl text-black flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold text-black">
              {'>'} contact.init()
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-gray-600 ml-7 sm:ml-10">
            {'// Let\'s build something amazing together'}
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          className="bg-[#1E1E1E] border-[3px] sm:border-4 border-black shadow-[6px_6px_0px_#000] sm:shadow-[12px_12px_0px_#000] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal Header */}
          <div className="bg-[#2D2D2D] px-3 sm:px-4 py-2 flex items-center justify-between border-b-2 border-black">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 font-mono text-[10px] sm:text-xs truncate ml-2">contact_form.tsx</span>
            <div className="w-12" />
          </div>

          {/* Content — stacked on mobile, two col on lg */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 font-mono">

            {/* Left: Info */}
            <div className="text-xs sm:text-sm space-y-5">
              <div className="text-gray-500 italic">{'/* Contact Information */'}</div>

              <div>
                <div className="text-gray-400 mb-1">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">email</span>{' '}
                  <span className="text-white">=</span>
                </div>
                <div className="pl-3 text-orange-300 break-all flex items-start gap-2 min-w-0">
                  <FaEnvelope className="flex-shrink-0 text-orange-400 mt-0.5" />
                  <span className="break-all min-w-0">&quot;ceittamilselvanr26@gmail.com&quot;;</span>
                </div>
              </div>

              <div>
                <div className="text-gray-400 mb-1">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">location</span>{' '}
                  <span className="text-white">=</span>
                </div>
                <div className="pl-3 text-green-400 flex items-center gap-2">
                  <FaMapMarkerAlt className="flex-shrink-0 text-green-500" />
                  <span>&quot;Remote / Earth&quot;;</span>
                </div>
              </div>

              <div>
                <span className="text-purple-400">let</span>{' '}
                <span className="text-blue-400">availability</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-yellow-400">true</span>
                <span className="text-white">;</span>
                <span className="text-gray-500 ml-2 text-[10px]">{'// Open for new projects'}</span>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-800">
                {[
                  { label: 'GitHub', url: 'https://github.com/TamilselvanRaman', icon: <FaGithub />, cls: 'bg-gray-800 hover:bg-gray-700' },
                  { label: 'LinkedIn', url: 'https://linkedin.com/in/tamilselvan-raman-758a45291', icon: <FaLinkedin />, cls: 'bg-blue-700 hover:bg-blue-600' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.cls} border border-gray-600 px-3 py-2 text-white text-[10px] sm:text-xs font-mono text-center transition-colors flex items-center justify-center gap-2`}
                  >
                    {s.icon}
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-gray-500 italic text-xs sm:text-sm">{'// Fill out the form below'}</div>

              {/* Name */}
              <div>
                <label className="text-purple-400 text-[10px] sm:text-xs mb-1 block">var name =</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder='"Your Name"'
                  className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-xs sm:text-sm focus:outline-none placeholder-gray-600 font-mono"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-purple-400 text-[10px] sm:text-xs mb-1 block">var email =</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder='"your@email.com"'
                  className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-xs sm:text-sm focus:outline-none placeholder-gray-600 font-mono"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-purple-400 text-[10px] sm:text-xs mb-1 block">var message =</label>
                <textarea
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder='"Describe your project..."'
                  rows={4}
                  className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-xs sm:text-sm focus:outline-none placeholder-gray-600 font-mono resize-none"
                  required
                />
              </div>

              {status === 'success' && (
                <div className="text-green-400 text-[10px] sm:text-xs font-mono bg-[#1E1E1E] p-2 border border-green-900">
                  ✓ Message sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-400 text-[10px] sm:text-xs font-mono bg-[#1E1E1E] p-2 border border-red-900">
                  Error: {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold px-5 py-2.5 text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className="flex-shrink-0" />
                {status === 'loading' ? 'sending...' : 'execute_send()'}
              </button>
            </form>
          </div>

          {/* Status Bar */}
          <div className="bg-[#007acc] px-3 py-1 text-[9px] sm:text-[10px] text-white flex justify-between items-center font-sans">
            <div className="flex gap-2 sm:gap-3">
              <span>main*</span>
              <span>0 errors</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <span>UTF-8</span>
              <span className="hidden sm:inline">TypeScript React</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
