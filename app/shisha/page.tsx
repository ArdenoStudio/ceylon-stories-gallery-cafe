'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Blend = {
  id: number;
  name: string;
  tag: string | null;
  origin: string;
  notes: string[];
  intensity: number;
  description: string;
  pairsWith: string;
  session: string;
  image: string;
};

const blends: Blend[] = [
  {
    id: 1,
    name: 'Ceylon Spice',
    tag: 'Signature',
    origin: 'House Blend',
    notes: ['Black tea tobacco', 'Cardamom', 'Star anise', 'Cinnamon'],
    intensity: 3,
    description: 'Our house blend. Warm and layered, built around a Ceylon black tea-infused tobacco base with hand-ground spices. The blend that defines the lounge.',
    pairsWith: 'Dilmah Single Estate Black · Arak & soda',
    session: 'Best for slow evenings, pairs well with conversation',
    image: 'https://picsum.photos/id/63/1200/1200'
  },
  {
    id: 2,
    name: 'Double Apple',
    tag: null,
    origin: 'Imported',
    notes: ['Red apple', 'Green apple', 'Anise'],
    intensity: 2,
    description: 'The classic, done right. Two apple profiles balanced against a clean anise finish. Familiar and reliable for any evening.',
    pairsWith: 'Mint lemonade · Chilled still water',
    session: 'Good entry point, works at any pace',
    image: 'https://picsum.photos/id/1060/1200/1200'
  },
  {
    id: 3,
    name: 'Mint Lemon',
    tag: null,
    origin: 'Imported',
    notes: ['Spearmint', 'Citrus', 'Ice'],
    intensity: 1,
    description: 'Bright and cooling. A natural spearmint cut with cold citrus, the cleanest smoke on the menu. Best for long sessions.',
    pairsWith: 'Iced Ceylon green tea · Sparkling water',
    session: 'Ideal for extended evenings, very low fatigue',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Blueberry Ice',
    tag: null,
    origin: 'Imported',
    notes: ['Wild blueberry', 'Menthol', 'Vanilla'],
    intensity: 1,
    description: 'Sweet berry with a slow menthol finish. Best paired with the house iced tea or a cold brew. Smooth and easy, great for first-timers.',
    pairsWith: 'House iced tea · Cold brew coffee',
    session: 'Smooth and easy, great for first-timers',
    image: 'https://picsum.photos/id/412/1200/1200'
  },
  {
    id: 5,
    name: 'Grape Mint',
    tag: null,
    origin: 'Imported',
    notes: ['Concord grape', 'Fresh mint'],
    intensity: 2,
    description: 'A perennial favourite. Dark grape and bright mint, simple, reliable, always good. Versatile, works for any group or occasion.',
    pairsWith: 'Any still water · Light cocktails',
    session: 'Versatile, works for any group or occasion',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Rose & Oud',
    tag: 'Reserve',
    origin: 'Special',
    notes: ['Damask rose', 'Oud wood', 'Amber'],
    intensity: 3,
    description: 'Our most complex blend. Floral and resinous, a slow burn for the patient smoker. Reserved for unhurried evenings, limited nightly.',
    pairsWith: 'Dilmah Silver Tips White Tea · Neat whisky',
    session: 'Reserved for unhurried evenings, limited nightly',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop'
  },
];

