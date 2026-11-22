import { motion } from "framer-motion";
import { content } from "../content";
import { Stats } from "./Stats";
import {
  fadeInUp,
  staggerContainer,
  wordReveal,
  springTransition,
} from "../utils/animations";

interface HeadlineProps {
  onNavigate?: (section: string) => void;
}

export function Headline({ onNavigate }: HeadlineProps) {
  // Split headline words for staggered animation
  const prefixWords = content.headline.prefix.split(" ");
  const nameWords = content.headline.name.split(" ");

  return (
    <div className="hero-content">
      <motion.div
        className="hero-content__inner"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Two-tone serif headline with staggered word reveal */}
        <h1 className="hero-h1">
          <motion.span
            className="hero-h1__line hero-h1__line--dark"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {prefixWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordReveal}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            className="hero-h1__line hero-h1__line--soft"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {nameWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordReveal}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Short intro paragraph (max-width ~440px) */}
        <motion.p className="hero-intro" variants={fadeInUp}>
          {content.intro}
        </motion.p>

        {/* Action buttons with hover animations */}
        <motion.div className="hero-actions" variants={fadeInUp}>
          <motion.a
            href={content.heroCta.primary.href}
            className="btn btn--primary"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("my-works");
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            transition={springTransition}
          >
            {content.heroCta.primary.label}
          </motion.a>
          <motion.a
            href={content.heroCta.secondary.href}
            className="btn btn--secondary"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("contact");
            }}
            whileTap={{ y: 1 }}
            transition={springTransition}
          >
            {content.heroCta.secondary.label}
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={fadeInUp}>
          <Stats />
        </motion.div>
      </motion.div>
    </div>
  );
}
