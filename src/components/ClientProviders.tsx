'use client';

import SmoothScroll from './SmoothScroll';
import Cursor from './Cursor';
import IntroSequence from './IntroSequence';
import { useState } from 'react';
import { ReservationProvider } from './ReservationProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(
    typeof window !== 'undefined'
      ? !!sessionStorage.getItem('hasVisitedCeylonStories')
      : true
  );

  return (
    <ReservationProvider>
      <SmoothScroll>
        <div className="noise-overlay" />
        <Cursor />
        {!introComplete && (
          <IntroSequence onComplete={() => setIntroComplete(true)} />
        )}
        {children}
      </SmoothScroll>
    </ReservationProvider>
  );
}
