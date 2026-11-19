# DESIGN.md — Morpheus Portfolio

Visual specification for a one-screen personal portfolio landing page for **Morpheus, designer / developer**. This file describes what the design is and why. Read it before changing any layout, color, type, or copy. Values marked *(estimated)* were read from the reference mock-up and should be tuned in the browser.

## 1. Concept

A single saturated red field, a heavy black name, and a duotone illustrated portrait that breaks out of the frame. The page is a poster, not a template. Everything is built from three inks (red, black, white) plus the pale pink used inside the illustration.

**The memorable thing is the name.** "Morpheus" is set in a very heavy, condensed face and is the only element that is allowed to be loud. Navigation, stats, and social icons stay small, light, and white so they never compete with it.

**Primary job of the page:** tell a visitor who Morpheus is, what he does, and get them to *My Works* or *Contact* within one screen.

## 2. Color

Use CSS custom properties. Do not hard-code hex values in components.

| Token | Hex | Role |
|---|---|---|
| `--color-red` | `#B31B1B` *(estimated)* | Page background, the dominant field |
| `--color-ink` | `#000000` | Name heading, illustration shadows |
| `--color-paper` | `#FFFFFF` | Nav, "I am", role line, stats, icons, dividers |
| `--color-blush` | `#F2C9C9` *(estimated)* | Light areas inside the portrait only |
| `--color-red-deep` | `#7E1010` *(estimated)* | Mid-shadow tone inside the portrait; focus ring offset |

Rules:

- The background is a flat fill. No gradients, no noise, no vignette.
- The portrait is a duotone built from the tokens above. Do not introduce any other hue into it.
- Black on this red is about **3.1:1** (large text only). Use pure `#000`, not a tinted near-black, and never use black for text under roughly 24px. White on this red is about **6.8:1** and is safe for all sizes.
- Hover and active states change opacity or underline. They do not introduce a new accent color.

## 3. Typography

Two roles, clearly distinct.

| Role | Look | Suggested family (Google Fonts) | Fallback stack |
|---|---|---|---|
| Display | Very heavy, condensed, tall x-height, slightly squared | **Anton** (alt: Bebas Neue, Archivo Narrow Black) | `Impact, "Arial Narrow Bold", sans-serif` |
| Interface | Light/regular, rounded-geometric, open apertures | **Quicksand** (alt: Nunito, Poppins Light) | `system-ui, sans-serif` |

The "I am" and "designer / developer" lines are a bolder, rounder condensed weight than the interface face. Use the display family for both, at a smaller size and normal tracking.

### Scale (desktop reference, 1470 px wide)

| Element | Family | Size | Weight | Case | Tracking | Line height |
|---|---|---|---|---|---|---|
| Name "Morpheus" | Display | `clamp(5rem, 13vw, 12rem)` | 400 (face is already heavy) | Sentence case as written | `-0.01em` | 0.9 |
| "I am" | Display | about 55% of name size | 400 | Sentence case | 0 | 0.9 |
| Role line "designer / developer" | Display | `clamp(1.25rem, 2.2vw, 2rem)` | 400 | Lower case, as written | `0.01em` | 1.1 |
| Nav links | Interface | `1rem` | 400 | Sentence case | 0 | 1 |
| Stats | Interface | `1rem` | 400 | Sentence case | 0 | 1.3 |

Do not use all caps, tracked-out labels, or eyebrow text anywhere. The name stays in the case shown in the reference.

## 4. Layout

Desktop is a single viewport (`min-height: 100svh`) with four zones.

```
+----------------------------------------------------------------------+
|                                            About Profile Contact Works|  nav, top right
|                                                         ,-----------. |
|  (o)      I am                                         /  portrait   ||
|  (t)      MORPHEUS                                    |  bleeds off  ||
|  (p)             designer / developer                 |  right and   ||
|                                                       |  bottom edge ||
|        10 years experience | Trustworthy | Modern designs   '--------' |  stats, bottom left
+----------------------------------------------------------------------+
```

- **Alignment:** all text is left-aligned to one vertical line. The text column starts at roughly 18–20% of the viewport width.
- **Social rail:** a vertical stack of three white icons (Instagram, Twitter, Pinterest) at the left edge, about 30px from the edge, evenly spaced (about 60px apart), vertically centered on the headline block.
- **Headline block:** "I am" sits directly above "Morpheus" with tight leading. The role line is right-aligned to the end of "Morpheus" and sits just under its baseline, so the three lines form one lockup.
- **Navigation:** four text links in a row at the top right, about 30px gaps, no logo, no hamburger on desktop. Order: About, Profile, Contact, My Works.
- **Stats strip:** three short phrases at the bottom of the text column, separated by 1px white vertical dividers about 45px tall. Dividers are structural (they separate three independent claims) and are not decoration.
- **Portrait:** occupies the right 35–40% of the viewport, anchored to the bottom and right edges and cropped by them. It may overlap the end of the headline by a small amount; the name stays on top only if the overlap would hide letters, otherwise the portrait sits behind it.

