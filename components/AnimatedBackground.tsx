'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* 1️⃣ Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(120deg, #f5f5dc 0%, #e0e0ff 100%)',
            'linear-gradient(120deg, #fff5d7 0%, #d7f0ff 100%)',
            'linear-gradient(120deg, #f5f5dc 0%, #e0e0ff 100%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 2️⃣ Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3️⃣ Floating SVG Wireframe Shapes */}
      <motion.svg
        className="absolute top-[20%] left-[15%]"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style={{ x: smoothX, y: smoothY, opacity: 0.15 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <polygon
          points="100,10 190,75 160,180 40,180 10,75"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-[15%] right-[10%]"
        width="160"
        height="160"
        viewBox="0 0 200 200"
        style={{ x: smoothX, y: smoothY, opacity: 0.12 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </motion.svg>

      {/* 4️⃣ Soft Glow Layer */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-yellow-400 blur-[200px]"
        style={{
          opacity: 0.08,
          x: smoothX,
          y: smoothY,
          top: '30%',
          left: '30%',
        }}
      />

      {/* 5️⃣ Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

    </div>
  );
}
