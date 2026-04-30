'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import CurvedMenuHeader from './ui/curved-menu';
import { useReservation } from './ReservationProvider';

const leftLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Menu', href: '/menu' },
  { label: 'Dilmah', href: '/dilmah' },
  { label: 'Experience', href: '/experience' },
];

const rightLinks = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shisha', href: '/shisha' },
  { label: 'Visit Us', href: '/visit' },
];

const linkClass =
  'relative inline-flex items-center rounded-full px-3 py-2 font-editorial text-[11px] uppercase tracking-[0.18em] transition-colors xl:px-4 xl:text-[12px] hover:text-mahogany z-10';

const WHATSAPP_URL =
  'https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation.';

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${linkClass} ${active ? 'text-mahogany font-medium' : 'text-mahogany/60'}`}
    >
      <span className="relative z-20 mix-blend-multiply">{label}</span>
      {active && (
        <motion.span
          layoutId="desktop-nav-active"
          className="absolute inset-0 rounded-full bg-mahogany/[0.06] border border-mahogany/[0.04] pointer-events-none z-10 shadow-[inset_0_2px_4px_rgba(42,24,16,0.02)]"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

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
              <NavLink key={item.href} href={item.href} label={item.label} />
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
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <div className="ml-2 flex items-center gap-2 xl:ml-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reserve via WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage-deep/25 bg-sage-deep text-cream-page shadow-[0_10px_24px_rgba(47,62,42,0.18)] transition-colors hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream-paper"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <button
                type="button"
                onClick={openReservation}
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-mahogany px-5 py-2 font-editorial text-[11px] uppercase tracking-[0.2em] text-cream-page shadow-[0_12px_26px_rgba(42,24,16,0.22)] transition-colors hover:bg-clay-rust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream-paper"
              >
                Book a Table
              </button>
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
