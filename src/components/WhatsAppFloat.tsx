'use client';

import { CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

import { useReservation } from './ReservationProvider';
import { useCart } from './CartContext';
import ShinyButton from './ui/shiny-button';

export default function WhatsAppFloat() {
  const { openReservation } = useReservation();
  const { isOpen: isCartOpen } = useCart();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[90]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isCartOpen ? 0 : 1, y: isCartOpen ? 20 : 0 }}
      style={{ pointerEvents: isCartOpen ? 'none' : 'auto' }}
      transition={{ delay: isCartOpen ? 0 : 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      <ShinyButton
        onClick={openReservation}
        aria-label="Open reservation popup"
        icon={<CalendarDays className="size-3.5" strokeWidth={1.7} />}
        className="min-w-[158px] bg-[#24130d] px-4 py-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.22)] focus-visible:ring-offset-cream-page"
      >
        Reserve
      </ShinyButton>
    </motion.div>
  );
}
