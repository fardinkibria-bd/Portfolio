import type { JSX } from "react";

interface BrandIconProps {
  className?: string;
}

/* Brand glyphs rendered with their respected colors.
   Only the logo marks are colored — the wordmark text beside them
   stays in --color-ink per the grayscale strip rule. */

export function ReactIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(120 12 12)"
        />
      </g>
    </svg>
  );
}

export function TypeScriptIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#FFFFFF"
      >
        TS
      </text>
    </svg>
  );
}

export function TailwindIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4.9 1 2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4-.9-1-2-2.1-4.6-2.1ZM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4.9 1 2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4-.9-1-2-2.1-4.6-2.1Z"
        fill="#06B6D4"
      />
    </svg>
  );
}

export function JavaScriptIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path
        d="M6.5 19.2 8 18.2c.3.5.6.9 1 1.2.4.3.9.4 1.4.4.5 0 .9-.1 1.2-.4.3-.3.5-.7.5-1.2V10h1.9v7.9c0 1-.3 1.7-.9 2.3-.6.5-1.4.8-2.3.8-.8 0-1.6-.2-2.2-.7-.5-.3-.9-.7-1.1-1.1Zm9.1-.3 1.5-1.1c.4.7 1 1.3 2 1.3.8 0 1.4-.4 1.4-1.1 0-.8-.7-1-1.7-1.5l-.6-.2c-1.5-.7-2.6-1.5-2.6-3.2 0-1.6 1.2-2.8 3.1-2.8 1.4 0 2.3.5 3 1.7l-1.6 1c-.4-.6-.8-.9-1.5-.9s-1.1.4-1.1.9c0 .6.4.9 1.3 1.3l.6.3c1.8.8 3 1.6 3 3.3 0 1.9-1.5 2.9-3.5 2.9-1.9 0-3.1-.9-3.8-2.1Z"
        fill="#111114"
      />
    </svg>
  );
}

export function ViteIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer V gradient shape */}
      <path
        d="M23.2 2.9 12.6 21.7c-.2.4-.8.4-1 0L1.2 5.4c-.2-.4.1-.9.6-.8l10.6 2.1c.1 0 .2 0 .2 0l10-3.9c.5-.2 1-.3 0 .1Z"
        fill="url(#viteA)"
      />
      <defs>
        <linearGradient
          id="viteA"
          x1="2"
          y1="3"
          x2="22"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
      {/* Lightning bolt */}
      <path
        d="M17.1 1.5 9.4 3.1c-.1 0-.2.1-.2.3l-.5 8.9c0 .2.2.3.3.2l2.1-1.6c.1-.1.4 0 .4.2l-.4 5.6c0 .2.2.3.4.1l4.6-9.3c.1-.2-.1-.4-.2-.4l-2.1.4c-.2 0-.3-.1-.3-.3l1.4-5.4c0-.2-.1-.3-.3-.3Z"
        fill="#FFC820"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
        fill="#181717"
      />
    </svg>
  );
}

export function NetlifyIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* Netlify "n" monogram: four petals around a center square */}
      <g fill="#00C7B7">
        <path d="M12 2.6 14.6 5.2 12 7.8 9.4 5.2 12 2.6Z" />
        <path d="M5.2 9.4 7.8 12 5.2 14.6 2.6 12 5.2 9.4Z" />
        <path d="M18.8 9.4 21.4 12 18.8 14.6 16.2 12 18.8 9.4Z" />
        <path d="M12 16.2 14.6 18.8 12 21.4 9.4 18.8 12 16.2Z" />
        <path d="M9.4 9.4h5.2v5.2H9.4V9.4Z" />
      </g>
    </svg>
  );
}

export function HtmlIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* W3C HTML5 shield mark */}
      <path d="M2.4 2.1 4 20.2 12 22.4 20 20.2 21.6 2.1H2.4Z" fill="#E34F26" />
      <path d="M12 3.9v16.7l6.4-1.8 1.3-14.9H12Z" fill="#F06529" />
      <path
        d="M12 9.7H8.9l-.2-2.4H12V5.1H6.2l.1 1.2.4 4.6H12V9.7Zm0 4.9-3.4-.9-.2-2.5H6.1l.4 4.5 5.5 1.5V14.6Z"
        fill="#FFFFFF"
      />
      <path
        d="M12 9.7v2.2h2.9l-.3 3.1-2.6.7v2.3l4.8-1.3.1-.7.5-5.3.1-1H12Zm0-4.6v2.2h5.6l.1-1.1.2-2.3H12v1.2Z"
        fill="#EBEBEB"
      />
    </svg>
  );
}

export function CssIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* W3C CSS3 shield mark */}
      <path d="M2.4 2.1 4 20.2 12 22.4 20 20.2 21.6 2.1H2.4Z" fill="#264DE4" />
      <path d="M12 3.9v16.7l6.4-1.8 1.3-14.9H12Z" fill="#2965F1" />
      <path
        d="M12 11.1H8.4l-.2-2.4H12V6.4H5.7l.1 1.2.4 5.8H12v-2.3Zm0 4.9-3.4-.9-.2-2.6H6.1l.4 4.7 5.5 1.5v-2.7Z"
        fill="#FFFFFF"
      />
      <path
        d="M12 11.1v2.3h3.3l-.3 3.5-3 .8v2.4l4.8-1.3.1-.7.5-5.3.1-1.7H12Zm0-4.7v2.3h6.2l.1-1.1.2-1.2H12Z"
        fill="#EBEBEB"
      />
    </svg>
  );
}

export function JsonIcon({ className }: BrandIconProps): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="3" fill="#F2B705" />
      <text
        x="12"
        y="15.6"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="7"
        fontWeight="700"
        letterSpacing="0.2"
        fill="#111114"
      >
        JSON
      </text>
    </svg>
  );
}

export interface BrandLogo {
  name: string;
  Icon: (props: BrandIconProps) => JSX.Element;
}

// This data export is consumed by the icon-strip component.
// eslint-disable-next-line react-refresh/only-export-components
export const brandLogos: BrandLogo[] = [
  { name: "React", Icon: ReactIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "JavaScript", Icon: JavaScriptIcon },
  { name: "Vite", Icon: ViteIcon },
  { name: "GitHub", Icon: GitHubIcon },
  { name: "Netlify", Icon: NetlifyIcon },
  { name: "HTML", Icon: HtmlIcon },
  { name: "CSS", Icon: CssIcon },
  { name: "JSON", Icon: JsonIcon },
];
