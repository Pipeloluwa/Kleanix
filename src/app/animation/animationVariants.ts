import { Variants } from "motion/react";

// Standard UI Animations for Kleanix
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: custom * 0.1
    }
  })
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -25 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: custom * 0.1
    }
  })
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: custom * 0.08
    }
  })
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Slide transition between steps in InteractiveBookingFlow
export const stepVariants: Variants = {
  initial: (direction: number = 1) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut"
    }
  },
  exit: (direction: number = 1) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  })
};

// Modal Overlay and Window Variants
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 }
  }
};

// Legacy variants preserved for backward compatibility
export const animateGradualSpacing: Variants = {
  offscreen: { x: -18, opacity: 0, visibility: "hidden" },
  onscreen: (index: number) => ({
    x: 0,
    opacity: 1,
    visibility: "visible",
    transition: { type: 'spring', duration: 0.5, delay: index * 0.1 }
  })
};

export const animateBlurIn: Variants = {
  offscreen: { filter: 'blur(20px)', opacity: 0, visibility: "hidden" },
  onscreen: {
    filter: 'blur(0px)',
    opacity: 1,
    visibility: "visible",
    transition: { duration: 1.2 }
  }
};

export const animateFadeUp: Variants = {
  offscreen: { opacity: 0, y: 100, visibility: "hidden" },
  onscreen: (delayNo: number) => ({
    opacity: 1,
    y: 0,
    visibility: "visible",
    transition: { type: 'spring', duration: 3, delay: delayNo }
  })
};

export const animateFadeDown: Variants = {
  offscreen: { opacity: 0, y: -100, visibility: "hidden" },
  onscreen: (delayNo: number) => ({
    opacity: 1,
    y: 0,
    visibility: "visible",
    transition: { type: 'spring', duration: 3, delay: delayNo }
  })
};

export const animatePullUp: Variants = {
  offscreen: { opacity: 0, y: 100, visibility: "hidden" },
  onscreen: (index: number) => ({
    opacity: 1,
    y: 0,
    visibility: "visible",
    transition: { type: 'spring', delay: index * 0.05 }
  })
};

export const animateVisible: Variants = {
  offscreen: { opacity: 0 },
  onscreen: (index: number) => ({
    opacity: 1,
    transition: { duration: 3, delay: index }
  })
};

export const animateRotateFromLeft: Variants = {
  offscreen: { x: -100, rotate: -50, visibility: "hidden" },
  onscreen: (index: number) => ({
    x: 0,
    rotate: 0,
    visibility: "visible",
    transition: { duration: 1.2, delay: index }
  })
};

export const animateRotateFromRight: Variants = {
  offscreen: { x: 100, rotate: +50, visibility: "hidden" },
  onscreen: (index: number) => ({
    x: 0,
    rotate: 0,
    visibility: "visible",
    transition: { duration: 1.2, delay: index }
  })
};

export const animateDownTop: Variants = {
  offscreen: { y: 100, scale: 0, opacity: 0 },
  onscreen: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2 }
  }
};

export const animateTopDown: Variants = {
  offscreen: { y: -100, scale: 0, opacity: 0 },
  onscreen: { y: 0, scale: 1, opacity: 1 }
};

export const animateFromLeft: Variants = {
  offscreen: { x: -100, visibility: "hidden" },
  onscreen: (index: number) => ({
    x: 0,
    visibility: "visible",
    transition: { duration: 1.2, delay: index }
  })
};

export const animateFromRight: Variants = {
  offscreen: { x: 100, visibility: "hidden" },
  onscreen: (index: number) => ({
    x: 0,
    visibility: "visible",
    transition: { duration: 1.2, delay: index }
  })
};

export const visibleComponent: Variants = {
  offscreen: { visibility: "hidden" },
  onscreen: { visibility: "visible" }
};