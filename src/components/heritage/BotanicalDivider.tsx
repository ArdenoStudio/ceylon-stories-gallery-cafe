import { Motif, type MotifName } from './Motif';
import { cn } from '@/src/lib/utils';

interface Props {
  motif?: MotifName;
  className?: string;
  tone?: 'warm' | 'light' | 'dark';
}

const toneClass = {
  warm: 'text-clay-warm',
  light: 'text-cream-paper/70',
  dark: 'text-mahogany/60',
} as const;

const ruleBg = {
  warm: 'bg-clay-warm/30',
  light: 'bg-cream-paper/30',
  dark: 'bg-mahogany/25',
} as const;

export function BotanicalDivider({ motif = 'tea-leaf', className, tone = 'dark' }: Props) {
  return (
    <div className={cn('flex w-full items-center gap-4', className)} aria-hidden>
      <span className={cn('h-px flex-1', ruleBg[tone])} />
      <Motif name={motif} className={cn('h-8 w-8 shrink-0', toneClass[tone])} />
      <span className={cn('h-px flex-1', ruleBg[tone])} />
    </div>
  );
}
