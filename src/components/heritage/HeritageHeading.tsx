import * as React from 'react';
import { Motif } from './Motif';
import { cn } from '@/src/lib/utils';

interface Props {
  children: React.ReactNode;
  eyebrow?: React.ReactNode;
  className?: string;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
}

export function HeritageHeading({
  children,
  eyebrow,
  className,
  tone = 'dark',
  align = 'left',
}: Props) {
  const laurelColor = tone === 'dark' ? 'text-clay-warm/70' : 'text-gold-leaf/80';
  const eyebrowColor = tone === 'dark' ? 'text-clay-warm' : 'text-gold-leaf';
  const headingColor = tone === 'dark' ? 'text-mahogany' : 'text-cream-page';

  return (
    <div className={cn('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && (
        <p className={cn('font-editorial text-[10px] tracking-[0.25em] uppercase mb-4', eyebrowColor)}>
          {eyebrow}
        </p>
      )}
      <div className={cn('flex items-end gap-4 md:gap-6', align === 'center' ? 'justify-center' : '')}>
        <Motif name="laurel-half" className={cn('hidden sm:block h-14 w-7 md:h-20 md:w-10 shrink-0', laurelColor)} />
        <h2 className={cn('font-display font-light leading-[0.9] tracking-[-0.02em] text-[clamp(40px,5.5vw,80px)] m-0', headingColor)}>
          {children}
        </h2>
        <Motif name="laurel-half" className={cn('hidden sm:block h-14 w-7 md:h-20 md:w-10 shrink-0 scale-x-[-1]', laurelColor)} />
      </div>
    </div>
  );
}
