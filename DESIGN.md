# DESIGN.md

Visual design system for the redesign, based on the "Sevora" portfolio reference (hero + client-logo strip).

> **Scope for whoever implements this (human or AI agent):**
> This is a **restyle only**. Keep the site's existing content, copy, page structure, routes, forms, scripts, SEO tags and functionality exactly as they are. Change only the visual layer: colors, typography, spacing, radii, shadows, component styling, imagery treatment, and light motion.
> Anything quoted from the reference ("Design Better", "Sevora", "120+ Projects completed", client names) is **placeholder content**. Do not copy it over. Use the site's own text and logos in the same layout slots.
>
> **Note on values:** All hex codes, pixel sizes and radii below were measured by eye from a ~735px-wide screenshot and scaled to a 1440px desktop reference. Treat them as close starting points, not exact specs. Fine-tune against the reference.

---

## 1. Design character

Calm, editorial, monochrome. A refined serif headline paired with a clean sans-serif, on a soft grey canvas, with one dramatic black-and-white portrait. There is no brand color. Hierarchy comes from tone (near-black vs. grey), type contrast (serif vs. sans), and generous whitespace.

Keywords: quiet, premium, minimal, editorial, grayscale, soft-rounded.

What makes it distinctive (protect these):

1. **Two-tone serif headline.** The first line is near-black, the second line is mid-grey, both in the same serif and size.
2. **Large rounded hero panel** in pale grey, with a black-and-white cut-out portrait whose head breaks out above the top edge of the panel.
3. **Frosted-glass info card** overlapping the lower right of the portrait.
4. **Grayscale logo marquee** under the hero, fading out at both edges.

Everything else stays quiet and neutral.

---

## 2. Color

Fully neutral palette with a faint cool (blue-grey) tint.

| Token                    | Hex                         | Use                                                   |
| ------------------------ | --------------------------- | ----------------------------------------------------- |
| `--color-page`           | `#F6F6F8`                   | Page background                                       |
| `--color-panel`          | `#EDEDF0`                   | Hero panel / large surface base                       |
| `--color-panel-deep`     | `#D8D9DD`                   | Right end of the panel gradient (behind the portrait) |
| `--color-ink`            | `#111114`                   | Primary text, first headline line, logo               |
| `--color-ink-soft`       | `#7D7E85`                   | Second headline line (large text only)                |
| `--color-text`           | `#5A5C63`                   | Body paragraph, stat labels                           |
| `--color-border`         | `#DCDCE1`                   | Hairline borders, secondary button outline            |
| `--color-btn-dark`       | `#18181B`                   | Primary button background                             |
| `--color-btn-dark-text`  | `#FFFFFF`                   | Primary button text                                   |
| `--color-btn-light`      | `#F7F7F9`                   | Secondary button background                           |
| `--color-glass`          | `rgba(40, 40, 46, 0.62)`    | Frosted card fill (with backdrop blur)                |
| `--color-glass-border`   | `rgba(255, 255, 255, 0.28)` | Frosted card 1px border                               |
| `--color-on-glass`       | `#FFFFFF`                   | Text on glass card                                    |
| `--color-on-glass-muted` | `rgba(255, 255, 255, 0.62)` | Small label on glass card                             |

Rules:

- No accent color. Do not add blue, green, gradients of color, or colored shadows.
- The only gradient is the hero panel: `linear-gradient(100deg, #EDEDF0 0%, #EDEDF0 55%, #D8D9DD 100%)`. Keep it subtle.
- The grey headline line (`--color-ink-soft`) is only for large text. It is intentionally darker than a typical light grey so it clears 3:1 contrast on the panel.
- Dark mode is not part of this reference. If the site already has one, invert tokens sensibly rather than inventing new colors.

```css
:root {
  --color-page: #f6f6f8;
  --color-panel: #ededf0;
  --color-panel-deep: #d8d9dd;
  --color-ink: #111114;
  --color-ink-soft: #7d7e85;
  --color-text: #5a5c63;
  --color-border: #dcdce1;
  --color-btn-dark: #18181b;
  --color-btn-light: #f7f7f9;
  --color-glass: rgba(40, 40, 46, 0.62);
  --color-glass-border: rgba(255, 255, 255, 0.28);
}
```

