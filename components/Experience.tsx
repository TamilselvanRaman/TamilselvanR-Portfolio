'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Experience() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    '[SYSTEM] Initializing experience module...',
    '[OK] Loading freelance profile...',
    '',
    'const role = "Freelance Full Stack Developer";',
    'const company = "Self Employed";',
    'const duration = "APR 2025 - PRESENT";',
    '',
    '// Projects',
    'build("UNI_BRAINS") // Medical Consultation Platform',
    'build("RUDY") // E-commerce System',
    'build("VASANDHAM_HERBALS") // Product Platform',
    '',
    '// Stack',
    'frontend = ["React", "Tailwind", "GSAP"];',
    'backend = ["Node.js", "Express", "Spring Boot"];',
    'auth = "JWT Based Authentication";',
    '',
    '[✓] Build completed successfully.',
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, terminalLines[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLine]);

  return (
    <section id="curated" className="bg-[#f2f0e6] py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">

        {/* SECTION TITLE */}
        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 md:mb-12 uppercase tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          EXPERIENCE_LOG
        </motion.h2>

        {/* TERMINAL WINDOW */}
        <motion.div
          className="border-[3px] sm:border-[5px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[12px_12px_0px_#000] bg-black text-green-400 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* TERMINAL HEADER */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b-2 sm:border-b-4 border-black bg-gray-900 text-white font-mono text-[10px] sm:text-xs">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
            </div>
            <span className="truncate ml-2 max-w-[180px] sm:max-w-none">root@portfolio:~/experience</span>
          </div>

          {/* TERMINAL BODY — overflow-x-auto scoped here, not page */}
          <div className="h-[260px] sm:h-[340px] md:h-[400px] overflow-y-auto overflow-x-auto font-mono text-[10px] sm:text-sm p-3 sm:p-5 md:p-8 relative">
            {displayedLines.map((line, index) => (
              <div key={index} className="flex min-w-0">
                <span className="w-5 sm:w-8 text-gray-500 select-none flex-shrink-0 text-right mr-2 sm:mr-3 text-[9px] sm:text-xs">
                  {index + 1}
                </span>
                <span className="flex-1 min-w-0 whitespace-pre-wrap break-words">
                  {syntaxHighlight(line)}
                </span>
              </div>
            ))}

            {/* BLINKING CURSOR */}
            {currentLine >= terminalLines.length && (
              <div className="flex">
                <span className="w-5 sm:w-8 text-gray-500 select-none flex-shrink-0 text-right mr-2 sm:mr-3 text-[9px] sm:text-xs">
                  {displayedLines.length + 1}
                </span>
                <span className="flex-1">
                  <span className="animate-pulse">█</span>
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* EXPERIENCE CARDS */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { project: 'UNI_BRAINS', type: 'Medical Platform', tech: 'React, Node.js, MongoDB' },
            { project: 'RUDY', type: 'E-commerce System', tech: 'Next.js, MySQL, Stripe' },
            { project: 'VASANDHAM_HERBALS', type: 'Product Platform', tech: 'React, Firebase, GSAP' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="border-2 border-black bg-white p-3 sm:p-4 shadow-[4px_4px_0px_#000]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '6px 6px 0px #000' }}
            >
              <div className="font-mono text-[10px] text-gray-500 mb-1">// Project</div>
              <h3 className="font-black font-mono text-sm sm:text-base mb-1 break-words">{item.project}</h3>
              <div className="text-xs sm:text-sm text-gray-600 mb-2">{item.type}</div>
              <div className="text-[9px] sm:text-xs font-mono bg-black text-green-400 px-2 py-1 break-words">
                {item.tech}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function syntaxHighlight(line: string) {
  if (line.startsWith('//')) return <span className="text-gray-500">{line}</span>;
  if (line.includes('const')) return <><span className="text-blue-400">const</span>{line.replace('const', '')}</>;
  if (line.includes('build')) return <><span className="text-purple-400">build</span>{line.replace('build', '')}</>;
  if (line.includes('[✓]')) return <span className="text-green-300">{line}</span>;
  if (line.includes('[SYSTEM]') || line.includes('[OK]')) return <span className="text-yellow-300">{line}</span>;
  return line;
}
