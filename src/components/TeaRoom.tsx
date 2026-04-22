import { motion } from 'motion/react';

export default function TeaRoom() {
  const rituals = [
    {
      num: '01',
      title: 'The Morning Pour',
      description: 'Ceylon Black, poured deliberately at eight in the morning. Served alongside pure kithul jaggery to awaken the palate before the city starts.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
      align: 'left'
    },
    {
      num: '02',
      title: 'The Afternoon Cup',
      description: 'Dilmah Single-Estate Silver Tips, steeped for exactly four minutes. Accompanied by house-made cardamom shortbread to break the midday heat.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
      align: 'right'
    },
    {
      num: '03',
      title: 'The Evening Steep',
      description: 'Our signature gallery chai blend, served slowly in terracotta cups as the overhead lights dim and the evening tempo settles in.',
      image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=800&auto=format&fit=crop',
      align: 'left'
    }
  ];

  return (
    <section id="menu" className="relative w-full bg-[#EBE0CA] py-[clamp(100px,15vh,200px)] px-6">
      <div className="absolute inset-0 pointer-events-none paper-texture opacity-40 mix-blend-color-burn" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-24 md:mb-40 flex flex-col items-start gap-6 border-b border-mahogany/10 pb-12">
          <div className="flex w-full justify-between items-end flex-wrap gap-8">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-mahogany text-[clamp(64px,9vw,140px)] leading-[0.8] tracking-[-0.03em] m-0"
            >
              The Rituals
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-left md:text-right max-w-[280px]"
            >
               <p className="font-editorial text-[10px] tracking-[0.2em] text-clay-warm uppercase mb-3">
                Authorised Dilmah Partner
              </p>
              <p className="font-body text-xs text-mahogany/70 leading-relaxed uppercase tracking-wider">
                Curated tea experiences designed to be consumed without haste.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Staggered Rows */}
        <div className="flex flex-col gap-24 md:gap-40 px-0 md:px-8">
          {rituals.map((ritual, idx) => (
            <div 
              key={idx}
              className={`flex flex-col ${ritual.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
            >
              {/* Image side */}
              <motion.div 
                className="w-full md:w-[45%] relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`absolute -top-12 ${ritual.align === 'right' ? '-right-8' : '-left-8'} text-[180px] leading-none font-display text-mahogany/5 italic z-0 select-none`}>
                  {ritual.num}
                </div>
                <div className="w-full aspect-[4/5] relative overflow-hidden z-10 transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src={ritual.image}
                    alt={ritual.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[0.3] sepia-[0.3]"
                  />
                  <div className="absolute inset-0 border border-mahogany/10 pointer-events-none mix-blend-multiply" />
                </div>
              </motion.div>
              
              {/* Text side */}
              <motion.div 
                className={`w-full md:w-[55%] flex flex-col ${ritual.align === 'right' ? 'items-start md:items-end md:text-right' : 'items-start text-left'}`}
                initial={{ opacity: 0, x: ritual.align === 'right' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-editorial text-[10px] tracking-[0.25em] text-clay-warm uppercase mb-6">
                  Experience {ritual.num}
                </p>
                <h3 className="font-display text-[44px] md:text-[56px] leading-[0.95] text-mahogany mb-8 tracking-tight">
                  {ritual.title}
                </h3>
                <p className="font-body text-mahogany-soft text-sm md:text-base leading-[1.8] max-w-[400px]">
                  {ritual.description}
                </p>
                <div className={`mt-10 flex flex-col ${ritual.align === 'right' ? 'items-start md:items-end' : 'items-start'}`}>
                   <div className="h-[1px] w-12 bg-mahogany/30 mb-4" />
                   <span className="font-editorial text-[9px] tracking-[0.2em] uppercase text-mahogany/60">
                     Available All Day
                   </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