---

## 3. Typography

Two families, clearly different roles.

| Role                               | Family (best match)                         | Fallback stack                                     | Weights  |
| ---------------------------------- | ------------------------------------------- | -------------------------------------------------- | -------- |
| Display / headlines / big numbers  | **Lora** (high-contrast transitional serif) | `Georgia, "Times New Roman", serif`                | 500      |
| UI / body / nav / buttons / labels | **Inter** (neutral grotesque sans)          | `system-ui, -apple-system, "Segoe UI", sans-serif` | 400, 500 |

Load via Google Fonts (`Lora:wght@500`, `Inter:wght@400;500`) with `font-display: swap`. If the site already self-hosts fonts, keep that approach.

### Type scale (desktop 1440px reference)

| Element              | Family                       | Size                              | Weight  | Line height | Letter spacing | Color                                           |
| -------------------- | ---------------------------- | --------------------------------- | ------- | ----------- | -------------- | ----------------------------------------------- |
| Hero H1 (two lines)  | Lora                         | 60px (`clamp(40px, 4.2vw, 60px)`) | 500     | 1.05        | -0.02em        | Line 1 `--color-ink`, line 2 `--color-ink-soft` |
| Stat number          | Lora                         | 36px                              | 500     | 1.1         | -0.01em        | `--color-ink`                                   |
| Hero paragraph       | Inter                        | 17px                              | 400     | 1.55        | 0              | `--color-text`                                  |
| Nav links            | Inter                        | 14px                              | 400–500 | 1           | 0              | `--color-ink`                                   |
| Buttons              | Inter                        | 14px                              | 500     | 1           | 0              | per button                                      |
| Stat label           | Inter                        | 14px                              | 400     | 1.3         | 0              | `--color-text`                                  |
| Glass card title     | Inter                        | 16px                              | 500     | 1.3         | 0              | white                                           |
| Glass card body      | Inter                        | 13px                              | 400     | 1.45        | 0              | white at ~80%                                   |
| Glass card eyebrow   | Inter                        | 12px                              | 400     | 1.2         | 0              | `--color-on-glass-muted`                        |
| Logo strip wordmarks | Inter / the brand's own logo | 16px                              | 500–600 | 1           | 0              | `--color-ink` (grayscale)                       |

Rules:

- Serif is for the headline and big numerals only. Everything else is sans.
- Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows (the glass-card eyebrow is small sentence-case text, not uppercase).
- Headline is left-aligned. Keep headline lines short (2 lines, about 12–16 characters each).
- Body line length under ~45ch in the hero (it is a short two-line intro).
- Apply the same serif/sans pairing to other sections' H2/H3 (see section 8) so the site feels consistent.

---

## 4. Layout and spacing

### Page frame (desktop 1440px reference)

- Content container: `max-width: 1180px`, centered, side margins about 130px at 1440 (about 9% of viewport width). Use `padding-inline: clamp(16px, 9vw, 130px)` or an equivalent max-width container.
- Vertical rhythm: nav, then about 48px gap, then hero panel, then about 64px gap, then logo strip.

### Wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ [logo] Name        Home  About  Projects  Article  Contact  [Dark CTA] │  ← nav, 3-part: left / centered / right
│                                                              │
│  ┌────────────────────────────────────────────┬─────────┐    │
│  │  Headline line 1 (ink)                     │   ◜◝    │    │
│  │  Headline line 2 (grey)                    │  (head  │    │  ← hero panel, radius ~32px
│  │                                            │  breaks │    │     pale grey → slightly darker right
│  │  Two-line intro paragraph                  │  above  │    │
│  │                                            │  panel) │    │
│  │  [Dark button] [Outline button]            │ ┌─────┐ │    │
│  │                                            │ │glass│ │    │  ← frosted card, lower right
│  │  120+      8yr       40+                   │ │ [↗] │ │    │
│  │  label     label     label                 │ └─────┘ │    │
│  └────────────────────────────────────────────┴─────────┘    │
│                                                              │
│  ░ Logo   Logo   Logo   Logo   Logo   Logo   Logo ░           │  ← grayscale marquee, faded edges
└──────────────────────────────────────────────────────────────┘
```

### Navigation

- Height about 72px. Three zones: logo (left), links (true center of the page), primary CTA button (right).
- Logo: small mark plus wordmark in `--color-ink`, 20px mark.
- Links: 14px, `--color-ink`, gap 40px. Hover: opacity 0.6 (no underline). Current page: weight 500.
- Inner pages (Works, About, Achievements, Contact) put a "Back to home" link where the brand mark sits on the home page; the nav brand is hidden on those pages so the two do not collide.
- Right CTA: dark pill-rounded rectangle, height 40px, padding 0 20px, radius 10px, soft shadow `0 4px 12px rgba(17,17,20,0.18)`.
- Below 1200px the center links and CTA are hidden and replaced by a right-aligned hamburger button that opens a full-width dropdown containing the same links plus the Contact CTA.
- Nav sits on the page background with no border or fill. Make it sticky only if the site's nav is already sticky.

### Hero panel

- Single large rounded rectangle: `border-radius: 32px`, `overflow: visible` (the head must break out above the top edge), height about 565px on desktop.
- Background: the panel gradient from section 2.
- Two columns inside: left text column (about 55% width) and right portrait area (about 45%).
- Left padding: 96px. Text block is vertically centered. Stack order and gaps:
  1. H1 (2 lines)
  2. 20px gap, then paragraph (max-width about 440px)
  3. 28px gap, then button row (gap 12px)
  4. 28px gap, then stats row (3 columns, gap 40px)
- Stats: number on top (Lora 36px), label below (Inter 14px). Left-aligned. No dividers or cards.

### Portrait

- Black-and-white (fully desaturated), cut out from its background (transparent PNG/WebP). High contrast, soft studio lighting, subject in dark clothing so it merges with the glass card area.
- Anchored to the bottom-right of the panel, flush with the panel's bottom and right edges. The panel's bottom edge and rounded corner crop the body.
- Height is about 110% of the panel height, so the head rises about 50px above the panel top.
- To mimic this in CSS: wrap the portrait in a clipping container with `overflow: hidden` on the bottom only (e.g., `clip-path: inset(-80px 0 0 0 round 0 0 32px 0)`), or pre-crop the image with the panel's bottom-right radius baked in.
- If the site has no cut-out photo, a plain rounded-rectangle B&W photo inside the right column is acceptable. Apply `filter: grayscale(1) contrast(1.05)` so any image matches.

### Frosted glass card

- Position: absolute, bottom 24px, right 24px, width about 370px, padding 20px, `border-radius: 20px`.
- Fill and blur: `background: var(--color-glass); backdrop-filter: blur(16px) saturate(120%); border: 1px solid var(--color-glass-border);`
- Content, left to right: text block (small eyebrow, title, short description) and an icon button on the right, aligned to the bottom.
- Icon button: 48x48, white (`#FFFFFF`), radius 12px, centered "arrow up-right" glyph in `--color-ink`, 20px. Hover: slight scale to 1.04.
- Provide a solid fallback when `backdrop-filter` is unsupported: `background: rgba(40,40,46,0.85)`.

### Client logo strip

- Single horizontal row, vertically centered, about 40px high, gap 56px between logos.
- All logos are rendered in a single dark tone (`filter: grayscale(1)` plus `opacity: 0.9`, or `fill: currentColor` in `--color-ink`). Never show brand colors.
- Edges fade with a mask: `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`. Logos are cut mid-word at the edges in the reference, which signals continuous scroll.
- Scrolls as a slow infinite marquee (see Motion).

---

## 5. Components

### Buttons

All buttons: height 44px, padding 0 20px, font Inter 14px/500, radius 10px, transition 150ms.

| Variant             | Background          | Text          | Border                     | Shadow                                                                                                  |
| ------------------- | ------------------- | ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| Primary (dark)      | `--color-btn-dark`  | white         | none                       | `0 6px 16px rgba(17,17,20,0.22)` plus subtle top inner highlight `inset 0 1px 0 rgba(255,255,255,0.12)` |
| Secondary (outline) | `--color-btn-light` | `--color-ink` | `1px solid --color-border` | none                                                                                                    |

