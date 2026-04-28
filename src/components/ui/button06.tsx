'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Button06Props {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Button06 = ({ text = 'Reserve Your Table', href, onClick, className }: Button06Props) => {
  const inner = (
    <>
      <span className="button06_bg" aria-hidden />
      <span className="button06_text">{text}</span>
      <ArrowRight className="button06_arrow" aria-hidden strokeWidth={1.6} />
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cn('button06 w-inline-block', className)}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn('button06 w-inline-block', className)}>
      {inner}
    </button>
  );
};
