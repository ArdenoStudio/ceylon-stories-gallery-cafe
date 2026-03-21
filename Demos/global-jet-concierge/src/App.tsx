import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Plane, Compass, Settings, ChevronRight, Star, Shield, Globe, ArrowRight, X, Instagram, Linkedin, Twitter } from 'lucide-react';
import { DestinationCarousel } from './components/DestinationCarousel';
import Lenis from 'lenis';
import DemoLoader from './components/DemoLoader';
import ArdenoProductionCredit from './components/ArdenoProductionCredit';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [activeSection, setActiveSection] = React.useState('home');
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for active section
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'fleet', 'experience', 'services', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.toLowerCase());
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -20,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex justify-center ${
        isScrolled ? 'pt-6 pb-4' : 'pt-10 pb-6'
      }`}
    >
      <div 
        className={`flex items-center justify-between transition-all duration-700 relative ${
          isScrolled 
            ? 'w-[90%] max-w-5xl bg-black/40 backdrop-blur-2xl rounded-full px-10 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'w-full max-w-7xl px-12 py-2'
        }`}
      >
        {isScrolled && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}

        <div 
          className="text-2xl font-serif tracking-[0.2em] font-light cursor-pointer group" 
          onClick={() => lenisRef.current?.scrollTo(0)}
        >
          <span className="text-white transition-colors duration-500 group-hover:text-[#F7E7CE]">GJC</span>
        </div>

        <div 
          className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {['Fleet', 'Experience', 'Services', 'Contact'].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-6 py-2.5 transition-colors duration-500 block ${isActive ? 'text-[#F7E7CE]' : 'text-white/40 hover:text-[#F7E7CE]'}`}
                onMouseEnter={() => setHoveredItem(item)}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="relative z-10">{item}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F7E7CE] shadow-[0_0_10px_#F7E7CE]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {hoveredItem === item && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden"
                    transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                  >
                    <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </motion.div>
                )}
              </motion.a>
            );
          })}
        </div>

        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, 'Contact')}
          className="relative overflow-hidden px-8 py-3 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-700 group hover:border-[#F7E7CE]/50 hover:shadow-[0_0_30px_rgba(247,231,206,0.15)] active:scale-95"
        >
          <span className="absolute inset-0 w-full h-full bg-[#F7E7CE] origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
          <span className="relative z-10 transition-colors duration-700 group-hover:text-black">Inquiry</span>
        </a>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Background Parallax & Depth of Field
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);

  // Content 3D Retreat
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentZ = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <section id="home" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden [perspective:2500px]">
      {/* Background Layer */}
      <motion.div 
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity, filter: bgBlur }} 
        className="absolute inset-0 z-0 origin-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=3000&auto=format&fit=crop" 
          alt="Golden Hour Clouds" 
          className="w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0A0A0A]" />
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ 
          scale: contentScale, 
          opacity: contentOpacity, 
          rotateX: contentRotateX, 
          y: contentY,
          z: contentZ
        }} 
        className="w-full h-full absolute inset-0 transform-gpu flex items-center justify-center origin-center"
      >
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 glass"
        >
          <div className="w-2 h-2 rounded-full bg-[#F7E7CE] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/60">Redefining the Horizon</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[8.5rem] font-light tracking-tighter leading-[0.85] mb-10"
        >
          The Art of <br />
          <span className="italic text-[#F7E7CE]">Global Jet Concierge</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] md:text-[11px] tracking-[0.45em] uppercase opacity-40 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Ultra-luxury private aviation tailored to the world's most discerning travelers.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <motion.a 
            href="#fleet" 
            className="group relative inline-flex items-center gap-8 px-14 py-7 glass rounded-full font-mono text-[11px] tracking-[0.35em] uppercase overflow-hidden transition-all duration-700 hover:border-[#F7E7CE]/60 hover:shadow-[0_0_80px_rgba(247,231,206,0.25)] active:scale-95"
          >
            {/* Liquid background sweep */}
            <span className="absolute inset-0 w-[150%] h-full bg-gradient-to-r from-[#F7E7CE] via-[#FBFBFB] to-[#F7E7CE] -skew-x-12 -translate-x-[110%] group-hover:translate-x-[-10%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            
            {/* Secondary subtle sweep */}
            <span className="absolute inset-0 w-full h-full bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out delay-75" />

            {/* Shine effect */}
            <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out delay-150" />

            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500 font-bold">
              Explore the Fleet
            </span>
            
            {/* Enhanced Arrow Animation */}
            <div className="relative z-10 flex items-center justify-center w-5 h-5">
              <motion.div
                className="flex items-center justify-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative flex items-center justify-center overflow-hidden w-5 h-5">
                  <ChevronRight className="absolute w-5 h-5 text-white/70 group-hover:translate-x-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <ChevronRight className="absolute w-5 h-5 text-black -translate-x-10 group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75" />
                </div>
              </motion.div>
            </div>

            {/* Subtle inner border glow */}
            <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/20 transition-colors duration-700" />
          </motion.a>
        </motion.div>
      </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 z-20 flex flex-col items-center gap-6 hidden md:flex"
      >
        <div className="flex flex-col items-center gap-1.5">
          {"SCROLL".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ 
                delay: 2 + (i * 0.1), 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-mono text-[9px] tracking-widest uppercase text-white"
            >
              {char}
            </motion.span>
          ))}
        </div>
        
        <div className="w-[1px] h-20 bg-white/5 relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: ["-100%", "200%"],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: [0.45, 0, 0.55, 1],
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#F7E7CE] to-transparent"
          />
          
          {/* Static subtle glow base */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const FleetSection = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -15]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  // Image internal parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="fleet" ref={ref} className="py-48 px-6 max-w-7xl mx-auto relative [perspective:2000px]">
      {/* Editorial Number */}
      <div className="absolute top-0 left-6 pointer-events-none select-none">
        <span className="font-serif text-[18vw] leading-none font-black text-white/[0.02] block">01</span>
      </div>

      <motion.div style={{ scale, opacity, rotateX, y }} className="transform-gpu origin-center relative z-10">
        <div className="mb-32 text-center">
          <div className="flex items-center justify-center gap-4 mb-6 opacity-40">
            <div className="w-8 h-[1px] bg-[#F7E7CE]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#F7E7CE]">Global Reach</span>
            <div className="w-8 h-[1px] bg-[#F7E7CE]" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-light mb-8 tracking-tight">
            Curated <span className="italic text-white/40">Destinations</span>
          </h2>
          <p className="max-w-xl mx-auto text-white/50 font-light text-lg leading-relaxed">
            From the snow-capped peaks of Aspen to the azure waters of the Maldives, we provide seamless access to the world's most exclusive enclaves.
          </p>
        </div>

        <DestinationCarousel />
      </motion.div>
    </section>
  );
};

