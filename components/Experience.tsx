'use client';

import { useEffect, useState } from 'react';

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
    <section id="curated" className="bg-[#f2f0e6] py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* SECTION TITLE */}
        <h2 className="text-5xl font-extrabold mb-12 uppercase tracking-tight">
          EXPERIENCE_LOG
        </h2>

        {/* TERMINAL WINDOW */}
        <div className="border-[5px] border-black shadow-[12px_12px_0px_#000] bg-black text-green-400">

          {/* TERMINAL HEADER */}
          <div className="flex items-center justify-between px-6 py-3 border-b-4 border-black bg-gray-900 text-white font-mono text-xs">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span>root@portfolio:~/experience</span>
          </div>

          {/* TERMINAL BODY */}
          <div className="h-[400px] overflow-y-auto overflow-x-auto font-mono text-sm p-4 md:p-8 relative">

            {displayedLines.map((line, index) => (
              <div key={index} className="flex">

                {/* LINE NUMBERS */}
                <span className="w-8 text-gray-500 select-none">
                  {index + 1}
                </span>

                {/* CONTENT */}
                <span className="flex-1 whitespace-pre-wrap">
                  {syntaxHighlight(line)}
                </span>

              </div>
            ))}

            {/* BLINKING CURSOR */}
            {currentLine >= terminalLines.length && (
              <div className="flex">
                <span className="w-8 text-gray-500 select-none">
                  {displayedLines.length + 1}
                </span>
                <span className="flex-1">
                  <span className="animate-pulse">█</span>
                </span>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

/* SYNTAX HIGHLIGHT FUNCTION */
function syntaxHighlight(line: string) {
  if (line.startsWith('//')) {
    return <span className="text-gray-500">{line}</span>;
  }

  if (line.includes('const')) {
    return (
      <>
        <span className="text-blue-400">const</span>
        {line.replace('const', '')}
      </>
    );
  }

  if (line.includes('build')) {
    return (
      <>
        <span className="text-purple-400">build</span>
        {line.replace('build', '')}
      </>
    );
  }

  if (line.includes('[✓]')) {
    return <span className="text-green-300">{line}</span>;
  }

  if (line.includes('[SYSTEM]') || line.includes('[OK]')) {
    return <span className="text-yellow-300">{line}</span>;
  }

  return line;
}


// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export default function Experience() {
//   const [booting, setBooting] = useState(true);
//   const [darkMode, setDarkMode] = useState(true);
//   const [displayedText, setDisplayedText] = useState('');
//   const containerRef = useRef<HTMLDivElement>(null);

//   const terminalScript = `
// [SYSTEM] Booting Experience Module...
// [SYSTEM] Verifying developer credentials...
// [OK] Identity: Tamil Selvan
// [OK] Role: Freelance Full Stack Developer
// [OK] Duration: APR 2025 - PRESENT

// // Projects
// build("UNI_BRAINS") // Medical Consultation Platform
// build("RUDY") // E-commerce System
// build("VASANDHAM_HERBALS") // Product Platform

// // Stack
// frontend = ["React", "Tailwind", "GSAP"];
// backend = ["Node.js", "Express", "Spring Boot"];
// auth = "JWT Authentication";

// [✓] All systems operational.
// `;

//   /* Boot animation */
//   useEffect(() => {
//     const bootTimer = setTimeout(() => {
//       setBooting(false);
//     }, 2000);

//     return () => clearTimeout(bootTimer);
//   }, []);

//   /* Letter-by-letter typing */
//   useEffect(() => {
//     if (!booting) {
//       let i = 0;
//       const typing = setInterval(() => {
//         setDisplayedText(terminalScript.slice(0, i));
//         i++;

//         // Auto scroll
//         if (containerRef.current) {
//           containerRef.current.scrollTop =
//             containerRef.current.scrollHeight;
//         }

//         if (i > terminalScript.length) clearInterval(typing);
//       }, 20);

//       return () => clearInterval(typing);
//     }
//   }, [booting]);

//   return (
//     <section
//       className={`relative py-28 px-6 ${
//         darkMode ? 'bg-black text-green-400' : 'bg-[#f2f0e6] text-black'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto relative">

//         {/* DARK MODE TOGGLE */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="border-2 border-black px-4 py-2 font-bold bg-yellow-400 text-black shadow-[5px_5px_0px_#000]"
//           >
//             {darkMode ? 'LIGHT MODE' : 'DARK MODE'}
//           </button>
//         </div>

//         {/* GLITCH TITLE */}
//         <h2 className="text-5xl font-extrabold mb-12 uppercase relative glitch">
//           EXPERIENCE_LOG
//         </h2>

//         {/* TERMINAL WINDOW */}
//         <div className="border-[5px] border-black shadow-[12px_12px_0px_#000] overflow-hidden relative">

//           {/* HEADER */}
//           <div className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white font-mono text-xs border-b-4 border-black">
//             <div className="flex gap-2">
//               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             </div>
//             root@portfolio:~/experience
//           </div>

//           {/* BODY */}
//           <div
//             ref={containerRef}
//             className="h-[450px] overflow-y-auto font-mono text-sm p-8 relative"
//           >
//             {booting ? (
//               <p className="animate-pulse">Booting terminal...</p>
//             ) : (
//               <>
//                 <pre className="whitespace-pre-wrap">
//                   {displayedText}
//                 </pre>
//                 <span className="animate-pulse">█</span>
//               </>
//             )}
//           </div>

//           {/* CRT SCANLINE OVERLAY */}
//           <div className="absolute inset-0 pointer-events-none crt-overlay"></div>
//         </div>
//       </div>

//       {/* CRT GLOBAL EFFECT */}
//       <div className="absolute inset-0 pointer-events-none scanlines"></div>
//     </section>
//   );
// }
