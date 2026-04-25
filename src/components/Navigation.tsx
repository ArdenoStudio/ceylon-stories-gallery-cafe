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

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const exploreItem = primaryNav.find((i) => i.label === 'Explore')!;

  return (
    <>
      <motion.nav
        aria-label="Primary"
        className="fixed inset-x-0 top-0 z-[45] flex justify-center pointer-events-none"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative flex w-[92%] max-w-[1320px] items-center justify-between gap-4 rounded-b-[44px] border border-t-0 border-mahogany/20 bg-cream-paper px-4 py-3.5 shadow-[0_18px_42px_-22px_rgba(15,8,5,0.55)] pointer-events-auto md:px-6 md:py-4"
          onMouseLeave={scheduleClose}
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
                    else setOpenMenu(null);
                  }}
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
            <span className="hidden font-display text-[22px] tracking-[-0.01em] text-mahogany md:inline">
              Ceylon Stories
              <sup className="ml-0.5 font-editorial text-[9px] tracking-[0.16em] text-mahogany/55">™</sup>
            </span>
          </Link>

          {/* Right: secondary link + CTA */}
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
            <Link
              href="/visit"
              className="hidden font-editorial text-[12px] uppercase tracking-[0.18em] text-mahogany/85 underline decoration-mahogany/35 underline-offset-[6px] transition-colors hover:text-mahogany hover:decoration-gold-leaf md:inline-block"
            >
              Visit Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-ink-deep px-5 py-2.5 font-editorial text-[11px] uppercase tracking-[0.2em] text-cream-page transition-colors duration-300 hover:bg-mahogany"
            >
              Book a Table
            </Link>
          </div>

          {/* Mega menu — spans full width of the pill */}
          <AnimatePresence>
            {openMenu === 'Explore' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-mahogany/10 bg-cream-paper p-6 shadow-[0_22px_50px_-20px_rgba(42,24,16,0.45)]"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div className="grid grid-cols-[260px_1fr] gap-7">
                  {/* Links — numbered editorial list */}
                  <div>
                    <div className="mb-4 flex items-baseline gap-3">
                      <p className="font-editorial text-[10px] uppercase tracking-[0.28em] text-mahogany/45">
                        Explore
                      </p>
                      <span className="h-px flex-1 bg-mahogany/15" />
                    </div>
                    <div className="flex flex-col">
                      {exploreItem.children!.map((child, i) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="group flex items-baseline gap-4 border-b border-mahogany/10 py-3 last:border-b-0"
                        >
                          <span className="font-editorial text-[10px] tracking-[0.22em] text-mahogany/35 tabular-nums">
                            0{i + 1}
                          </span>
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="font-display text-[20px] leading-none tracking-[-0.01em] text-mahogany transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:italic">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="font-editorial text-[9px] uppercase tracking-[0.2em] text-mahogany/45">
                                {child.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Map — branded card with desaturated tile, custom overlay */}
                  <div className="relative overflow-hidden rounded-xl border border-mahogany/15">
                    <iframe
                      src="https://maps.google.com/maps?ll=6.892,79.853&q=9%2F6+A%2C+16th+Lane%2C+Marine+Drive%2C+Kolpetty%2C+Colombo%2C+Sri+Lanka+00300&z=17&output=embed"
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        minHeight: '340px',
                        filter:
                          'sepia(0.35) saturate(0.55) hue-rotate(-18deg) brightness(0.96) contrast(1.05)',
                      }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ceylon Stories location"
                    />

                    {/* Cover Google's bottom logo bar */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-cream-paper via-cream-paper/85 to-transparent" />

                    {/* Cover Google's streetview thumbnail (bottom-left) */}
                    <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-24 bg-gradient-to-tr from-cream-paper via-cream-paper/90 to-transparent" />

                    {/* Inner ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-mahogany/10" />

                    {/* Solid backdrop to fully mask Google's auto info window */}
                    <div className="pointer-events-none absolute left-2 top-2 h-[170px] w-[360px] rounded-xl bg-cream-paper" />

                    {/* Branded address card */}
                    <div className="absolute left-2 top-2 w-[360px] rounded-xl border border-mahogany/15 bg-cream-paper p-5 shadow-[0_10px_30px_-12px_rgba(42,24,16,0.4)]">
                      <p className="font-editorial text-[9px] uppercase tracking-[0.26em] text-mahogany/50">
                        Find Us
                      </p>
                      <p className="mt-2 font-display text-[15px] italic leading-snug text-mahogany">
                        9/6A, 16th Lane
                        <br />
                        Marine Drive · Kolpetty
                      </p>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=9%2F6+A%2C+16th+Lane%2C+Marine+Drive%2C+Kolpetty%2C+Colombo%2C+Sri+Lanka+00300"
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-3 inline-flex items-center gap-2 font-editorial text-[10px] uppercase tracking-[0.22em] text-mahogany transition-colors hover:text-clay-warm"
                      >
                        Get Directions
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Full overlay menu */}
      <CurvedMenuHeader />
    </>
  );
}
