import { content } from "../content";
import { Nav } from "./Nav";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface AboutProps {
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
}

interface AboutArticleProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function AboutArticle({ id, title, children }: AboutArticleProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`about-section reveal-item${isVisible ? " is-visible" : ""}`}
      aria-labelledby={id}
    >
      <header className="about-section__header">
        <h2 id={id} className="about-section__title">
          {title}
        </h2>
      </header>
      {children}
    </article>
  );
}

function AboutCta({
  worksHref,
  worksLabel,
  contactHref,
  contactLabel,
  onNavigateSection,
}: {
  worksHref: string;
  worksLabel: string;
  contactHref: string;
  contactLabel: string;
  onNavigateSection: (section: string) => void;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`about-cta reveal-item${isVisible ? " is-visible" : ""}`}
      aria-labelledby="about-cta-title"
    >
      <h2 id="about-cta-title" className="about-cta__title">
        Let&apos;s Connect
      </h2>
      <p className="about-cta__text">
        Explore my latest projects or get in touch for collaborations and
        opportunities.
      </p>
      <div className="about-cta__actions">
        <a
          href={worksHref}
          className="about-cta__btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection("my-works");
          }}
        >
          <span>{worksLabel}</span>
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 5" />
          </svg>
        </a>

        <a
          href={contactHref}
          className="about-cta__btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection("contact");
          }}
        >
          <span>{contactLabel}</span>
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
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export function About({ onNavigateHome, onNavigateSection }: AboutProps) {
  const { about } = content;
  const skillsList = Array.isArray(about.skills)
    ? about.skills
    : [about.skills];
  const interestsList = Array.isArray(about.interests)
    ? about.interests
    : [about.interests];

  return (
    <main className="about-page">
      {/* ── Top Header Bar ── */}
      <div className="about-page__header">
        <a
          href="#"
          className="about-page__back-link"
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
        <Nav activeSection="about" onNavigate={onNavigateSection} />
      </div>

      {/* ── Portrait Left Side ── */}
      <div className="portrait" aria-hidden="true">
        <img
          className="portrait__image"
          src={about.portrait.src}
          alt={about.portrait.alt}
          width={about.portrait.width}
          height={about.portrait.height}
        />
      </div>

      {/* ── Content Column (Right Side) ── */}
      <div className="about-page__content">
        {/* Intro Section */}
        <section className="about-hero" aria-labelledby="about-name">
          <span className="about-hero__kicker">About</span>
          <h1 id="about-name" className="about-hero__name">
            {about.fullName}
          </h1>

          {about.quote && (
            <blockquote className="about-hero__quote">
              <p className="about-hero__quote-text">“{about.quote}”</p>
            </blockquote>
          )}

          <p className="about-hero__intro">{about.introduction}</p>
        </section>

        {/* Distinct Structured Sections */}
        <div className="about-sections">
          {/* Background */}
          <AboutArticle id="section-background" title="Background">
            <p className="about-section__body">{about.background}</p>
          </AboutArticle>

          {/* Skills */}
          <AboutArticle id="section-skills" title="Skills">
            <ul className="about-chips" aria-label="Skills list">
              {skillsList.map((skill, index) => (
                <li key={index} className="about-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </AboutArticle>

          {/* Interests */}
          <AboutArticle id="section-interests" title="Interests">
            <ul className="about-chips" aria-label="Interests list">
              {interestsList.map((interest, index) => (
                <li key={index} className="about-chip">
                  {interest}
                </li>
              ))}
            </ul>
          </AboutArticle>

          {/* Goals */}
          <AboutArticle id="section-goals" title="Goals">
            <p className="about-section__body">{about.goals}</p>
          </AboutArticle>
        </div>

        {/* Call To Action */}
        <AboutCta
          worksHref={about.cta.worksHref}
          worksLabel={about.cta.worksLabel}
          contactHref={about.cta.contactHref}
          contactLabel={about.cta.contactLabel}
          onNavigateSection={onNavigateSection}
        />
      </div>
    </main>
  );
}
