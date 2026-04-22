import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import CurvedMenuHeader from './ui/curved-menu';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[40] px-6 md:px-[6%] lg:px-12 py-8 flex justify-between items-start pointer-events-none"
        initial={{ backgroundColor: 'rgba(244, 236, 220, 0)' }}
        animate={{
          backgroundColor: scrolled ? '#EBE0CA' : 'rgba(244, 236, 220, 0)',
          paddingTop: scrolled ? '1.5rem' : '2rem',
          paddingBottom: scrolled ? '1.5rem' : '2rem',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Far left: Logomark/Numeral */}
        <div className="flex-1 flex justify-start pointer-events-auto">
          <span className={`font-display italic text-lg md:text-xl transition-colors duration-500 ${scrolled ? 'text-mahogany' : 'text-cream-page md:text-cream-page text-mahogany mix-blend-difference'}`}>I</span>
        </div>
        
        {/* Centre: Wordmark */}
        <div className="flex-1 flex justify-center pointer-events-auto mt-1">
          <a 
            href="#" 
            className="font-display font-normal text-mahogany text-[18px] tracking-wide select-none outline-none"
          >
            CEYLON STORIES
          </a>
        </div>
        
        {/* Far right: Empty Spacer for the Curved Menu Button */}
        <div className="flex-1 flex justify-end" />
      </motion.nav>

      {/* Mount the requested Curved Menu */}
      <CurvedMenuHeader />
    </>
  );
}

