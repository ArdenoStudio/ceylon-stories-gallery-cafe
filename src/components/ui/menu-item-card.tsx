'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Clock } from 'lucide-react';

interface MenuItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  isVegetarian: boolean;
  name: string;
  price: number;
  originalPrice: number;
  quantity: string;
  prepTimeInMinutes: number;
  tag?: string;
  onAdd: () => void;
  onCardClick?: () => void;
}

const MenuItemCard = React.forwardRef<HTMLDivElement, MenuItemCardProps>(
  (
    {
      className,
      imageUrl,
      isVegetarian,
      name,
      price,
      originalPrice,
      quantity,
      prepTimeInMinutes,
      tag,
      onAdd,
      onCardClick,
      ...props
    },
    ref
  ) => {
    const savings = originalPrice - price;

    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
      hover: { scale: 1.02, transition: { duration: 0.25 } },
    };

    const buttonVariants = {
      tap: { scale: 0.95 },
    };

    const vegIconVariants = {
      initial: { scale: 0 },
      animate: { scale: 1, transition: { delay: 0.3, type: 'spring' as const, stiffness: 200 } },
    };

    return (
      <motion.div
        ref={ref}
        onClick={onCardClick}
        className={cn(
          'relative flex flex-col w-full overflow-hidden rounded-lg border border-mahogany/10 bg-cream-paper text-mahogany shadow-ink group',
          onCardClick ? 'cursor-pointer' : '',
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        layout
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-48 transition-transform duration-500 ease-out group-hover:scale-105 photo-heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mahogany/60 to-transparent" />

          {/* Tag */}
          {tag && (
            <div className="absolute top-3 left-3">
              <span className="font-editorial text-[8px] tracking-[0.2em] uppercase text-cream-page border border-cream-page/40 px-2 py-0.5 bg-mahogany/60 backdrop-blur-sm">
                {tag}
              </span>
            </div>
          )}

          {/* Veg indicator */}
          <motion.div
            className="absolute top-3 right-3"
            variants={vegIconVariants}
            aria-label={isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <div
              className={cn(
                'w-5 h-5 border flex items-center justify-center rounded-sm bg-cream-page',
                isVegetarian ? 'border-sage-deep' : 'border-clay-deep'
              )}
            >
              <div
                className={cn(
                  'w-2.5 h-2.5 rounded-full',
                  isVegetarian ? 'bg-sage-deep' : 'bg-clay-deep'
                )}
              />
            </div>
          </motion.div>

          {/* Add button */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onAdd(); }}
              variants={buttonVariants}
              whileTap="tap"
              className="px-8 py-2 font-editorial text-[9px] tracking-[0.25em] uppercase transition-all duration-300 transform translate-y-4 border rounded opacity-0 bg-cream-page/85 text-mahogany backdrop-blur-sm border-mahogany/20 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-mahogany hover:text-cream-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mahogany focus-visible:ring-offset-2"
              aria-label={`Add ${name} to order`}
            >
              Add
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-light text-mahogany">Rs. {price}</span>
            {savings > 0 && (
              <>
                <span className="font-body text-xs line-through text-mahogany/40">Rs. {originalPrice}</span>
                <span className="font-editorial text-[9px] tracking-[0.1em] uppercase text-sage-deep">
                  Save Rs. {savings}
                </span>
              </>
            )}
          </div>

          {/* Quantity */}
          <p className="mt-1 font-editorial text-[9px] tracking-[0.18em] uppercase text-mahogany/50">
            {quantity}
          </p>

          {/* Name */}
          <h3 className="mt-2 font-display text-[18px] leading-[1.1] text-mahogany">
            {name}
          </h3>

          {/* Prep time */}
          <div className="flex items-center gap-1.5 mt-auto pt-3 font-editorial text-[9px] tracking-[0.1em] uppercase text-mahogany/50">
            <Clock className="w-3 h-3" />
            <span>{prepTimeInMinutes} mins</span>
          </div>
        </div>
      </motion.div>
    );
  }
);

MenuItemCard.displayName = 'MenuItemCard';

export { MenuItemCard };
