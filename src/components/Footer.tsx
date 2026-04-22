'use client';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-cream-page text-mahogany px-5 py-5 md:px-8 md:py-8">
      {/* Bordered frame */}
      <div className="border border-mahogany/30 p-10 md:p-14 lg:p-16 flex flex-col md:flex-row gap-12 md:gap-0 min-h-[340px]">

        {/* LEFT — Logo + social icon pinned to bottom */}
        <div className="md:w-[38%] flex flex-col justify-between">
          {/* Circular monogram logo */}
          <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px]">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Outer ring */}
              <circle cx="80" cy="80" r="76" stroke="#2a1810" strokeWidth="1.2" />
              {/* Inner ring */}
              <circle cx="80" cy="80" r="68" stroke="#2a1810" strokeWidth="0.6" strokeDasharray="3 3" />
              {/* CS monogram */}
              <text
                x="80"
                y="88"
                textAnchor="middle"
                fontFamily="'Fraunces Variable', Georgia, serif"
                fontSize="38"
                fontStyle="italic"
                fontWeight="300"
                fill="#2a1810"
                letterSpacing="-1"
              >
                CS
              </text>
              {/* Subtitle arc — bottom */}
              <path id="arc" d="M 26,80 A 54,54 0 0 0 134,80" fill="none" />
              <text fontFamily="'Tenor Sans', Arial, sans-serif" fontSize="7" fill="#2a1810" letterSpacing="3" opacity="0.55">
                <textPath href="#arc" startOffset="8%">GALLERY CAFÉ · COLOMBO</textPath>
              </text>
            </svg>
          </div>

          {/* Instagram icon — pinned to bottom */}
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

          {/* Explore / About Us */}
          <div className="flex-1">
            <h3 className="font-display text-[1.1rem] font-normal text-mahogany mb-5 leading-none">Explore</h3>
            <nav className="flex flex-col gap-[0.65rem]">
              {[
                { label: 'Home', href: '/' },
                { label: 'Menu', href: '#menu' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'About', href: '#about' },
                { label: 'Dilmah', href: '/dilmah' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-editorial text-[8px] tracking-[0.22em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h3 className="font-display text-[1.1rem] font-normal text-mahogany mb-5 leading-none">Contact</h3>
            <div className="flex flex-col gap-[0.65rem]">
              <p className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 leading-[1.9]">
                9/6A, 16th Lane, Marine Drive<br />
                Kolpetty, Colombo 03, LK
              </p>
              <a
                href="tel:+94770000000"
                className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max"
              >
                +94 (77) 000 0000
              </a>
              <a
                href="mailto:hello@ceylonstories.lk"
                className="font-editorial text-[8px] tracking-[0.12em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max"
              >
                hello@ceylonstories.lk
              </a>
              <a
                href="https://wa.me/94770000000"
                target="_blank"
                rel="noreferrer"
                className="font-editorial text-[8px] tracking-[0.22em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max"
              >
                Reservations
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
