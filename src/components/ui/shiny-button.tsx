"use client";

import React from "react";
import { motion } from "motion/react";

import { cn } from "@/src/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring" as const,
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

type ShinyStyle = React.CSSProperties & {
  "--x"?: string;
};

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  href,
  onClick
}) => {
  const classNames = cn(
    "relative inline-flex min-h-[54px] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,90,0.22)_0%,rgba(46,24,18,0.96)_56%,rgba(20,10,8,0.98)_100%)] px-7 py-2 font-editorial text-[11px] font-medium uppercase tracking-[0.24em] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_16px_42px_rgba(20,10,8,0.28)] backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_26px_rgba(201,162,90,0.28),0_20px_48px_rgba(20,10,8,0.32)]",
    className
  );

  const labelStyle: ShinyStyle = {
    maskImage:
      "linear-gradient(-75deg,rgb(255,246,225) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),rgb(255,246,225) calc(var(--x) + 100%))",
  };

  const borderStyle: React.CSSProperties = {
    mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
    maskComposite: "exclude",
  };

  const inner = (
    <>
      <span className="relative z-20 block size-full text-sm uppercase tracking-wide text-cream-page" style={labelStyle}>
        {children}
      </span>
      <span
        style={borderStyle}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(201,162,90,0.15)_calc(var(--x)+20%),rgba(255,246,225,0.78)_calc(var(--x)+25%),rgba(201,162,90,0.15)_calc(var(--x)+100%))] p-px"
      />
    </>
  );

  if (href) {
    return (
      <motion.a {...animationProps} href={href} onClick={onClick} className={classNames}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button {...animationProps} onClick={onClick} className={classNames}>
      {inner}
    </motion.button>
  );
};

export default ShinyButton;
