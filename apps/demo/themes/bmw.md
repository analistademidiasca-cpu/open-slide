---
name: BMW
description: Corporate-automotive deck — white canvas, one dark-navy hero band, heavy 700 headlines over Light 300 body, rectangular BMW Blue buttons, zero radius, zero shadow.
mode: light
---

# BMW

Slide adaptation of the BMW corporate web design system (full source reference at the bottom of this file). Web sizes are scaled ~2.6× for the 1920 × 1080 canvas; ratios, weights, tracking and colour roles are kept exactly.

## Palette

BMW Blue is the only action colour. Dark navy is reserved for hero / CTA bands — one or two per deck, never two in a row. The M tricolor is a divider only, and only in M / motorsport contexts.

| Role           | Value     | Notes                                                                 |
| -------------- | --------- | --------------------------------------------------------------------- |
| bg             | `#FFFFFF` | canvas — default page                                                 |
| text           | `#262626` | ink — headlines and primary copy                                      |
| accent         | `#1C69D4` | BMW Blue — primary buttons, active tab, one key figure                |
| accentActive   | `#0653B6` | pressed / emphasised blue                                             |
| dark           | `#1A2129` | dark navy — hero band, CTA band (warm, not pure black)                |
| darkElevated   | `#262E38` | nested card on a dark band                                            |
| surfaceSoft    | `#F7F7F7` | footer / sub-nav band                                                 |
| surfaceCard    | `#FAFAFA` | photo plate behind a model / product render                           |
| surfaceStrong  | `#EBEBEB` | heavier grey section block                                            |
| hairline       | `#E6E6E6` | 2 px divider — tables, spec cells, option tiles                       |
| hairlineStrong | `#CCCCCC` | secondary-button outline, emphasised rule                             |
| body           | `#3C3C3C` | running text                                                          |
| bodyStrong     | `#1A1A1A` | lead paragraph                                                        |
| muted          | `#6B6B6B` | captions, breadcrumbs, footer, inactive tab                           |
| mutedSoft      | `#9A9A9A` | fine print, disabled                                                  |
| onDark         | `#FFFFFF` | text on dark band                                                     |
| onDarkSoft     | `#BBBBBB` | secondary text on dark band                                           |
| mBlueLight     | `#0066B1` | M stripe 1/3                                                          |
| mBlueDark      | `#1C69D4` | M stripe 2/3                                                          |
| mRed           | `#E22718` | M stripe 3/3                                                          |
| success        | `#22C55E` | status — available / on track                                         |
| warning        | `#F59E0B` | status — caution                                                      |
| error          | `#DC2626` | status — miss                                                         |

Tweakable tokens for a real slide (headlines read `var(--osd-font-display)`, hero size reads `var(--osd-size-hero)`):

```tsx
export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#262626', accent: '#1C69D4' },
  fonts: {
    display: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    body: '"BMW Type Next Latin Light", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  typeScale: { hero: 168, body: 34 },
  radius: 0,
};
```

### Page rhythm

Never repeat the same surface on two consecutive pages. Recommended order: **dark hero → light → light feature on `surfaceCard` plates → dark CTA band → light closer**.

## Typography

