'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHome, FaTerminal, FaBug } from 'react-icons/fa';

export default function NotFound() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Error: 404 - Page Not Found\n> The requested URL was not found on this server.\n> Initiating recovery protocol...';

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typing);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#252526] rounded-lg shadow-2xl overflow-hidden border border-[#333]">
        {/* Title Bar */}
        <div className="bg-[#333333] px-4 py-2 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-sm text-[#999] font-medium">404.tsx - Portfolio</div>
          <div className="w-16" />
        </div>

        {/* Editor Area */}
        <div className="flex">
          {/* Line Numbers */}
          <div className="bg-[#1e1e1e] text-[#555] p-4 text-right select-none border-r border-[#333] hidden sm:block">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="leading-6 text-sm">{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="p-4 flex-1 bg-[#1e1e1e] overflow-x-auto">
            <div className="text-sm leading-6">
              <div className="text-[#c586c0]">import</div> <span className="text-[#9cdcfe]">NotFound</span> <div className="text-[#c586c0]">from</div> <span className="text-[#ce9178]">'./routes'</span>;
              <br />
              <br />
              <div className="text-[#569cd6]">function</div> <span className="text-[#dcdcaa]">CatchError</span>() {'{'}
              <br />
              <div className="pl-4">
                <span className="text-[#c586c0]">const</span> <span className="text-[#4fc1ff]">error</span> = <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Error</span>(<span className="text-[#ce9178]">'404'</span>);
                <br />
                <span className="text-[#6a9955]">// Route not found exception</span>
                <br />
                <div className="text-[#dcdcaa]">throw</div> <span className="text-[#4fc1ff]">error</span>;
              </div>
              {'}'}
            </div>

            {/* Terminal Output */}
            <div className="mt-8 border-t border-[#333] pt-4">
              <div className="flex items-center gap-2 text-[#999] text-xs mb-2 uppercase tracking-wider">
                <FaTerminal size={12} /> Terminal Output
              </div>
              <div className="font-mono text-[#d4d4d4] whitespace-pre-wrap h-24">
                <span className="text-[#f44747]">{text}</span>
                {showCursor && <span className="text-[#f44747]">_</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 bg-[#007acc] hover:bg-[#0062a3] text-white px-4 py-2 rounded text-sm transition-colors"
              >
                <FaHome /> Return Home
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-2 bg-[#333] hover:bg-[#444] text-white px-4 py-2 rounded text-sm transition-colors border border-[#555]"
              >
                <FaBug /> Debug Route
              </Link>
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-[#007acc] text-white px-4 py-1 text-xs flex justify-between items-center">
          <div className="flex gap-4">
            <span>master*</span>
            <span>Errors: 1</span>
          </div>
          <div className="flex gap-4">
            <span>Ln 8, Col 1</span>
            <span>UTF-8</span>
            <span>TypeScript React</span>
            <span>Prettier</span>
          </div>
        </div>
      </div>
    </div>
  );
}
