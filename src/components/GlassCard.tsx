import { motion } from "framer-motion";
import { content } from "../content";
import { springTransition } from "../utils/animations";

export function GlassCard() {
  const { featuredCard } = content;

  return (
    <motion.aside
      className="glass-card"
      aria-label="Featured highlight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.9, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="glass-card__content">
        <span className="glass-card__eyebrow">{featuredCard.eyebrow}</span>
        <h3 className="glass-card__title">{featuredCard.title}</h3>
        <p className="glass-card__description">{featuredCard.description}</p>
      </div>

      <motion.a
        href={featuredCard.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card__btn"
        aria-label={`${featuredCard.actionLabel}: ${featuredCard.title}`}
        whileTap={{ y: 1 }}
        transition={springTransition}
      >
        <motion.svg
          className="glass-card__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </motion.svg>
      </motion.a>
    </motion.aside>
  );
}