- Display font: `"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` — weight **700**, letter-spacing **0** (no negative tracking).
- Body font: same stack — weight **300 (Light)**. Light even in captions of legal copy.
- Weight 400 only for captions and nav-like utility labels. Weight 500 is absent.
- BMW Type Next Latin is licensed and not on public CDNs — Inter 700 / 300 / 400 is the substitute. (Saira Condensed is an optional, more compressed alternative for display.)
- Webfont import: `https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,700&display=swap` — inject once at module top level with a slide-keyed link id (see `references/webfonts.md` in `slide-authoring`).
- Type scale (1920 × 1080):
  - Hero title: 168 px · 700 · line-height 1.05 (web `display-xl` 64 px).
  - Section head: 124 px · 700 · 1.1 (web `display-lg` 48 px).
  - Sub-section head: 84 px · 700 · 1.15 (web `display-md` 32 px).
  - CTA-band headline / spec value: 62 px · 700 · 1.25 (web `display-sm` 24 px).
  - Card group title: 52 px · 700 · 1.3.
  - Card title: 46 px · 700 · 1.4 (web `title-md` 18 px).
  - Lead paragraph: 46 px · 300 · 1.45, colour `bodyStrong`.
  - Body: 34 px · 300 · line-height 1.55, colour `body`.
  - Small body / footer: 28 px · 300 · 1.55.
  - Uppercase label / link CTA: 30 px · 700 · `0.115em` tracking, uppercase (web `label-uppercase` 13 px / 1.5 px).
  - Button: 32 px · 700 · `0.036em` tracking.
  - Caption: 26 px · 400 · `0.04em`, colour `muted`.

## Layout

- Canvas 1920 × 1080. Side padding 160 px; content max width 1600 px on a 12-column grid (gutter 48).
- Vertical rhythm: content block starts at `top: 160`; 80 px web section padding → **160 px** on slides.
- Hero band: full-bleed `dark`, headline left-aligned in the left half, render on the right or below.
- Card grids: 3-up or 4-up, gap 48. Card = `surfaceCard` photo plate (16:10, edge-to-edge, 0 radius) + 24 px gap + title + one-line Light tagline + "LEARN MORE ›".
- Spec rows: cells separated by 2 px `hairline` vertical rules; value on top, uppercase label under it.
- **Radius 0 everywhere.** Only circular icon buttons / avatars are round.
- **No shadows, ever.** Depth comes from colour-block contrast (white vs navy) and the photo itself.

## Fixed components

Paste-ready. `import type { CSSProperties, ReactNode } from 'react';`

### Title

```tsx
const Title = ({ children, color = '#262626' }: { children: ReactNode; color?: string }) => (
  <h1
    style={{
      margin: 0,
      fontFamily: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 168,
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: 0,
      color,
    }}
  >
    {children}
  </h1>
);
```

### Heading

Section (124), sub-section (84), CTA band (62).

```tsx
const Heading = ({
  children,
  size = 124,
  color = '#262626',
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) => (
  <h2
    style={{
      margin: 0,
      fontFamily: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: size,
      fontWeight: 700,
      lineHeight: size >= 120 ? 1.1 : size >= 80 ? 1.15 : 1.25,
      letterSpacing: 0,
      color,
    }}
  >
    {children}
  </h2>
);
```

### Body

Light 300 — the editorial counterweight to the 700 headlines.

```tsx
const Body = ({
  children,
  size = 34,
  color = '#3C3C3C',
  style,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) => (
  <p
    style={{
      margin: 0,
      fontFamily: '"BMW Type Next Latin Light", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: size,
      fontWeight: 300,
      lineHeight: 1.55,
      color,
      ...style,
    }}
  >
    {children}
  </p>
);
```

### Eyebrow / Label

Uppercase, letter-spaced, 700 — the "machined precision" voice. Also used for spec labels and category tabs.

```tsx
const Eyebrow = ({ children, color = '#6B6B6B' }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      fontFamily: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.115em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);
```

### Button

Rectangular, 0 radius. `primary` = BMW Blue fill; `secondary` = white with strong hairline; `onDark` = transparent with white outline.

```tsx
const Button = ({
  children,
  variant = 'primary',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'onDark';
}) => {
  const v = {
    primary: { background: '#1C69D4', color: '#FFFFFF', border: '2px solid #1C69D4' },
    secondary: { background: '#FFFFFF', color: '#262626', border: '2px solid #CCCCCC' },
    onDark: { background: 'transparent', color: '#FFFFFF', border: '2px solid #FFFFFF' },
  }[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 112,
        padding: '0 80px',
        boxSizing: 'border-box',
        borderRadius: 0,
        fontFamily: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        fontSize: 32,
        fontWeight: 700,
        letterSpacing: '0.036em',
        ...v,
      }}
    >
      {children}
    </span>
  );
};
```

