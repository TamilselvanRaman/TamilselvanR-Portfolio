'use client';

import { getGitHubStats } from '@/lib/github';
import { motion } from 'framer-motion';
import { use } from 'react';

/* Code Stat Card */
function CodeStatCard({ 
  label, 
  value, 
  color, 
  bgColor, 
  borderColor 
}: { 
  label: string; 
  value: any; 
  color: string; 
  bgColor: string; 
  borderColor: string;
}) {
  return (
    <motion.div
      className={`${bgColor} border-l-2 ${borderColor} px-2 sm:px-3 py-1.5 sm:py-2`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-baseline gap-1 sm:gap-2">
        <span className={`${color} text-[10px] sm:text-sm font-mono`}>{label}:</span>
        <span className="text-white text-sm sm:text-lg font-mono font-bold">{value}</span>
        <span className="text-gray-500 text-xs">,</span>
      </div>
    </motion.div>
  );
}

export default function CodingStats({ 
  githubStatsPromise 
}: { 
  githubStatsPromise: ReturnType<typeof getGitHubStats> 
}) {
  const githubStats = use(githubStatsPromise);

  return (
    <section className="bg-[#F5F5DC] py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-y-4 border-black relative" style={{ overflowX: 'clip' }}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* SECTION TITLE */}
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold text-black">
              {'>'} github_stats.fetch()
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-gray-600 ml-4 sm:ml-6">
            {'// Real-time data from GitHub API'}
          </p>
        </motion.div>

        <div className="w-full">

          {/* VS CODE STYLE TERMINAL WINDOW */}
          <motion.div 
            className="bg-[#1E1E1E] border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Terminal Header */}
            <div className="bg-[#323233] border-b-2 border-black px-3 sm:px-4 py-2 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Window Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-red-700 flex-shrink-0"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 border border-yellow-700 flex-shrink-0"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 border border-green-700 flex-shrink-0"></div>
                </div>
                
                {/* Tab */}
                <div className="flex items-center gap-1.5 sm:gap-2 bg-[#1E1E1E] px-2 sm:px-3 py-1 border-2 border-black">
                  <span className="text-green-400 text-xs font-mono flex-shrink-0">●</span>
                  <span className="text-white text-xs sm:text-sm font-mono truncate">github_stats.tsx</span>
                </div>
              </div>
              
              {/* Total Contributions Badge */}
              {githubStats && githubStats.totalContributions > 0 && (
                <div className="bg-blue-600 px-2 sm:px-3 py-1 border-2 border-blue-800 flex-shrink-0">
                  <span className="text-[10px] sm:text-xs font-mono text-white whitespace-nowrap">
                    Total: <span className="font-bold text-yellow-300">{githubStats.totalContributions.toLocaleString()}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Terminal Content */}
            <div className="p-4 sm:p-5 md:p-6 font-mono text-xs sm:text-sm">
              {githubStats ? (
                <>
                  {/* Stats Object */}
                  <div className="mb-4 sm:mb-6 space-y-2">
                    <div className="text-gray-400">
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">userData</span>{' '}
                      <span className="text-white">=</span>{' '}
                      <span className="text-yellow-300">{'{'}</span>
                    </div>
                    
                    {/* Stats Grid — 2 cols mobile, 4 cols lg */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 ml-3 sm:ml-6">
                      <CodeStatCard 
                        label="repos"
                        value={githubStats.repos} 
                        color="text-pink-400"
                        bgColor="bg-pink-900/20"
                        borderColor="border-pink-500"
                      />
                      <CodeStatCard 
                        label="stars"
                        value={githubStats.stars} 
                        color="text-yellow-400"
                        bgColor="bg-yellow-900/20"
                        borderColor="border-yellow-500"
                      />
                      <CodeStatCard 
                        label="followers"
                        value={githubStats.followers} 
                        color="text-cyan-400"
                        bgColor="bg-cyan-900/20"
                        borderColor="border-cyan-500"
                      />
                      <CodeStatCard 
                        label="following"
                        value={githubStats.following} 
                        color="text-orange-400"
                        bgColor="bg-orange-900/20"
                        borderColor="border-orange-500"
                      />
                    </div>
                    
                    <div className="text-yellow-300">{'};'}</div>
                  </div>

                  {/* Contribution Graph */}
                  <div className="border-2 border-gray-700 bg-[#0D1117] p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold">$</span>
                        <span className="text-gray-300 font-mono text-[10px] sm:text-xs">
                          git log --graph --contributions
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px]">
                        {[
                          { color: 'bg-gray-600', label: 'None' },
                          { color: 'bg-green-300', label: 'Low' },
                          { color: 'bg-green-500', label: 'Med' },
                          { color: 'bg-green-700', label: 'High' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-1">
                            <div className={`w-2 h-2 ${item.color} flex-shrink-0`}></div>
                            <span className="text-gray-400">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {githubStats.contributionDays.length > 0 ? (
                      <div className="flex gap-0.5 overflow-x-auto pb-2 scrollbar-thin">
                        {Array.from({ length: Math.ceil(githubStats.contributionDays.length / 7) }).map((_, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-0.5 flex-shrink-0">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const dataIndex = weekIndex * 7 + dayIndex;
                              const day = githubStats.contributionDays[dataIndex];
                              
                              if (!day) {
                                return <div key={dayIndex} className="w-2 h-2 sm:w-2.5 sm:h-2.5" />;
                              }
                              
                              const count = day.contributionCount;
                              let bgColor = '#161b22';
                              
                              if (count === 0) bgColor = '#161b22';
                              else if (count >= 10) bgColor = '#15803d';
                              else if (count >= 5) bgColor = '#22c55e';
                              else if (count >= 2) bgColor = '#86efac';
                              else bgColor = '#4ade80';
                              
                              return (
                                <motion.div
                                  key={dayIndex}
                                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-gray-800 cursor-pointer relative group flex-shrink-0"
                                  style={{ backgroundColor: bgColor }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: Math.min(dataIndex * 0.001, 0.5) }}
                                  whileHover={{ scale: 2, zIndex: 10, borderColor: '#22c55e' }}
                                  title={`${day.date}: ${count} contributions`}
                                >
                                  {/* Tooltip */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-green-400 text-[9px] sm:text-[10px] px-2 py-1 whitespace-nowrap pointer-events-none z-20 border border-green-500">
                                    {count} commits on {new Date(day.date).toLocaleDateString()}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-gray-500">
                        <p className="font-mono text-xs sm:text-sm">// No contribution data available</p>
                      </div>
                    )}
                  </div>

                  {/* Command Prompt */}
                  <div className="mt-3 sm:mt-4 flex items-center gap-2">
                    <span className="text-green-400 font-bold">$</span>
                    <span className="text-gray-400 font-mono text-[10px] sm:text-xs">Data fetched successfully ✓</span>
                  </div>
                </>
              ) : (
                <div className="border-2 border-red-500 bg-red-900/20 p-4 sm:p-6 text-center">
                  <p className="text-red-400 font-mono text-sm sm:text-lg font-bold">
                    ERROR: GitHub API connection failed
                  </p>
                  <p className="text-red-300 font-mono text-[10px] sm:text-sm mt-2">
                    // Check GITHUB_USERNAME and GITHUB_TOKEN in .env.local
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
