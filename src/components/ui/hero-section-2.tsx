'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type Variants } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Motif } from '@/src/components/heritage/Motif';

const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gold-leaf">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gold-leaf">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gold-leaf">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: { url: string; alt: string; text?: string };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  hours?: string;
  callToAction: { text: string; href: string };
  secondaryCallToAction?: { text: string; href: string };
  backgroundImage: string;
  accentImage?: string;
  establishedYear?: string;
  contactInfo: { website: string; phone: string; address: string };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, hours, callToAction, secondaryCallToAction, backgroundImage, accentImage, establishedYear, contactInfo, ...props }, ref) => {

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
      },
    };

    const itemVariants: Variants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          'relative flex w-full min-h-[92vh] flex-col overflow-hidden bg-cream-page text-mahogany md:flex-row',
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...(props as React.ComponentProps<typeof motion.section>)}
      >
        {/* Left: Content */}
        <div className="relative flex w-full flex-col justify-between p-10 md:w-1/2 md:p-14 lg:w-3/5 lg:p-20">
          {/* Ghost anchor numeral (absolute, non-interactive) */}
          {establishedYear && (
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 top-36 hidden select-none font-display italic font-light leading-none text-gold-leaf/[0.08] xl:block xl:text-[240px] 2xl:text-[280px]"
            >
              {establishedYear}
            </span>
          )}

          <div className="relative">
            {/* Logo / brand header */}
            <motion.header className="mb-16" variants={itemVariants}>
              {logo ? (
                <div className="flex items-center">
                  <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                  <div>
                    {logo.text && <p className="font-display text-lg font-bold text-mahogany">{logo.text}</p>}
                    {slogan && <p className="font-editorial text-[10px] tracking-[0.3em] uppercase text-mahogany/50">{slogan}</p>}
                  </div>
                </div>
              ) : slogan ? (
                <p className="font-editorial text-[10px] tracking-[0.3em] uppercase text-mahogany/50 flex items-center gap-4">
                  <span className="w-6 h-[1px] bg-gold-leaf/40" />
                  {slogan}
                </p>
              ) : null}
            </motion.header>

            <motion.main variants={containerVariants}>
              <motion.h1
                className="font-display font-light text-[clamp(44px,7vw,96px)] leading-[0.92] tracking-[-0.02em] text-mahogany"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
              <motion.div className="my-8 h-[1px] w-16 bg-gold-leaf" variants={itemVariants} />
              <motion.p
                className="mb-8 max-w-md font-body text-base leading-relaxed text-mahogany/60"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>

              {hours && (
                <motion.p
                  className="mb-10 flex items-center gap-3 font-editorial text-[10px] tracking-[0.28em] uppercase text-mahogany/55"
                  variants={itemVariants}
                >
                  <span className="h-[1px] w-4 bg-gold-leaf/60" />
                  {hours}
                </motion.p>
              )}

              <motion.div
                className="flex flex-wrap items-center gap-x-8 gap-y-4"
                variants={itemVariants}
              >
                <a
                  href={callToAction.href}
                  target={callToAction.href.startsWith('http') ? '_blank' : undefined}
                  rel={callToAction.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group inline-flex items-center gap-3 rounded-full border border-gold-leaf px-7 py-3.5 font-editorial text-[11px] tracking-[0.28em] uppercase text-mahogany transition-colors duration-500 hover:bg-gold-leaf hover:text-cream-page"
                >
                  <span>{callToAction.text}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
                {secondaryCallToAction && (
                  <a
                    href={secondaryCallToAction.href}
                    target={secondaryCallToAction.href.startsWith('http') ? '_blank' : undefined}
                    rel={secondaryCallToAction.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="border-b border-mahogany/20 pb-0.5 font-editorial text-[10px] tracking-[0.28em] uppercase text-mahogany/60 transition-colors hover:border-gold-leaf hover:text-mahogany"
                  >
                    {secondaryCallToAction.text}
                  </a>
                )}
              </motion.div>
            </motion.main>
          </div>

          {/* Footer info */}
          <motion.footer className="relative mt-16 w-full" variants={itemVariants}>
            <div className="batik-line mb-6" />
            <div className="grid grid-cols-1 gap-4 font-editorial text-[10px] tracking-[0.12em] text-mahogany/50 sm:grid-cols-3">
              <div className="flex items-center">
                <InfoIcon type="website" />
                <span>{contactInfo.website}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="phone" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="address" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right: Layered image panel with clip-path reveal + ambient zoom */}
        <div className="relative w-full min-h-[50vh] md:w-1/2 md:my-10 lg:w-2/5 lg:my-14">
          {/* Primary image — clip-path reveal wrapping a slow-zoom layer */}
          <motion.div
            className="absolute inset-0 overflow-hidden bg-mahogany-soft"
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center photo-heritage-deep"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.06 }}
              transition={{ duration: 14, ease: 'linear', delay: 1.4 }}
            />
            {/* Botanical corner over image */}
            <Motif
              name="fern-frond"
              className="pointer-events-none absolute top-6 right-6 h-24 w-24 md:h-32 md:w-32 text-gold-leaf/40 z-10 scale-x-[-1]"
            />
            {/* Subtle darkening so any light image still reads */}
            <div className="absolute inset-0 bg-mahogany/10 mix-blend-multiply" />
          </motion.div>

          {/* Accent detail image — overlaps into the left panel for editorial depth */}
          {accentImage && (
            <motion.div
              className="absolute bottom-14 -left-10 z-10 hidden h-52 w-40 overflow-hidden shadow-ink md:block lg:bottom-20 lg:-left-16 lg:h-64 lg:w-48"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="h-full w-full bg-cover bg-center photo-heritage"
                style={{ backgroundImage: `url(${accentImage})` }}
              />
              <div className="pointer-events-none absolute inset-0 ring-[6px] ring-cream-page" />
            </motion.div>
          )}
        </div>
      </motion.section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
export { HeroSection };
