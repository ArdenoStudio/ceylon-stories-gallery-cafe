import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MenuItem } from '../../types';
import Button from './Button';
import { cn } from '../../utils/cn';

interface SignatureCarouselProps {
  items: MenuItem[];
  onOrderClick: () => void;
}

const SignatureCarousel: React.FC<SignatureCarouselProps> = ({ items, onOrderClick }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      dragFree: false
    }, 
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group/carousel">
      {/* Carousel Container */}
      <div className="overflow-hidden cursor-drag" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {items.map((item, index) => {
            // Check if this slide is the active centered one for styling emphasis
            // Note: In loop mode, indices might shift, but selectedIndex tracks the visual center
            const isActive = index === selectedIndex;
            
            return (
              <div 
                key={item.id} 
                className={cn(
                  "flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-6 md:pl-8 relative transition-opacity duration-500",
                  isActive ? "opacity-100 scale-100 z-10" : "opacity-40 scale-95 z-0 hover:opacity-80"
                )}
              >
                <div className="bg-brand-charcoal rounded-sm overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-500 hover:shadow-2xl h-full flex flex-col group cursor-hover">
                  {/* Image */}
                  <div className="aspect-[4/5] md:aspect-[4/3] overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                      <div className="flex justify-between items-end">
                        <div className="pr-4">
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{item.name}</h3>
                          <p className="text-xs md:text-sm text-gray-400 line-clamp-2">{item.description}</p>
                        </div>
                        <span className="text-lg md:text-xl font-bold text-brand-gold whitespace-nowrap">Rs.{item.price}</span>
                      </div>
                    </div>
                    
                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                       <Button variant="gold" size="md" onClick={onOrderClick}>
                         Order Now
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <div className="hidden md:block">
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/50 text-white flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 cursor-hover"
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/50 text-white flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 cursor-hover"
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 cursor-hover",
              index === selectedIndex ? "bg-brand-gold w-8" : "bg-white/20 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SignatureCarousel;