import * as React from 'react';

export type MotifName = 'tea-leaf' | 'frangipani' | 'fern-frond' | 'palm-arch' | 'laurel-half';

interface MotifProps extends React.SVGAttributes<SVGSVGElement> {
  name: MotifName;
}

const paths: Record<MotifName, { viewBox: string; content: React.ReactNode }> = {
  'tea-leaf': {
    viewBox: '0 0 120 120',
    content: (
      <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {/* Main stem - slightly curved, not straight */}
        <path d="M60 106 Q58 70 60 32" />
        {/* Left leaf - asymmetric, hand-drawn feel */}
        <path d="M60 72 Q44 68 28 44 Q52 44 58 64" />
        <path d="M58 64 Q50 58 36 36" />
        {/* Right leaf - bigger, different curve */}
        <path d="M60 72 Q76 66 92 42 Q68 48 60 66" />
        <path d="M60 66 Q68 56 80 30" />
        {/* Top left */}
        <path d="M60 50 Q48 46 34 26" />
        {/* Top right */}
        <path d="M60 50 Q72 44 86 24" />
        {/* Tip */}
        <path d="M60 32 Q58 20 56 12" />
        <path d="M60 32 Q64 18 68 10" />
      </g>
    ),
  },
  frangipani: {
    viewBox: '0 0 120 120',
    content: (
      <g fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round">
        {/* Asymmetric petals - not perfectly radial */}
        <path d="M60 58 Q52 48 46 36 Q56 44 60 52" />
        <path d="M60 58 Q68 44 78 32 Q66 46 60 54" />
        <path d="M60 58 Q72 56 88 48 Q70 58 60 60" />
        <path d="M60 60 Q68 72 80 86 Q66 70 60 62" />
        <path d="M60 60 Q52 74 42 88 Q54 72 60 62" />
        {/* Center - slightly off */}
        <circle cx="59" cy="59" r="4" stroke="none" fill="currentColor" fillOpacity={0.3} />
        <circle cx="59" cy="59" r="1.5" stroke="none" fill="currentColor" />
      </g>
    ),
  },
  'fern-frond': {
    viewBox: '0 0 120 120',
    content: (
      <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
        {/* Main stem - gentle curve, not straight */}
        <path d="M14 106 Q20 80 42 52 Q62 34 102 28" />
        {/* Left side fronds - varied spacing and length */}
        <path d="M38 88 Q36 80 40 74" />
        <path d="M50 76 Q46 66 52 58" />
        <path d="M62 64 Q58 54 64 46" />
        <path d="M74 54 Q70 44 78 38" />
        <path d="M30 94 Q28 86 34 80" />
        {/* Right side fronds */}
        <path d="M86 42 Q84 34 92 28" />
        {/* Tip - slight variation */}
        <circle cx="102" cy="28" r="2" stroke="none" fill="currentColor" fillOpacity={0.25} />
      </g>
    ),
  },
  'palm-arch': {
    viewBox: '0 0 240 120',
    content: (
      <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        {/* Stem - not perfectly straight */}
        <path d="M120 108 Q118 80 120 32" />
        {/* Left arch - varied curve */}
        <path d="M120 32 Q88 36 54 72 Q66 80 90 78 Q108 74 118 64" />
        <path d="M118 48 Q100 52 80 62" />
        <path d="M118 60 Q108 64 98 70" />
        {/* Right arch - slightly different */}
        <path d="M120 32 Q152 34 186 70 Q174 80 150 76 Q132 72 122 62" />
        <path d="M122 48 Q140 50 160 60" />
        <path d="M122 60 Q132 62 142 68" />
      </g>
    ),
  },
  'laurel-half': {
    viewBox: '0 0 60 120',
    content: (
      <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round">
        {/* Main stem - hand-drawn curve */}
        <path d="M52 12 Q44 32 36 56 Q32 80 30 102" />
        {/* Leaves - varied sizes and positions */}
        <path d="M48 24 Q42 26 36 32" />
        <path d="M44 38 Q38 40 32 46" />
        <path d="M40 52 Q34 54 30 60" />
        <path d="M38 66 Q32 68 28 74" />
        <path d="M36 80 Q30 82 28 88" />
        <path d="M34 94 Q30 96 28 102" />
        <circle cx="28" cy="104" r="1.5" stroke="none" fill="currentColor" fillOpacity={0.3} />
      </g>
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
      strokeWidth={1.5}
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
