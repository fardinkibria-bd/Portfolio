import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../content";
import { springTransition, fadeIn, staggerContainer } from "../utils/animations";

interface NavProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
  onNavigateHome?: () => void;
}

export function Nav({ activeSection, onNavigate, onNavigateHome }: NavProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = (slug: string) => {
    setOpen(false);
    if (slug === "" || slug === "home") {
      onNavigateHome?.();
    } else {
      onNavigate?.(slug);
    }
  };

  // Center navigation items (excluding Contact which is the right CTA button)
  const centerNavItems = [
    { label: "About", slug: "about" },
    { label: "Achievements", slug: "achievements" },
    { label: "My Works", slug: "my-works" },
  ];

  const isHomeActive = !activeSection || activeSection === "";

  return (
    <header className="site-nav">
      <div className="site-nav__container">
        {/* Left: Brand mark + wordmark */}
        <motion.a
          href="#"
          className="site-nav__brand"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("");
          }}
          aria-label={`${content.brand.name} — Home`}
          whileHover={{ opacity: 0.7 }}
          transition={springTransition}
        >
          <span className="site-nav__logo-mark" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="5" fill="var(--color-ink)" />
              <path
                d="M6 14V6H13.5M6 10H12"
                stroke="#FFFFFF"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="site-nav__brand-name">{content.brand.name}</span>
        </motion.a>

        {/* Center: Desktop navigation links */}
        <nav className="site-nav__center" aria-label="Main navigation">
          <ul className="site-nav__list">
            {centerNavItems.map(({ label, slug }) => {
              const isActive =
                slug === "" ? isHomeActive : activeSection === slug;
              return (
                <li key={label} className="site-nav__item">
                  <motion.a
                    className={`site-nav__link${isActive ? " site-nav__link--active" : ""}`}
                    href={slug === "" ? "#" : `#${slug}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(slug);
                    }}
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {label}
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: CTA button */}
        <div className="site-nav__right">
          <motion.a
            href="#contact"
            className="site-nav__cta"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("contact");
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            transition={springTransition}
          >
            Contact
          </motion.a>

          {/* Mobile hamburger button */}
          <motion.button
            className="site-nav__mobile-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="site-nav__mobile-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown menu with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="site-nav__mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.ul
              className="site-nav__mobile-list"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {centerNavItems.map(({ label, slug }) => {
                const isActive =
                  slug === "" ? isHomeActive : activeSection === slug;
                return (
                  <motion.li
                    key={label}
                    variants={fadeIn}
                  >
                    <a
                      className={`site-nav__mobile-link${isActive ? " site-nav__mobile-link--active" : ""}`}
                      href={slug === "" ? "#" : `#${slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(slug);
                      }}
                    >
                      {label}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li className="site-nav__mobile-cta-item" variants={fadeIn}>
                <a
                  href="#contact"
                  className="site-nav__cta site-nav__cta--mobile"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("contact");
                  }}
                >
                  Contact
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
