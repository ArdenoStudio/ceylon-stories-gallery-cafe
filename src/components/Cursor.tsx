import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.3 });

  const ringX = useSpring(mouseX, { damping: 30, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const node = target.closest('a, button, [data-cursor-text], img');

      if (node) {
        setIsHovering(true);
        if (node.hasAttribute('data-cursor-text')) {
          setHoverText(node.getAttribute('data-cursor-text') || '');
        } else if (node.tagName === 'IMG') {
          setHoverText('VIEW');
        } else if (node.closest('a') && node.closest('.blog-card')) {
          setHoverText('READ');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        *:focus-visible {
          outline: 2px solid #6B2D1F !important;
          outline-offset: 3px !important;
        }
      `}</style>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-mahogany/40 pointer-events-none z-[200]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          borderColor: isHovering ? 'rgba(107,45,31,0.7)' : 'rgba(107,45,31,0.4)',
        }}
        transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
      />

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[200] flex items-center"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="bg-mahogany rounded-full"
          animate={{ width: isHovering ? 6 : 5, height: isHovering ? 6 : 5, opacity: isHovering ? 0.5 : 1 }}
          transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
        />
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 14 }}
            exit={{ opacity: 0 }}
            className="absolute left-full whitespace-nowrap text-editorial text-[9px] tracking-widest uppercase text-mahogany bg-cream-page/80 px-2 py-0.5 backdrop-blur-sm"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
