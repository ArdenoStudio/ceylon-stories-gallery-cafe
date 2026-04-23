'use client';

import { motion } from 'motion/react';

export default function VisitPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-mahogany text-cream-page pt-40 pb-20 px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">07</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 07 — VISIT US
          </p>
          <h1 className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]">
            Find us on <br />
            <i className="text-clay-warm">Marine Drive.</i>
          </h1>
        </div>
      </section>

      {/* Info + Map */}
      <section className="relative w-full bg-cream-page py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            {/* Address */}
            <div>
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-4">Address</p>
              <p className="font-display text-3xl md:text-4xl text-mahogany leading-[1.2]">
                9/6A, 16th Lane,<br />
                Marine Drive,<br />
                Kolpetty,<br />
                Colombo 03
              </p>
            </div>

            {/* Hours */}
            <div>
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-6">Opening Hours</p>
              <div className="flex flex-col gap-3 border-l border-mahogany/15 pl-6">
                <div className="flex justify-between items-center max-w-xs">
                  <span className="font-body text-sm text-mahogany/70">Monday – Friday</span>
                  <span className="font-editorial text-[10px] tracking-wider uppercase text-mahogany">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center max-w-xs">
                  <span className="font-body text-sm text-mahogany/70">Saturday – Sunday</span>
                  <span className="font-editorial text-[10px] tracking-wider uppercase text-mahogany">8:00 AM – 1:00 AM</span>
                </div>
                <p className="font-body text-xs text-mahogany/40 mt-2">
                  The gallery is open during café hours. The lounge opens at 6:00 PM daily.
                </p>
              </div>
            </div>

            {/* Reserve */}
            <div>
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-4">Reservations</p>
              <p className="font-body text-sm text-mahogany/60 leading-relaxed mb-6 max-w-[36ch]">
                Walk-ins are welcome. For evening lounge reservations and tea tastings, we recommend booking ahead via WhatsApp.
              </p>
              <a
                href="https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation."
                target="_blank"
                rel="noreferrer"
                className="font-editorial text-[10px] tracking-[0.2em] uppercase bg-mahogany text-cream-page inline-flex items-center gap-3 px-6 py-3 hover:bg-clay-deep transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold-leaf">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                RESERVE ON WHATSAPP
              </a>
            </div>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-square lg:aspect-auto lg:min-h-[500px]"
          >
            <iframe
              title="Ceylon Stories on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d79.858!3d6.895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnNDIuMCJOIDc5wrA1MSczMC4wIkU!5e0!3m2!1sen!2slk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.3) sepia(0.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[360px]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
