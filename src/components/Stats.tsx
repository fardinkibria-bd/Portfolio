import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { content } from "../content";
import { staggerContainer, slideInLeft } from "../utils/animations";

interface StatItemProps {
  value: string | number;
  label: string;
  index: number;
}

function StatItem({ value, label, index }: StatItemProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 10,
    restDelta: 0.5,
  });
  const display = useTransform(spring, (val) => Math.round(val).toLocaleString());

  // Parse numeric value for counter animation
  const numericValue = typeof value === "number" ? value : parseInt(String(value), 10);
  const isNumeric = !isNaN(numericValue);
  const suffix = typeof value === "string" ? value.replace(/[0-9]/g, "") : "";

  useEffect(() => {
    if (!isNumeric) {
      spring.set(0);
      return;
    }

    const controls = animate(spring, numericValue, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [numericValue, isNumeric, spring]);

  return (
    <motion.li
      className="hero-stats__item"
      variants={slideInLeft}
      custom={index}
    >
      <div ref={countRef} className="hero-stats__number">
        {isNumeric ? (
          <>
            <motion.span>{display}</motion.span>
            {suffix && <span>{suffix}</span>}
          </>
        ) : (
          <span>{value}</span>
        )}
      </div>
      {label && <span className="hero-stats__label">{label}</span>}
    </motion.li>
  );
}

export function Stats() {
  return (
    <motion.div
      className="hero-stats"
      aria-label="Key highlights"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ul className="hero-stats__list">
        {content.stats.map((stat, i) => {
          const value = typeof stat === "string" ? stat : stat.value;
          const label = typeof stat === "string" ? "" : stat.label;

          return (
            <StatItem key={i} value={value} label={label} index={i} />
          );
        })}
      </ul>
    </motion.div>
  );
}