States:

- Hover primary: lighten background to `#2A2A2F`.
- Hover secondary: background `#FFFFFF`.
- Active: `translateY(1px)`.
- Focus-visible (all interactive elements): `outline: 2px solid #111114; outline-offset: 3px`. Never remove focus rings.
- Nav CTA is the primary variant at 40px height.

### Radii system

| Element                      | Radius  |
| ---------------------------- | ------- |
| Hero / large panels          | 32px    |
| Glass card                   | 20px    |
| Buttons, icon button         | 10–12px |
| Small tags/chips (if needed) | 999px   |

Use radius by element size. Do not apply one radius to everything.

### Shadows

Used sparingly: only on dark buttons (above). Panels, cards and images have no drop shadow; separation comes from tone.

---

## 6. Imagery

- Portraits and hero photos: black-and-white, high contrast, neutral or transparent background.
- Other photography on the site: keep it grayscale or very low saturation so the neutral palette holds. If color images must stay, place them inside rounded containers (24–32px radius) and avoid placing colored elements next to the hero.
- Icons: simple, 1.5px stroke, rounded caps, in `--color-ink`. Use "arrow up-right" for "go to" actions.
- Logos: monochrome only, **except the technology marquee under the hero**, which may use each tool's own logo colors (React cyan, TypeScript blue, HTML orange, CSS blue, JSON yellow, Vite gradient, GitHub black, Netlify teal). HTML, CSS and JSON use their standard marks so the strip covers the core web stack.
- **Social rail (hero footer):** the one deliberate exception to the closed palette. Each channel is a white pill (44px tall, `--radius-badge`, `1px solid --color-border`) whose icon and hover state use that brand's own color — Instagram `#E4405F`, GitHub `#181717`, Facebook `#1877F2`. The label itself stays `--color-ink`. Do not extend these colors to any other element.

---

## 7. Motion

Animation system using Framer Motion. Keep it subtle and choreographed—polish, not distraction.

### 7.1 Philosophy

- **Minimal motion:** One calm moment per section, not many competing animations
- **Physics-based:** Spring animations for natural feel
- **Staggered reveals:** Elements enter in sequence, not all at once
- **Respect user preference:** All animations disable under `prefers-reduced-motion: reduce`

### 7.2 Animation Library

**Framer Motion** (v11+) provides:

- Declarative animations with React integration
- Built-in gesture support (hover, tap)
- Automatic reduced-motion handling via `ReducedMotion` feature
- Spring physics for natural motion

```bash
npm install framer-motion
```

### 7.3 Animation Variants

Define reusable animation presets in `src/utils/animations.ts`:

| Variant        | Initial                      | Animate                   | Duration | Use                     |
| -------------- | ---------------------------- | ------------------------- | -------- | ----------------------- |
| `fadeInUp`     | opacity 0, y 16px            | opacity 1, y 0            | 400ms    | Default entrance        |
| `fadeIn`       | opacity 0                    | opacity 1                 | 300ms    | Pure fade               |
| `slideInLeft`  | opacity 0, x -24px           | opacity 1, x 0            | 400ms    | Stats, sequential items |
| `slideInRight` | opacity 0, x 24px            | opacity 1, x 0            | 400ms    | Counter-flow elements   |
| `scaleIn`      | opacity 0, scale 0.95        | opacity 1, scale 1        | 350ms    | Cards, images           |
| `blurIn`       | opacity 0, filter blur(20px) | opacity 1, filter blur(0) | 600ms    | Images on load          |

**Easing:**

- Default: `[0.16, 1, 0.3, 1]` (smooth ease-out)
- Spring hover: `{ type: "spring", stiffness: 400, damping: 25 }`

### 7.4 Scroll Reveal System

Create `ScrollReveal` component using `useInView`:

```typescript
import { motion, useInView } from "framer-motion";

// Triggers once when element enters viewport at 15% threshold
// Applies animation variant when visible
// Respects reduced motion automatically
```

Apply to: section headings, cards, stats, About articles, Works project cards.

### 7.5 Text Animations

**Headline Stagger (Hero):**

