import * as React from 'react';

export type MotifName = 'tea-leaf' | 'frangipani' | 'fern-frond' | 'palm-arch' | 'laurel-half';

interface MotifProps extends React.SVGAttributes<SVGSVGElement> {
  name: MotifName;
}

const paths: Record<MotifName, { viewBox: string; content: React.ReactNode }> = {
  'tea-leaf': {
    viewBox: '0 0 120 120',
    content: (
      <>
        <path d="M60 108 C60 82 60 56 60 30" />
        <path d="M60 70 C42 68 30 56 26 40 C44 40 56 50 60 68" />
        <path d="M60 70 C78 68 90 56 94 40 C76 40 64 50 60 68" />
        <path d="M60 48 C46 46 36 36 32 22 C48 24 58 32 60 46" />
        <path d="M60 48 C74 46 84 36 88 22 C72 24 62 32 60 46" />
        <path d="M60 30 C54 22 52 16 54 10 C60 14 62 20 60 28" />
        <path d="M60 30 C66 22 68 16 66 10 C60 14 58 20 60 28" />
      </>
    ),
  },
  frangipani: {
    viewBox: '0 0 120 120',
    content: (
      <g transform="translate(60 60)">
        {[0, 72, 144, 216, 288].map((r) => (
          <path
            key={r}
            d="M0 -8 C-18 -6 -38 -4 -44 -18 C-46 -32 -34 -38 -22 -30 C-10 -22 -2 -12 0 -8 Z"
            transform={`rotate(${r})`}
          />
        ))}
        <circle r="5" />
        <circle r="1.5" fill="currentColor" />
      </g>
    ),
  },
  'fern-frond': {
    viewBox: '0 0 120 120',
    content: (
      <>
        <path d="M12 108 C18 86 28 64 46 48 C64 32 84 26 104 28 C102 46 92 64 76 76 C60 88 40 94 24 92" />
        <path d="M36 86 C34 76 38 68 46 62" />
        <path d="M48 74 C46 64 50 56 58 50" />
        <path d="M60 62 C58 52 62 44 70 38" />
        <path d="M72 52 C70 42 74 34 82 30" />
        <path d="M28 94 C26 84 30 76 38 70" />
        <path d="M84 44 C82 36 86 30 94 28" />
        <circle cx="104" cy="28" r="2.5" />
      </>
    ),
  },
  'palm-arch': {
    viewBox: '0 0 240 120',
    content: (
      <>
        <path d="M120 110 C120 90 120 60 120 30" />
        <path d="M120 30 C86 34 54 50 30 74 C48 80 70 82 92 78 C108 74 118 66 120 56" />
        <path d="M120 30 C154 34 186 50 210 74 C192 80 170 82 148 78 C132 74 122 66 120 56" />
        <path d="M120 40 C100 42 78 50 60 62" />
        <path d="M120 40 C140 42 162 50 180 62" />
        <path d="M120 52 C106 54 90 60 76 68" />
        <path d="M120 52 C134 54 150 60 164 68" />
        <path d="M120 66 C112 68 102 72 94 76" />
        <path d="M120 66 C128 68 138 72 146 76" />
      </>
    ),
  },
  'laurel-half': {
    viewBox: '0 0 60 120',
    content: (
      <>
        <path d="M54 10 C40 30 30 55 32 100" />
        <path d="M50 22 C42 24 36 30 34 38" />
        <path d="M46 36 C38 38 32 44 30 52" />
        <path d="M42 50 C34 52 28 58 28 66" />
        <path d="M40 64 C32 66 28 72 28 80" />
        <path d="M38 78 C32 80 30 86 30 92" />
        <circle cx="32" cy="100" r="2" />
      </>
    ),
  },
};

export function Motif({ name, className, ...rest }: MotifProps) {
  const { viewBox, content } = paths[name];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      {content}
    </svg>
  );
}
