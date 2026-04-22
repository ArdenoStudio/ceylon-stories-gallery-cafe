import { Motif, type MotifName } from './Motif';
import { cn } from '@/src/lib/utils';

interface Props {
  motif?: MotifName;
  position?: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  className?: string;
}

const positionClass = {
  tl: 'top-6 left-6',
  tr: 'top-6 right-6 scale-x-[-1]',
  bl: 'bottom-6 left-6 scale-y-[-1]',
  br: 'bottom-6 right-6 scale-x-[-1] scale-y-[-1]',
} as const;

export function MotifCorner({ motif = 'fern-frond', position = 'tr', size = 96, className }: Props) {
  return (
    <Motif
      name={motif}
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        'pointer-events-none absolute select-none',
        positionClass[position],
        className,
      )}
    />
  );
}
