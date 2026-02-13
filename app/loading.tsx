'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [logs, setLogs] = useState<string[]>([]);
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
    let currentLog = 0;
    
    // Log interval
    const logInterval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // Progress bar interval
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increments to 100 in ~2-3 seconds usually
      });
    }, 50);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#58a6ff] font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-gray-500">system_boot.exe</span>
        </div>

        {/* Logs */}
        <div className="h-48 font-sm space-y-2 overflow-hidden">
          {logs.map((log, index) => (
            <div key={index} className="opacity-0 animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-forwards">
              <span className="text-gray-500 mr-2">{(index + 1).toString().padStart(2, '0')}</span>
              {log}
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400">
            <span>Compiling</span>
            <span>{progress}%</span>
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
