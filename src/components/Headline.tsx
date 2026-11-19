import { content } from "../content";

export function Headline() {
  const nameChars = Array.from(content.headline.name);

  return (
    <div className="content">
      <div className="headline">
        <h1>
          <span className="headline__iam">{content.headline.prefix}</span>
          <span className="headline__name" aria-label={content.headline.name}>
            {nameChars.map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="headline__letter"
                style={{ animationDelay: `${400 + index * 40}ms` }}
                aria-hidden="true"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>
        <p className="headline__role">{content.role}</p>
      </div>
    </div>
  );
}
