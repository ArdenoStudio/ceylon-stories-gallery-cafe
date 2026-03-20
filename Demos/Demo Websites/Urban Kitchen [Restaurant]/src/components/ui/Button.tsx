import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'brand' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          'relative inline-flex items-center justify-center font-bold tracking-wide transition-colors duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 overflow-hidden group',
          {
            // Variants
            'bg-white text-black hover:bg-gray-100': variant === 'primary',
            'bg-brand-charcoal text-white border border-white/10 hover:border-brand-gold/50 hover:bg-black': variant === 'secondary',
            'border border-white/30 text-white hover:bg-white hover:text-black': variant === 'outline',
            'text-white hover:text-brand-gold': variant === 'ghost',
            'bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg shadow-green-900/20': variant === 'brand', // WhatsApp
            'bg-brand-gold text-brand-black hover:bg-white hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]': variant === 'gold',
            
            // Sizes
            'h-9 px-4 text-xs uppercase': size === 'sm',
            'h-12 px-6 text-sm uppercase': size === 'md',
            'h-14 px-8 text-base uppercase': size === 'lg',
            'h-12 w-12': size === 'icon',
            
            // Shape
            'rounded-sm': true, 
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        <span className="relative z-20 flex items-center">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;