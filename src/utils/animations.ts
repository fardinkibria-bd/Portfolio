/**
 * Animation utilities for Framer Motion
 * Follows Design.md section 7 motion system
 */

import type { Transition, Variants } from "framer-motion";

// Easing curves
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

// Durations (in seconds)
export const duration = {
  instant: 0.01,
  fast: 0.15,
  normal: 0.3,
  slow: 0.4,
  slower: 0.6,
  counter: 1.5,
} as const;

// Stagger delays (in seconds)
export const stagger = {
  sm: 0.06,
  md: 0.1,
  lg: 0.15,
} as const;

// Default transition
export const defaultTransition: Transition = {
  duration: duration.slow,
  ease: easeOut,
};

// Spring transition for hover effects
export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

// Animation variants
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easeOut,
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easeOut,
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -24,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easeOut,
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 24,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easeOut,
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: easeOut,
    },
  },
};

// Container with staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: stagger.md,
    },
  },
};

// Word reveal for headlines
export const wordReveal: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easeOut,
    },
  },
};

// Character reveal for headings
export const charReveal: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easeOut,
    },
  },
};

// Hover scale variants
export const hoverScale = {
  scale: 1.01,
  transition: springTransition,
};

export const hoverScaleSm = {
  scale: 1.02,
  transition: springTransition,
};

export const hoverScaleLg = {
  scale: 1.04,
  transition: springTransition,
};

// Tap variants
export const tapScale = {
  scale: 0.98,
};
