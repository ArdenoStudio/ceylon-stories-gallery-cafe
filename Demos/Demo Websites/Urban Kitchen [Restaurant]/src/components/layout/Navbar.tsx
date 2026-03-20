import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Locations', path: '/locations' },
    { name: 'About', path: '/about' },
  ];

  const closeMenu = () => setIsMenuOpen(false);
  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        className={cn(
          "fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Layout & Sizing
          "w-[calc(100%-24px)] max-w-[1100px] rounded-full border",
          // Glassmorphism & Colors
          scrolled
            ? "top-4 py-2.5 px-4 bg-brand-black/80 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
            : "top-4 md:top-6 py-3 px-5 md:py-3.5 md:px-6 bg-brand-black/50 backdrop-blur-md border-white/5",
          // Mobile vs Desktop specific tweaks
          "flex items-center justify-between"
        )}
      >
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0 group flex items-center gap-2 md:gap-3" onClick={closeMenu}>
          <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 group-hover:border-brand-gold transition-colors duration-500 flex items-center justify-center bg-brand-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-gold">
              {/* Chef hat */}
              <path d="M12 2a5 5 0 0 0-4.9 4.1A4 4 0 0 0 8 14v1h8v-1a4 4 0 0 0 .9-7.9A5 5 0 0 0 12 2Z" />
              <rect x="8" y="16" width="8" height="1.5" rx="0.75" />
              <rect x="9" y="18.5" width="6" height="1.5" rx="0.75" />
            </svg>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm md:text-lg font-serif font-bold text-white tracking-tight leading-none group-hover:text-brand-gold transition-colors duration-300">
              URBAN KITCHEN’S
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full hover:bg-white/5",
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/menu" className="hidden md:block">
            <Button size="sm" variant="gold" className="rounded-full px-6 h-9 text-xs">Order Now</Button>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-brand-gold transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      <div
        className={cn(
          "fixed z-40 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[1100px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] rounded-3xl bg-brand-black/90 backdrop-blur-xl border border-white/10 shadow-2xl",
          isMenuOpen ? "top-[72px] opacity-100 max-h-[400px]" : "top-[60px] opacity-0 max-h-0 pointer-events-none"
        )}
      >
        <div className="p-6 flex flex-col items-center space-y-6">
          {links.map((link, idx) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={cn(
                "text-xl font-serif font-bold text-white hover:text-brand-gold transition-colors w-full text-center py-2 border-b border-white/5 last:border-0",
                location.pathname === link.path ? "text-brand-gold" : ""
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 w-full pb-6 border-b border-white/5">
            <Link to="/menu" onClick={closeMenu} className="w-full block">
              <Button size="lg" variant="gold" className="w-full rounded-xl">Start Order</Button>
            </Link>
          </div>

          {/* Ardeno Studio credit in mobile overlay — typographic refinement */}
          <div className="flex flex-col items-center gap-1.5 opacity-40 pt-2">
            <span className="text-[8px] font-sans uppercase tracking-[0.4em] text-white/40 mb-1">Crafted by</span>
            <span className="font-serif text-xl tracking-tight text-white/60">
              Ardeno <span className="text-brand-gold/50 italic">Studio</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;