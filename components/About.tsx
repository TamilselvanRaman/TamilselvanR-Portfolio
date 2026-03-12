'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#f2f0e6] py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-x-hidden"
      style={{
        backgroundImage: 'radial-gradient(#00000020 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* OUTER FRAME */}
        <motion.div
          className="border-[4px] sm:border-[6px] border-black bg-white p-4 sm:p-7 md:p-10 shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6 md:gap-12 items-start">

            {/* LEFT IMAGE CARD */}
            <motion.div
              className="border-[3px] sm:border-[5px] border-black bg-[#f5f5f5] p-3 sm:p-4 w-full max-w-[200px] sm:max-w-[260px] mx-auto md:mx-0 flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 inline-block mb-2 sm:mb-3">
                PROFILE.CONFIG
              </div>

              {/* Profile Image */}
              <div className="border-[3px] sm:border-[4px] border-black aspect-square overflow-hidden bg-white">
                <img
                  src="/images/ProfileImage.jpeg"
                  alt="Tamil Selvan Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status Tags */}
              <div className="mt-2 sm:mt-3 space-y-1.5">
                <div className="bg-green-100 border border-green-500 px-2 py-1 text-[9px] sm:text-[10px] font-mono font-bold text-green-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  AVAILABLE FOR WORK
                </div>
                <div className="bg-yellow-100 border border-yellow-500 px-2 py-1 text-[9px] sm:text-[10px] font-mono text-yellow-800">
                  📍 Dharmapuri, India
                </div>
              </div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              className="min-w-0 w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* TITLE */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-8 tracking-tight font-sans">
                WHO_AM_I()
              </h2>

              {/* CODE BLOCK */}
              <div className="border-[2px] sm:border-[3px] border-black bg-[#fafafa] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-w-0 p-3 sm:p-6">
                <CodeRow label="name" value='"Tamil Selvan"' />
                <CodeRow label="role" value='"Full Stack Developer"' />
                <CodeRow label="philosophy" value='"Bring personality back to code"' highlight />

                <div className="my-3 sm:my-4 border-t-2 border-black" />

                <div className="mb-2 text-green-600 text-xs sm:text-sm">{'// Skills'}</div>

                <CodeArray
                  label="specialization"
                  items={[
                    'Full Stack Web Development',
                    'Clean Architecture',
                    'Scalable Systems',
                  ]}
                />

                <div className="my-3 sm:my-4 border-t-2 border-black" />

                <CodeRow label="location" value='"India"' />
                <CodeRow label="status" value='"Available"' status />
              </div>

              {/* QUICK LINKS */}
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                {[
                  { label: 'GitHub ↗', href: 'https://github.com/TamilselvanRaman', className: 'border-2 border-black bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-bold text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5' },
                  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/tamilselvan-raman-758a45291', className: 'border-2 border-black bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-bold text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5' },
                  { label: 'Contact Me ↗', href: '#contact', className: 'border-2 border-black bg-yellow-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-bold text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5' },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={link.className}
                    whileHover={{ y: -3, boxShadow: '5px 5px 0px #000' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CodeRow({ label, value, highlight, status }: {
  label: string; value: string; highlight?: boolean; status?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0 mb-2 min-w-0">
      <span className="text-blue-600 flex-shrink-0">const</span>
      <span className="text-purple-600 flex-shrink-0">{label}</span>
      <span className="flex-shrink-0">=</span>
      <span className={`break-all min-w-0 ${highlight ? 'bg-yellow-400 px-1 font-bold' : status ? 'bg-green-400 px-1 font-bold' : 'text-orange-600'}`}>
        {value}
      </span>
      <span className="flex-shrink-0">;</span>
    </div>
  );
}

function CodeArray({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-2 min-w-0">
      <div className="flex flex-wrap gap-x-2">
        <span className="text-blue-600">const</span>
        <span className="text-purple-600">{label}</span>
        <span>= [</span>
      </div>
      {items.map((item, index) => (
        <div key={index} className="pl-4 sm:pl-8 text-orange-600 break-all min-w-0">
          &quot;{item}&quot;,
        </div>
      ))}
      <div>];</div>
    </div>
  );
}
