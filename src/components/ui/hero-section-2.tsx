'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { motion, type Variants, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Globe, MapPin, Phone } from 'lucide-react';
import { Motif } from '@/src/components/heritage/Motif';
import { TiltCard } from './tilt-card';

const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const Icon = { website: Globe, phone: Phone, address: MapPin }[type];
  return (
    <div className="mr-2 flex-shrink-0">
      <Icon className="h-4 w-4 text-gold-leaf" strokeWidth={1.75} />
    </div>
  );
};

interface LiveHours {
  openHour: number;
  closeHour: number;
  openLabel: string;
  closedLabel: string;
  timezone?: string;
}

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: { url: string; alt: string; text?: string };
  slogan?: string;
  title: React.ReactNode;
  tagline?: string;
  subtitle: string;
  hours?: string;
  liveHours?: LiveHours;
  callToAction: { text: string; href?: string; onClick?: () => void };
  secondaryCallToAction?: { text: string; href: string };
  backgroundImage: string;
  panelImage?: string;
  panelImageAlt?: string;
  accentImage?: string;
  accentImageAlt?: string;
  establishedYear?: string;
  establishedPrefix?: string;
  contactInfo: { website: string; phone: string; address: string };
}

function useLiveOpenStatus(live: LiveHours | undefined) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!live) return;
    const compute = () => {
      const fmt = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: live.timezone ?? 'Asia/Colombo',
      });
      const hour = parseInt(fmt.format(new Date()), 10);
      setIsOpen(hour >= live.openHour && hour < live.closeHour);
    };
    compute();
    setMounted(true);
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [live]);

  return { mounted, isOpen };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      logo,
      slogan,
      title,
      tagline,
      subtitle,
      hours,
      liveHours,
      callToAction,
      secondaryCallToAction,
      backgroundImage,
      panelImage,
      panelImageAlt,
      accentImage,
      accentImageAlt,
      establishedYear,
      establishedPrefix,
      contactInfo,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldOpenExternally = (href: string) => href.startsWith('http');
    const { mounted: hoursMounted, isOpen } = useLiveOpenStatus(liveHours);

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.18 },
      },
    };

    const itemVariants: Variants = {
      hidden: prefersReducedMotion ? { opacity: 0 } : { y: 18, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
      },
    };

    const panelVariants: Variants = {
      hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 32, rotate: -1.5 },
      visible: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
      },
    };

    const hoursLabel = liveHours && hoursMounted
      ? (isOpen ? liveHours.openLabel : liveHours.closedLabel)
      : hours;
    const hoursDotClass = liveHours && hoursMounted
      ? (isOpen ? 'bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)]' : 'bg-mahogany/30')
      : 'bg-gold-leaf';

    const scrollDown = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          'relative isolate flex w-full min-h-[100svh] flex-col overflow-hidden bg-cream-page text-mahogany',
          className,
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...(props as React.ComponentProps<typeof motion.section>)}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_120%_at_15%_0%,rgba(245,237,220,0.95)_0%,rgba(244,236,220,0.84)_38%,rgba(228,214,186,0.8)_100%)]" />
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          initial={prefersReducedMotion ? { opacity: 0.45 } : { opacity: 0.2, scale: 1.05 }}
          animate={prefersReducedMotion ? { opacity: 0.45 } : { opacity: 0.45, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(244,236,220,0.06)_0%,rgba(244,236,220,0.18)_45%,rgba(42,24,16,0.2)_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-[58%] hidden w-px bg-gradient-to-b from-transparent via-gold-leaf/30 to-transparent lg:block" />

        <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1720px] grid-cols-1 lg:grid-cols-12">
          <div className="relative flex flex-col px-6 pb-10 pt-28 sm:px-10 lg:col-span-7 lg:px-[clamp(48px,6vw,124px)] lg:pb-14 lg:pt-36">
            {establishedYear && (
              <span
                aria-hidden
                className="pointer-events-none absolute right-2 top-28 select-none font-display text-[110px] italic font-light leading-none text-gold-leaf/[0.09] sm:text-[150px] lg:right-8 lg:top-32 lg:text-[230px]"
              >
                {establishedYear}
              </span>
            )}

            <motion.header className="relative mb-12 flex items-center justify-between gap-6 lg:mb-16" variants={itemVariants}>
              <div className="flex flex-col gap-3">
                {logo ? (
                  <div className="flex items-center gap-3">
                    <Image src={logo.url} alt={logo.alt} width={120} height={32} className="h-8 w-auto opacity-90" />
                    {logo.text ? (
                      <span className="font-editorial text-[11px] uppercase tracking-[0.24em] text-mahogany/70">{logo.text}</span>
                    ) : null}
                  </div>
                ) : (
                  <span className="font-display text-[20px] tracking-[0.04em] text-mahogany">CEYLON STORIES</span>
                )}
                {slogan ? (
                  <p className="font-editorial text-[10px] uppercase tracking-[0.28em] text-mahogany/55">
                    {slogan}
                  </p>
                ) : null}
                {establishedPrefix && establishedYear ? (
                  <span className="sr-only">{`${establishedPrefix} ${establishedYear}`}</span>
                ) : null}
              </div>
            </motion.header>

            <motion.div className="relative max-w-[900px]" variants={containerVariants}>
              <motion.h1
                className="font-display text-[clamp(50px,8vw,118px)] font-light leading-[0.88] tracking-[-0.03em] text-mahogany"
                variants={itemVariants}
              >
                {title}
              </motion.h1>

              {tagline ? (
                <motion.p
                  className="mt-2 font-display text-[clamp(50px,8vw,118px)] font-light italic leading-[0.88] tracking-[-0.03em] text-gold-leaf"
                  variants={itemVariants}
                >
                  {tagline}
                </motion.p>
              ) : null}

              <motion.div
                className="my-8 h-px w-24 bg-gradient-to-r from-gold-leaf/0 via-gold-leaf/90 to-gold-leaf/20 lg:my-10"
                variants={itemVariants}
              />

              <motion.p
                className="max-w-[58ch] font-body text-[16px] leading-[1.75] text-mahogany/72 lg:text-[18px]"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>

              {hoursLabel ? (
                <motion.p
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-mahogany/15 bg-cream-paper/65 px-5 py-2.5 font-editorial text-[10px] uppercase tracking-[0.24em] text-mahogany/60 backdrop-blur-sm"
                  variants={itemVariants}
                  aria-live={liveHours ? 'polite' : undefined}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', hoursDotClass)} />
                  {hoursLabel}
                </motion.p>
              ) : null}

              <motion.div className="mt-10 flex flex-wrap items-center gap-4" variants={itemVariants}>
                {callToAction.href ? (
                  <a
                    href={callToAction.href}
                    onClick={callToAction.onClick}
                    target={shouldOpenExternally(callToAction.href) ? '_blank' : undefined}
                    rel={shouldOpenExternally(callToAction.href) ? 'noreferrer' : undefined}
                    className="group inline-flex items-center gap-3 border border-gold-leaf/80 bg-gold-leaf px-7 py-3.5 font-editorial text-[11px] uppercase tracking-[0.24em] text-ink-deep transition-colors duration-500 hover:bg-mahogany hover:text-cream-page"
                  >
                    <span>{callToAction.text}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={callToAction.onClick}
                    className="group inline-flex items-center gap-3 border border-gold-leaf/80 bg-gold-leaf px-7 py-3.5 font-editorial text-[11px] uppercase tracking-[0.24em] text-ink-deep transition-colors duration-500 hover:bg-mahogany hover:text-cream-page"
                  >
                    <span>{callToAction.text}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </button>
                )}
                {secondaryCallToAction ? (
                  <a
                    href={secondaryCallToAction.href}
                    target={shouldOpenExternally(secondaryCallToAction.href) ? '_blank' : undefined}
                    rel={shouldOpenExternally(secondaryCallToAction.href) ? 'noreferrer' : undefined}
                    className="group inline-flex items-center gap-3 border border-mahogany/30 bg-transparent px-7 py-3.5 font-editorial text-[11px] uppercase tracking-[0.24em] text-mahogany transition-colors duration-500 hover:border-mahogany hover:bg-mahogany/5"
                  >
                    <span>{secondaryCallToAction.text}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gold-leaf transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                ) : null}
              </motion.div>
            </motion.div>

            <motion.footer className="relative mt-auto pt-12 lg:pt-14" variants={itemVariants}>
              <div className="mb-7 h-px w-full bg-gradient-to-r from-mahogany/10 via-mahogany/25 to-transparent" />
              <div className="grid grid-cols-1 gap-4 text-mahogany/58 sm:grid-cols-3">
                <div className="flex items-center">
                  <InfoIcon type="website" />
                  <span className="font-editorial text-[10px] uppercase tracking-[0.17em]">{contactInfo.website}</span>
                </div>
                <div className="flex items-center">
                  <InfoIcon type="phone" />
                  <span className="font-editorial text-[10px] uppercase tracking-[0.17em]">{contactInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <InfoIcon type="address" />
                  <span className="font-editorial text-[10px] uppercase tracking-[0.17em]">{contactInfo.address}</span>
                </div>
              </div>
            </motion.footer>
          </div>

          <div className="relative flex min-h-[48vh] items-center px-6 pb-10 sm:px-10 lg:col-span-5 lg:min-h-[100svh] lg:px-[clamp(16px,2.5vw,52px)] lg:pb-10 lg:pt-9">
            <motion.div
              role="img"
              aria-label={panelImageAlt ?? 'Featured pairing'}
              className="relative isolate w-full overflow-hidden border border-gold-leaf/35 bg-ink-deep/65 shadow-[0_24px_70px_rgba(25,14,9,0.32)]"
              variants={panelVariants}
            >
              <div className="aspect-[16/10] w-full sm:aspect-[5/4] lg:aspect-[3/4]" />
              {panelImage ? (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
                  animate={
                    prefersReducedMotion
                      ? { scale: 1 }
                      : { scale: [1.04, 1.09, 1.04], x: [0, -6, 0], y: [0, -3, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 22, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
                  }
                >
                  <Image
                    src={panelImage}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    quality={75}
                    className="object-cover"
                    style={{ filter: 'sepia(0.18) saturate(0.9) contrast(1.05)' }}
                  />
                </motion.div>
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_15%,rgba(248,240,221,0.14)_0%,rgba(31,18,12,0.72)_100%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,8,5,0.12)_0%,rgba(15,8,5,0.6)_70%,rgba(15,8,5,0.82)_100%)]" />
              <Motif
                name="palm-arch"
                className="pointer-events-none absolute right-3 top-3 h-24 w-24 text-gold-leaf/35 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
              <Motif
                name="fern-frond"
                className="pointer-events-none absolute bottom-6 left-5 h-20 w-20 rotate-[12deg] text-cream-page/30 sm:h-24 sm:w-24"
              />
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                variants={itemVariants}
              >
                <div className="relative border border-gold-leaf/50 bg-gradient-to-b from-ink-night/72 via-ink-night/68 to-ink-deep/85 px-6 py-5 backdrop-blur-[4px] shadow-[0_22px_52px_rgba(10,6,4,0.55)]">
                  <div aria-hidden className="pointer-events-none absolute inset-[5px] border border-cream-page/10" />
                  <span aria-hidden className="pointer-events-none absolute -left-[3px] -top-[3px] h-2.5 w-2.5 border-l-2 border-t-2 border-gold-leaf" />
                  <span aria-hidden className="pointer-events-none absolute -right-[3px] -top-[3px] h-2.5 w-2.5 border-r-2 border-t-2 border-gold-leaf" />
                  <span aria-hidden className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-2.5 w-2.5 border-b-2 border-l-2 border-gold-leaf" />
                  <span aria-hidden className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-2.5 w-2.5 border-b-2 border-r-2 border-gold-leaf" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5">
                        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold-leaf/80" />
                        <p className="font-editorial text-[9px] uppercase tracking-[0.38em] text-gold-leaf/95">Now Pouring</p>
                      </div>
                      <p className="mt-2.5 font-display text-[clamp(20px,2.9vw,36px)] leading-[1.05] text-cream-page">
                        Dilmah <span style={{ fontStyle: 'italic' }} className="text-gold-leaf">Reserve</span> Pairings
                      </p>
                    </div>
                    {accentImage && (
                      <>
                        <span aria-hidden className="hidden h-14 w-px bg-gradient-to-b from-transparent via-gold-leaf/45 to-transparent sm:block" />
                        <TiltCard tiltLimit={10} scale={1.05} effect="gravitate" spotlight={false} className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                          <Image
                            src={accentImage}
                            alt={accentImageAlt ?? 'Featured brand'}
                            width={64}
                            height={64}
                            className="h-full w-full object-contain drop-shadow-[0_6px_18px_rgba(184,146,74,0.45)]"
                          />
                        </TiltCard>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {!prefersReducedMotion && (
          <motion.button
            type="button"
            onClick={scrollDown}
            aria-label="Scroll to next section"
            className="group absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-mahogany/55 transition-colors duration-500 hover:text-mahogany lg:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <span className="font-editorial text-[9px] uppercase tracking-[0.32em]">Scroll</span>
            <motion.span
              aria-hidden
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-4 w-4 text-gold-leaf" />
            </motion.span>
          </motion.button>
        )}
      </motion.section>
    );
  },
);

HeroSection.displayName = 'HeroSection';
export { HeroSection };
