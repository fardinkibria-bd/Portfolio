import { content } from "../content";
import { Nav } from "./Nav";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface WorksProps {
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
}

interface ProjectCardItemProps {
  project: (typeof content.works)[number];
}

function ProjectCardItem({ project }: ProjectCardItemProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`project-card${isVisible ? " is-visible" : ""}`}
      aria-labelledby={`project-${project.id}`}
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

      <ul className="project-card__tags" aria-label="Technologies used">
        {project.tags.map((tag) => (
          <li key={tag} className="project-card__tag">
            {tag}
          </li>
        ))}
      </ul>

      <div className="project-card__actions">
        <a
          className="project-card__btn"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{project.actionLabel}</span>
          <svg
            className="project-card__btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export function Works({ onNavigateHome, onNavigateSection }: WorksProps) {
  return (
    <main className="works-page">
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
        <Nav activeSection="my-works" onNavigate={onNavigateSection} />
      </div>

      <section className="works-page__content" aria-labelledby="works-heading">
        <div className="works-page__title-group">
          <h1 id="works-heading" className="works-page__title">
            My Works
          </h1>
          <p className="works-page__tagline">
            illuminating projects & applications
          </p>
        </div>

        <div className="works-page__projects">
          {content.works.map((project) => (
            <ProjectCardItem key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
