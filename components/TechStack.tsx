'use client';

import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaFigma,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiSpringboot,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiJsonwebtokens,
  SiSupabase,
} from 'react-icons/si';

export default function TechStack() {
  const technologies = [
    { name: 'React', icon: <FaReact />, color: 'text-cyan-400', category: 'frontend' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-white', category: 'frontend' },
    { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-400', category: 'language' },
    { name: 'JavaScript', icon: <SiJavascript />, color: 'text-yellow-300', category: 'language' },
    { name: 'HTML5', icon: <SiHtml5 />, color: 'text-orange-500', category: 'frontend' },
    { name: 'CSS3', icon: <SiCss3 />, color: 'text-blue-500', category: 'frontend' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-400', category: 'frontend' },
    { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-500', category: 'backend' },
    { name: 'Express', icon: <SiExpress />, color: 'text-gray-400', category: 'backend' },
    { name: 'Spring Boot', icon: <SiSpringboot />, color: 'text-green-400', category: 'backend' },
    { name: 'Java', icon: <FaJava />, color: 'text-red-500', category: 'language' },
    { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500', category: 'database' },
    { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-400', category: 'database' },
    { name: 'Firebase', icon: <SiFirebase />, color: 'text-yellow-400', category: 'database' },
    { name: 'Supabase', icon: <SiSupabase />, color: 'text-green-400', category: 'database' },
    { name: 'Docker', icon: <FaDocker />, color: 'text-blue-500', category: 'devops' },
    { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-600', category: 'tools' },
    { name: 'GitHub', icon: <FaGithub />, color: 'text-white', category: 'tools' },
    { name: 'Figma', icon: <FaFigma />, color: 'text-purple-500', category: 'design' },
    { name: 'JWT', icon: <SiJsonwebtokens />, color: 'text-pink-500', category: 'tools' },
  ];

  const categories = [
    { name: 'Frontend', key: 'frontend', color: 'text-cyan-400' },
    { name: 'Backend', key: 'backend', color: 'text-green-400' },
    { name: 'Database', key: 'database', color: 'text-yellow-400' },
    { name: 'Languages', key: 'language', color: 'text-blue-400' },
    { name: 'DevOps', key: 'devops', color: 'text-purple-400' },
    { name: 'Tools & Design', key: 'tools', color: 'text-pink-400' },
  ];

  return (
    <section id="threads" className="bg-brutalist-beige py-24 px-6 border-y-4 border-brutalist-black relative overflow-hidden">
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
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-brutalist-black">
              {'>'} techStack.load()
            </h2>
          </div>
          <p className="text-sm font-mono text-gray-600 ml-6">// Technologies & Tools I work with</p>
        </motion.div>

        {/* TERMINAL WINDOW */}
        <motion.div 
          className="bg-[#1E1E1E] border-4 border-brutalist-black shadow-[8px_8px_0px_#000]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Terminal Header */}
          <div className="bg-[#323233] border-b-2 border-brutalist-black px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
            <span className="text-white text-sm font-mono ml-2">technologies.tsx</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8">
            
            {/* Import Statement */}
            <div className="font-mono text-sm mb-8">
              <span className="text-purple-400">import</span>{' '}
              <span className="text-yellow-300">{'{'}</span>{' '}
              <span className="text-blue-400">technologies</span>{' '}
              <span className="text-yellow-300">{'}'}</span>{' '}
              <span className="text-purple-400">from</span>{' '}
              <span className="text-green-300">"@/stack"</span>
              <span className="text-gray-500">;</span>
            </div>

            {/* Categories */}
            <div className="space-y-10">
              {categories.map((category, catIndex) => {
                const categoryTechs = technologies.filter(t => 
                  (category.key === 'tools' && (t.category === 'tools' || t.category === 'design')) || 
                  t.category === category.key
                );
                
                if (categoryTechs.length === 0) return null;

                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 }}
                  >
                    {/* Category Label */}
                    <div className="font-mono text-sm mb-4 flex items-center gap-2">
                      <span className="text-gray-500">//</span>
                      <span className={`${category.color} font-bold`}>{category.name}</span>
                    </div>

                    {/* Tech Array */}
                    <div className="font-mono text-sm mb-2">
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">{category.key}</span>{' '}
                      <span className="text-white">=</span>{' '}
                      <span className="text-yellow-300">[</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ml-6 mb-2">
                      {categoryTechs.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className="bg-[#0D1117] border-2 border-gray-700 hover:border-brutalist-yellow p-4 flex flex-col items-center justify-center gap-2 cursor-pointer group transition-all"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                          whileHover={{ y: -4, scale: 1.05 }}
                        >
                          <div className={`text-4xl ${tech.color} group-hover:scale-110 transition-transform`}>
                            {tech.icon}
                          </div>
                          <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors text-center">
                            {tech.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="font-mono text-sm text-yellow-300">
                      ];
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Export Statement */}
            <div className="font-mono text-sm mt-8 pt-8 border-t-2 border-gray-800">
              <span className="text-purple-400">export</span>{' '}
              <span className="text-purple-400">default</span>{' '}
              <span className="text-blue-400">TechStack</span>
              <span className="text-gray-500">;</span>
            </div>

          </div>
        </motion.div>

        {/* Terminal Command */}
        <div className="mt-6 flex items-center gap-2 font-mono text-sm text-gray-600">
          <span className="text-green-500">$</span>
          <span>echo "Stack loaded successfully"</span>
          <span className="animate-pulse">_</span>
        </div>

      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none font-mono text-xs text-brutalist-black overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i}>
            {'import { tech } from "./stack"; '.repeat(5)}
          </div>
        ))}
      </div>
    </section>
  );
}
