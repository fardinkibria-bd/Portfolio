/**
 * AnimatedText - Staggered text reveal animations
 * Splits text into words or characters and animates them in sequence
 */

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";
import { wordReveal, charReveal, stagger } from "../../utils/animations";

export type TextMode = "words" | "chars";

interface AnimatedTextProps {
  /** Text content to animate */
  text: string;
  /** Split by words or characters */
  mode?: TextMode;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger delay between items (seconds) */
  staggerDelay?: number;
  /** Additional CSS class */
  className?: string;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  /** Animate on mount or wait for trigger */
  animate?: boolean;
}

/**
 * Container variants for staggered children
 */
const createContainerVariants = (staggerDelay: number): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * AnimatedText component that reveals text word-by-word or character-by-character.
 *
 * @example
 * <AnimatedText text="Hello World" mode="words" />
 *
 * @example
 * <AnimatedText
 *   text="Welcome to my portfolio"
 *   mode="chars"
 *   staggerDelay={0.03}
 *   className="headline"
 * />
 */
export function AnimatedText({
  text,
  mode = "words",
  delay = 0,
  staggerDelay = mode === "words" ? stagger.md : 0.03,
  className,
  as = "span",
  animate = true,
}: AnimatedTextProps) {
  const MotionComponent = motion.create(as as ElementType);

  // Split text based on mode
  const items = mode === "words" ? text.split(" ") : text.split("");

  const containerVariants = createContainerVariants(staggerDelay);
  const itemVariants = mode === "words" ? wordReveal : charReveal;

  return (
    <MotionComponent
      initial="initial"
      animate={animate ? "animate" : "initial"}
      variants={containerVariants}
      className={className}
      style={{ display: "inline-block" }}
      transition={{ delay }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          style={{
            display: "inline-block",
            // Preserve space between words
            marginRight:
              mode === "words" && index < items.length - 1
                ? "0.25em"
                : undefined,
          }}
        >
          {item}
          {/* Add non-breaking space after each word except the last */}
          {mode === "words" && index < items.length - 1 ? " " : null}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

/**
 * AnimatedHeadline - Specialized for hero headlines
 * Handles two-line headlines with different colors
 */
interface AnimatedHeadlineProps {
  /** First line text */
  line1: string;
  /** Second line text */
  line2?: string;
  /** Additional CSS class */
  className?: string;
  /** Animate on mount */
  animate?: boolean;
}

export function AnimatedHeadline({
  line1,
  line2,
  className,
  animate = true,
}: AnimatedHeadlineProps) {
  return (
    <motion.span
      initial="initial"
      animate={animate ? "animate" : "initial"}
      variants={createContainerVariants(stagger.md)}
      className={className}
      style={{ display: "block" }}
    >
      <AnimatedText text={line1} mode="words" animate={animate} />
      {line2 && (
        <>
          <br />
          <AnimatedText
            text={line2}
            mode="words"
            animate={animate}
            delay={0.1}
          />
        </>
      )}
    </motion.span>
  );
}
