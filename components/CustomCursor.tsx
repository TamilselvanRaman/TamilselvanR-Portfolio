'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Ultra-smooth spring improvements - separate physics for main and trailing
  const mainConfig = { damping: 25, stiffness: 700, mass: 0.2 }; // Fast & snappy
  const trailConfig = { damping: 35, stiffness: 250, mass: 0.8 }; // Smooth & draggy

  const mainX = useSpring(cursorX, mainConfig);
  const mainY = useSpring(cursorY, mainConfig);
  
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Direct update for responsiveness, springs handle smoothing
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('hoverable') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor (Dot) */}
      <motion.div
        className="fixed pointer-events-none z-[10000] rounded-full bg-[#FFD700] mix-blend-difference"
        style={{
          left: mainX,
          top: mainY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

      {/* Trailing effect (Ring) */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border border-black dark:border-white mix-blend-difference"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 36,
          height: isHovering ? 60 : 36,
          borderWidth: isHovering ? 2 : 1,
          opacity: 1,
          backgroundColor: isHovering ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 215, 0, 0)',
          borderColor: isHovering ? '#FFD700' : '#ffffff',
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      />
    </>
  );
}
