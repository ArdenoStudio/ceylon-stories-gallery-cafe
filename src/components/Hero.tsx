'use client';

import { HeroSection } from './ui/hero-section-2';
import { useReservation } from './ReservationProvider';
import { heroContent } from '@/src/content/hero';

export default function Hero() {
  const { openReservation } = useReservation();
  const c = heroContent;

  return (
    <HeroSection
      slogan={c.slogan}
      title={
        <>
          {c.title.line1}
          <br />
          {c.title.line2}
        </>
      }
      tagline={c.tagline}
      subtitle={c.subtitle}
      hours={c.hours.label}
      liveHours={{
        openHour: c.hours.open,
        closeHour: c.hours.close,
        openLabel: c.hours.openNowLabel,
        closedLabel: c.hours.closedLabel,
        timezone: c.hours.timezone,
      }}
      callToAction={{
        text: c.primaryCta,
        onClick: openReservation,
      }}
      secondaryCallToAction={c.secondaryCta}
      backgroundImage={c.background}
      panelImage={c.panel.image}
      panelImageAlt={c.panel.alt}
      accentImage={c.panel.logo}
      accentImageAlt={c.panel.logoAlt}
      establishedYear={c.established.display}
      establishedPrefix={c.established.prefix}
      contactInfo={c.contact}
    />
  );
}