export default function ShishaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeBlendId, setActiveBlendId] = useState<number>(blends[0].id);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#030303] text-[#F3EFE9] selection:bg-[#C9A35F] selection:text-[#030303] antialiased">
      
      {/* 1. Cinematic Hero with deep dark image layer */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full will-change-[transform,opacity]">
          <div className="absolute inset-0 bg-[#030303]/50 z-10" />
          <motion.img 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 4, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop" 
            className="w-full h-full object-cover object-center sepia-[0.3] saturate-50 brightness-75"
            alt="Shisha Lounge at night" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent z-20" />
        </motion.div>

        <div className="relative z-30 w-full px-6 flex flex-col items-center text-center mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-editorial text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-[#C9A35F] mb-6 drop-shadow-lg"
          >
            The Late Hours
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.2, 1, 0.4, 1] }}
            className="font-display text-[15vw] md:text-[160px] leading-[0.85] tracking-[-0.02em] font-light text-[#F3EFE9] drop-shadow-xl"
          >
            Smoke & <span className="italic text-[#C9A35F]">Amber</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
        >
          <span className="font-editorial text-[8px] uppercase tracking-[0.3em] text-[#F3EFE9]/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A35F]/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. The Philosophy with side image overlay */}
      <section className="relative z-20 w-full bg-[#030303] py-24 md:py-48 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
        
        {/* Decorative Background Image in Philosophy */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[80vh] opacity-20 mix-blend-lighten pointer-events-none blur-[2px]">
          <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop" alt="Smoke texture" className="w-full h-full object-cover object-left mask-image-linear-gradient" style={{ maskImage: 'linear-gradient(to right, transparent, black)', WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center md:text-left relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-2/3">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.2, 1, 0.4, 1] }}
              className="font-display text-[26px] md:text-[44px] leading-[1.3] text-[#F3EFE9]/80 font-light"
            >
              We view the hookah not as an afterthought, but as an <span className="text-[#C9A35F] italic">artisanal craft</span>. 
              Prepared with organic coconut coals, high-end imported molasses, and built inside premium clay bowls to preserve every delicate note.
            </motion.p>
          </div>
          <div className="hidden md:block w-1/3">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-full border border-[#C9A35F]/20 p-2">
              <img src="https://picsum.photos/id/431/800/1000" className="w-full h-full object-cover rounded-t-full sepia-[0.3]" alt="Clay bowl placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Tasting Collection - Sticky Layout with Built-In Frame (Prevents Blank Look) */}
      <section className="relative z-20 w-full bg-[#030303]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row relative">
          
          {/* Left Side: Images (Sticky on Desktop, highly decorated so it's never 'blank') */}
          <div className="hidden md:flex w-1/2 h-screen sticky top-0 bg-[#060608] flex-col items-center justify-center p-8 lg:p-16 border-r border-white/5 relative">
            
            <div className="absolute inset-0 opacity-10 blur-[100px] mix-blend-screen pointer-events-none flex items-center justify-center">
              <div className="w-[60%] h-[60%] rounded-full bg-[#C9A35F] animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

            {/* Premium Arched Frame */}
            <div className="relative w-full max-w-[400px] aspect-[10/13] rounded-t-[200px] overflow-hidden border border-[#C9A35F]/30 shadow-[0_0_60px_rgba(201,163,95,0.05)] flex items-center justify-center bg-[#0a0a0c]">
              
              {/* Fallback pattern underneath */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
                 <div className="w-[1px] h-full bg-[#C9A35F] absolute" />
                 <div className="w-full h-[1px] bg-[#C9A35F] absolute" />
              </div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeBlendId}
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  src={blends.find(b => b.id === activeBlendId)?.image}
                  alt="Shisha Blend Image"
                  className="absolute inset-0 w-full h-full object-cover sepia-[0.4] saturate-50 brightness-75 z-10"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent z-20 opacity-90" />
              
              {/* Inner Decorative Border */}
              <div className="absolute inset-3 border border-[#C9A35F]/20 rounded-t-[190px] pointer-events-none z-20" />
            </div>

            {/* Constantly visible indicator below the frame */}
            <div className="mt-10 flex flex-col items-center text-center z-20">
               <span className="font-editorial text-[9px] uppercase tracking-[0.4em] text-[#C9A35F]/60 mb-3">Viewing</span>
               <AnimatePresence mode="wait">
                  <motion.h3 
                    key={`name-${activeBlendId}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-[28px] lg:text-[36px] text-[#F3EFE9] font-light italic"
                  >
                    Nº {String(activeBlendId).padStart(2, '0')} — {blends.find(b => b.id === activeBlendId)?.name}
                  </motion.h3>
               </AnimatePresence>
            </div>
            
          </div>

          {/* Right Side: Scrollable List (Variant E Style) */}
          <div className="w-full md:w-1/2 py-24 md:py-[15vh] px-6 md:px-12 xl:px-20 flex flex-col gap-8">
             {/* Section Intro */}
             <div className="mb-12 md:mb-16">
                <h2 className="font-editorial text-[10px] uppercase tracking-[0.4em] text-[#C9A35F] mb-4">The Collection</h2>
                <h3 className="font-display text-[48px] md:text-[72px] leading-[0.9] text-[#F3EFE9] font-light">
                  Curated <br/><span className="italic text-white/40">Blends</span>
                </h3>
             </div>

             <div className="space-y-6">
               {blends.map((blend) => (
                 <motion.div
                   key={blend.id}
                   onViewportEnter={() => setActiveBlendId(blend.id)}
                   viewport={{ margin: "-50% 0px -50% 0px" }}
                   onClick={() => setActiveBlendId(blend.id)}
                   className={cn(
                     "relative p-6 md:p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border hover:border-[#C9A35F]/30 transition-all duration-500 cursor-pointer overflow-hidden group",
                     activeBlendId === blend.id ? "border-[#C9A35F]/50 shadow-[0_0_30px_rgba(201,163,95,0.05)]" : "border-white/[0.05]"
                   )}
                 >
                   {/* Mobile Image (Only visible on small screens since sticky is hidden) */}
                   <div className="block md:hidden w-full aspect-[4/5] mb-6 overflow-hidden rounded-xl relative shadow-2xl border border-[#C9A35F]/20 p-1">
                      <img src={blend.image} alt={blend.name} className="w-full h-full object-cover rounded-xl sepia-[0.3] brightness-75" />
                      <div className="absolute inset-1 bg-gradient-to-t from-[#030303]/80 to-transparent rounded-xl" />
                   </div>

                   <div className={cn(
                     "absolute inset-0 transition-opacity duration-700",
                     activeBlendId === blend.id ? "bg-[#C9A35F]/10 opacity-100" : "bg-[#C9A35F]/5 opacity-0 group-hover:opacity-100"
                   )} />
                   
                   <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                     <div className="flex-1">
                       <div className="flex items-center gap-3 mb-3">
                         <span className="font-editorial text-[10px] tracking-[0.2em] text-[#C9A35F]">
                           Nº {String(blend.id).padStart(2, '0')}
                         </span>
                         {blend.tag && (
                           <span className="font-editorial text-[8px] uppercase tracking-[0.2em] text-white/50 bg-white/5 px-2 py-0.5 rounded-sm">
                             {blend.tag}
                           </span>
                         )}
                       </div>
                       
                       <h4 className={cn(
                         "font-display text-[32px] md:text-[40px] leading-[1] mb-3 transition-colors duration-500",
                         activeBlendId === blend.id ? "text-[#C9A35F]" : "text-[#F3EFE9] group-hover:text-[#C9A35F]"
                       )}>
                         {blend.name}
                       </h4>
                       <p className="font-body text-[14px] md:text-[15px] leading-[1.8] text-white/60 max-w-sm">
                         {blend.description}
                       </p>

                       {/* Expandable Details on Select */}
                       <AnimatePresence>
                         {activeBlendId === blend.id && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0, marginTop: 0 }}
                             animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                             exit={{ height: 0, opacity: 0, marginTop: 0 }}
                             className="overflow-hidden border-t border-white/5"
                           >
                             <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                               <div>
                                 <span className="block font-editorial text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">Tasting Notes</span>
                                 <span className="font-editorial text-[10px] uppercase tracking-[0.1em] text-[#C9A35F] block leading-relaxed">
                                   {blend.notes.join(' • ')}
                                 </span>
                               </div>
                               <div>
                                 <span className="block font-editorial text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">Perfect Pairing</span>
                                 <span className="font-body text-[13px] text-white/70 italic">
                                   {blend.pairsWith}
                                 </span>
                               </div>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                     
                     <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-2 pt-4 md:pt-0">
                       <span className="font-editorial text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/80 bg-white/5">
                         Intensity: {blend.intensity}/3
                       </span>
                       <span className="font-editorial text-[9px] text-white/30 uppercase tracking-widest mt-0 md:mt-2">
                         {blend.origin}
                       </span>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. The Ritual (Etiquette) with Image Accompaniments */}
      <section className="relative z-20 w-full bg-[#0a0a0c] py-24 md:py-40 px-6 md:px-12 xl:px-24 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            <div className="lg:w-1/3 flex flex-col lg:sticky lg:top-32 h-fit">
               <span className="font-editorial text-[10px] uppercase tracking-[0.4em] text-[#C9A35F] mb-6">House Rules</span>
               <h2 className="font-display text-[48px] md:text-[64px] leading-[0.9] text-[#F3EFE9] font-light mb-6">
                 The <span className="italic text-[#C9A35F]">Ritual</span>
               </h2>
               <p className="font-body text-[15px] leading-[1.8] text-white/50 max-w-sm mb-12">
                 To maintain the sanctuary of the lounge and ensure the highest quality experience, we ask our guests to observe a few simple traditions.
               </p>
               {/* Decorative ritual side image */}
               <div className="hidden lg:block w-full aspect-square border border-[#C9A35F]/20 rounded-full overflow-hidden p-2 opacity-50 sepia">
                  <img src="https://picsum.photos/id/766/800/800" className="w-full h-full object-cover rounded-full" alt="Lounge atmosphere placeholder" />
               </div>
            </div>

            <div className="lg:w-2/3 flex flex-col gap-16 md:gap-24">
               {/* Item I */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8 }}
                 className="relative pl-12 md:pl-20 border-l border-white/5 pb-8 flex flex-col md:flex-row gap-8"
               >
                  <span className="absolute left-[-24px] md:left-[-32px] top-0 font-display text-[48px] md:text-[64px] leading-[0.8] text-[#C9A35F]/20 italic">I</span>
                  <div className="flex-1">
                    <h3 className="font-editorial text-[14px] md:text-[16px] tracking-[0.2em] uppercase text-[#F3EFE9] mb-4">The Pace</h3>
                    <p className="font-body text-[15px] leading-[1.8] text-white/60">
                      Our blends are meant to be savored slowly. Fast, aggressive draws will overheat the bowl and scorch the tobacco. Let the smoke settle naturally, speak in unhurried tones, and embrace the pause between draws.
                    </p>
                  </div>
               </motion.div>
               {/* Item II */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="relative pl-12 md:pl-20 border-l border-white/5 pb-8 flex flex-col md:flex-row gap-8"
               >
                  <span className="absolute left-[-30px] md:left-[-40px] top-0 font-display text-[48px] md:text-[64px] leading-[0.8] text-[#C9A35F]/20 italic">II</span>
                  <div className="flex-1">
                    <h3 className="font-editorial text-[14px] md:text-[16px] tracking-[0.2em] uppercase text-[#F3EFE9] mb-4">The Coal Master</h3>
                    <p className="font-body text-[15px] leading-[1.8] text-white/60">
                      Our staff are trained to manage the heat of your session. We ask that you refrain from moving or adjusting the coals yourself, as this disrupts the delicate thermal balance we maintain for each specific blend.
                    </p>
                  </div>
               </motion.div>
               {/* Item III */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="relative pl-12 md:pl-20 border-l border-white/5 flex flex-col md:flex-row gap-8"
               >
                  <span className="absolute left-[-36px] md:left-[-48px] top-0 font-display text-[48px] md:text-[64px] leading-[0.8] text-[#C9A35F]/20 italic">III</span>
                  <div className="flex-1">
                    <h3 className="font-editorial text-[14px] md:text-[16px] tracking-[0.2em] uppercase text-[#F3EFE9] mb-4">The Pass</h3>
                    <p className="font-body text-[15px] leading-[1.8] text-white/60">
                      In tradition, passing the hose signifies respect. When handing it to a companion, ensure the tip faces away from them. Alternatively, rest the hose gently on the table and allow the next person to take it up when ready.
                    </p>
                  </div>
               </motion.div>
            </div>
          </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="relative z-20 w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#030303]" />
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2400&auto=format&fit=crop" 
          alt="Kolpetty nights" 
          className="absolute inset-0 w-full h-full object-cover sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-[#0a0a0c]" />

        <div className="relative z-10 flex flex-col items-center mt-20">
          <p className="font-editorial text-[10px] uppercase tracking-[0.4em] text-[#C9A35F] mb-8">
            Reserve Your Table
          </p>
          <h2 className="font-display text-[40px] md:text-[80px] font-light leading-[1] tracking-[-0.02em] mb-12 text-[#F3EFE9]">
            An Evening <span className="italic text-[#C9A35F]">Apart</span>
          </h2>

          <Link href="/contact" className="group relative overflow-hidden border border-[#C9A35F]/30 bg-transparent px-10 py-5 rounded-full transition-all hover:border-[#C9A35F]">
            <div className="absolute inset-0 w-full h-full bg-[#C9A35F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-editorial text-[11px] uppercase tracking-[0.3em] text-[#C9A35F] group-hover:text-[#030303] transition-colors duration-500">
              Book Now
            </span>
          </Link>
        </div>
      </section>

    </main>
  );
}