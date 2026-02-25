'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#f2f0e6] py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(#00000020 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* OUTER FRAME */}
        <motion.div
          className="border-[4px] sm:border-[6px] border-black bg-white p-5 sm:p-7 md:p-10 shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] gap-8 md:gap-12 items-start">

            {/* LEFT IMAGE CARD */}
            <motion.div
              className="border-[3px] sm:border-[5px] border-black bg-[#f5f5f5] p-3 sm:p-4 w-full max-w-[240px] sm:max-w-[280px] mx-auto md:mx-0"
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
              <div className="mt-3 space-y-1.5">
                <div className="bg-green-100 border border-green-500 px-2 py-1 text-[10px] font-mono font-bold text-green-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  AVAILABLE FOR WORK
                </div>
                <div className="bg-yellow-100 border border-yellow-500 px-2 py-1 text-[10px] font-mono text-yellow-800">
                  📍 Dharmapuri, India
                </div>
              </div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* TITLE */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 sm:mb-8 tracking-tight font-sans">
                WHO_AM_I()
              </h2>

              {/* CODE BLOCK STYLE PANEL */}
              <div className="border-[2px] sm:border-[3px] border-black p-4 sm:p-6 bg-[#fafafa] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">

                <CodeRow label="name" value='"Tamil Selvan"' />
                <CodeRow label="role" value='"Full Stack Developer"' />
                <CodeRow 
                  label="philosophy" 
                  value='"Bring personality back to code"' 
                  highlight 
                />

                <div className="my-3 sm:my-4 border-t-2 border-black"></div>

                <div className="mb-2 text-green-600 text-xs sm:text-sm">
                  {'// Skills'}
                </div>

                <CodeArray 
                  label="specialization" 
                  items={[
                    "Full Stack Web Development",
                    "Clean Architecture",
                    "Scalable Systems",
                  ]}
                />

                <div className="my-3 sm:my-4 border-t-2 border-black"></div>

                <CodeRow label="location" value='"India"' />
                <CodeRow label="status" value='"Available"' status />

              </div>

              {/* QUICK LINKS */}
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                <motion.a
                  href="https://github.com/TamilselvanRaman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-bold text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
                  whileHover={{ y: -3, boxShadow: "5px 5px 0px #000" }}
                  whileTap={{ scale: 0.95 }}
                >
                  GitHub ↗
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/tamilselvan-raman-758a45291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-bold text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
                  whileHover={{ y: -3, boxShadow: "5px 5px 0px #000" }}
                  whileTap={{ scale: 0.95 }}
                >
                  LinkedIn ↗
                </motion.a>
                <motion.a
                  href="#contact"
                  className="border-2 border-black bg-yellow-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 font-mono font-bold text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
                  whileHover={{ y: -3, boxShadow: "5px 5px 0px #000" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me ↗
                </motion.a>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

/* ROW COMPONENT */
function CodeRow({
  label,
  value,
  highlight,
  status,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  status?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0 mb-2 min-w-0">
      <span className="text-blue-600 flex-shrink-0">const</span>
      <span className="text-purple-600 flex-shrink-0">{label}</span>
      <span className="flex-shrink-0">=</span>
      <span
        className={`break-all ${
          highlight
            ? "bg-yellow-400 px-1 font-bold"
            : status
            ? "bg-green-400 px-1 font-bold"
            : "text-orange-600"
        }`}
      >
        {value}
      </span>
      <span className="flex-shrink-0">;</span>
    </div>
  );
}

/* ARRAY COMPONENT */
function CodeArray({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="mb-2">
      <div className="flex flex-wrap gap-x-2">
        <span className="text-blue-600">const</span>
        <span className="text-purple-600">{label}</span>
        <span>= [</span>
      </div>
      {items.map((item, index) => (
        <div key={index} className="pl-6 sm:pl-10 text-orange-600 break-all">
          &quot;{item}&quot;,
        </div>
      ))}
      <div>];</div>
    </div>
  );
}
