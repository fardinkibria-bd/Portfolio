import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";
import { Nav } from "./Nav";
import {
  fadeInUp,
  staggerContainer,
  springTransition,
} from "../utils/animations";

interface AchievementsProps {
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
}

interface CertificateLightboxProps {
  achievement: (typeof content.achievements.items)[number];
  onClose: () => void;
}

function CertificateLightbox({
  achievement,
  onClose,
}: CertificateLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { closeLabel } = content.achievements;

  useEffect(() => {
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="achievements__lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${closeLabel}: ${achievement.title}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="achievements__lightbox-inner">
        <button
          ref={closeRef}
          type="button"
          className="achievements__lightbox-close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <span aria-hidden="true">×</span>
        </button>
        <img
          className="achievements__lightbox-img"
          src={achievement.image}
          alt={`Certificate for ${achievement.title}`}
        />
        <p className="achievements__lightbox-caption">{achievement.title}</p>
      </div>
    </div>
  );
}

export function Achievements({
  onNavigateHome,
  onNavigateSection,
}: AchievementsProps) {
  const { achievements: copy } = content;
  const [lightbox, setLightbox] = useState<(typeof copy.items)[number] | null>(
    null,
  );
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = () => {
    setLightbox(null);
    lightboxTriggerRef.current?.focus();
  };

  const openLightbox = (
    achievement: (typeof copy.items)[number],
    trigger: HTMLElement,
  ) => {
    lightboxTriggerRef.current = trigger;
    setLightbox(achievement);
  };

  return (
    <main className="works-page achievements-page">
      <div className="works-page__header">
        <a
          href="#"
          className="works-page__back-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          aria-label="Back to home page"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </a>
        <Nav activeSection="achievements" onNavigate={onNavigateSection} />
      </div>

      <section
        className="works-page__content"
        aria-labelledby="achievements-title"
      >
        <div className="works-page__title-group">
          <h1 id="achievements-title" className="works-page__title">
            {copy.heading}
          </h1>
          <p className="works-page__tagline">{copy.intro}</p>
        </div>

        <motion.ul
          className="achievements__grid"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {copy.items.map((achievement) => (
            <motion.li
              key={achievement.id}
              className="achievements__card"
              variants={fadeInUp}
            >
              <div className="achievements__card-body">
                <h2 className="achievements__card-title">
                  {achievement.title}
                </h2>
                {achievement.description && (
                  <p className="achievements__card-description">
                    {achievement.description}
                  </p>
                )}
                <div className="achievements__card-actions">
                  <motion.button
                    type="button"
                    className="achievements__card-link"
                    onClick={(event) =>
                      openLightbox(achievement, event.currentTarget)
                    }
                    whileHover={{ x: 3 }}
                    transition={springTransition}
                  >
                    {copy.viewLabel}
                  </motion.button>
                </div>
              </div>
              <button
                type="button"
                className="achievements__certificate-btn"
                onClick={(event) =>
                  openLightbox(achievement, event.currentTarget)
                }
                aria-label={`${copy.viewLabel}: ${achievement.title}`}
              >
                <img
                  className="achievements__certificate"
                  src={achievement.image}
                  alt={`Certificate for ${achievement.title}`}
                  width={achievement.imageWidth}
                  height={achievement.imageHeight}
                  loading="lazy"
                />
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {lightbox && (
        <CertificateLightbox achievement={lightbox} onClose={closeLightbox} />
      )}
    </main>
  );
}
