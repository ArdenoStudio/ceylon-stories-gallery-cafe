'use client';

import { HeroSection } from './ui/hero-section-2';
import { useReservation } from './ReservationProvider';

export default function Hero() {
  const { openReservation } = useReservation();

  return (
    <HeroSection
      slogan="Marine Drive · Colombo 03 · Gallery Café"
      title={
        <>
          Ceylon Tea.<br />
          Curated Art.<br />
          <span className="italic text-gold-leaf">Stay a little longer.</span>
        </>
      }
      subtitle="On Marine Drive, Ceylon Stories pairs single-estate Dilmah brews with rotating works by Sri Lanka's finest artists, warm plates, and the kind of afternoon you do not rush."
      hours="Open Daily · 8:00 AM — 10:00 PM"
      callToAction={{
        text: 'Reserve Your Table',
        onClick: openReservation,
      }}
      secondaryCallToAction={{
        text: 'Browse the Menu',
        href: '/menu',
      }}
      backgroundImage="https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=1920&auto=format&fit=crop"
      accentImage="/dilmah-logo.png"
      establishedYear="25"
      contactInfo={{
        website: 'ceylonstories.lk',
        phone: '+94 77 000 0000',
        address: 'Marine Drive, Colombo 03',
      }}
    />
  );
}