const ServicesSection = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -15]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  const services = [
    { icon: <Star className="w-5 h-5" />, title: 'Bespoke Catering', desc: 'Michelin-starred dining at 40,000 feet, customized to your exact dietary preferences.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Secure Transit', desc: 'End-to-end encrypted logistics, private terminal access, and discreet ground transport.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Global Access', desc: 'Priority routing to any destination worldwide with minimal notice required.' }
  ];

  return (
    <section id="services" ref={ref} className="py-48 bg-[#050505] relative overflow-hidden [perspective:2000px]">
      {/* Editorial Number */}
      <div className="absolute top-0 right-12 pointer-events-none select-none">
        <span className="font-serif text-[18vw] leading-none font-black text-white/[0.02] block">03</span>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F7E7CE]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div style={{ scale, opacity, rotateX, y }} className="max-w-7xl mx-auto px-6 transform-gpu origin-center relative z-10">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#F7E7CE]" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#F7E7CE] uppercase">Beyond the flight</span>
            </div>
            <h2 className="font-serif text-6xl md:text-8xl font-light leading-tight tracking-tighter">
              Uncompromising<br/>
              <span className="italic text-white/40">Service</span>
            </h2>
          </div>
          <p className="text-white/40 font-light max-w-sm text-xl leading-relaxed pb-2">
            Every detail of your journey is meticulously curated to ensure absolute perfection from departure to arrival.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-white/10">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`group relative p-10 md:p-16 border-white/10 ${i !== 2 ? 'md:border-r' : ''} ${i !== 0 ? 'border-t md:border-t-0' : ''} hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden`}
            >
              {/* Large Background Number */}
              <div className="absolute -top-4 -right-4 font-serif text-[12rem] leading-none text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-700 pointer-events-none select-none">
                0{i + 1}
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-[#F7E7CE] mb-16 group-hover:scale-110 group-hover:bg-[#F7E7CE] group-hover:text-black transition-all duration-500">
                  {service.icon}
                </div>
                
                <h3 className="font-serif text-3xl mb-6 group-hover:text-[#F7E7CE] transition-colors duration-500">{service.title}</h3>
                <p className="text-white/50 font-light leading-relaxed text-lg group-hover:text-white/80 transition-colors duration-500">{service.desc}</p>
              </div>
              
              {/* Bottom animated line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#F7E7CE] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ExperienceSection = () => {
  const ref = React.useRef(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedConfigIdx, setSelectedConfigIdx] = React.useState(1); // Default to The Sanctuary
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const configurations = [
    {
      title: "The Executive Lounge",
      description: "A refined space designed for high-stakes productivity and seamless business integration.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000&auto=format&fit=crop",
      features: ["Ergonomic Workstations", "Secure Satellite Uplink", "Conference Capability"]
    },
    {
      title: "The Sanctuary",
      description: "An oasis of calm featuring advanced sound-dampening and zero-gravity seating.",
      image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=1000&auto=format&fit=crop",
      features: ["Full-Flat Bed", "Ambient Bio-Lighting", "Pure Air Filtration"]
    },
    {
      title: "The Global Office",
      description: "Stay connected at 51,000 feet with the fastest in-flight connectivity in the world.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
      features: ["4K Video Conferencing", "Dedicated IT Support", "Private Meeting Zone"]
    }
  ];

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section id="experience" ref={ref} className="py-48 relative overflow-hidden bg-[#080808]">
      {/* Editorial Number */}
      <div className="absolute top-0 left-12 pointer-events-none select-none">
        <span className="font-serif text-[18vw] leading-none font-black text-white/[0.02] block">02</span>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5 z-0" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Image & Caption */}
          <motion.div 
            style={{ opacity, scale }}
            className="lg:col-span-7 relative"
          >
            <motion.div 
              style={{ y }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.8)] group"
            >
              <img 
                src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2000&auto=format&fit=crop" 
                alt="Luxury Cabin Interior" 
                className="w-full aspect-[16/10] lg:aspect-[4/5] object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              
              {/* Glass Info Card */}
              <div className="absolute bottom-12 left-12 right-12 p-8 glass rounded-2xl border border-white/10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-[#F7E7CE] mb-3">Interior Design</p>
                    <h4 className="font-serif text-3xl text-white tracking-tight">The Celestial Suite</h4>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/40 mb-2">Capacity</p>
                    <p className="font-serif text-xl text-white">14 <span className="text-sm italic opacity-40">Guests</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Detail Image */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute -right-12 -bottom-12 w-64 h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl hidden xl:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop" 
                alt="Detail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="lg:col-span-5 pt-12 lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-4 mb-12">
                <div className="w-12 h-[1px] bg-[#F7E7CE]" />
                <span className="font-mono text-[10px] tracking-[0.5em] text-[#F7E7CE] uppercase">Unrivaled Comfort</span>
              </div>
              
              <h2 className="font-serif text-6xl md:text-8xl mb-12 leading-[0.85] tracking-tighter">
                The Art of <br />
                <span className="italic text-white/30 font-light">Serenity</span>
              </h2>
              
              <p className="text-white/50 font-light text-xl leading-relaxed mb-20 max-w-md">
                Every detail is a masterpiece of engineering and craftsmanship. Experience a cabin environment where silence is the ultimate luxury, and every surface invites the touch.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 border-t border-white/10 pt-16">
                <div className="group cursor-default">
                  <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/30 mb-6 group-hover:text-[#F7E7CE] transition-colors">Acoustic Level</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-5xl text-white group-hover:scale-110 transition-transform origin-left duration-500">48</span>
                    <span className="font-serif text-xl italic text-white/30">dB</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 mt-6 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-0 bg-[#F7E7CE]/40" 
                    />
                  </div>
                </div>

                <div className="group cursor-default">
                  <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/30 mb-6 group-hover:text-[#F7E7CE] transition-colors">Air Refresh</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-5xl text-white group-hover:scale-110 transition-transform origin-left duration-500">2</span>
                    <span className="font-serif text-xl italic text-white/30">min</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 mt-6 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="absolute inset-0 bg-[#F7E7CE]/40" 
                    />
                  </div>
                </div>
              </div>

              {/* CTA Link */}
              <motion.div 
                className="mt-24"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-6 group"
                >
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white group-hover:text-[#F7E7CE] transition-colors">Explore Configurations</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#F7E7CE] group-hover:bg-[#F7E7CE] transition-all duration-500">
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl glass rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row h-[90vh] max-h-[850px]"
            >
              {/* Close Button */}
              <motion.button 
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.button>

              {/* Left Side: Dynamic Image */}
              <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-full relative shrink-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedConfigIdx}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={configurations[selectedConfigIdx].image} 
                    alt={configurations[selectedConfigIdx].title} 
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/40" />
                
                {/* Floating Image Label */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <motion.p 
                    key={`label-${selectedConfigIdx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-[8px] tracking-[0.4em] uppercase text-[#F7E7CE] mb-2"
                  >
                    Current View
                  </motion.p>
                  <motion.h4 
                    key={`title-${selectedConfigIdx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-2xl text-white"
                  >
                    {configurations[selectedConfigIdx].title}
                  </motion.h4>
                </div>
              </div>

              {/* Right Side: Scrollable Content */}
              <div className="flex-1 relative overflow-hidden flex flex-col">
                <div 
                  data-lenis-prevent
                  className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar bg-[#0A0A0A] touch-pan-y overscroll-contain"
                >
                  <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-[#F7E7CE] mb-6">Bespoke Interiors</p>
                  <h3 className="font-serif text-4xl md:text-6xl mb-12 tracking-tighter leading-none">
                    Cabin <br />
                    <span className="italic text-white/60">Configurations</span>
                  </h3>
                  
                  <div className="space-y-8 md:space-y-12">
                    {configurations.map((config, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        onClick={() => setSelectedConfigIdx(idx)}
                        className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 border ${
                          selectedConfigIdx === idx 
                            ? 'bg-white/[0.03] border-white/10 shadow-2xl' 
                            : 'border-transparent hover:bg-white/[0.01]'
                        }`}
                      >
                        <div className="flex items-start gap-6 md:gap-8">
                          <span className={`font-serif text-2xl italic transition-colors duration-500 ${
                            selectedConfigIdx === idx ? 'text-[#F7E7CE]' : 'text-white/20 group-hover:text-white/40'
                          }`}>
                            0{idx + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className={`font-serif text-xl md:text-2xl transition-all duration-500 ${
                                selectedConfigIdx === idx ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                              }`}>
                                {config.title}
                              </h5>
                              {selectedConfigIdx === idx && (
                                <motion.div 
                                  layoutId="active-indicator"
                                  className="w-2 h-2 rounded-full bg-[#F7E7CE] shadow-[0_0_10px_#F7E7CE]"
                                />
                              )}
                            </div>
                            <p className={`font-light leading-relaxed mb-6 max-w-md transition-colors duration-500 ${
                              selectedConfigIdx === idx ? 'text-white/70' : 'text-white/30 group-hover:text-white/50'
                            }`}>
                              {config.description}
                            </p>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                              {config.features.map((feature, fIdx) => (
                                <span 
                                  key={fIdx} 
                                  className={`px-3 py-1 rounded-full border font-mono text-[8px] tracking-widest uppercase transition-all duration-500 ${
                                    selectedConfigIdx === idx 
                                      ? 'border-[#F7E7CE]/20 bg-[#F7E7CE]/5 text-[#F7E7CE]' 
                                      : 'border-white/5 bg-white/5 text-white/40'
                                  }`}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="mt-16 pt-12 border-t border-white/5">
                    <motion.button 
                      disabled={isConfirming || isSuccess}
                      onClick={async () => {
                        setIsConfirming(true);
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        setIsConfirming(false);
                        setIsSuccess(true);
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setIsModalOpen(false);
                        setIsSuccess(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative w-full py-6 rounded-xl font-mono text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 overflow-hidden ${
                        isSuccess 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-[#F7E7CE] text-black hover:shadow-[0_0_30px_rgba(247,231,206,0.3)]'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isConfirming ? (
                          <motion.div 
                            key="confirming"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-center gap-3"
                          >
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                            />
                            <span>Processing Request</span>
                          </motion.div>
                        ) : isSuccess ? (
                          <motion.div 
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-center gap-3"
                          >
                            <Star className="w-4 h-4 fill-current" />
                            <span>Configuration Secured</span>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="default"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="relative z-10"
                          >
                            Confirm Selection
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Shimmer Effect */}
                      {!isConfirming && !isSuccess && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                      )}
                    </motion.button>
                  </div>
                </div>
                {/* Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-40 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F7E7CE]/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full bg-[#F7E7CE] flex items-center justify-center">
                  <Plane className="w-6 h-6 text-black" />
                </div>
                <span className="font-serif text-3xl tracking-tighter">Global Jet</span>
              </div>
              
              <h3 className="font-serif text-5xl md:text-6xl mb-12 leading-[0.9] tracking-tighter max-w-md">
                Redefining the <br />
                <span className="italic text-white/20">Art of Travel.</span>
              </h3>
              
              <div className="flex items-center gap-6">
                {[
                  { name: 'Instagram', icon: Instagram },
                  { name: 'LinkedIn', icon: Linkedin },
                  { 
                    name: 'X', 
                    icon: () => (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ) 
                  }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href="#" 
                    className="group relative w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-[#F7E7CE] transition-all duration-500 overflow-hidden"
                    aria-label={social.name}
                  >
                    {/* Glass Effect Layer */}
                    <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 border border-white/10 rounded-full scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                      <social.icon className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation & Contact Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F7E7CE] mb-10">Navigation</p>
              <ul className="space-y-6">
                {['Fleet', 'Experience', 'Services', 'Destinations', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="group relative font-serif text-2xl text-white/40 hover:text-white transition-all duration-500">
                      {item}
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#F7E7CE] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:left-[-12px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-2"
            >
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#F7E7CE] mb-10">Global Presence</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="font-serif text-xl mb-2">London Office</p>
                  <p className="text-white/30 font-light text-sm leading-relaxed">
                    Berkeley Square, Mayfair<br />
                    London W1J 7JZ, UK
                  </p>
                </div>
                <div>
                  <p className="font-serif text-xl mb-2">Geneva Hub</p>
                  <p className="text-white/30 font-light text-sm leading-relaxed">
                    Route de l'Aéroport 21<br />
                    1215 Geneva, Switzerland
                  </p>
                </div>
                <div>
                  <p className="font-serif text-xl mb-2">Direct Inquiries</p>
                  <p className="text-white/30 font-light text-sm leading-relaxed">
                    +44 (0) 20 7946 0000<br />
                    concierge@globaljet.com
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/20">
              © 2026 Global Jet Concierge. All Rights Reserved.
            </p>
            <div className="flex gap-12">
              <a href="#" className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/20 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/20 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 font-sans text-[9px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-all duration-500"
          >
            Back to Top
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-[#F7E7CE] group-hover:bg-[#F7E7CE]">
              <ArrowRight className="w-4 h-4 text-white transition-all duration-500 group-hover:text-black -rotate-90" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  id: string;
  isTextArea?: boolean;
  value: string;
  onChange: (id: string, value: string) => void;
  onFocus: (id: string) => void;
  onBlur: () => void;
  isFocused: boolean;
}

const InputField = ({ label, placeholder, type = "text", id, isTextArea = false, value, onChange, onFocus, onBlur, isFocused }: InputFieldProps) => {
  return (
    <div className="relative border-b border-white/10 py-10 transition-all duration-700 group">
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16">
        <label className={`w-full md:w-48 font-sans text-[10px] uppercase tracking-[0.5em] transition-all duration-700 ${isFocused || value ? 'text-[#F7E7CE]' : 'text-white/20'}`}>
          {label}
        </label>
        <div className="flex-grow relative">
          {isTextArea ? (
            <textarea 
              onFocus={() => onFocus(id)}
              onBlur={onBlur}
              value={value}
              onChange={(e) => onChange(id, e.target.value)}
              className="w-full bg-transparent outline-none font-serif text-3xl md:text-4xl placeholder:text-white/5 resize-none h-40 py-0 transition-all duration-700 focus:text-white text-white/80" 
              placeholder={placeholder}
            />
          ) : (
            <input 
              type={type}
              onFocus={() => onFocus(id)}
              onBlur={onBlur}
              value={value}
              onChange={(e) => onChange(id, e.target.value)}
              className="w-full bg-transparent outline-none font-serif text-3xl md:text-4xl placeholder:text-white/5 py-0 transition-all duration-700 focus:text-white text-white/80" 
              placeholder={placeholder}
            />
          )}
          
          {/* Subtle Focus Glow */}
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-x-8 -inset-y-4 bg-[#F7E7CE]/[0.02] blur-2xl pointer-events-none -z-10"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Animated Underline */}
      <motion.div 
        initial={false}
        animate={{ 
          scaleX: isFocused ? 1 : 0,
          backgroundColor: isFocused ? "#F7E7CE" : "rgba(255, 255, 255, 0.1)"
        }}
        className="absolute bottom-[-1px] left-0 w-full h-[1px] origin-left z-10"
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Status Indicator */}
      <div className="absolute right-0 top-10 flex items-center gap-3">
        <span className={`font-mono text-[8px] uppercase tracking-widest transition-all duration-700 ${value ? 'opacity-40' : 'opacity-0'}`}>
          Verified
        </span>
        <motion.div 
          animate={{ 
            scale: value ? 1 : 0.5,
            opacity: value ? 1 : 0,
            backgroundColor: "#F7E7CE"
          }}
          className="w-1 h-1 rounded-full shadow-[0_0_8px_#F7E7CE]"
        />
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({ name: '', email: '', destination: '', message: '' });

  const progress = Object.values(formData).filter(v => v.length > 0).length / 4;

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (progress < 0.25) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', destination: '', message: '' });
  };

  return (
    <section id="contact" className="py-48 relative bg-black overflow-hidden">
      {/* Editorial Number */}
      <div className="absolute top-0 left-12 pointer-events-none select-none">
        <span className="font-serif text-[18vw] leading-none font-black text-white/[0.02] block">04</span>
      </div>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F7E7CE]/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#F7E7CE]/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Left: The Invitation */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-4 mb-12">
                <div className="w-8 h-[1px] bg-[#F7E7CE]" />
                <span className="font-sans text-[10px] tracking-[0.5em] text-[#F7E7CE] uppercase">Concierge</span>
              </div>
              
              <h2 className="font-serif text-7xl md:text-9xl mb-12 leading-[0.8] tracking-tighter">
                Private <br />
                <span className="italic text-white/20 font-light">Inquiry</span>
              </h2>
              
              <div className="space-y-12 max-w-sm">
                <p className="text-white/40 font-light text-xl leading-relaxed">
                  Our dedicated specialists are available globally to orchestrate your next journey with absolute discretion.
                </p>
                
                <div className="pt-12 border-t border-white/10 space-y-8">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/20 mb-3">Global Priority</p>
                    <p className="font-serif text-2xl">+44 (0) 20 7946 0000</p>
                  </div>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/20 mb-3">Secure Email</p>
                    <p className="font-serif text-2xl">concierge@globaljet.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: The Request */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col justify-center py-20"
                >
                  <p className="font-sans text-[10px] tracking-[0.5em] text-[#F7E7CE] uppercase mb-8">Confirmed</p>
                  <h3 className="font-serif text-6xl md:text-8xl mb-8 tracking-tighter leading-none">Your request is <br /><span className="italic text-white/20">in motion.</span></h3>
                  <p className="text-white/40 font-light text-2xl max-w-md mb-16 leading-relaxed">
                    A dedicated concierge will contact you within the hour to finalize your arrangements.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="group flex items-center gap-6"
                  >
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-[#F7E7CE] group-hover:bg-[#F7E7CE] group-hover:scale-110">
                      <ArrowRight className="w-6 h-6 text-white transition-all duration-700 group-hover:text-black -rotate-180" />
                    </div>
                    <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-colors">Return</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Subtle Progress Indicator */}
                  <div className="mb-12 flex items-center gap-8">
                    <div className="flex-grow h-[1px] bg-white/5 relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        className="absolute top-0 left-0 h-full bg-[#F7E7CE]/40"
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20">
                      {Math.round(progress * 100)}% Complete
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2">
                    <InputField 
                      label="Full Name" 
                      placeholder="Alexander Sterling" 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={setFocusedField}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'name'}
                    />
                    <InputField 
                      label="Email" 
                      placeholder="a.sterling@private.com" 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={setFocusedField}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'email'}
                    />
                    <InputField 
                      label="Destination" 
                      placeholder="Monaco, Monte Carlo" 
                      id="destination" 
                      value={formData.destination}
                      onChange={handleInputChange}
                      onFocus={setFocusedField}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'destination'}
                    />
                    <InputField 
                      label="Message" 
                      placeholder="Special requirements or mission details..." 
                      id="message" 
                      isTextArea 
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={setFocusedField}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'message'}
                    />
                    
                    <div className="pt-20">
                      <button 
                        disabled={isSubmitting || progress < 0.25}
                        className="group relative flex items-center gap-12 py-8 disabled:opacity-30 transition-all duration-700"
                      >
                        <div className="relative">
                          <span className="font-serif text-5xl md:text-7xl tracking-tighter transition-all duration-700 group-hover:translate-x-4 block">
                            {isSubmitting ? "Transmitting..." : "Send Request"}
                          </span>
                          <motion.div 
                            className="absolute -bottom-4 left-0 h-[2px] bg-[#F7E7CE]"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-[#F7E7CE] group-hover:bg-[#F7E7CE] group-hover:scale-110 shadow-[0_0_30px_rgba(247,231,206,0)] group-hover:shadow-[0_0_30px_rgba(247,231,206,0.2)]">
                          <ArrowRight className="w-10 h-10 text-white transition-all duration-700 group-hover:text-black" />
                        </div>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [loading, setLoading] = React.useState(() => {
    return sessionStorage.getItem('loaderShown_gjc') !== '1';
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loaderShown_gjc', '1');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FBFBFB] selection:bg-[#F7E7CE] selection:text-black">
      <AnimatePresence mode="wait">
        {loading ? (
          <DemoLoader key="loader" onComplete={handleLoaderComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavBar />
            <HeroSection />
            <FleetSection />
            <ExperienceSection />
            <ServicesSection />
            <ContactSection />
            <Footer />
            <ArdenoProductionCredit />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
