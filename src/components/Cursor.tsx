import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  const ringX = useSpring(position.x, { damping: 40, stiffness: 100, mass: 1 });
  const ringY = useSpring(position.y, { damping: 40, stiffness: 100, mass: 1 });

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveNode = target.closest('a, button, [data-cursor-text], img');

      if (interactiveNode) {
        setIsHovering(true);
        if (interactiveNode.hasAttribute('data-cursor-text')) {
          setHoverText(interactiveNode.getAttribute('data-cursor-text') || '');
        } else if (interactiveNode.tagName === 'IMG') {
          setHoverText('VIEW');
        } else if (interactiveNode.closest('a') && interactiveNode.closest('.blog-card')) {
           setHoverText('READ');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (isTouch) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-mahogany/30 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
        }}
        transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
      />

      {/* Inner Dot & Text */}
      <motion.div
        className="fixed top-0 left-0 hidden md:flex items-center pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="bg-mahogany rounded-full flex items-center justify-center relative"
          animate={{
            width: isHovering ? 16 : 8,
            height: isHovering ? 16 : 8,
          }}
          transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
        />
        {hoverText && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 20 }}
            className="absolute left-full whitespace-nowrap text-editorial text-[10px] tracking-widest uppercase text-mahogany bg-cream-page/80 px-2 py-1 backdrop-blur-sm"
          >
            {hoverText}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
