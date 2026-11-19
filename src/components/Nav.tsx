import { useState } from "react";
import { content } from "../content";

interface NavProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export function Nav({ activeSection, onNavigate }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav${open ? " nav--open" : ""}`}>
      <button
        className="nav__menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          className="nav__menu-icon"
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
      </button>
      <nav aria-label="Main navigation">
        <ul className="nav__list">
          {content.nav.map((label, index) => {
            const slug = label.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeSection === slug;
            return (
              <li
                key={label}
                className="nav__item"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <a
                  className={`nav__link${isActive ? " nav__link--active" : ""}`}
                  href={`#${slug}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.(slug);
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
