'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import CurvedMenuHeader from './ui/curved-menu';
import ShinyButton from './ui/shiny-button';
import { useReservation } from './ReservationProvider';

const leftLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Menu', href: '/menu' },
  { label: 'Dilmah', href: '/dilmah' },
  { label: 'Experience', href: '/experience' },
];

const rightLinks = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shisha', href: '/lounge' },
  { label: 'Visit Us', href: '/visit' },
];

const linkClass =
  'inline-flex items-center rounded-full px-2.5 py-2 font-editorial text-[11px] uppercase tracking-[0.18em] text-mahogany/80 transition-colors hover:text-mahogany xl:px-3 xl:text-[12px]';

export default function Navigation() {
  const { openReservation } = useReservation();

  return (
    <>
      {/* Desktop nav — pill bar with all destinations */}
      <motion.nav
        aria-label="Primary"
        className="fixed inset-x-0 top-0 z-[45] hidden justify-center pointer-events-none lg:flex"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex w-[94%] max-w-[1360px] items-center justify-between gap-3 rounded-b-[44px] border border-t-0 border-mahogany/20 bg-cream-paper px-5 py-3.5 shadow-[0_18px_42px_-22px_rgba(15,8,5,0.55)] pointer-events-auto xl:px-6 xl:py-4">
          {/* Left: nav links */}
          <div className="flex min-w-0 flex-1 items-center gap-0.5">
            {leftLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center: brand */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 select-none"
            aria-label="Ceylon Stories — Home"
          >
            <span className="font-display text-[20px] tracking-[-0.01em] text-mahogany xl:text-[22px]">
              Ceylon Stories
              <sup className="ml-0.5 font-editorial text-[9px] tracking-[0.16em] text-mahogany/55">
                ™
              </sup>
            </span>
          </Link>

          {/* Right: nav links + CTA */}
          <div className="flex flex-1 items-center justify-end gap-0.5">
            {rightLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
            <div className="ml-2 xl:ml-3">
              <ShinyButton onClick={openReservation} className="!px-4 !py-2 !text-[11px] !rounded-full !font-editorial !tracking-[0.2em] !uppercase">
                Book a Table
              </ShinyButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile / tablet logo — hamburger lives in CurvedMenuHeader */}
      <div className="fixed left-6 top-6 z-[44] pointer-events-auto md:left-12 md:top-8 lg:hidden">
        <Link href="/" aria-label="Ceylon Stories — Home" className="select-none outline-none">
          <Image
            src="/logo-black.png"
            alt="Ceylon Stories"
            width={48}
            height={48}
            className="h-10 w-10 md:h-12 md:w-12"
            priority
          />
        </Link>
      </div>

      {/* Slide-out menu (mobile/tablet only — hamburger hidden on lg+) */}
      <CurvedMenuHeader />
    </>
  );
}
