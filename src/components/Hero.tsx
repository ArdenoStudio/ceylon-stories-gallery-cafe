'use client';

import { HeroSection } from './ui/hero-section-2';

export default function Hero() {
  return (
    <HeroSection
      slogan="Marine Drive · Colombo 03 · Gallery Cafe"
      title={
        <>
          Ceylon Tea.<br />
          Curated Art.<br />
          <span className="italic text-gold-leaf">Stay a little longer.</span>
        </>
      }
      subtitle="On Marine Drive, Ceylon Stories pairs single-estate brews with rotating works, warm plates, and the kind of afternoon you do not rush."
      hours="Open Daily · 8:00 AM — 10:00 PM"
      callToAction={{
        text: 'Reserve Your Table',
        href: 'https://wa.me/94770000000?text=Hi%20Ceylon%20Stories%2C%20I%27d%20like%20to%20make%20a%20reservation.',
      }}
      secondaryCallToAction={{
        text: 'Browse the Menu',
        href: '#menu',
      }}
      backgroundImage="/dilmah-bg.png"
      accentImage="/dilmah-logo.png"
      establishedYear="24"
      contactInfo={{
        website: 'ceylonstories.lk',
        phone: '+94 77 000 0000',
        address: 'Marine Drive, Colombo 03',
      }}
    />
  );
}
