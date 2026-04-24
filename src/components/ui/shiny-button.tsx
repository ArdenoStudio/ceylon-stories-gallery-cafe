'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/src/lib/utils';

type ShinyButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  collapsed?: boolean;
};

export default function ShinyButton({
  children,
  className,
  icon,
  collapsed = false,
  type = 'button',
  ...props
}: ShinyButtonProps) {
  return (
    <motion.button
      layout
      type={type}
      initial={{ ['--x' as string]: '100%', scale: 0.98 }}
      animate={{ ['--x' as string]: '-100%', scale: 1 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1.1,
        type: 'spring',
        stiffness: 22,
        damping: 16,
        mass: 2,
        scale: {
          type: 'spring',
          stiffness: 280,
          damping: 18,
          mass: 0.6,
        },
        layout: {
          type: 'spring',
          stiffness: 260,
          damping: 28,
        },
      }}
      {...props}
      className={cn(
        'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[2px] border border-[#6e4d37] bg-[#2a1810] px-5 py-3 font-editorial text-[10px] tracking-[0.34em] uppercase text-cream-page shadow-[0_16px_36px_rgba(42,24,16,0.16)] transition-shadow duration-300 ease-out hover:shadow-[0_18px_46px_rgba(42,24,16,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-page active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
        !collapsed && 'min-w-[170px]',
        className
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'linear-gradient(-75deg, rgba(184,146,74,0) calc(var(--x) + 18%), rgba(184,146,74,0.34) calc(var(--x) + 25%), rgba(184,146,74,0.08) calc(var(--x) + 46%), rgba(184,146,74,0) calc(var(--x) + 64%))',
        }}
      />
      <span className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(184,146,74,0.16)_0%,rgba(184,146,74,0)_62%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/8" />

      <span className="relative z-10 flex items-center gap-3">
        {icon ? (
          <motion.span layout className="flex size-5 shrink-0 items-center justify-center rounded-full border border-gold-leaf/35 bg-gold-leaf/8 text-gold-leaf">
            {icon}
          </motion.span>
        ) : null}

        <AnimatePresence>
          {!collapsed && (
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative block overflow-hidden whitespace-nowrap text-cream-page"
              style={{
                maskImage:
                  'linear-gradient(-75deg, rgba(0,0,0,1) calc(var(--x) + 18%), rgba(0,0,0,0.28) calc(var(--x) + 28%), rgba(0,0,0,1) calc(var(--x) + 92%))',
                WebkitMaskImage:
                  'linear-gradient(-75deg, rgba(0,0,0,1) calc(var(--x) + 18%), rgba(0,0,0,0.28) calc(var(--x) + 28%), rgba(0,0,0,1) calc(var(--x) + 92%))',
              }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
