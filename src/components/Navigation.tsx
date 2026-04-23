'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import CurvedMenuHeader from './ui/curved-menu';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[40] px-6 md:px-[6%] lg:px-12 flex justify-between items-center pointer-events-none"
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(235, 224, 202, 0.92)' : 'rgba(244, 236, 220, 0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          boxShadow: scrolled
            ? '0 1px 0 rgba(42, 24, 16, 0.06), 0 4px 20px rgba(42, 24, 16, 0.04)'
            : '0 0 0 rgba(0,0,0,0)',
          paddingTop: scrolled ? '1rem' : '1.75rem',
          paddingBottom: scrolled ? '1rem' : '1.75rem',
        }}
        style={{ WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)' }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30,
          mass: 0.8,
        }}
      >
        {/* Far left: Spacer for balance */}
        <div className="flex-1 flex justify-start" />

        {/* Centre: Logo Badge */}
        <div className="flex-1 flex justify-center pointer-events-auto">
          <Link href="/" aria-label="Ceylon Stories — Home" className="outline-none">
            <motion.div
              animate={{
                height: scrolled ? 48 : 64,
                width: scrolled ? 48 : 64,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 28,
              }}
              className="relative"
            >
              {/* Color logo for light/scrolled backgrounds */}
              <Image
                src="/logo-color.png"
                alt="Ceylon Stories Gallery Cafe"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Far right: Spacer for the Curved Menu Button */}
        <div className="flex-1 flex justify-end" />
      </motion.nav>

      {/* Mount the requested Curved Menu */}
      <CurvedMenuHeader />
    </>
  );
}
