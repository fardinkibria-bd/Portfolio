import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { content } from "../content";
import { Nav } from "./Nav";
import {
  fadeInUp,
  staggerContainer,
  springTransition,
} from "../utils/animations";

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
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.article
      ref={ref}
      className="about-section"
      aria-labelledby={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="about-section__header">
        <h2 id={id} className="about-section__title">
          {title}
        </h2>
      </header>
      {children}
    </motion.article>
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
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.section
      ref={ref}
      className="about-cta"
      aria-labelledby="about-cta-title"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 id="about-cta-title" className="about-cta__title">
        Let&apos;s Connect
      </h2>
      <p className="about-cta__text">
        Explore my latest projects or get in touch for collaborations and
        opportunities.
      </p>
      <div className="about-cta__actions">
        <motion.a
          href={worksHref}
          className="btn btn--primary about-cta__btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection("my-works");
          }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          transition={springTransition}
        >
          <span>{worksLabel}</span>
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            whileHover={{ x: 3 }}
            transition={springTransition}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 5" />
          </motion.svg>
        </motion.a>

        <motion.a
          href={contactHref}
          className="btn btn--secondary about-cta__btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection("contact");
          }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          transition={springTransition}
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
        </motion.a>
      </div>
    </motion.section>
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

      <div className="about-page__main">
        {/* ── Portrait Left Side ── */}
        <div className="about-page__portrait-col">
          <div className="about-page__portrait-card">
            <img
              className="about-page__portrait-img"
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
            />
          </div>
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
              <motion.ul
                className="about-chips"
                aria-label="Skills list"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-15%" }}
                variants={staggerContainer}
              >
                {skillsList.map((skill, index) => (
                  <motion.li
                    key={index}
                    className="about-chip"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={springTransition}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </AboutArticle>

            {/* Interests */}
            <AboutArticle id="section-interests" title="Interests">
              <motion.ul
                className="about-chips"
                aria-label="Interests list"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-15%" }}
                variants={staggerContainer}
              >
                {interestsList.map((interest, index) => (
                  <motion.li
                    key={index}
                    className="about-chip"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={springTransition}
                  >
                    {interest}
                  </motion.li>
                ))}
              </motion.ul>
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
      </div>
    </main>
  );
}
