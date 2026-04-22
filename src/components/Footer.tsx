import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-mahogany text-cream-page pt-20 flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-mahogany mix-blend-multiply opacity-80 pointer-events-none" />
      <div className="batik-line absolute top-0 left-0 bg-white/10 z-0" />
      
      {/* Top Split Layout */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Core Info */}
        <div className="md:col-span-5 flex flex-col gap-12 pt-8">
          <div>
            <h3 className="font-editorial text-[10px] tracking-[0.2em] uppercase text-gold-leaf mb-4">Location</h3>
            <p className="font-display text-2xl lg:text-3xl leading-[1.2] text-cream-page mb-2">
              9/6A, 16th Lane, <br />
              Marine Drive, Kolpetty <br />
              Colombo 03, LK
            </p>
          </div>
          <div>
            <h3 className="font-editorial text-[10px] tracking-[0.2em] uppercase text-gold-leaf mb-4">Inquiries</h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@ceylonstories.lk" className="font-body text-base text-cream-page/90 hover:text-gold-leaf transition-colors inline-block w-max">
                hello@ceylonstories.lk
              </a>
              <a href="tel:+94770000000" className="font-body text-base text-cream-page/90 hover:text-gold-leaf transition-colors inline-block w-max">
                +94 (77) 000 0000
              </a>
            </div>
          </div>
        </div>

        {/* Right Structured Grid Info */}
        <div className="md:col-span-6 md:col-start-7 flex flex-col border-t border-cream-page/20 md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-12">
          
          <div className="grid grid-cols-2 gap-8 border-b border-cream-page/20 pb-8 mb-8">
             <div>
                <h3 className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-3">Service Hours</h3>
                <p className="font-body text-sm text-cream-page/70 leading-[1.6]">
                  Weekdays<br/>
                  08:00 AM — 10:00 PM
                </p>
             </div>
             <div>
                <h3 className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-3">.</h3>
                <p className="font-body text-sm text-cream-page/70 leading-[1.6]">
                  Weekends<br/>
                  08:00 AM — 01:00 AM
                </p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pb-8">
             <div>
                <h3 className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-3">Social</h3>
                <div className="flex flex-col gap-2">
                  <a href="#" className="font-body text-sm text-cream-page/70 hover:text-cream-page transition-colors uppercase tracking-widest w-max">Instagram</a>
                  <a href="#" className="font-body text-sm text-cream-page/70 hover:text-cream-page transition-colors uppercase tracking-widest w-max">Facebook</a>
                </div>
             </div>
             <div>
                <h3 className="font-editorial text-[9px] tracking-[0.2em] uppercase text-clay-warm mb-3">Reservations</h3>
                <a href="https://wa.me/94770000000" target="_blank" rel="noreferrer" className="flex items-center justify-between font-body text-sm text-cream-page/70 hover:text-cream-page transition-colors uppercase tracking-widest border border-cream-page/20 px-4 py-2 hover:bg-cream-page hover:text-mahogany">
                  <span>WhatsApp</span>
                  <span>↗</span>
                </a>
             </div>
          </div>
          
        </div>
      </div>

      {/* Massive Bottom Wordmark */}
      <div className="w-full relative z-10 pt-20 overflow-hidden flex items-end">
        <h2 className="font-display italic font-light text-[clamp(120px,22vw,360px)] leading-[0.75] text-cream-page/10 whitespace-nowrap select-none w-full text-center tracking-[-0.03em] -mb-[4vw]">
          Ceylon Stories
        </h2>
      </div>

      {/* Absolute strict bottom bar */}
      <div className="w-full relative z-20 border-t border-cream-page/10 bg-mahogany py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-cream-page/40">
          © {new Date().getFullYear()} Ceylon Stories. All Rights Reserved.
        </p>
        <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-cream-page/40">
          Made in Colombo
        </p>
      </div>

    </footer>
  );
}
