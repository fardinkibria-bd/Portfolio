import { content } from "../content";
import { Fragment } from "react";

export function Stats() {
  return (
    <section className="stats" aria-label="Key facts">
      <ul className="stats__list">
        {content.stats.map((stat, i) => (
          <Fragment key={stat}>
            {i > 0 && (
              <li
                aria-hidden="true"
                className="stats__divider"
                style={{ animationDelay: `${1100 + i * 100}ms` }}
              />
            )}
            <li
              className="stats__item"
              style={{ animationDelay: `${1100 + i * 100}ms` }}
            >
              {stat}
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
