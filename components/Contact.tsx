'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaPaperPlane, FaTerminal, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDetails: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [matrixContent, setMatrixContent] = useState('');

  useEffect(() => {
    setMatrixContent(Array(1000).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(''));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setFormData({ name: '', email: '', projectDetails: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f2f0e6] relative overflow-hidden">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="text-[9px] sm:text-[10px] font-mono leading-none break-all text-black">
          {matrixContent}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <FaTerminal className="text-2xl sm:text-3xl text-black flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold text-black">
              {'>'} contact.init()
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-gray-600 ml-8 sm:ml-10">
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
          <div className="bg-[#2D2D2D] p-2.5 sm:p-3 flex items-center justify-between border-b-2 border-black">
            <div className="flex gap-1.5 sm:gap-2 ml-1 sm:ml-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-red-700" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 border border-yellow-700" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 border border-green-700" />
            </div>
            <div className="text-gray-400 font-mono text-[10px] sm:text-xs flex items-center gap-1 sm:gap-2">
              <span className="text-green-500">➜</span>
              <span className="truncate">contact_form.tsx</span>
            </div>
            <div className="w-12 sm:w-16"></div>
          </div>

          {/* Two-column layout: stacked on mobile, side-by-side on lg */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 font-mono">
            
            {/* Left Column: Contact Info */}
            <div className="text-xs sm:text-sm">
              <div className="text-gray-500 italic mb-4 sm:mb-6">{'/* Contact Information */'}</div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Email */}
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                    <span className="text-purple-400">const</span> 
                    <span className="text-blue-400">email</span> 
                    <span className="text-white">=</span> 
                  </div>
                  <div className="pl-3 sm:pl-4 text-orange-300 break-all hover:text-orange-200 transition-colors cursor-text flex items-center gap-2">
                    <FaEnvelope className="flex-shrink-0 text-orange-400" />
                    &quot;ceittamilselvanr26@gmail.com&quot;;
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                    <span className="text-purple-400">const</span> 
                    <span className="text-blue-400">location</span> 
                    <span className="text-white">=</span> 
                  </div>
                  <div className="pl-3 sm:pl-4 text-green-400 flex items-center gap-2">
                    <FaMapMarkerAlt className="flex-shrink-0 text-green-500" />
                    &quot;Remote / Earth&quot;;
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                    <span className="text-purple-400">let</span> 
                    <span className="text-blue-400">availability</span> 
                    <span className="text-white">=</span> 
                  </div>
                  <div className="pl-3 sm:pl-4">
                    <span className="text-yellow-400">true</span>
                    <span className="text-white">;</span>
                    <span className="text-gray-500 ml-2 text-[10px] sm:text-xs">{'// Open for new projects'}</span>
                  </div>
                </div>
              </div>

              {/* Function snippet */}
              <div className="mt-8 sm:mt-12 p-3 sm:p-4 bg-[#252526] border border-gray-700 text-[10px] sm:text-xs leading-relaxed text-gray-400">
                <span className="text-blue-400">function</span>{' '}
                <span className="text-yellow-300">sendMessage</span>() {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span>{' '}
                <span className="text-orange-300">&quot;I&apos;ll get back to you ASAP!&quot;</span>;
                <br />
                {'}'}
              </div>

              {/* Social links */}
              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: 'GitHub', url: 'https://github.com/TamilselvanRaman', color: 'bg-gray-800 hover:bg-gray-700' },
                  { label: 'LinkedIn', url: 'https://linkedin.com/in/tamilselvan-raman-758a45291', color: 'bg-blue-700 hover:bg-blue-600' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} border border-gray-600 px-3 py-2 text-white text-[10px] sm:text-xs font-mono text-center transition-colors`}
                  >
                    {social.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              {/* Line Number Gutter — hidden on small screens */}
              <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 border-r border-gray-800 text-right pr-1 sm:pr-2 text-gray-600 text-[9px] sm:text-xs hidden sm:block select-none font-mono leading-7 pt-1">
                {Array.from({length: 14}).map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 sm:pl-10">
                <div className="text-gray-500 italic mb-2 text-xs sm:text-sm">
                  {'// Fill out the form below'}
                </div>

                {/* Name Field */}
                <div>
                  <label className="text-purple-400 text-[10px] sm:text-xs mb-1 block">var name =</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='"Your Name"'
                    className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-xs sm:text-sm focus:outline-none transition-all placeholder-gray-600 font-mono"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-purple-400 text-[10px] sm:text-xs mb-1 block">var email =</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='"your@email.com"'
                    className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-xs sm:text-sm focus:outline-none transition-all placeholder-gray-600 font-mono"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-purple-400 text-[10px] sm:text-xs mb-1 block">var message =</label>
                  <textarea
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder='"Describe your project..."'
                    rows={4}
                    className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-xs sm:text-sm focus:outline-none transition-all placeholder-gray-600 font-mono resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="font-mono text-[10px] sm:text-xs text-green-400 bg-[#1E1E1E] p-2 border border-green-900">
                    <span className="text-blue-400">console</span>.<span className="text-yellow-300">log</span>(<span className="text-orange-300">&quot;Message sent successfully!&quot;</span>);
                  </div>
                )}
                {status === 'error' && (
                  <div className="font-mono text-[10px] sm:text-xs text-red-400 bg-[#1E1E1E] p-2 border border-red-900">
                    <span className="text-red-500">Error:</span> {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm hover:from-green-500 hover:to-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/20"
                  >
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span>
                      {status === 'loading' ? 'executing...' : 'execute_code()'}
                    </span>
                  </button>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 mt-2">
                    * Pressing button will trigger configured Firebase function
                  </div>
                </div>

              </form>
            </div>
          </div>
          
          {/* Terminal Footer Status Bar */}
          <div className="bg-[#007acc] px-3 py-1 text-[9px] sm:text-[10px] text-white flex justify-between items-center font-sans">
            <div className="flex gap-2 sm:gap-3">
              <span>main*</span>
              <span>0 errors</span>
              <span className="hidden sm:inline">0 warnings</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <span className="hidden sm:inline">Ln 12, Col 45</span>
              <span>UTF-8</span>
              <span className="hidden sm:inline">TypeScript React</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
