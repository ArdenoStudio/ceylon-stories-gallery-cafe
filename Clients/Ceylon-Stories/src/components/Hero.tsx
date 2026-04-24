import { motion } from 'motion/react';
import { TiltCard } from './ui/tilt-card';
import dilmahLogo from '@/assets/dilmah-logo.svg';

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col md:flex-row bg-cream-page overflow-hidden">
      
      {/* Left Column - Photography (38%) */}
      <div className="w-full h-[55vh] md:h-auto md:w-[38%] relative border-b md:border-b-0 md:border-r border-mahogany/20">
        <motion.div
          className="w-full h-full relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img 
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop" 
            alt="Sri Lankan heritage dark moody architectural detail"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[0.2] sepia-[0.3]"
            initial={{ scale: 1.05 }}
            animate={isLoaded ? { scale: 1 } : { scale: 1.05 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Inner shadow for object-presence */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(42,24,16,0.6)] pointer-events-none" />
          <div className="absolute inset-0 bg-mahogany/30 mix-blend-multiply pointer-events-none" />
        </motion.div>
      </div>

      {/* Right Column - Exhibition Card (62%) */}
      <div className="w-full md:w-[62%] min-h-[45vh] md:h-auto md:min-h-[100svh] relative flex justify-center flex-col px-8 md:px-[clamp(48px,6vw,128px)] pt-20 md:pt-32 pb-12">
        <div className="absolute inset-0 pointer-events-none paper-texture opacity-30" />
        
        <div className="flex flex-col relative z-10 w-full max-w-3xl">
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
             transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-editorial text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-mahogany-soft">
              CURRENT EXHIBITION — NO. 04
            </span>
            <div className="w-12 h-[1px] bg-mahogany/40 mt-4 mb-8" />
          </motion.div>

          <motion.h1 
            className="font-display font-light text-mahogany text-[clamp(56px,8vw,120px)] leading-[0.95] tracking-[-0.02em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Anoma<br />Wijewardene
          </motion.h1>

          <motion.p 
            className="font-editorial text-[10px] md:text-[12px] tracking-[0.15em] uppercase text-mahogany-soft mb-8"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
          >
            OIL ON CANVAS · ON VIEW THROUGH 30 APRIL
          </motion.p>

          <motion.p 
            className="font-body text-mahogany-soft text-[15px] md:text-[16px] leading-[1.7] max-w-[42ch] mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Wijewardene paints the slow weather of memory. Forty-two new works occupy the gallery from the first of the month.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <a href="#collection" className="text-link-arrow">
              <span className="font-editorial text-[11px] tracking-[0.18em] uppercase hover-underline text-clay-deep">
                READ THE WALL TEXT
              </span>
              <span className="arrow text-clay-deep">→</span>
            </a>
          </motion.div>
        </div>

        {/* Microcontent bottom */}
        <motion.div
          className="mt-16 md:mt-auto pt-8 flex flex-wrap items-center gap-x-6 gap-y-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-editorial text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-mahogany-soft">
            <span>COLOMBO · 28°C</span>
            <span className="hidden md:inline">·</span>
            <span>STEEPING NOW: SILVER TIPS, 4:00</span>
            <span className="hidden lg:inline">·</span>
            <span className="hidden lg:inline">PAGE I OF VII</span>
          </div>

          <TiltCard
            tiltLimit={8}
            scale={1.04}
            effect="gravitate"
            className="border border-mahogany/15 bg-cream-page/60 backdrop-blur-sm rounded-sm px-4 py-2.5 flex items-center gap-3 cursor-default"
          >
            <span className="font-editorial text-[8px] tracking-[0.18em] uppercase text-mahogany/40 whitespace-nowrap">
              TEA PARTNER
            </span>
            <div className="w-px h-5 bg-mahogany/20" />
            <img
              src={dilmahLogo}
              alt="Dilmah Tea"
              className="h-7 w-auto opacity-70 mix-blend-multiply"
              draggable={false}
            />
          </TiltCard>
        </motion.div>
        
      </div>
    </section>
  );
}
