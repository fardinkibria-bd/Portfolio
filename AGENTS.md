# AGENTS.md

Instructions for AI coding agents working on the **Morpheus portfolio** website, a one-screen personal landing page for a designer / developer.

Read `DESIGN.md` before making any visual change. It is the source of truth for color, type, layout, spacing, motion, and copy. If this file and `DESIGN.md` disagree about visuals, `DESIGN.md` wins.

## Project overview

- **What it is:** a single-page portfolio hero. Red background, large black name, duotone illustrated portrait, white navigation, social rail, and a three-item stats strip.
- **Audience:** potential clients and employers.
- **Primary actions:** go to *My Works*, go to *Contact*.
- **Scope today:** the hero screen only. Sections behind the nav links (About, Profile, Contact, My Works) are not designed yet. Do not invent their designs without being asked. Ask first, or add a minimal placeholder that follows `DESIGN.md`.

## Stack

This is the default; if the repository already uses something else, follow the repository and update this section.

- Vite
- React 18 + TypeScript (strict)
- Plain CSS with custom properties (no Tailwind, no CSS-in-JS, no UI kit)
- Fonts: Anton (display) and Quicksand (interface), self-hosted via `@fontsource` or `woff2` files in `public/fonts`

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # type-check and production build
npm run preview    # serve the production build locally
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Run `npm run lint`, `npm run typecheck`, and `npm run build` before declaring a task finished. If a script is missing, say so rather than skipping the check silently.

## Suggested structure

```
src/
  main.tsx
  App.tsx
  styles/
    tokens.css        # all :root custom properties (colors, type, spacing)
    base.css          # reset, body, focus styles, reduced-motion rules
    hero.css          # hero layout
  components/
    Nav.tsx
    SocialRail.tsx
    Headline.tsx      # "I am" / "Morpheus" / role line lockup
    Stats.tsx
    Portrait.tsx
  assets/
    morpheus.(avif|webp|png)   # transparent duotone portrait
public/
  fonts/
```

Keep components small and presentational. There is no data layer; content strings live in one `src/content.ts` file so copy can be edited in one place.

## Design rules agents must follow

1. **Tokens only.** Colors, font families, sizes, and spacing come from `tokens.css`. No raw hex values or magic numbers in components.
2. **Palette is closed.** Red, black, white, and the portrait's blush/deep-red tones. Do not add an accent color.
3. **Flat red background.** No gradients, shadows, blur, noise, or cards.
4. **The name is the hero.** Nothing else on the page may match its weight or size.
5. **Left-aligned text** on one shared vertical line, as shown in `DESIGN.md` section 4.
6. **No template chrome:** no all-caps labels, eyebrow text, numbered markers, "→" suffixes on links, or single-word color accents in headings.
7. **Motion:** one load sequence (headline rise-and-fade, then portrait fade). Everything else is a 150ms hover/focus transition. Honor `prefers-reduced-motion`.
8. **Contrast:** black text only at large display sizes (about 3.1:1 on the red). All small text is white.

## Content rules

Use the copy in `DESIGN.md` section 8 exactly: nav (About, Profile, Contact, My Works), headline (I am / Morpheus), role (designer / developer), stats (10 years experience, Trustworthy, Modern designs). Do not rewrite, translate, or add marketing copy unless asked. New copy: plain language, active voice, sentence case, one job per element.

## Code conventions

- TypeScript strict mode. No `any`; no non-null assertions without a comment explaining why.
- Function components and hooks only.
- Semantic HTML: `header` and `nav` for navigation, `main` for the hero, `h1` for the name lockup, `ul` for the social rail and stats, `footer` only if one exists.
- CSS: class-based selectors, one block per component, flat specificity. Avoid `!important` and avoid mixing element and class selectors that cancel each other's spacing. Use logical properties where practical.
- Layout with CSS Grid and `clamp()`; do not use fixed pixel widths for the headline or portrait.
- Images: provide `width` and `height`, serve AVIF/WebP with a PNG fallback, and do not apply CSS filters to recolor the portrait.
- Icons: inline SVG with `currentColor`. Do not add an icon library for three icons.
- Links to external sites: `target="_blank"` with `rel="noopener noreferrer"`.

## Accessibility checklist (must pass before merging)

- [ ] Keyboard-only navigation works; every interactive element shows a visible `:focus-visible` outline.
- [ ] Social icons have accessible names; decorative dividers use `aria-hidden="true"`.
- [ ] Portrait has meaningful `alt` text.
- [ ] One `h1`; no skipped heading levels.
- [ ] No horizontal scroll at 320px width or at 200% zoom.
- [ ] Animations disabled under `prefers-reduced-motion: reduce`.

## Testing and verification

- Check the page at 1470, 1024, 768, and 390px wide, and compare against `DESIGN.md` section 7.
- Confirm the name never wraps mid-word or clips.
- Run Lighthouse; target 95+ for Performance, Accessibility, and Best Practices.
- Take before/after screenshots for any visual change and mention differences in the PR description.

## Boundaries

**Always**
- Read `DESIGN.md` first.
- Keep changes small and focused on the task.
- Update `DESIGN.md` in the same change if you intentionally alter a visual decision.

**Ask first**
- Adding a dependency.
- Designing or building sections beyond the hero.
- Changing the typefaces, palette, or portrait.
- Adding analytics, forms, or any third-party script.

**Never**
- Commit secrets, API keys, or `.env` files.
- Hot-link fonts or images from third-party hosts.
- Add tracking or cookies without explicit approval.
- Replace the portrait with stock or generated imagery without approval.
- Delete or rewrite `DESIGN.md` or this file wholesale.

## Pull request format

- Title: imperative, under 70 characters ("Add social rail to hero").
- Body: what changed, why, screenshots at desktop and mobile, and the output of lint, typecheck, and build.
