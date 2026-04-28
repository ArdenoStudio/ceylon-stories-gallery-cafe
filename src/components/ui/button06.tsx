'use client';

import React from 'react';
import { ShinyButton } from './shiny-button';

interface Button06Props {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Button06 = ({ text = 'Reserve Your Table', href, onClick, className }: Button06Props) => {
  return (
    <ShinyButton href={href} onClick={onClick} className={className}>
      {text}
    </ShinyButton>
  );
};
