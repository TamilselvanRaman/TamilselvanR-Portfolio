'use client';

import { getGitHubStats } from '@/lib/github';
import { motion } from 'framer-motion';
import { use } from 'react';

/* 💻 Code Stat Card Component - Terminal Style */
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
      className={`${bgColor} border-l-2 ${borderColor} px-3 py-2`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-baseline gap-2">
        <span className={`${color} text-sm font-mono`}>{label}:</span>
        <span className="text-white text-lg font-mono font-bold">{value}</span>
        <span className="text-gray-500">,</span>
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
    <section className="bg-brutalist-beige py-24 px-6 border-y-4 border-brutalist-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* CODING PLATFORM TITLE */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-brutalist-black">
              {'>'} github_stats.fetch()
            </h2>
          </div>
          <p className="text-sm font-mono text-gray-600 ml-6">// Real-time data from GitHub API</p>
        </motion.div>

        <div className="w-full">

          {/* VS CODE STYLE TERMINAL WINDOW */}
          <motion.div 
            className="bg-[#1E1E1E] border-4 border-brutalist-black shadow-[8px_8px_0px_#000] w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Terminal Header - VS Code Style */}
            <div className="bg-[#323233] border-b-2 border-brutalist-black px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Window Controls */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
                </div>
                
                {/* Tab */}
                <div className="flex items-center gap-2 bg-[#1E1E1E] px-3 py-1 border-2 border-brutalist-black">
                  <span className="text-green-400 text-xs font-mono">●</span>
                  <span className="text-white text-sm font-mono">github_stats.tsx</span>
                </div>
              </div>
              
              {/* Total Contributions Badge */}
              {githubStats && githubStats.totalContributions > 0 && (
                <div className="bg-blue-600 px-3 py-1 border-2 border-blue-800">
                  <span className="text-xs font-mono text-white">
                    Total: <span className="font-bold text-yellow-300">{githubStats.totalContributions.toLocaleString()}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              {githubStats ? (
                <>
                  {/* Console Output Style Stats */}
                  <div className="mb-6 space-y-2">
                    <div className="text-gray-400">
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">userData</span>{' '}
                      <span className="text-white">=</span>{' '}
                      <span className="text-yellow-300">{'{'}</span>
                    </div>
                    
                    {/* Stats as Code Object */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ml-6">
                      <CodeStatCard 
                        key="repos" 
                        label="repos"
                        value={githubStats.repos} 
                        color="text-pink-400"
                        bgColor="bg-pink-900/20"
                        borderColor="border-pink-500"
                      />
                      <CodeStatCard 
                        key="stars" 
                        label="stars"
                        value={githubStats.stars} 
                        color="text-yellow-400"
                        bgColor="bg-yellow-900/20"
                        borderColor="border-yellow-500"
                      />
                      <CodeStatCard 
                        key="followers" 
                        label="followers"
                        value={githubStats.followers} 
                        color="text-cyan-400"
                        bgColor="bg-cyan-900/20"
                        borderColor="border-cyan-500"
                      />
                      <CodeStatCard 
                        key="following" 
                        label="following"
                        value={githubStats.following} 
                        color="text-orange-400"
                        bgColor="bg-orange-900/20"
                        borderColor="border-orange-500"
                      />
                    </div>
                    
                    <div className="text-yellow-300">{'};'}</div>
                  </div>

                  {/* Contribution Graph - Terminal Style */}
                  <div className="border-2 border-gray-700 bg-[#0D1117] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold">$</span>
                        <span className="text-gray-300 font-mono text-xs">git log --graph --contributions</span>
                      </div>
                      <div className="flex items-center gap-3 text-[9px]">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-600"></div>
                          <span className="text-gray-400">None</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-300"></div>
                          <span className="text-gray-400">Low</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500"></div>
                          <span className="text-gray-400">Med</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-700"></div>
                          <span className="text-gray-400">High</span>
                        </div>
                      </div>
                    </div>
                    
                    {githubStats.contributionDays.length > 0 ? (
                      <div className="flex gap-0.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
                        {Array.from({ length: Math.ceil(githubStats.contributionDays.length / 7) }).map((_, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-0.5 flex-shrink-0">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const dataIndex = weekIndex * 7 + dayIndex;
                              const day = githubStats.contributionDays[dataIndex];
                              
                              if (!day) {
                                return <div key={dayIndex} className="w-2.5 h-2.5" />;
                              }
                              
                              const count = day.contributionCount;
                              let bgColor = '#161b22';
                              
                              if (count === 0) {
                                bgColor = '#161b22';
                              } else if (count >= 10) {
                                bgColor = '#15803d';
                              } else if (count >= 5) {
                                bgColor = '#22c55e';
                              } else if (count >= 2) {
                                bgColor = '#86efac';
                              } else {
                                bgColor = '#4ade80';
                              }
                              
                              return (
                                <motion.div
                                  key={dayIndex}
                                  className="w-2.5 h-2.5 border border-gray-800 cursor-pointer relative group"
                                  style={{ backgroundColor: bgColor }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: Math.min(dataIndex * 0.001, 0.5) }}
                                  whileHover={{ scale: 2, zIndex: 10, borderColor: '#22c55e' }}
                                  title={`${day.date}: ${count} contributions`}
                                >
                                  {/* Tooltip */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-green-400 text-[10px] px-2 py-1 whitespace-nowrap pointer-events-none z-20 border border-green-500">
                                    {count} commits on {new Date(day.date).toLocaleDateString()}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p className="font-mono text-sm">// No contribution data available</p>
                      </div>
                    )}
                  </div>

                  {/* Command Prompt */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-green-400 font-bold">$</span>
                    <span className="text-gray-400 font-mono text-xs">Data fetched successfully ✓</span>
                  </div>
                </>
              ) : (
                <div className="border-2 border-red-500 bg-red-900/20 p-6 text-center">
                  <p className="text-red-400 font-mono text-lg font-bold">
                    ERROR: GitHub API connection failed
                  </p>
                  <p className="text-red-300 font-mono text-sm mt-2">
                    // Check GITHUB_USERNAME and GITHUB_TOKEN in .env.local
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background Console Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none font-mono text-xs text-brutalist-black overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            {'> '.repeat(100)}
          </div>
        ))}
      </div>
    </section>
  );
}

