'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import ReservationModal from '@/src/components/ReservationModal';

interface ReservationContextValue {
  isReservationOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const value = useMemo(
    () => ({
      isReservationOpen,
      openReservation: () => setIsReservationOpen(true),
      closeReservation: () => setIsReservationOpen(false),
    }),
    [isReservationOpen]
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
      <ReservationModal
        open={isReservationOpen}
        onOpenChange={setIsReservationOpen}
      />
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }

  return context;
}
