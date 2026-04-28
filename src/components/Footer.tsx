'use client';

import ShinyButton from './ui/shiny-button';
import { FlickeringGrid } from './ui/flickering-grid';
import { useEffect, useState } from 'react';

const WHATSAPP_URL =
  'https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation.';

export default function Footer() {
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
              <nav className="flex flex-col gap-[0.55rem]">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Our Story', href: '/our-story' },
                  { label: 'Menu', href: '/menu' },
                  { label: 'Dilmah', href: '/dilmah' },
                  { label: 'Experience', href: '/experience' },
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'Shisha', href: '/shisha' },
                  { label: 'Stories', href: '/stories' },
                  { label: 'Visit Us', href: '/visit' },
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
                    onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
                    className="min-w-[158px] px-4 py-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </span>
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
            <svg
              viewBox="0 0 1500 1500"
              aria-hidden="true"
              className="h-9 w-auto text-stone-400/70 group-hover:text-stone-500 transition-colors"
              fill="currentColor"
            >
              <path d="M 1114.464844 1093.320312 L 902.367188 666.722656 C 839.917969 722.578125 784.960938 820.574219 788.027344 900.875 L 852.203125 1027.425781 C 854.507812 1031.96875 858.433594 1035.472656 863.210938 1037.246094 L 1089.253906 1121.335938 C 1106.46875 1127.742188 1122.644531 1109.769531 1114.464844 1093.320312 Z M 733.84375 860.191406 C 733.300781 860.992188 732.796875 861.84375 732.347656 862.757812 L 651.828125 1025.953125 C 649.539062 1030.585938 645.566406 1034.179688 640.71875 1035.984375 L 410.511719 1121.617188 C 393.394531 1127.992188 377.25 1110.242188 385.203125 1093.804688 L 726.917969 387.246094 C 734.253906 372.085938 755.8125 371.960938 763.3125 387.042969 L 895.113281 652.152344 C 822.84375 703.808594 766.253906 776.003906 733.84375 860.191406 " />
            </svg>
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
