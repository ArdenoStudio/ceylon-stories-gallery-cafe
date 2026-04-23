'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

import { useReservation } from './ReservationProvider';
import ShinyButton from './ui/shiny-button';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Experience', href: '/experience' },
  { label: 'Dilmah', href: '/dilmah' },
  { label: 'Stories', href: '/stories' },
  { label: 'About', href: '/our-story' },
  { label: 'Visit', href: '/visit' },
];

const igImages = [
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop',
];

export default function Footer() {
  const { openReservation } = useReservation();

  return (
    <footer id="contact" className="w-full bg-cream-page text-mahogany px-5 py-5 md:px-8 md:py-8">
      {/* Outer frame — sharp corners */}
      <div className="border border-mahogany/30 p-[6px]">
        {/* Inner frame — rounded corners */}
        <div className="border border-mahogany/30 rounded-[10px] overflow-hidden">

          {/* Main Content Grid */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row gap-12 lg:gap-0 min-h-[400px]">

            {/* LEFT — Logo + Social */}
            <div className="lg:w-[32%] flex flex-col justify-between">
              {/* Logo Badge */}
              <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] relative">
                <Image
                  src="/logo-color.png"
                  alt="Ceylon Stories Gallery Cafe"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex items-center gap-5 mt-8 lg:mt-0">
                <a href="https://instagram.com/ceylonstories.gallerycafe" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-mahogany/50 hover:text-mahogany transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation." target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-mahogany/50 hover:text-mahogany transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a href="mailto:hello@ceylonstories.lk" aria-label="Email" className="text-mahogany/50 hover:text-mahogany transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* MIDDLE — Three Info Columns */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-0 lg:w-[68%]">

              {/* Explore */}
              <div className="flex-1">
                <h3 className="font-display text-[1.05rem] font-normal text-mahogany mb-5 leading-none">Explore</h3>
                <nav className="flex flex-col gap-[0.6rem]">
                  {exploreLinks.map(({ label, href }) => (
                    <Link key={label} href={href} className="font-editorial text-[8px] tracking-[0.22em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max">
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Hours */}
              <div className="flex-1">
                <h3 className="font-display text-[1.05rem] font-normal text-mahogany mb-5 leading-none">Hours</h3>
                <div className="flex flex-col gap-[0.6rem]">
                  <div>
                    <p className="font-editorial text-[8px] tracking-[0.18em] uppercase text-clay-warm mb-1">The Café & Gallery</p>
                    <p className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 leading-[1.9]">
                      Monday — Friday · 8:00 AM — 10:00 PM<br />
                      Saturday — Sunday · 8:00 AM — 1:00 AM
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="font-editorial text-[8px] tracking-[0.18em] uppercase text-clay-warm mb-1">The Evening Lounge</p>
                    <p className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 leading-[1.9]">
                      Opens daily at 6:00 PM<br />
                      Shisha · Music · Late-Night Menu
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact + Reserve */}
              <div className="flex-1">
                <h3 className="font-display text-[1.05rem] font-normal text-mahogany mb-5 leading-none">Contact</h3>
                <div className="flex flex-col gap-[0.6rem]">
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

          {/* Instagram Strip */}
          <div className="border-t border-mahogany/10 px-8 md:px-12 lg:px-14 py-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-mahogany/30 block" />
              <p className="font-editorial text-[9px] tracking-[0.18em] uppercase text-mahogany/60">
                @ceylonstories.gallerycafe
              </p>
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide">
              {igImages.map((src, idx) => (
                <motion.a
                  key={idx}
                  href="https://instagram.com/ceylonstories.gallerycafe"
                  target="_blank"
                  rel="noreferrer"
                  className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] shrink-0 overflow-hidden group relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <img
                    src={src}
                    alt="Instagram"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover photo-heritage select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-mahogany/0 group-hover:bg-mahogany/20 transition-colors duration-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div className="border-t border-mahogany/10">
            <iframe
              title="Ceylon Stories on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d79.858!3d6.895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnNDIuMCJOIDc5wrA1MSczMC4wIkU!5e0!3m2!1sen!2slk!4v1"
              width="100%"
              height="240"
              style={{ border: 0, filter: 'grayscale(0.35) sepia(0.25) contrast(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-mahogany/10 px-8 md:px-12 lg:px-14 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-editorial text-[7px] tracking-[0.2em] uppercase text-mahogany/35">
              © {new Date().getFullYear()} Ceylon Stories Gallery Café · Colombo, Sri Lanka
            </p>
            <p className="font-editorial text-[7px] tracking-[0.2em] uppercase text-mahogany/35">
              Authorised Dilmah Partner · Since 2025
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </footer>
  );
}
