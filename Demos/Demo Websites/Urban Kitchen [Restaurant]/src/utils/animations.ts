export const pageVariants = {
  initial: { opacity: 0, y: 10, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(8px)' }
};

export const pageTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1]
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const textRevealVariants = {
  hidden: { y: '100%' },
  visible: { 
    y: '0%',
    transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] }
  }
};