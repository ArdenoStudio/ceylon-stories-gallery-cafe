'use client';

import SmoothScroll from './SmoothScroll';
import Cursor from './Cursor';
import IntroSequence from './IntroSequence';
import { useState } from 'react';
import { ReservationProvider } from './ReservationProvider';
import { CartProvider } from './CartContext';
import { CartUI } from './CartUI';
import { NavMenuProvider } from './NavMenuContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(
    typeof window !== 'undefined'
      ? !!sessionStorage.getItem('hasVisitedCeylonStories')
      : true
  );

  return (
    <NavMenuProvider>
    <ReservationProvider>
      <CartProvider>
        <CartUI>
          <SmoothScroll>
            <div className="noise-overlay" />
            <Cursor />
            {!introComplete && (
              <IntroSequence onComplete={() => setIntroComplete(true)} />
            )}
            {children}
          </SmoothScroll>
        </CartUI>
      </CartProvider>
    </ReservationProvider>
    </NavMenuProvider>
  );
}