- Split headline into words
- Each word animates with 100ms stagger
- Use `staggerChildren` in parent container

```typescript
const headlineContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const wordReveal = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
```

**Section Headings (About, Works):**

- Character-by-character reveal on scroll
- 30ms stagger per character
- Use `AnimatedText` component

### 7.6 Counter Animation

**Stats Numbers:**

- Animate from 0 to final value over 1.5s
- Use `useMotionValue` + `useTransform` + `useEffect`
- Round to whole numbers during animation

```typescript
import { useMotionValue, useTransform, animate } from "framer-motion";

// Animate count from 0 to value when in view
// Display: Math.round(displayValue)
```

### 7.7 Image Loading

**Portrait Blur-to-Sharp:**

- Start blurred (20px), animate to sharp
- Trigger on `onLoad` event
- Combine with opacity fade

```typescript
<motion.img
  initial={{ opacity: 0, filter: 'blur(20px)' }}
  animate={{ opacity: 1, filter: 'blur(0px)' }}
  transition={{ duration: 0.6 }}
/>
```

**Skeleton Shimmer (Works images):**

- Light grey background with shimmer sweep
- CSS animation: `background: linear-gradient(90deg, #EDEDF0 25%, #F6F6F8 50%, #EDEDF0 75%)`
- Animate background position: -200% to 200%
- Duration: 1.5s infinite

### 7.8 Hover Animations

**Buttons:**

