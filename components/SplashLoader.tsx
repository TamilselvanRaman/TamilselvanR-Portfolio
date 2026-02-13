'use client';

import { useEffect, useState, useRef } from 'react';

export default function SplashLoader() {
  const [loading, setLoading] = useState(true);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    '> initializing system...',
    '> loading core modules...',
    '> npm run build:production',
    '> optimizing assets...',
    '> verifying integrity...',
    '> starting interface...',
    '> access granted.'
  ];

  useEffect(() => {
    // Check if we already showed the splash screen in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    
    // Optional: Uncomment to run only once per session
    // if (hasLoaded) {
    //   setLoading(false);
    //   return;
    // }

    let lineIndex = 0;
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (lineIndex >= bootSequence.length) {
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('hasLoaded', 'true');
        }, 800); // Short delay after finishing
        return;
      }

      const currentLineText = bootSequence[lineIndex];

      if (charIndex < currentLineText.length) {
        setCurrentLine(prev => prev + currentLineText[charIndex]);
        charIndex++;
        // Randomize typing speed slightly for realism looks cool
        setTimeout(typeNextChar, Math.random() * 20 + 5);
      } else {
        // Line finished
        setDisplayedLines(prev => [...prev, currentLineText]);
        setCurrentLine('');
        charIndex = 0;
        lineIndex++;
        setTimeout(typeNextChar, 100); // Pause between lines
      }
    };

    // Start typing
    const typingTimeout = setTimeout(typeNextChar, 500);

    // Progress bar (just decorative mostly now, synced roughly to expected time)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // Runs for about 4s

    return () => {
      clearTimeout(typingTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0d1117] text-[#58a6ff] font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-gray-500">system_boot.exe</span>
        </div>

        <div className="h-64 text-sm space-y-1 font-mono">
          {displayedLines.map((line, index) => (
            <div key={index} className="text-gray-300">
              <span className="text-gray-500 mr-2">{(index + 1).toString().padStart(2, '0')}</span>
              {line}
            </div>
          ))}
          <div className="text-gray-300">
            <span className="text-gray-500 mr-2">{(displayedLines.length + 1).toString().padStart(2, '0')}</span>
            {currentLine}<span className="animate-pulse">_</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400">
            <span>Compiling</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-2 bg-[#21262d] rounded-full overflow-hidden border border-[#30363d]">
            <div 
              className="h-full bg-[#238636] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
