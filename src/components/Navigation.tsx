'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import CurvedMenuHeader from './ui/curved-menu';

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const primaryNav: NavItem[] = [
  {
    label: 'Explore',
    children: [
      { label: 'Our Story', href: '/our-story', description: 'Heritage & vision' },
      { label: 'Menu', href: '/menu', description: 'Food, drinks & Dilmah teas' },
      { label: 'Dilmah', href: '/dilmah', description: 'Ceylon tea reserve' },
      { label: 'Experience', href: '/experience', description: 'Tastings & lounge' },
      { label: 'Stories', href: '/stories', description: 'Editorial journal' },
    ],
  },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Gallery', href: '/gallery' },
];

const spring = { type: 'spring' as const, stiffness: 380, damping: 36, mass: 0.8 };

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setExpanded(true);
  };
  const handleMouseLeave = () => {
    collapseTimer.current = setTimeout(() => {
      setExpanded(false);
      setOpenMenu(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[45] flex justify-center pointer-events-none">
        <motion.div
          layout
          transition={spring}
          className="pointer-events-auto overflow-hidden border border-t-0 border-mahogany/20 bg-cream-paper shadow-[0_18px_42px_-22px_rgba(15,8,5,0.55)]"
          style={{ borderRadius: '0 0 44px 44px' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1, width: expanded ? 'min(92vw, 1320px)' : '260px' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!expanded ? (
              /* ── Compact: just the brand name ── */
              <motion.div
                key="compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.08, duration: 0.18 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="flex items-center justify-center px-8 py-3.5 md:py-4"
              >
                <Link href="/" aria-label="Ceylon Stories — Home" className="select-none">
                  <span className="font-display text-[20px] tracking-[-0.01em] text-mahogany whitespace-nowrap">
                    Ceylon Stories
                    <sup className="ml-0.5 font-editorial text-[8px] tracking-[0.16em] text-mahogany/55">™</sup>
                  </span>
                </Link>
              </motion.div>
            ) : (
              /* ── Expanded: full nav ── */
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                className="relative flex items-center justify-between gap-4 px-4 py-3.5 md:px-6 md:py-4"
              >
                {/* Left: nav links */}
                <div className="hidden min-w-0 flex-1 items-center gap-1 md:flex">
                  {primaryNav.map((item) => {
                    const hasChildren = !!item.children?.length;
                    const isOpen = openMenu === item.label;
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => {
                          cancelClose();
                          if (hasChildren) setOpenMenu(item.label);
                        }}
                        onMouseLeave={hasChildren ? scheduleClose : undefined}
                      >
                        {hasChildren ? (
                          <button
                            type="button"
                            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-editorial text-[12px] uppercase tracking-[0.18em] text-mahogany/80 transition-colors hover:text-mahogany"
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            onClick={() => setOpenMenu(isOpen ? null : item.label)}
                          >
                            {item.label}
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        ) : (
                          <Link
                            href={item.href!}
                            className="inline-flex items-center rounded-full px-3 py-2 font-editorial text-[12px] uppercase tracking-[0.18em] text-mahogany/80 transition-colors hover:text-mahogany"
                          >
                            {item.label}
                          </Link>
                        )}

                        <AnimatePresence>
                          {hasChildren && isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-0 top-full mt-3 w-[320px] rounded-2xl border border-mahogany/10 bg-cream-paper p-2 shadow-[0_22px_50px_-20px_rgba(42,24,16,0.45)]"
                              onMouseEnter={cancelClose}
                              onMouseLeave={scheduleClose}
                            >
                              {item.children!.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-cream-page"
                                >
                                  <span className="font-display text-[17px] leading-tight tracking-[-0.01em] text-mahogany group-hover:italic">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="font-editorial text-[10px] uppercase tracking-[0.18em] text-mahogany/50">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Center: brand */}
                <Link
                  href="/"
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 select-none"
                  aria-label="Ceylon Stories — Home"
                >
                  <Image
                    src="/logo-black.png"
                    alt=""
                    width={36}
                    height={36}
                    className="h-8 w-8 md:hidden"
                    priority
                  />
                  <span className="hidden font-display text-[22px] tracking-[-0.01em] text-mahogany md:inline whitespace-nowrap">
                    Ceylon Stories
                    <sup className="ml-0.5 font-editorial text-[9px] tracking-[0.16em] text-mahogany/55">™</sup>
                  </span>
                </Link>

                {/* Right: secondary link + CTA */}
                <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
                  <Link
                    href="/visit"
                    className="hidden font-editorial text-[12px] uppercase tracking-[0.18em] text-mahogany/85 underline decoration-mahogany/35 underline-offset-[6px] transition-colors hover:text-mahogany hover:decoration-gold-leaf md:inline-block whitespace-nowrap"
                  >
                    Visit Us
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full bg-ink-deep px-5 py-2.5 font-editorial text-[11px] uppercase tracking-[0.2em] text-cream-page transition-colors duration-300 hover:bg-mahogany whitespace-nowrap"
                  >
                    Book a Table
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full overlay menu */}
      <CurvedMenuHeader />
    </>
  );
}