| Button              | Hover Effect                                        | Implementation                                       |
| ------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| Primary (dark)      | Background shifts to lighter (#2A2A2F), subtle lift | `whileHover={{ y: -2, backgroundColor: '#2A2A2F' }}` |
| Secondary (outline) | Background fills to white                           | `whileHover={{ backgroundColor: '#FFFFFF' }}`        |
| Glass card button   | Scale to 1.04                                       | `whileHover={{ scale: 1.04 }}`                       |
| Arrow icons         | Slide right 3px                                     | `whileHover={{ x: 3 }}`                              |

**Cards & Elements:**

| Element             | Hover Effect                      | Spring                          |
| ------------------- | --------------------------------- | ------------------------------- |
| Glass card          | Float up 4px, shadow intensifies  | `whileHover={{ y: -4 }}`        |
| Project cards       | Subtle scale 1.01                 | `whileHover={{ scale: 1.01 }}`  |
| Skill chips (About) | Pop to scale 1.05, border darkens | `whileHover={{ scale: 1.05 }}`  |
| Social icons        | Rotate 5°                         | `whileHover={{ rotate: 5 }}`    |
| Nav links           | Opacity 0.6                       | `whileHover={{ opacity: 0.6 }}` |

### 7.9 Page Transitions

**Route changes (hash navigation):**

- Fade out current page (300ms)
- Fade in new page (300ms)
- Use `AnimatePresence` with `mode="wait"`

```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={route}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Page content */}
  </motion.div>
</AnimatePresence>
```

### 7.10 Logo Marquee

Keep existing CSS marquee animation:

- Continuous linear scroll: 32s per loop
- Pauses on hover
- Disable under `prefers-reduced-motion`

### 7.11 Reduced Motion

Framer Motion handles this automatically via the `ReducedMotion` feature:

```typescript
// In main.tsx or App.tsx
import { LazyMotion, domAnimation, ReducedMotion } from 'framer-motion';

<LazyMotion features={[domAnimation, ReducedMotion]}>
  <App />
</LazyMotion>
```

All `motion` components will skip animations when user prefers reduced motion.

### 7.12 Animation Components to Create

Create in `src/components/animate/`:

1. **`ScrollReveal.tsx`** - Viewport-triggered animations with variants
2. **`AnimatedText.tsx`** - Staggered word/character reveals
3. **`AnimatedCounter.tsx`** - Number count-up animation
4. **`index.ts`** - Export all animation components

### 7.13 Timing Reference

| Animation Type          | Duration  | Stagger                |
| ----------------------- | --------- | ---------------------- |
| Fast micro-interactions | 150ms     | —                      |
| Hover transitions       | 200-250ms | —                      |
| Standard reveals        | 400ms     | 100ms between children |
| Slow reveals (images)   | 600ms     | —                      |
| Counter animation       | 1500ms    | —                      |
| Page transitions        | 300ms     | —                      |

### 7.14 Do / Don't (Motion)

**Do:**

- Use stagger to create choreographed entrances
- Keep hover effects subtle (small scale, opacity shifts)
- Let images load with blur-in, not pop in
- Respect reduced motion preferences

**Don't:**

- Animate every element on scroll
- Use bounce/elastic springs on everything
- Add motion to static content that doesn't need it
- Create competing animations in the same viewport

---

## 8. Extending the system to other sections (inferred, not in the screenshot)

The reference shows only the hero and logo strip. For the rest of the site, apply the same rules:

- **Section background:** `--color-page`, with at most one large `--color-panel` rounded block per section.
- **Section headings:** Lora 500, 40–48px, `--color-ink`, optionally with a grey second line like the hero. Left-aligned. No all-caps eyebrows.
- **Cards (projects, articles, services):** `--color-panel` or white background, `1px solid --color-border`, radius 24px, padding 24px, no shadow. Images inside use radius 16px. Hover: border darkens to `#BDBEC4`, no lift.
- **Forms/inputs:** height 48px, radius 10px, white background, `1px solid --color-border`, focus ring as above.
- **Footer:** `--color-page` or `--color-ink` background with white text; same fonts; links 14px Inter.
- **Dividers:** `1px solid --color-border` only where content needs separating.
- Spacing between major sections: 96–128px desktop, 64px mobile.

---

## 9. Responsive behavior

| Breakpoint | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≥ 1200px   | Layout as shown above                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 768–1199px | Container margins shrink to 32px. Nav collapses to logo + right-aligned hamburger (links + Contact CTA move into the dropdown). H1 scales via `clamp`. Hero padding-left 56px. Portrait scales down proportionally. Stat gap 28px                                                                                                                                                                                                                                                   |
| < 768px    | Nav collapses to logo + menu button (keep the site's existing mobile menu behavior). Hero panel becomes a single column: text first, then buttons (full-width stacked or side by side if they fit), then stats in a 3-column row, then the portrait below (head still overlapping the top edge of the panel is optional; clipping at the bottom stays). Glass card moves inside the panel below the portrait, full width, no overlap. Panel radius 24px. Logo strip stays a marquee |

Minimum tap target 44x44px. No horizontal scroll at any width.

---

## 10. Accessibility

- Text contrast: `--color-ink` and `--color-text` on panel and page meet WCAG AA (4.5:1 or better). `--color-ink-soft` is only used at 36px+ and is about 3.5:1 on the panel.
- White text on the glass card must stay at or above 4.5:1. If the underlying image is light, raise the glass opacity.
- Visible keyboard focus on every link and button (see Buttons).
- The portrait needs alt text from the site's existing content; decorative cut-outs may use `alt=""`.
- Logo marquee: provide a paused, static fallback under reduced motion, and keep logo alt text (e.g., "Flowboard logo").
- Do not convey information by color alone (there is no accent color, so this holds by default).

---

## 11. Implementation checklist

1. Add the Lora and Inter fonts; define the CSS variables from section 2.
2. Replace existing color, font, radius and shadow values with the tokens. Do not rename classes or restructure the DOM unless the layout cannot be achieved otherwise.
3. Restyle the nav, then the hero (panel, two-tone H1, buttons, stats), then the glass card, then the logo marquee.
4. Convert the hero photo to grayscale (CSS filter or a pre-processed cut-out).
5. Apply section 8 rules to remaining sections, then section 9 for responsive.
6. Verify: existing links, forms, scripts, analytics and SEO markup are untouched; Lighthouse accessibility passes; reduced-motion works; no layout shift when fonts load.

## 12. Do / don't

**Do**

- Keep everything grayscale and let the portrait be the single dramatic element.
- Keep the serif/sans contrast and the two-tone headline.
- Use whitespace generously.

**Don't**

- Add accent colors, colored gradients, neon glows or heavy shadows.
- Use all-caps eyebrow labels or numbered section markers.
- Round every element to the same radius.
- Animate every section on scroll.
- Change copy, content structure or functionality as part of this redesign.
