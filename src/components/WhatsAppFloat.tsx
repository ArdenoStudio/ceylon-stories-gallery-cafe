'use client';

import { motion } from 'motion/react';

import { useReservation } from './ReservationProvider';
import { useCart } from './CartContext';
import { useNavMenu } from './NavMenuContext';
import ShinyButton from './ui/shiny-button';

export default function WhatsAppFloat() {
  const { openReservation } = useReservation();
  const { isOpen: isCartOpen } = useCart();
  const { isNavOpen } = useNavMenu();
  const hidden = isCartOpen || isNavOpen;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[90]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 20 : 0 }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      transition={{ delay: hidden ? 0 : 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <ShinyButton
        onClick={openReservation}
        className="px-4 py-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.22)]"
      >
        Reserve
      </ShinyButton>
    </motion.div>
  );
}
