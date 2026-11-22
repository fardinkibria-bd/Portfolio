import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { content } from "../content";
import { Nav } from "./Nav";
import { fadeInUp, staggerContainer, springTransition } from "../utils/animations";

interface WorksProps {
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
}

interface ProjectCardItemProps {
  project: (typeof content.works)[number];
  index: number;
}

function ProjectCardItem({ project, index }: ProjectCardItemProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.article
      ref={ref}
      className="project-card"
      aria-labelledby={`project-${project.id}`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1
      }}
      whileHover={{ scale: 1.01, y: -4 }}
    >
      <div className="project-card__header">
        <h2 id={`project-${project.id}`} className="project-card__title">
          {project.title}
        </h2>
        <p className="project-card__subtitle">{project.subtitle}</p>
      </div>

      <p className="project-card__description">{project.description}</p>

      <ul className="project-card__features" aria-label="Key features">
        {project.features.map((feature) => (
          <li key={feature} className="project-card__feature-item">
            {feature}
          </li>
        ))}
      </ul>

      <motion.ul
        className="project-card__tags"
        aria-label="Technologies used"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {project.tags.map((tag) => (
          <motion.li
            key={tag}
            className="project-card__tag"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={springTransition}
          >
            {tag}
          </motion.li>
        ))}
      </motion.ul>

      <div className="project-card__actions">
        <motion.a
          className="btn btn--primary project-card__btn"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          transition={springTransition}
        >
          <span>{project.actionLabel}</span>
          <motion.svg
            className="project-card__btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            whileHover={{ x: 2, y: -2 }}
            transition={springTransition}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </motion.svg>
        </motion.a>
      </div>
    </motion.article>
  );
}

export function Works({ onNavigateHome, onNavigateSection }: WorksProps) {
  return (
    <main className="works-page">
      <div className="works-page__header">
        <motion.a
          href="#"
          className="works-page__back-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          aria-label="Back to home page"
          whileHover={{ x: -4 }}
          transition={springTransition}
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
        </motion.a>
        <Nav activeSection="my-works" onNavigate={onNavigateSection} />
      </div>

      <section className="works-page__content" aria-labelledby="works-heading">
        <motion.div
          className="works-page__title-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 id="works-heading" className="works-page__title">
            My Works
          </h1>
          <p className="works-page__tagline">
            illuminating projects & applications
          </p>
        </motion.div>

        <div className="works-page__projects">
          {content.works.map((project, index) => (
            <ProjectCardItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
