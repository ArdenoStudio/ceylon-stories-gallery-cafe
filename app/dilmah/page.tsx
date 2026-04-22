'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { HeritageHeading } from '@/src/components/heritage/HeritageHeading';
import { BotanicalDivider } from '@/src/components/heritage/BotanicalDivider';
import { MotifCorner } from '@/src/components/heritage/MotifCorner';
import { MenuItemCard } from '@/src/components/ui/menu-item-card';

const dilmahTeas = [
  {
    name: 'Silver Tips Reserve',
    description: "Nuwara Eliya's rarest leaves harvested once a year at dawn. Steeped at exactly 75°C. No additions.",
    tag: 'Featured',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&q=80',
    price: 1800,
    originalPrice: 2200,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  {
    name: 'Ceylon Single Estate',
    description: 'A full-bodied Dimbula black — clean tannins, golden liquor. Served with pure kithul jaggery.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop&q=80',
    price: 1200,
    originalPrice: 1500,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  {
    name: 'High Grown Green',
    description: 'Delicate Uda Pussellawa green, light-steamed, served in a Japanese-style ceramic cup at 70°C.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop&q=80',
    price: 1100,
    originalPrice: 1400,
    quantity: 'Per Pot',
    prepTimeInMinutes: 7,
  },
  {
    name: 'Gallery Chai',
    description: 'Our signature blend — black Ceylon, cardamom, cinnamon, and clove — served in hand-thrown terracotta cups.',
    tag: 'House Blend',
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop&q=80',
    price: 950,
    originalPrice: 1200,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
  {
    name: 'Silver Needles White',
    description: 'Rare white tea from the hill country — unopened buds only. Whisper-light and naturally sweet.',
    tag: '',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
    price: 1600,
    originalPrice: 2000,
    quantity: 'Per Pot',
    prepTimeInMinutes: 8,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const pillars = [
  {
    label: 'Single Estate Sourced',
    body: 'Every leaf traceable to one garden — not a blend of convenience, but a promise of provenance.',
  },
  {
    label: 'Strict Steeping Protocols',
    body: 'Temperature, timing, and vessel are non-negotiable. Each tea is prepared exactly as Dilmah prescribes.',
  },
  {
    label: 'Authorised Partner',
    body: 'Ceylon Stories is a certified Dilmah partner — meaning you drink the same tea served at the source.',
  },
];

export default function DilmahPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative w-full bg-mahogany text-cream-page pt-40 pb-24 px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">
            D
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row md:items-end gap-12 md:gap-20"
          >
            <div className="flex-1">
              <motion.p
                variants={itemVariants}
                className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-gold-leaf/50" /> Brand Partner — Dilmah Tea
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]"
              >
                Ceylon&apos;s Finest,
                <br />
                <i className="text-clay-warm">Since 1988.</i>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="font-editorial text-cream-page/60 text-sm leading-relaxed mt-8 max-w-md"
              >
                Grown, made &amp; packed in Sri Lanka. Dilmah is not a commodity — it is a family&apos;s
                life work, and a nation&apos;s most honest export.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/menu"
                  className="font-editorial text-[10px] tracking-[0.2em] uppercase px-6 py-3 bg-gold-leaf text-mahogany hover:bg-gold-leaf/80 transition-colors duration-300"
                >
                  See the Tea Menu
                </Link>
                <Link
                  href="/contact"
                  className="font-editorial text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-cream-page/30 text-cream-page hover:border-cream-page/70 transition-colors duration-300"
                >
                  Reserve a Table
                </Link>
              </motion.div>
            </div>

            {/* Dilmah logo */}
            <motion.div
              variants={itemVariants}
              className="shrink-0 flex flex-col items-center gap-4"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 photo-heritage rounded-sm overflow-hidden shadow-ornament">
                <Image
                  src="/dilmah-logo.svg"
                  alt="Dilmah Tea logo"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
              <p className="font-editorial text-[9px] tracking-[0.2em] uppercase text-cream-page/40">
                Authorised Partner
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── The Dilmah Story ───────────────────────────────────────── */}
      <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
        <MotifCorner motif="fern-frond" position="tr" size={120} className="text-mahogany/8 opacity-30" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
            {/* Text */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeritageHeading eyebrow="A Family's Promise" tone="dark" align="left">
                More Than
                <br />
                a Brand
              </HeritageHeading>

              <div className="mt-10 space-y-5 font-body text-sm text-mahogany/70 leading-[1.9] max-w-prose">
                <p>
                  In 1988, Merrill J. Fernando did something no one in the tea world had done before: he
                  refused to sell his tea to a blending company. Instead, he packed it himself — in Sri
                  Lanka — and shipped it directly to the world. He called it Dilmah. The name joined
                  those of his two sons, Dilhan and Malik. It was never just a business. It was a statement.
                </p>
                <p>
                  The global tea trade had long stripped Ceylon of its identity. Leaves from a dozen
                  countries were blended, stamped with British names, and sold as &quot;tea.&quot; Dilmah broke that
                  chain. Every cup of Dilmah is single-estate — one garden, one harvest, one character.
                  What you taste is a place, not a formula.
                </p>
                <p>
                  Dilmah&apos;s philosophy extends beyond the leaf. The MJF Charitable Foundation, funded
                  entirely through tea sales, has built schools, hospitals, and livelihoods across Sri
                  Lanka&apos;s tea-growing communities for over three decades. Choosing Dilmah is not a small
                  act.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=1000&fit=crop&q=80"
                  alt="Ceylon tea estate — misty hill country"
                  fill
                  className="object-cover photo-heritage"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mahogany/40 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 font-editorial text-[9px] tracking-[0.2em] uppercase text-cream-page/70">
                  Ceylon Hill Country
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20">
          <BotanicalDivider motif="tea-leaf" tone="dark" />
        </div>
      </section>

      {/* ── What It Means to Ceylon Stories ───────────────────────── */}
      <section className="relative w-full bg-mahogany py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute bottom-0 right-[-8%] font-display italic text-[22vw] text-mahogany-soft/20 leading-none">
            tea
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-display font-light italic text-[clamp(28px,4vw,52px)] text-cream-page leading-[1.15] tracking-[-0.01em]">
              &ldquo;At Ceylon Stories, we serve Dilmah not because it is convenient — but because it is
              Ceylon.&rdquo;
            </span>
          </motion.blockquote>

          {/* Three pillars */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-cream-page/10"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.label}
                variants={itemVariants}
                className="bg-mahogany px-8 py-10 flex flex-col gap-4"
              >
                <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-gold-leaf">
                  {pillar.label}
                </p>
                <p className="font-body text-sm text-cream-page/60 leading-[1.8]">{pillar.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 relative z-10">
          <BotanicalDivider motif="tea-leaf" tone="light" />
        </div>
      </section>

      {/* ── Our Dilmah Selection ───────────────────────────────────── */}
      <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <HeritageHeading eyebrow="The Selection" tone="dark" align="center">
              Five Teas,
              <br />
              Five Terroirs
            </HeritageHeading>
            <p className="font-body text-sm text-mahogany/60 leading-relaxed text-center max-w-xl mx-auto mt-6">
              Each pot prepared to Dilmah&apos;s exact steeping guidelines — correct temperature, correct
              timing, correct vessel. No shortcuts.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {dilmahTeas.map((tea) => (
              <motion.div key={tea.name} variants={itemVariants}>
                <MenuItemCard
                  imageUrl={tea.imageUrl}
                  isVegetarian
                  name={tea.name}
                  price={tea.price}
                  originalPrice={tea.originalPrice}
                  quantity={tea.quantity}
                  prepTimeInMinutes={tea.prepTimeInMinutes}
                  tag={tea.tag}
                  onAdd={() => {}}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-warm hover:text-mahogany transition-colors duration-300 inline-flex items-center gap-3"
            >
              See the full menu
              <span className="w-8 h-[1px] bg-current" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Visit & Reserve ────────────────────────────────────────── */}
      <section className="relative w-full bg-mahogany py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/10" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6">
            Experience It in Person
          </p>
          <h2 className="font-display font-light text-cream-page text-[clamp(40px,5.5vw,80px)] leading-[0.9] tracking-[-0.02em]">
            The tea selection
            <br />
            <i className="text-clay-warm">awaits you.</i>
          </h2>
          <p className="font-body text-sm text-cream-page/50 leading-relaxed mt-8 max-w-md mx-auto">
            Reserve a table and let us guide you through the selection. Or simply walk in — the kettle
            is always on.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase px-8 py-4 bg-gold-leaf text-mahogany hover:bg-gold-leaf/80 transition-colors duration-300"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="font-editorial text-[10px] tracking-[0.2em] uppercase px-8 py-4 border border-cream-page/30 text-cream-page hover:border-cream-page/70 transition-colors duration-300"
            >
              Explore the Menu
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
