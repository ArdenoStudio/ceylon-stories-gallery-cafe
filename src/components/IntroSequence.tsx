'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedCeylonStories');
    if (hasVisited) {
      setShow(false);
      onComplete();
    } else {
      sessionStorage.setItem('hasVisitedCeylonStories', 'true');
      const timer = setTimeout(() => {
        setShow(false);
        onComplete();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-cream-page flex items-center justify-center overflow-hidden"
      style={{ pointerEvents: 'none' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.8, duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Draw Line */}
        <motion.div
          className="absolute h-[1px] bg-mahogany top-1/2 left-0 right-0 origin-left"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            opacity: { delay: 0.6, duration: 0.1 }
          }}
          style={{ scaleX: 0 }}
        />
        
        {/* Split Line Left */}
        <motion.div
          className="absolute h-[1px] bg-mahogany top-1/2 left-0"
          initial={{ width: '50%', opacity: 0 }}
          animate={{ width: '0%', opacity: [0, 1, 1] }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Split Line Right */}
        <motion.div
          className="absolute h-[1px] bg-mahogany top-1/2 right-0"
          initial={{ width: '50%', opacity: 0 }}
          animate={{ width: '0%', opacity: [0, 1, 1] }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Logo Reveal */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 0.6, y: '-45vh' }}
          transition={{
            opacity: { delay: 0.6, duration: 0.4 },
            scale: { delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            y: { delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <Image
            src="/logo-color.png"
            alt="Ceylon Stories"
            width={320}
            height={160}
            className="w-64 md:w-80 h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
