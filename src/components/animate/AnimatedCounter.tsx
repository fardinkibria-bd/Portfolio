/**
 * AnimatedCounter - Number counting animation
 * Animates a number from 0 to a target value with formatting
 */

import { motion, useSpring, useTransform, animate as animateValue } from "framer-motion";
import { useEffect, useRef, type HTMLAttributes } from "react";
import { duration, easeOut } from "../../utils/animations";

interface AnimatedCounterProps extends HTMLAttributes<HTMLDivElement> {
  /** Target number to count to */
  value: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Whether to animate (default: true) */
  animate?: boolean;
  /** Prefix to show before number */
  prefix?: string;
  /** Suffix to show after number */
  suffix?: string;
  /** Format options for Intl.NumberFormat */
  formatOptions?: Intl.NumberFormatOptions;
  /** Additional CSS class */
  className?: string;
}

/**
 * AnimatedCounter component that counts from 0 to a target value.
 *
 * @example
 * <AnimatedCounter value={120} />
 *
 * @example
 * <AnimatedCounter
 *   value={10}
 *   duration={2}
 *   suffix="+"
 *   className="stat-number"
 * />
 */
export function AnimatedCounter({
  value,
  duration: animationDuration = duration.counter,
  animate = true,
  prefix = "",
  suffix = "",
  formatOptions,
  className,
  ...props
}: AnimatedCounterProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 10,
    restDelta: 0.5,
  });
  const display = useTransform(spring, (val) =>
    Math.round(val).toLocaleString("en-US", formatOptions),
  );

  useEffect(() => {
    if (!animate || !countRef.current) {
      spring.set(value);
      return;
    }

    const controls = animateValue(spring, value, {
      duration: animationDuration,
      ease: easeOut,
    });

    return () => controls.stop();
  }, [value, animate, spring, animationDuration]);

  return (
    <div ref={countRef} className={className} {...props}>
      <motion.span>{prefix}</motion.span>
      <motion.span>{display}</motion.span>
      <motion.span>{suffix}</motion.span>
    </div>
  );
}
