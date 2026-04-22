'use client';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-cream-page text-mahogany px-5 py-5 md:px-8 md:py-8">
      {/* Bordered frame — the defining design element */}
      <div className="border border-mahogany/25 px-10 pt-12 pb-8 md:px-16 md:pt-16 md:pb-10 flex flex-col gap-12">

        {/* Main three-column content */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-0">

          {/* Brand / Logo */}
          <div className="flex-[1.4] flex flex-col gap-3">
            <h2 className="font-display italic text-[2.2rem] leading-[1.1] text-mahogany">
              Ceylon<br />Stories
            </h2>
            <p className="font-editorial text-[8px] tracking-[0.25em] uppercase text-mahogany/45">
              Gallery Café · Colombo 03
            </p>
          </div>

          {/* Explore */}
          <div className="flex-1">
            <h3 className="font-display text-[1.05rem] text-mahogany mb-5">Explore</h3>
            <nav className="flex flex-col gap-[0.6rem]">
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
                  className="font-editorial text-[8.5px] tracking-[0.22em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h3 className="font-display text-[1.05rem] text-mahogany mb-5">Contact</h3>
            <div className="flex flex-col gap-[0.55rem]">
              <p className="font-editorial text-[8.5px] tracking-[0.12em] uppercase text-mahogany/55 leading-[1.8]">
                9/6A, 16th Lane, Marine Drive<br />
                Kolpetty, Colombo 03, LK
              </p>
              <a
                href="tel:+94770000000"
                className="font-editorial text-[8.5px] tracking-[0.12em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max mt-1"
              >
                +94 (77) 000 0000
              </a>
              <a
                href="mailto:hello@ceylonstories.lk"
                className="font-editorial text-[8.5px] tracking-[0.12em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max"
              >
                hello@ceylonstories.lk
              </a>
              <a
                href="https://wa.me/94770000000"
                target="_blank"
                rel="noreferrer"
                className="font-editorial text-[8.5px] tracking-[0.22em] uppercase text-mahogany/55 hover:text-mahogany transition-colors w-max mt-2"
              >
                Reservations ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar: social icons + copyright */}
        <div className="flex items-center justify-between border-t border-mahogany/15 pt-6">
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-mahogany/45 hover:text-mahogany transition-colors">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-mahogany/45 hover:text-mahogany transition-colors">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
          <p className="font-editorial text-[8px] tracking-[0.22em] uppercase text-mahogany/35">
            © {new Date().getFullYear()} Ceylon Stories. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
