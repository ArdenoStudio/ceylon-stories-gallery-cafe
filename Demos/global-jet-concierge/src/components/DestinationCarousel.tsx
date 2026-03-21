import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Plane, Calendar } from 'lucide-react';

export const destinationData = [
  {
    id: 'monaco',
    name: 'Monaco',
    class: 'The French Riviera',
    desc: 'Arrive in style at the glittering coast of the Mediterranean. Perfect for summer getaways, yacht shows, and exclusive events.',
    stats: [
      { icon: <Plane className="w-4 h-4" />, label: 'Recommended', value: 'GLOBAL 8000' },
      { icon: <MapPin className="w-4 h-4" />, label: 'Flight Time', value: '8H 15M (JFK)' },
      { icon: <Calendar className="w-4 h-4" />, label: 'Best Season', value: 'SUMMER' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=1200&auto=format&fit=crop', 
  },
  {
    id: 'aspen',
    name: 'Aspen, Colorado',
    class: 'Alpine Retreat',
    desc: 'Touch down amidst the snow-capped peaks of the Rockies. World-class skiing, exclusive boutiques, and luxury lodges await your winter escape.',
    stats: [
      { icon: <Plane className="w-4 h-4" />, label: 'Recommended', value: 'CITATION LONGITUDE' },
      { icon: <MapPin className="w-4 h-4" />, label: 'Flight Time', value: '4H 30M (JFK)' },
      { icon: <Calendar className="w-4 h-4" />, label: 'Best Season', value: 'WINTER' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    class: 'Metropolitan Pulse',
    desc: 'Immerse yourself in the vibrant energy of Tokyo. Experience a seamless blend of ancient tradition, Michelin-starred dining, and cutting-edge future.',
    stats: [
      { icon: <Plane className="w-4 h-4" />, label: 'Recommended', value: 'GULFSTREAM G700' },
      { icon: <MapPin className="w-4 h-4" />, label: 'Flight Time', value: '14H 20M (JFK)' },
      { icon: <Calendar className="w-4 h-4" />, label: 'Best Season', value: 'SPRING / AUTUMN' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 100, damping: 25 },
      opacity: { duration: 0.6 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 100, damping: 25 },
      opacity: { duration: 0.6 }
    }
  })
};

export const DestinationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + destinationData.length) % destinationData.length);
  };

  const currentDest = destinationData[currentIndex];

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
      
      {/* Vertical Rail Text */}
      <div className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 items-center gap-8 vertical-rail rotate-180">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20">Global Jet Concierge</span>
        <div className="w-[1px] h-12 bg-white/10" />
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#F7E7CE]">Destination 0{currentIndex + 1}</span>
      </div>

      {/* Left Content - Text & Stats */}
      <div className="w-full lg:w-1/2 relative z-20 order-2 lg:order-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-[1px] bg-[#F7E7CE]" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-[#F7E7CE] uppercase">{currentDest.class}</span>
            </div>
            
            <h3 className="font-serif text-6xl md:text-8xl mb-8 leading-[0.9] tracking-tight">{currentDest.name}</h3>
            <p className="text-white/50 font-light leading-relaxed mb-16 text-lg max-w-md">
              {currentDest.desc}
            </p>
            
            <div className="flex flex-col w-full max-w-md">
              {currentDest.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between py-6 border-b border-white/5 group/stat">
                  <div className="flex items-center gap-5 text-white/30 group-hover/stat:text-[#F7E7CE] transition-all duration-500">
                    <div className="p-2 rounded-full bg-white/[0.03] group-hover/stat:bg-[#F7E7CE]/10 transition-colors duration-500">
                      {stat.icon}
                    </div>
                    <span className="uppercase text-[10px] tracking-[0.2em] font-medium">{stat.label}</span>
                  </div>
                  <span className="text-white/80 font-mono text-xs tracking-[0.15em]">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-12 mt-20">
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)} 
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => paginate(1)} 
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 flex items-center gap-4">
            <span className="text-white text-sm">0{currentIndex + 1}</span> 
            <div className="w-12 h-[1px] bg-white/10" /> 
            <span>0{destinationData.length}</span>
          </div>
        </div>
      </div>

      {/* Right Content - Image */}
      <div className="w-full lg:w-1/2 h-[550px] lg:h-[850px] relative order-1 lg:order-2 overflow-hidden rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="w-full h-full relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10" />
              <img 
                src={currentDest.imageUrl} 
                alt={currentDest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
              />
              
              {/* Image Overlay Label */}
              <div className="absolute bottom-12 left-12 z-20 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white/50" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/80">Exclusive Access</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
};
