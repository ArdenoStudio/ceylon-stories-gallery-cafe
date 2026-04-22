'use client';

import { HeroSection } from './ui/hero-section-2';

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
      hours="Open Daily · 8 AM — 10 PM"
      callToAction={{
        text: 'Reserve a Table',
        href: 'https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation.',
      }}
      secondaryCallToAction={{
        text: 'View the Menu',
        href: '#menu',
      }}
      backgroundImage="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1400&auto=format&fit=crop"
      accentImage="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=600&auto=format&fit=crop"
      establishedYear="24"
      contactInfo={{
        website: 'ceylonstories.lk',
        phone: '+94 77 000 0000',
        address: 'Marine Drive, Colombo 03',
      }}
    />
  );
}
