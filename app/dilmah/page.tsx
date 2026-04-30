'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { HeritageHeading } from '@/src/components/heritage/HeritageHeading';

const TEAL = '#004D55';
const LIGHT_TEAL = '#007C85';
const SANDY = '#F39766';
const CREAM = '#F9F5EC';

const dilmahTeas = [
  {
    name: 'Silver Tips Reserve',
    description: "Nuwara Eliya's rarest leaves harvested once a year at dawn. Steeped at exactly 75°C. Unblended & unadorned.",
    type: 'White Tea',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&fit=crop&q=80',
    color: '#D4AF37'
  },
  {
    name: 'Ceylon Single Estate',
    description: 'A full-bodied Dimbula black — clean tannins, golden liquor. Served with pure kithul jaggery to honor its profile.',
    type: 'Black Tea',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&fit=crop&q=80',
    color: '#8B4513'
  },
  {
    name: 'Gallery Chai',
    description: 'Our signature blend — bold black Ceylon built over crushed cardamom, cinnamon, and clove. A local masterpiece.',
    type: 'Spiced Blend',
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&fit=crop&q=80',
    color: '#C04000'
  },
];

export default function DilmahPartnershipPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className="w-full bg-[#002f35] text-[#f9f5ec] selection:bg-[#F39766] selection:text-[#002f35]">
      
      {/* 1. IMMERSIVE HERO */}
      <section className="relative w-full h-[100svh] flex flex-col justify-end overflow-hidden px-6 md:px-16 pb-20 md:pb-32">
        <div className="absolute inset-0 bg-[#001f24] z-0" />
        <motion.div 
          className="absolute inset-0 z-[1] mix-blend-overlay opacity-60"
          style={{ backgroundImage: "url('/dilmah-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center top' }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#001f24] via-[#001f24]/60 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="flex-1 max-w-3xl">
            <motion.p 
              className="font-editorial text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-8 flex items-center gap-4"
              style={{ color: SANDY }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="w-12 h-px" style={{ backgroundColor: SANDY }} />
              Exclusive Brand Partnership
            </motion.p>
            <motion.h1 
              className="font-display font-light text-[clamp(64px,10vw,140px)] leading-[0.85] tracking-tight mb-8"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1.2 }}
            >
              Ceylon&apos;s Finest,<br />
              <em className="text-[#F39766] font-light">Since 1988.</em>
            </motion.h1>
          </div>

          <motion.div 
            className="flex flex-col items-start md:items-end gap-6 shrink-0"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1 }}
          >
            <div className="w-32 md:w-48 p-4 border border-[#F39766]/30 backdrop-blur-md bg-[#001f24]/40 rounded-sm">
              <Image src="/dilmah-logo.png" alt="Dilmah Tea Logo" width={200} height={200} className="w-full object-contain" />
            </div>
            <p className="font-editorial text-[9px] md:text-[10px] tracking-[0.25em] text-[#F39766]/80 text-right uppercase">
              Authorised Dilmah <br className="hidden md:block" />Tea Room
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY - SCROLLYTELLING */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-16 bg-[#001f24]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
          <div className="md:w-1/2 md:sticky md:top-40 h-fit">
            <HeritageHeading eyebrow="The Philosophy" tone="light">
              More than a brand. A family&apos;s <em className="text-[#F39766]">promise.</em>
            </HeritageHeading>
            <p className="mt-8 font-body text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              In 1988, Merrill J. Fernando refused to let Ceylon tea become a voiceless commodity. Instead of selling his leaves to a global blending machine, he packed them in Sri Lanka and sent them out with their origin intact.
            </p>
            <p className="mt-6 font-body text-lg md:text-xl text-[#F39766] leading-relaxed max-w-xl italic">
              At Ceylon Stories, we serve Dilmah because it shares our language: heritage without stiffness, and hospitality without rush.
            </p>
          </div>
          
          <div className="md:w-1/2 flex flex-col gap-24 pt-12 md:pt-32">
            {[
              { title: "100% Single Estate", desc: "Every leaf we steep is traceable to its original garden. We reject the multi-origin blends that dilute character. What you taste is the weather, altitude, and soil of a specific Ceylon mountain." },
              { title: "Strict Steeping Protocols", desc: "We adhere to Dilmah's exacting standards. From 75°C water for Silver Tips to the 4-minute steep for English Breakfast. The vessel, the heat, and the timing are non-negotiable." },
              { title: "Ethical Impact", desc: "Every cup poured at Ceylon Stories supports the MJF Charitable Foundation, keeping the value of the tea firmly rooted in the country and community that cultivated it." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8 }}
                className="border-l border-[#F39766]/30 pl-8 md:pl-12"
              >
                <span className="font-editorial text-[10px] tracking-[0.2em] text-[#F39766] uppercase">Standard No. 0{i + 1}</span>
                <h3 className="font-display text-4xl md:text-5xl mt-4 mb-6">{pillar.title}</h3>
                <p className="font-body text-[#f9f5ec]/60 leading-relaxed text-lg">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE EXHIBITION */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-16 bg-[#F9F5EC] text-[#002f35]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-24 md:mb-32">
          <p className="font-editorial text-[10px] tracking-[0.3em] text-[#007C85] uppercase mb-6">The Curated Collection</p>
          <h2 className="font-display text-[clamp(48px,7vw,96px)] leading-[0.9] tracking-tight max-w-4xl">
            Leaves of <em className="text-[#F39766]">Distinction.</em>
          </h2>
          <div className="w-1px h-24 bg-[#007C85]/20 mt-12 mx-auto" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-48">
          {dilmahTeas.map((tea, idx) => (
            <div key={tea.name} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
              <motion.div 
                className="w-full md:w-3/5"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={tea.imageUrl} alt={tea.name} fill className="object-cover photo-heritage transition-transform duration-[2s] hover:scale-105" />
                  <div className={`absolute inset-0 border-[12px] border-[#F9F5EC] mix-blend-overlay pointer-events-none`} />
                </div>
              </motion.div>

              <motion.div 
                className="w-full md:w-2/5 flex flex-col justify-center"
                initial={{ opacity: 0, x: idx % 2 !== 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="font-editorial text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: tea.color }}>
                  {tea.type}
                </span>
                <h3 className="font-display text-5xl md:text-7xl leading-none mb-8 tracking-[-0.01em]">{tea.name}</h3>
                <p className="font-body text-lg text-[#002f35]/70 leading-relaxed mb-10 max-w-md">
                  {tea.description}
                </p>
                <Link href="/menu" className="group flex items-center gap-4 w-fit">
                   <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-[#007C85] group-hover:text-[#F39766] transition-colors">
                     View on Menu
                   </span>
                   <span className="text-[#007C85] group-hover:text-[#F39766] transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER / CTA */}
      <section className="relative w-full py-40 flex flex-col justify-center items-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[#002f35] z-0" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 relative mb-12 opacity-80 mix-blend-luminosity">
            <Image src="/dilmah-logo.png" alt="Dilmah" fill className="object-contain" />
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-light mb-8 max-w-3xl leading-[0.9]">
            Experience it in <em className="text-[#F39766]">person.</em>
          </h2>
          <p className="font-editorial text-sm md:text-base tracking-widest text-[#F39766]/80 uppercase mb-16">
             Let the first pot set the pace.
          </p>
          <Link href="/visit" className="border border-[#F39766] text-[#F39766] px-12 py-5 font-editorial text-[10px] md:text-[11px] tracking-[0.3em] uppercase hover:bg-[#F39766] hover:text-[#002f35] transition-colors duration-500">
            Plan Your Visit
          </Link>
        </div>
      </section>

    </div>
  );
}
