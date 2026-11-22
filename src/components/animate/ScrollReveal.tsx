/**
 * ScrollReveal - Viewport-triggered animations using Framer Motion
 * Replaces the existing useScrollReveal hook with motion-based animations
 */

import { motion, useInView, type Variants } from "framer-motion";
import type { ElementType } from "react";
import { useRef, type ReactNode } from "react";
import {
  fadeInUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "../../utils/animations";

export type RevealVariant =
  | "fadeUp"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "scaleIn";

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp: fadeInUp,
  fadeIn: fadeIn,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
  scaleIn: scaleIn,
};

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation variant to use */
  variant?: RevealVariant;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Only trigger animation once */
  once?: boolean;
  /** Margin around viewport to trigger (e.g., "-15%") */
  margin?: `${number}px` | `${number}%`;
  /** Additional CSS class */
  className?: string;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Wrapper component that animates children when they enter the viewport.
 *
 * @example
 * <ScrollReveal variant="fadeUp">
 *   <p>This fades up when scrolled into view</p>
 * </ScrollReveal>
 *
 * @example
 * <ScrollReveal variant="slideLeft" delay={0.2} once>
 *   <Card>Slides in from left with 200ms delay</Card>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  once = true,
  margin = "-15%",
  className,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once,
    margin,
  });

  const MotionComponent = motion.create(as as ElementType);

  const selectedVariant = variantMap[variant] ?? fadeInUp;

  // Apply delay to the animate state
  const variantWithDelay: Variants = {
    initial: selectedVariant.initial ?? {},
    animate: {
      ...selectedVariant.animate,
      transition: {
        ...(typeof selectedVariant.animate === "object" &&
        "transition" in selectedVariant.animate
          ? selectedVariant.animate.transition
          : {}),
        delay,
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variantWithDelay}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
