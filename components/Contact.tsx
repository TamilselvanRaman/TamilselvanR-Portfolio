'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaPaperPlane, FaTerminal } from 'react-icons/fa';

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
    setMatrixContent(Array(2000).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(''));
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
    <section id="contact" className="py-24 px-4 bg-[#f2f0e6] relative overflow-hidden">
      
      {/* Background Matrix Effect (Simplified) */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="text-[10px] font-mono leading-none break-all text-black">
          {matrixContent}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <FaTerminal className="text-3xl text-brutalist-black" />
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-brutalist-black">
              {'>'} contact.init()
            </h2>
          </div>
          <p className="text-sm font-mono text-gray-600 ml-10">
            // Let's build something amazing together
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div 
          className="bg-[#1E1E1E] border-4 border-black shadow-[12px_12px_0px_#000] rounded-sm overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Terminal Header */}
          <div className="bg-[#2D2D2D] p-3 flex items-center justify-between border-b-2 border-black">
            <div className="flex gap-2 ml-2">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700" />
              <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700" />
            </div>
            <div className="text-gray-400 font-mono text-xs flex items-center gap-2">
              <span className="text-green-500">➜</span>
              <span>contact_form.tsx</span>
            </div>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>

          <div className="p-6 md:p-10 grid lg:grid-cols-2 gap-12 font-mono">
            {/* Left Column: Contact Info & Status */}
            <div className="text-sm">
              <div className="text-gray-500 italic mb-6">{'/* Contact Information */'}</div>
              
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-purple-400">const</span> 
                    <span className="text-blue-400">email</span> 
                    <span className="text-white">=</span> 
                  </div>
                  <div className="pl-4 text-orange-300 break-all hover:text-orange-200 transition-colors cursor-text">
                    "ceittamilselvanr26@gmail.com";
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-purple-400">const</span> 
                    <span className="text-blue-400">location</span> 
                    <span className="text-white">=</span> 
                  </div>
                  <div className="pl-4 text-green-400">
                    "Remote / Earth";
                  </div>
                </div>

                <div className="group">
                   <div className="flex items-center gap-2 mb-1">
                    <span className="text-purple-400">let</span> 
                    <span className="text-blue-400">availability</span> 
                    <span className="text-white">=</span> 
                  </div>
                   <div className="pl-4">
                    <span className="text-yellow-400">true</span>
                    <span className="text-white">;</span>
                     <span className="text-gray-500 ml-2">{'// Open for new projects'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-4 bg-[#252526] border border-gray-700 rounded text-xs leading-relaxed text-gray-400">
                <span className="text-blue-400">function</span> <span className="text-yellow-300">sendMessage</span>() {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-orange-300">&quot;I&apos;ll get back to you ASAP!&quot;</span>;
                <br />
                {'}'}
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="relative">
               {/* Vertical Line Number Gutter */}
               <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-gray-800 text-right pr-2 text-gray-600 text-xs hidden md:block select-none font-mono leading-7 pt-1">
                 {Array.from({length: 12}).map((_, i) => <div key={i}>{i + 1}</div>)}
               </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:pl-10">
                <div className="text-gray-500 italic mb-2">{'// Fill out the form below'}</div>

                {/* Name Field */}
                <div className="group">
                   <label className="text-purple-400 text-xs mb-1 block">var name =</label>
                   <input
                     type="text"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     placeholder='"Your Name"'
                     className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-sm focus:outline-none transition-all placeholder-gray-600 font-mono"
                     required
                   />
                </div>

                {/* Email Field */}
                <div className="group">
                   <label className="text-purple-400 text-xs mb-1 block">var email =</label>
                   <input
                     type="email"
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     placeholder='"your@email.com"'
                     className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-sm focus:outline-none transition-all placeholder-gray-600 font-mono"
                     required
                   />
                </div>

                {/* Message Field */}
                <div className="group">
                   <label className="text-purple-400 text-xs mb-1 block">var message =</label>
                   <textarea
                     value={formData.projectDetails}
                     onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                     placeholder='"Describe your project..."'
                     rows={4}
                     className="w-full bg-[#252526] border-l-2 border-transparent focus:border-yellow-400 text-white px-3 py-2 text-sm focus:outline-none transition-all placeholder-gray-600 font-mono resize-none leading-relaxed"
                     required
                   />
                </div>

                {/* Status Messages as Console Output */}
                {status === 'success' && (
                  <div className="font-mono text-xs text-green-400 mt-2 bg-[#1E1E1E] p-2 border border-green-900">
                    <span className="text-blue-400">console</span>.<span className="text-yellow-300">log</span>(<span className="text-orange-300">"Message sent successfully!"</span>);
                  </div>
                )}
                {status === 'error' && (
                  <div className="font-mono text-xs text-red-400 mt-2 bg-[#1E1E1E] p-2 border border-red-900">
                     <span className="text-red-500">Error:</span> {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-black font-bold px-6 py-3 text-sm hover:from-green-500 hover:to-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/20"
                    >
                        <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                        <span>
                            {status === 'loading' ? 'executing...' : 'execute_code()'}
                        </span>
                    </button>
                    <div className="text-[10px] text-gray-500 mt-2">
                        * Pressing button will trigger configured Firebase function
                    </div>
                </div>

              </form>
            </div>
          </div>
          
          {/* Terminal Footer status bar */}
          <div className="bg-[#007acc] px-3 py-1 text-[10px] text-white flex justify-between items-center font-sans">
             <div className="flex gap-3">
                <span>main*</span>
                <span>0 errors</span>
                <span>0 warnings</span>
             </div>
             <div className="flex gap-3">
                <span>Ln 12, Col 45</span>
                <span>UTF-8</span>
                <span>TypeScript React</span>
             </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