### LinkCta

The inline "LEARN MORE ›" link.

```tsx
const LinkCta = ({ children, color = '#262626' }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      fontFamily: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: '0.115em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children} ›
  </span>
);
```

### MStripe

Tricolor divider — M / motorsport contexts only. Never a button fill, never a background.

```tsx
const MStripe = ({ width = 240, height = 8 }: { width?: number; height?: number }) => (
  <div style={{ display: 'flex', width, height }}>
    <div style={{ flex: 1, background: '#0066B1' }} />
    <div style={{ flex: 1, background: '#1C69D4' }} />
    <div style={{ flex: 1, background: '#E22718' }} />
  </div>
);
```

### Footer

Uppercase label on the left, zero-padded counter on the right.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = ({ label = 'Corporate presentation', color = '#6B6B6B' }: { label?: string; color?: string }) => {
  const { current, total } = useSlidePageNumber();
  const pad2 = (n: number) => String(n).padStart(2, '0');
  return (
    <div
      style={{
        position: 'absolute',
        left: 160,
        right: 160,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.115em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span>{label}</span>
      <span>
        {pad2(current)} / {pad2(total)}
      </span>
    </div>
  );
};
```

## Motion

- Philosophy: **subtle** — precise, linear-feeling slides from the left, like a car entering frame; no bounce, no scale, no blur.
- Page transition: 300 ms fade.
- Reusable keyframes:

```css
@keyframes bm-in {
  from { opacity: 0; transform: translateX(-48px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes bm-wipe {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

Use `bm-in` 700 ms `cubic-bezier(0.2, 0, 0, 1)` with 100 ms staggers; `bm-wipe` (transform-origin left) for the M stripe and hairline rules. Gate on `useIsActivePage()`.

## Aesthetic

European-engineered corporate. A white, orderly canvas punctuated by one dark-navy hero band; heavy 700 headlines set against airy Light 300 paragraphs; one rectangular BMW Blue button per page; uppercase letter-spaced labels for every secondary action and spec. Everything is square-cornered, flat and aligned to a 12-column grid — precision over decoration. Photography (or a render on a soft-grey plate) supplies all depth. Avoid: rounded or pill buttons, drop shadows, gradients as decoration, a second action colour, weight 500, bold body copy, negative tracking, the M stripe outside motorsport contexts, two dark bands in a row.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#1A2129',
      color: '#FFFFFF',
      padding: '0 160px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Eyebrow color="#BBBBBB">Annual results 2026</Eyebrow>
    <div style={{ marginTop: 24 }}>
      <Title color="#FFFFFF">Driving the next decade.</Title>
    </div>
    <Body size={46} color="#BBBBBB" style={{ marginTop: 32, maxWidth: 1100 }}>
      One line of Light 300 that frames the story.
    </Body>
    <div style={{ marginTop: 64 }}>
      <Button>Discover more</Button>
    </div>
    <Footer color="#BBBBBB" />
  </div>
);
```

---

## Source reference — original web design system

The full original specification this theme was adapted from. Use it for rationale and for anything the slide sections above don't cover. Its pixel sizes are **web** sizes — multiply by ~2.6 for the slide canvas.

### Overview

BMW's corporate site carries a far more **measured, corporate-automotive** interface than its motorsport-bombastic cousin BMW M. The atmosphere is light: `{colors.canvas}` (#ffffff) is the base surface, `{colors.surface-card}` (#fafafa) carries the soft-grey card plates, and dark navy `{colors.surface-dark}` (#1a2129) appears only inside hero bands — one per page, framing the lead model render.

Type runs BMW's licensed **BMW Type Next Latin** at two weights: heavy 700 (display + button + nav) and Light 300 (body + secondary copy). That contrast — heavy display next to thin paragraph — is the editorial signature, channeling the brand's "European-engineered" voice. Weight 500 is deliberately absent; weight 400 only appears on caption and nav-link in neutral utility contexts.

The brand action color, **BMW corporate blue** (`{colors.primary}` — #1c69d4), works alone across every primary CTA — buttons are **rectangular, 0px corner**, with white type. The site rotates a blue-button + dark-navy-hero combination across page rhythm. The M tricolor stripe (`{colors.m-blue-light}` → `{colors.m-blue-dark}` → `{colors.m-red}`) only appears in motorsport contexts and as M-model badges/dividers — never in the corporate site's main language.

The configuration and reservation flows add a dealer-side inventory UI on top of the same system — filter chips, model cards, price tables — but typography and color stay identical; only density goes up.

**Key Characteristics:**
- Light `{colors.canvas}` is the base surface; dark navy `{colors.surface-dark}` appears only inside hero bands — page rhythm relies on contrast.
- BMW corporate blue (`{colors.primary}` — #1c69d4) acts as the single primary action color.
- BMW Type Next Latin: weight 700 display against weight 300 body is the signature.
- Buttons are **rectangular, 0px radius** — corporate dialect, distinct from M's sportier radii.
- Model cards run as 4-up or 5-up grids with no hairline border or only minimal border — just white plate + photo + title.
- Photography (model renders) sits in environment, no shadow — depth comes entirely from color-block contrast.
- M tricolor stripe appears only in M-model contexts — not part of the corporate language.
- Section rhythm holds at `{spacing.section}` (80px) for every major band.

### Colors

#### Brand & Accent
- **BMW Blue (Primary)** (`{colors.primary}` — #1c69d4): The single brand action color. All primary CTAs, "Learn More" link prefixes (blue text), nav-link active state. Press shifts to `{colors.primary-active}` (#0653b6).
- **M Blue Light** (`{colors.m-blue-light}` — #0066b1) + **M Blue Dark** (`{colors.m-blue-dark}` — #1c69d4) + **M Red** (`{colors.m-red}` — #e22718): The M tricolor stripe — appears on the corporate site only on M-model pages and the "M" badge. Never as CTA colors.

#### Surface
- **Canvas** (`{colors.canvas}` — #ffffff): The default page surface.
- **Surface Soft** (`{colors.surface-soft}` — #f7f7f7): Soft grey for the footer and sub-navigation bands.
- **Surface Card** (`{colors.surface-card}` — #fafafa): The light plate behind a model card's photo block.
- **Surface Strong** (`{colors.surface-strong}` — #ebebeb): A slightly heavier grey used as a section divider.
- **Surface Dark** (`{colors.surface-dark}` — #1a2129): Dark navy for hero bands and large dark CTAs. Not pure black — carries a warm undertone.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #262e38): One step lighter, used for nested cards on top of the dark hero.

#### Hairlines
- **Hairline** (`{colors.hairline}` — #e6e6e6): The 1px divider — input outline, configurator card outline, table separator.
- **Hairline Strong** (`{colors.hairline-strong}` — #cccccc): A more visible 1px outline — disabled secondary buttons, emphasized table border.

#### Text
- **Ink** (`{colors.ink}` — #262626): All display and primary text. Not pure black — soft against photography.
- **Body** (`{colors.body}` — #3c3c3c): Default running text.
- **Body Strong** (`{colors.body-strong}` — #1a1a1a): Emphasized paragraphs and lead text.
- **Muted** (`{colors.muted}` — #6b6b6b): Footer links, breadcrumbs, captions.
- **Muted Soft** (`{colors.muted-soft}` — #9a9a9a): Disabled text, fine-print legal.
- **On Primary** (`{colors.on-primary}` — #ffffff): White text on a blue button.
- **On Dark** (`{colors.on-dark}` — #ffffff): White text on a dark hero band.
- **On Dark Soft** (`{colors.on-dark-soft}` — #bbbbbb): A slightly muted white for secondary text on dark bands.

#### Semantic
- **Success** (`{colors.success}` — #22c55e): Confirmation messages and "available" indicators.
- **Warning** (`{colors.warning}` — #f59e0b): Warning callouts.
- **Error** (`{colors.error}` — #dc2626): Validation errors.

### Typography (web)

#### Font Family
The system runs **BMW Type Next Latin** in two cuts: regular (display + UI labels) and **BMW Type Next Latin Light** (body + secondary copy). Fallback stack: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

The display/body split is functional:
- BMW Type Next Latin (700) → display headlines, button labels, nav links
- BMW Type Next Latin Light (300) → paragraphs, descriptive copy
- BMW Type Next Latin (400) → caption, neutral nav-link contexts

This three-way split mirrors BMW M's — corporate and the M sub-brand share the same typographic DNA; only the weight/size ratios differ.

#### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 700 | 1.05 | 0 | Hero h1 ("iX3", model name) |
| `{typography.display-lg}` | 48px | 700 | 1.1 | 0 | Section heads |
| `{typography.display-md}` | 32px | 700 | 1.15 | 0 | Sub-section heads |
| `{typography.display-sm}` | 24px | 700 | 1.25 | 0 | CTA-band headlines |
| `{typography.title-lg}` | 20px | 700 | 1.3 | 0 | Card group titles |
| `{typography.title-md}` | 18px | 700 | 1.4 | 0 | Model card title, intro paragraphs |
| `{typography.title-sm}` | 16px | 700 | 1.4 | 0 | Inventory card title, list label |
| `{typography.body-md}` | 16px | 300 (Light) | 1.55 | 0 | Default body — BMW Type Next Latin Light |
| `{typography.body-sm}` | 14px | 300 (Light) | 1.55 | 0 | Footer body, fine-print |
| `{typography.caption}` | 12px | 400 | 1.4 | 0.5px | Photo captions, meta |
| `{typography.label-uppercase}` | 13px | 700 | 1.3 | 1.5px | "LEARN MORE" inline links, category tabs |
| `{typography.button}` | 14px | 700 | 1.0 | 0.5px | Standard CTA button label |
| `{typography.nav-link}` | 14px | 400 | 1.4 | 0.3px | Top-nav menu items |

#### Principles
- The **700/300 contrast** is the editorial signature. Weight 500 is absent from the system.
- **No negative letter-spacing** — BMW Type Next Latin works on a wide body, so tracking stays at default. Apple/Cal.com-style tightening reads off-brand here.
- **UPPERCASE inline links** — "LEARN MORE"-style CTAs run uppercase with 1.5px tracking. The "machined precision" voice.
- **Weight 400 lives in a narrow lane** — only caption and nav-link, both neutral utility roles.

#### Note on Font Substitutes
BMW Type Next Latin is a licensed BMW typeface. Open-source alternatives:
- **Inter** (variable) — close match at weight 700/300. Leave letter-spacing at 0.0em.
- **Saira Condensed** — for a slightly more compressed BMW Type feel.

### Layout (web)

#### Spacing System
- **Base unit:** 8px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Section padding:** `{spacing.section}` (80px) for every major editorial band.
- **Card internal padding:** `{spacing.lg}` (24px) for model and feature cards.

#### Grid & Container
- **Max content width:** ~1440px center-aligned.
- **Editorial body:** A single 12-column grid.
- **Model card grids:** 4-up or 5-up at desktop, 2-up at tablet, 1-up on mobile.
- **Configurator inventory grids:** 3-up filter row + 4-up vehicle cards, dense layout.

#### Whitespace Philosophy
BMW's whitespace strategy is tighter than BMW M's motorsport-aerated grenadier — the corporate side is more utility-driven. Section rhythm is 80px (not M's 96px). Card padding is 24px (not M's 32px). The page is denser, more dealership-functional.

### Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body, top nav, footer, hero bands |
| Soft hairline | 1px `{colors.hairline}` border | Configurator option tile, table divider |
| Card surface | `{colors.surface-card}` background — no shadow | Model card photo plate |
| Photographic | Edge-to-edge photography | Hero band, model renders |

The system never uses a drop shadow. Depth comes entirely from (a) color-block contrast (light canvas vs dark hero) and (b) photographic subject + lighting.

#### Decorative Depth
- **`m-stripe-divider`** — a 4px-tall horizontal tricolor stripe (`{colors.m-blue-light}` → `{colors.m-blue-dark}` → `{colors.m-red}`). Only in M-model contexts, motorsport badges, or as an M-related section divider. Not part of the main corporate flow.
- **Photographic depth** — full-bleed vehicle photography (lighting + subject) does the work chrome would otherwise do.

### Shapes

#### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Every button, card, input, configurator chip — the dominant radius |
| `{rounded.xs}` | 2px | Very small badges, very rare |
| `{rounded.sm}` | 4px | Small inline button (rare) |
| `{rounded.md}` | 8px | Mobile-only collapse cards (rare) |
| `{rounded.lg}` | 12px | Very rare — modal/dialog corners |
| `{rounded.pill}` | 9999px | Filter chips in some contexts (rare) |
| `{rounded.full}` | 9999px / 50% | Avatar, circular icon button |

The radius hierarchy is binary: **rectangular for everything, circular only for icon buttons.** A clear departure from the soft-cornered SaaS dialect of Apple or Cal.com — closer to BMW corporate-automotive's "engineered precision" voice.

#### Photography Geometry
- Hero photography is full-bleed at 16:9 or 21:9 cinematic ratio.
- Model card photos sit at 16:10, edge-to-edge with `{rounded.none}` corners.
- Configurator vehicle renders sit on a white studio background, full silhouette visible.

### Components (web)

#### Top Navigation

**`top-nav`** — A white sticky nav bar pinned to the top of the page. 64px tall, `{colors.canvas}` background. Left: BMW circular badge logo; center: primary horizontal menu (Models, Next Generation, Pre-Owned, Dealers, Test Drive); right: cart icon, language picker, profile. Menu items render in `{typography.nav-link}` (14px / 400 / 0.3px tracking).

#### Buttons

**`button-primary`** — The signature primary CTA. Background `{colors.primary}` (BMW Blue #1c69d4), text `{colors.on-primary}`, type `{typography.button}` (BMW Type Next Latin 14px / 700 / 0.5px tracking), padding 14px × 32px, height 48px, rounded `{rounded.none}` (0px — rectangular). Press state: `button-primary-active` shifts to `{colors.primary-active}`.

**`button-secondary`** — A white button with a hairline outline. Background `{colors.canvas}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border, same padding + height + radius.

**`button-secondary-on-dark`** — Used over a dark hero band. Background transparent, text `{colors.on-dark}`, 1px `{colors.on-dark}` border, same rectangular shape.

**`button-text-link`** — An inline UPPERCASE letter-spaced link. No background, text `{colors.ink}`, type `{typography.label-uppercase}` (13px / 700 / 1.5px tracking). Reads as "LEARN MORE", terminated by a `›` chevron.

**`text-link`** — An inline link inside body copy. `{colors.ink}` text, no underline by default; underlines per context.

#### Cards & Containers

**`hero-band-dark`** — Full-width dark navy hero. Background `{colors.surface-dark}`, text `{colors.on-dark}`, vertical padding `{spacing.section}` (80px). Centered: model name in `{typography.display-xl}` (64px / 700) + sub-headline + vehicle render (right-aligned or below). A single `{component.button-primary}` (blue) or `{component.button-secondary-on-dark}`.

**`hero-photo-band`** — A light-canvas model showcase band. Background `{colors.canvas}`, text `{colors.ink}`. The vehicle render takes the wide area; right or below, a headline + two link CTAs + sub-tagline.

**`model-card`** — Used in 4-up or 5-up model card grids on the homepage ("BMW iX3", "BMW iX", "BMW 5 Series"). Background `{colors.canvas}`, rounded `{rounded.none}`, padding `{spacing.lg}` (24px). Contents: model render at the top (`{component.model-card-photo}` on `{colors.surface-card}`), model name in `{typography.title-md}` (18px / 700) below, a one-line tagline in `{typography.body-sm}` (14px / 300), and a `{component.button-text-link}` ("LEARN MORE ›").

**`model-card-photo`** — The card's photo plate. Background `{colors.surface-card}` (#fafafa — soft grey), rounded `{rounded.none}`, vehicle render in full silhouette. Zero padding — the photo runs edge-to-edge.

**`feature-photo-card`** — A feature/lifestyle card. Background `{colors.canvas}`, padding `{spacing.lg}`. 16:9 photo at the top, `{typography.title-md}` headline + body excerpt below.

**`spec-cell`** — A technical spec cell (model detail page). Transparent background, separated by hairline dividers. Value on top (`{typography.display-sm}` 24px / 700), label below (`{typography.label-uppercase}`).

#### Inventory & Configurator

**`inventory-card`** — One card per vehicle on the dealer inventory page. Background `{colors.canvas}`, padding `{spacing.md}` (16px), rounded `{rounded.none}`. Vehicle photo on top, model + variant name + price + "View" link below.

**`filter-chip`** + **`filter-chip-active`** — Inventory filter chips (model, year, price range). Inactive: background `{colors.canvas}`, 1px `{colors.hairline-strong}` border, text `{colors.ink}`, type `{typography.caption}`. Active: background `{colors.ink}`, text `{colors.on-dark}`. Padding 8px × 14px, radius `{rounded.none}`.

**`configurator-option-tile`** + **`configurator-option-tile-selected`** — Configurator selection cell (color, wheels, upholstery). Inactive: background `{colors.canvas}`, 1px hairline. Selected: 2px `{colors.primary}` border. Padding 16px × 24px, radius `{rounded.none}`.

#### Inputs & Forms

**`text-input`** — Standard text input. Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-md}`, rounded `{rounded.none}` (0px), padding 14px × 16px, height 48px, 1px hairline border. On focus, the border thickens to ink.

**`cookie-consent-card`** — Cookie banner. Background `{colors.canvas}`, 1px hairline, padding `{spacing.lg}` (24px), `{typography.body-sm}` (14px / 300 — Light even in legal copy).

#### Tabs / Tags

**`category-tab`** + **`category-tab-active`** — Category sub-nav. Inactive: transparent + `{colors.muted}` UPPERCASE label. Active: transparent + `{colors.ink}` UPPERCASE label + 2px ink underline. 12px vertical padding, no horizontal radius.

#### Brand Signature

**`m-stripe-divider`** — A 4px-tall horizontal tricolor stripe (`{colors.m-blue-light}` → `{colors.m-blue-dark}` → `{colors.m-red}`). Only in M-model contexts, motorsport badges, or as an M-related section divider. Absent from the corporate main flow; on M-model detail pages and the M Performance badge it plays an inline divider role.

#### CTA / Footer

**`cta-band-photo`** — A pre-footer "Discover the New iX3"-style band. Background `{colors.surface-dark}` with a full-bleed vehicle photo. Centered headline in `{typography.display-md}` (32px / 700) + a single `{component.button-secondary-on-dark}`. 80px padding.

**`footer`** — The closing soft-grey footer. Background `{colors.surface-soft}` (#f7f7f7 — not pure white — soft grey), text `{colors.body}`. A 4-column link list: Models / Services / Dealers / About. Vertical padding 64px. Below, a copyright line in `{typography.body-sm}` with `{colors.muted}`.

### Do's and Don'ts

#### Do
- Sit every page on `{colors.canvas}` (pure white); reserve `{colors.surface-dark}` for hero bands only.
- Pair primary CTAs with `{colors.primary}` (BMW Blue) + `{colors.on-primary}` white text + `{rounded.none}` 0px corners — the corporate signature.
- Set display headlines in BMW Type Next Latin 700 and body in Light 300. The contrast is non-negotiable.
- Use UPPERCASE letter-spaced links like "LEARN MORE" as inline CTAs.
- Place the model card photo on `{colors.surface-card}` with the title beneath — the standard BMW corporate pattern.
- Hold section rhythm at `{spacing.section}` (80px) — tighter than BMW M's 96px.
- Reserve the M tricolor stripe for M-model contexts and motorsport dividers.

#### Don't
- Don't add a brand color other than blue — BMW Blue is the only primary action color.
- Don't use pill or rounded buttons — `{rounded.none}` (0px) rectangular IS the brand button.
- Don't drop display weight to 500 — the system uses 700 / 400 / 300; 500 is absent.
- Don't bold body type — Light 300 is the BMW corporate editorial voice.
- Don't add drop shadows to cards — depth comes from photo + color-block contrast.
- Don't repeat the same surface mode across two consecutive bands — light → dark hero → light → light feature → dark CTA → light footer rotation is required.
- Don't use the M tricolor stripe as a CTA fill — divider/accent role only.
- Don't mix languages in a single page — UI language must stay consistent.

### Responsive Behavior (web only — slides are a fixed 1920 × 1080 canvas)

#### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 64→40px; model card grid 1-up; configurator filter chips 2-up; footer 4 col → 1 col |
| Tablet | 768–1024px | Top nav narrows, secondary menu hides under "More"; model card 2-up; inventory 2-up |
| Desktop | 1024–1440px | Full top-nav; 4-up or 5-up model card grid; inventory 3-up; full configurator UI |
| Wide | > 1440px | Same as desktop, content fixed at 1440px; gutters absorb the rest |

#### Touch Targets
- `{component.button-primary}` minimum 48 × 48px — above WCAG AAA (44 × 44).
- `{component.text-input}` height 48px.
- Category tabs run with 12px vertical padding, giving an effective tap area > 44px.

#### Collapsing Strategy
- The top nav collapses to a hamburger below 768px; the menu opens as a full-screen sheet.
- The hero band's internal layout drops to a single column.
- Model card grid 4-up/5-up → 2-up → 1-up.
- The configurator filter chip row scrolls horizontally on mobile.
- The M tricolor stripe stays at 4px height across every breakpoint.

#### Image Behavior
- Model renders scale at every breakpoint while preserving native aspect ratios.
- Hero photography may shift to a more vertical crop on mobile (art direction).
- Inventory vehicle photos may move from 16:9 to 4:3 on mobile.

### Iteration Guide

1. Focus on a single component. Reference its YAML key directly (`{component.model-card}`, `{component.button-primary}`).
2. New components default to `{rounded.none}` (0px). Use `{rounded.full}` only for circular icon buttons.
3. Variants (`-active`, `-disabled`, `-selected`) live as separate entries inside the `components:` block.
4. `{token.refs}` everywhere — never inline hex.
5. Hover state is never documented. Only Default and Active/Pressed states.
6. Display headlines stay BMW Type Next Latin 700; body stays Light 300; the trio is fixed.
7. Keep UI strings in a single language — match the locale of the page.

### Known Gaps

- BMW Type Next Latin is licensed to BMW and not published as a public web font; Inter at weights 700/300 is documented as the substitute.
- Animation and transition timings (configurator color swap, model card hover-reveal) are out of scope here.
- Form validation states beyond `{component.text-input}` focus were not extracted — error/success states would need a dedicated form page.
- The dealer inventory sub-domain shares typography and color with the main corporate site; only UI density rises (filters, tables, prices).
- A cookie consent overlay can occlude part of the hero — the lead hero band content may not be fully captured.
- The M tricolor stripe appears infrequently on this corporate site; full motorsport context lives on the BMW M site.
