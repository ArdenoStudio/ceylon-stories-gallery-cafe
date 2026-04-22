'use client';

import { HeroSection } from '@/components/ui/hero-section-2';

export default function Hero() {
  return (
    <HeroSection
      slogan="Colombo · Sri Lanka · Gallery Café"
      title={
        <>
          Tea. Art.<br />
          <span className="italic text-gold-leaf">Slow down.</span>
        </>
      }
      subtitle="A gallery café on Marine Drive where Ceylon tea meets curated art — and every cup comes with a story worth staying for."
      callToAction={{
        text: 'Reserve a Table',
        href: 'https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation.',
      }}
      backgroundImage="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1400&auto=format&fit=crop"
      contactInfo={{
        website: 'ceylonstories.lk',
        phone: '+94 77 000 0000',
        address: 'Marine Drive, Colombo 03',
      }}
    />
  );
}
