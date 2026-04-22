import { cn } from '@/src/lib/utils';

type Position = 'tl' | 'tr' | 'bl' | 'br';
type Blend = 'multiply' | 'screen';

interface BotanicalIllustrationProps {
  src: string;
  alt?: string;
  position?: Position;
  size?: number;
  className?: string;
  blend?: Blend;
}

const positionClass: Record<Position, string> = {
  tl: 'top-0 left-0',
  tr: 'top-0 right-0',
  bl: 'bottom-0 left-0',
  br: 'bottom-0 right-0',
};

/**
 * Displays a real vintage botanical illustration (JPG/PNG) as an
 * absolutely-positioned decorative accent.
 *
 * On cream/light backgrounds use blend="multiply" — the white background
 * of the print vanishes and only the illustration remains.
 * On dark backgrounds use blend="screen" to preserve the light linework.
 */
export function BotanicalIllustration({
  src,
  alt = '',
  position = 'tr',
  size = 320,
  className,
  blend = 'multiply',
}: BotanicalIllustrationProps) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt || undefined}
      style={{ width: size, height: size }}
      className={cn(
        'pointer-events-none absolute select-none object-contain',
        blend === 'multiply' ? 'mix-blend-multiply' : 'mix-blend-screen',
        positionClass[position],
        className,
      )}
    />
  );
}
