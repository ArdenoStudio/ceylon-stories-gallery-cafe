'use client';

import { motion } from 'motion/react';

/**
 * Wraps page content in a slow crossfade + subtle upward drift.
 * Used inside app/template.tsx so every route navigation triggers
 * the "turning a page" feeling described in the brand proposal.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
