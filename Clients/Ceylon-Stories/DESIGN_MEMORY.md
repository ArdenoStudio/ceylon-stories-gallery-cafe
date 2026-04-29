# Design Memory — Ceylon Stories

## Brand Tone
- **Adjectives:** Premium, editorial, minimal, dark-moody
- **Avoid:** Cluttered overlays, overly playful UI, generic sans-serif cards

## Color Palette
| Token | Hex | Use |
|---|---|---|
| `cream-page` | `#f4ecdc` | Page background |
| `cream-paper` | `#ebe0ca` | Card / surface background |
| `mahogany` | `#2a1810` | Primary text, dark UI |
| `mahogany-soft` | `#4a2e20` | Hover darks |
| `clay-warm` | `#b5552e` | Accent hover, CTA highlights |
| `clay-deep` | `#8b3a1f` | Non-veg indicator, tags |
| `sage-deep` | `#4a5a3d` | Vegetarian indicator |
| `gold-leaf` | `#b8924a` | Section labels, ring token |

## Typography
- **`font-display`** — Fraunces Variable. Used for headings, names, prices. Always `font-light`.
- **`font-editorial`** — Tenor Sans. Used for labels, tags, uppercase micro-text (tracking `0.18em–0.25em`).
- **`font-body`** — Inter. Used for body copy, descriptions.
- Italic text → Instrument Serif (when using `<i>` or `.italic`)

## Card Design (MenuItemCard — Variant D, confirmed)
- Shell: `rounded-lg border border-mahogany/10 bg-cream-paper shadow-ink`
- Image: `h-48 object-cover`, gradient `from-mahogany/50`, hover `scale-105` in 500ms
- Tag overlaid top-left; veg dot top-right (sage/clay square with dot)
- Add button: slides up from bottom on hover, `translate-y-4 → translate-y-0`
- **Content layout (Variant D):** Name + price share first row (flex justify-between); quantity label below; description (2-line clamp) below that; footer row with prep time + "Details →"
- "Details →" fades from `text-mahogany/35` to `text-clay-warm` on group hover

## Spacing & Layout
- **Card grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- **Page padding:** `px-6`, max-width `max-w-7xl mx-auto`
- **Section padding:** `py-[clamp(60px,8vh,120px)]`

## Interaction Patterns
- **Hover:** `scale: 1.02`, `transition: 0.25s`, image zoom `scale-105` in `500ms ease-out`
- **Motion easing:** `[0.16, 1, 0.3, 1]` for enter animations
- **Filter bar:** glassmorphic pill bar (`.glass-filter-bar`), pills use `.glass-pill` / `.glass-pill-active`
- **Page transitions:** AnimatePresence `mode="wait"`, opacity fade 0.3s

## Accessibility Rules
- Veg indicator: always has `aria-label`
- Add button: `aria-label="Add {name} to order"`
- Focus: `focus-visible:ring-2 focus-visible:ring-mahogany focus-visible:ring-offset-2`
- Reduced motion: disable scale/translate animations

---
*Updated by Design Lab · 2026-04-29*
