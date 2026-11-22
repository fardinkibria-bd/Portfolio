import { brandLogos } from "./BrandIcons";

export function LogoMarquee() {
  return (
    <section
      className="logo-marquee"
      aria-label="Technologies and competencies"
    >
      <div className="logo-marquee__track">
        <ul className="logo-marquee__group">
          {brandLogos.map(({ name, Icon }) => (
            <li key={`logo-1-${name}`} className="logo-marquee__item">
              <Icon className="logo-marquee__symbol" />
              <span className="logo-marquee__name">{name}</span>
            </li>
          ))}
        </ul>

        {/* Cloned group for continuous seamless infinite loop */}
        <ul className="logo-marquee__group" aria-hidden="true">
          {brandLogos.map(({ name, Icon }) => (
            <li key={`logo-2-${name}`} className="logo-marquee__item">
              <Icon className="logo-marquee__symbol" />
              <span className="logo-marquee__name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
