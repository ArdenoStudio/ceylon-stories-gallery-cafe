'use client';

import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
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

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsCollapsed(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const collapsed = isCollapsed && !isHovered;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[90]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 20 : 0 }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      transition={{ delay: hidden ? 0 : 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShinyButton
        onClick={openReservation}
        aria-label="Open reservation popup"
        icon={<CalendarDays className={collapsed ? 'size-4' : 'size-3.5'} strokeWidth={1.7} />}
        collapsed={collapsed}
        className={`bg-[#24130d] focus-visible:ring-offset-cream-page ${collapsed ? 'p-3 shadow-[0_8px_24px_rgba(0,0,0,0.28),0_0_14px_rgba(184,146,74,0.18)]' : 'px-4 py-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.22)]'}`}
      >
        Reserve
      </ShinyButton>
    </motion.div>
  );
}
