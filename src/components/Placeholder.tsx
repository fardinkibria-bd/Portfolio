import { Nav } from "./Nav";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface PlaceholderProps {
  title: string;
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
}

export function Placeholder({
  title,
  onNavigateHome,
  onNavigateSection,
}: PlaceholderProps) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

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
        <Nav activeSection={slug} onNavigate={onNavigateSection} />
      </div>

      <section className="works-page__content">
        <div className="works-page__title-group">
          <h1 className="works-page__title">{title}</h1>
          <p className="works-page__tagline">in progress</p>
        </div>

        <div
          ref={ref}
          className={`project-card${isVisible ? " is-visible" : ""}`}
        >
          <p className="project-card__description">
            This section is currently being crafted. In the meantime, you can
            explore selected projects in{" "}
            <a
              href="#my-works"
              style={{
                color: "var(--color-ink)",
                textDecoration: "underline",
                textUnderlineOffset: "0.3em",
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection("my-works");
              }}
            >
              My Works
            </a>{" "}
            or reach out via social links.
          </p>
        </div>
      </section>
    </main>
  );
}
