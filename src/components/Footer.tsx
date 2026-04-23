'use client';

import { CalendarDays } from 'lucide-react';

import { useReservation } from './ReservationProvider';
import ShinyButton from './ui/shiny-button';

export default function Footer() {
  const { openReservation } = useReservation();

  return (
    <footer id="contact" className="w-full bg-cream-page text-mahogany px-5 py-5 md:px-8 md:py-8">
      {/* Outer frame — sharp corners */}
      <div className="border border-mahogany/30 p-[6px]">
        {/* Inner frame — rounded corners */}
        <div className="border border-mahogany/30 rounded-[10px] p-8 md:p-12 lg:p-14 flex flex-col md:flex-row gap-12 md:gap-0 min-h-[340px]">

          {/* LEFT — monogram + social pinned to bottom */}
          <div className="md:w-[38%] flex flex-col justify-between">
            <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px]">
              <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="80" cy="80" r="76" stroke="#2a1810" strokeWidth="1.2" />
                <circle cx="80" cy="80" r="68" stroke="#2a1810" strokeWidth="0.6" strokeDasharray="3 3" />
                <text x="80" y="88" textAnchor="middle" fontFamily="'Fraunces Variable', Georgia, serif" fontSize="38" fontStyle="italic" fontWeight="300" fill="#2a1810" letterSpacing="-1">CS</text>
                <path id="arc" d="M 26,80 A 54,54 0 0 0 134,80" fill="none" />
                <text fontFamily="'Tenor Sans', Arial, sans-serif" fontSize="7" fill="#2a1810" letterSpacing="3" opacity="0.55">
                  <textPath href="#arc" startOffset="8%">GALLERY CAFÉ · COLOMBO</textPath>
                </text>
              </svg>
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
                    icon={<CalendarDays className="size-3.5" strokeWidth={1.7} />}
                    className="min-w-[158px] bg-[#24130d] px-4 py-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
                  >
                    Reserve
                  </ShinyButton>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