### Spacing

Base unit 8px. Page padding: `clamp(1.5rem, 4vw, 3rem)`. Keep generous empty red between zones; the empty space is part of the composition.

## 5. Components

### Navigation link
White, interface face, no background. Hover: underline with `text-underline-offset: 0.35em`. Current page: persistent underline. Focus-visible: 2px white outline with 4px offset.

### Social icon
24px white outline icon, 44×44px hit area. Hover: opacity from 1 to 0.7. Each is a link with an accessible name ("Instagram", "Twitter", "Pinterest") and opens in a new tab with `rel="noopener noreferrer"`.

### Stat item
Plain text, one line, no icon. Items are separated by the divider described above. On narrow screens they stack with horizontal dividers instead.

### Portrait
Duotone illustration, delivered as a transparent PNG/WebP/AVIF, with an `alt` that describes it ("Illustration of Morpheus in round sunglasses and a black turtleneck"). Do not recolor it with CSS filters in production; ship the finished asset.

## 6. Motion

An orchestrated, poster-inspired motion system that feels tactile and refined without sacrificing performance or clarity.

### Hero entrance sequence (page load)
1. Nav items cascade from above (-10px, 400ms, staggered 50ms per item).
2. "I am" prefix uncovers via clip-path reveal (500ms, 200ms delay).
3. Name letters rise with subtle 3D perspective flip (500ms, staggered 40ms per letter starting at 400ms).
4. Role line slides in from right (400ms, 900ms delay).
5. Portrait zooms and settles with a soft overshoot (scale 0.92 -> 1.01 -> 1.0, 600ms, 600ms delay).
6. Social icons pop in with slight bounce (350ms, staggered 80ms starting at 1000ms).
7. Stats strip items rise from below (400ms, staggered 100ms starting at 1100ms).

Total hero sequence is ~1.5s, progressive and sequenced in natural reading hierarchy.

### Scroll-triggered reveals (inner pages)
- Inner page titles reveal left-to-right via clip-path uncover (600ms).
- Project showcase cards slide in alternately from left (-40px) and right (+40px) on viewport entry (500ms).
- About sections and contact form fade and rise (24px, 500ms).
- Skill & interest chips cascade upward sequentially (50ms stagger per chip) once their section is visible.

### Interactive & hover states
- Nav and back links: underline sweeps outward from center on hover (250ms).
- Action buttons: dynamic fill sweep (background slides in from left to invert colors to red fill with white text, 300ms).
- Social rail icons: 18% scale pulse with subtle -8deg tilt on hover (200ms).
- Chips: fill with white background and red text on hover (200ms).
- Stats items: subtle 4% scale on hover (150ms).
- Form inputs: subtle white glow highlight on focus (200ms).

### Page transitions
- Crossfade transition between routes (180ms fade-out, 300ms fade-in).
- Smooth document scrolling with instant fallback.

### Accessibility floor
- Honor `prefers-reduced-motion: reduce` across the entire application: all animations and transitions collapse to instantaneous, smooth scrolling reverts to instant jump, and scroll reveal components render immediately visible.

## 7. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| ≥ 1024px | Layout as in section 4 |
| 640–1023px | Name scales via `clamp`; portrait shrinks to about 45% width and sits lower; stats wrap onto two lines if needed |
| < 640px | Single column. Nav collapses to a menu button. Order: nav, "I am / Morpheus / role", portrait (cropped at bottom edge), stats stacked with horizontal dividers, social icons in a horizontal row |

The name must never wrap mid-word or clip. The portrait must never push content off-screen horizontally (`overflow-x: clip` on the page wrapper).

## 8. Content

Copy is short and literal. Use exactly:

- Nav: **About**, **Profile**, **Contact**, **My Works**
- Headline: **I am** / **Morpheus**
- Role: **designer / developer**
- Stats: **10 years experience**, **Trustworthy**, **Modern designs**

Keep the sentence case. If copy is added later (about, works, contact sections), write in plain active voice, name things by what the visitor will find ("See my projects"), and keep each element to one job.

## 9. Accessibility floor

- White-on-red text meets WCAG AA at every size. Black-on-red text is allowed only at large display sizes (see section 2).
- Every interactive element has a visible `:focus-visible` style.
- Icons that are links have text alternatives; decorative dividers are hidden from assistive tech.
- Heading structure: `h1` is "I am Morpheus" (one heading, name inside); the role line is a `p`.
- Page works with keyboard only and at 200% zoom without horizontal scrolling.

## 10. Do and don't

**Do**
- Keep red as one flat, dominant field.
- Let the name be the loudest thing on the page.
- Keep all secondary text white, light, and small.
- Crop the portrait with the viewport edge.

**Don't**
- Add cards, shadows, gradients, or glassmorphism.
- Add a second accent color.
- Accent a single word in the headline with a different color or style.
- Add eyebrow labels, numbering, or all-caps tags.
- Fill the empty red areas with decoration.
