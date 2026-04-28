'use client';

import { useReservation } from './ReservationProvider';
import ShinyButton from './ui/shiny-button';
import { FlickeringGrid } from './ui/flickering-grid';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { openReservation } = useReservation();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <footer id="contact" className="w-full bg-cream-page text-mahogany px-5 py-5 md:px-8 md:py-8">
      {/* Outer frame — sharp corners */}
      <div className="border border-mahogany/30 p-[6px]">
        {/* Inner frame — rounded corners */}
        <div className="border border-mahogany/30 rounded-[10px] p-8 md:p-12 lg:p-14 flex flex-col min-h-[340px]">
          <div className="flex flex-col md:flex-row gap-12 md:gap-0 flex-1">

          {/* LEFT — monogram + social pinned to bottom */}
          <div className="md:w-[38%] flex flex-col justify-between">
            <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px]">
              <img src="/logo-black.png" alt="Ceylon Stories" className="w-full h-full object-contain" />
            </div>

            <a href="#" aria-label="Instagram" className="text-mahogany/50 hover:text-mahogany transition-colors w-max mt-8 md:mt-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          {/* RIGHT — two info columns */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-0 md:w-[62%]">
            <div className="flex-1">
              <h3 className="font-display text-[1.1rem] font-normal text-mahogany mb-5 leading-none">Explore</h3>
              <nav className="flex flex-col gap-[0.65rem]">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Menu', href: '/menu' },
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'Dilmah', href: '/dilmah' },
                  { label: 'About', href: '/our-story' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="font-editorial text-[8px] tracking-[0.22em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max">
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex-1">
              <h3 className="font-display text-[1.1rem] font-normal text-mahogany mb-5 leading-none">Contact</h3>
              <div className="flex flex-col gap-[0.65rem]">
                <p className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 leading-[1.9]">
                  9/6A, 16th Lane, Marine Drive<br />
                  Kolpetty, Colombo 03, LK
                </p>
                <a href="tel:+94770000000" className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max">
                  +94 (77) 000 0000
                </a>
                <a href="mailto:hello@ceylonstories.lk" className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max">
                  hello@ceylonstories.lk
                </a>
                <div className="pt-3">
                  <ShinyButton
                    onClick={openReservation}
                    className="min-w-[158px] px-4 py-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
                  >
                    Reserve
                  </ShinyButton>
                </div>
              </div>
            </div>
          </div>
          </div>

          <a
            href="https://ardeno-studio-website.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="An Ardeno Studio Production"
            className="mt-auto pt-8 flex flex-col items-center gap-3 group"
          >
            <img
              src="/ardeno-logo.png"
              alt=""
              aria-hidden="true"
              className="h-10 w-auto opacity-30 group-hover:opacity-60 transition-opacity"
            />
            <p className="text-center font-editorial text-[8px] tracking-[0.3em] uppercase text-mahogany/20 group-hover:text-mahogany/40 transition-colors">
              An Ardeno Studio Production
            </p>
          </a>
        </div>
      </div>

      {/* Flickering grid watermark */}
      <div className="w-full h-40 md:h-56 relative mt-6 z-0">
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, transparent 0%, transparent 35%, #f4ecdc 70%)' }} />
        <div className="absolute inset-0">
          <FlickeringGrid
            text={isMobile ? 'Ceylon Stories' : 'Ceylon Stories'}
            fontSize={isMobile ? 52 : 88}
            fontWeight={600}
            className="h-full w-full"
            squareSize={2}
            gridGap={isMobile ? 2 : 3}
            color="#2a1810"
            maxOpacity={0.3}
            flickerChance={0.1}
            fps={30}
          />
        </div>
      </div>
    </footer>
  );
}
