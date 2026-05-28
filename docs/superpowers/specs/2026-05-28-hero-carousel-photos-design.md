# Hero carousel photos: Online Call + Home Visit

**Date:** 2026-05-28
**Status:** Approved — proceeding to implementation
**Owner:** MDW Wellness

## Goal

Replace the generic `HeartPulse` icon on hero slides 1 (Online Consultation) and 2 (Home Therapy) with real lifestyle photographs. Keep slides 3 (Vitals Check) and 4 (Wellness) on the icon placeholder until photos are available. Show photos on mobile too, where the right column was previously hidden.

## Decisions

| Topic | Decision |
|---|---|
| Frame | Keep the existing blue tile + white inset card decoration; swap icon for photo inside the white card |
| Slides 3 & 4 | Keep `HeartPulse` icon placeholder unchanged |
| Mobile | Photo stacks above the text; same blue-tile frame, smaller scale |
| File handoff | User saves `public/images/slide-online.jpg` and `public/images/slide-home.jpg`; code wires those paths |
| Image component | `next/image` with `fill`, `priority` on slide 1 only (LCP) |
| Crop | `object-cover`, square on desktop, 4:3 on mobile |
| Alt text | Per-slide, descriptive |

## File changes

- `src/data/slides.ts` — extend `Slide` interface with `imageSrc?: string` and `imageAlt?: string`; populate slides 1 & 2.
- `src/components/hero-carousel.tsx` — restructure right-column to render `<Image>` when `slide.imageSrc` is set, fall back to icon otherwise. Restructure grid so the right column shows on mobile too, stacked above the text via `order-*` utilities. Add `next/image` import.
- `public/images/slide-online.jpg` — **user-provided.** Online call photo. Recommended ~1200×900 or 1200×1200, ~80% JPG quality.
- `public/images/slide-home.jpg` — **user-provided.** Home visit photo. Same recommendations.

## Schema

```ts
export interface Slide {
  id: number;
  headline: string;
  description: string;
  ctaText: string;
  imagePlaceholder: string;   // legacy field, kept for back-compat
  imageSrc?: string;          // new: actual image path
  imageAlt?: string;          // new: required when imageSrc is set
}
```

## Responsive layout

| Breakpoint | Layout |
|---|---|
| `< 640` | Single column. Photo on top in a 4:3 frame, max-w-md, centered. Text below with `py-8` rhythm. |
| `≥ 640` (sm) | Same single column, photo frame allowed to grow up to `max-w-md`. |
| `≥ 768` (md) | Two columns. Text on left, photo on right in `h-80 w-80` square. Min slide height returns to 600px. |
| `≥ 1024` (lg) | Photo grows to `h-96 w-96`. |

Achieved by swapping `order-1/order-2` between mobile (image first) and desktop (`md:order-*` text first).

## Performance

- `<Image fill>` requires a `position: relative` parent — already true (the existing decoration is absolutely positioned).
- `sizes` matches actual rendered widths: `"(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 640px) 448px, 100vw"`.
- `priority` is set only on slide 1's image so the first LCP isn't competing with autoplayed slides 2-4.
- Other slides' images load lazily as the carousel rotates.

## Alt text (initial)

- Slide 1: *"MDW Wellness physiotherapist on a video consultation, shown on a laptop in a home setting."*
- Slide 2: *"MDW Wellness therapist assisting an elderly client with knee mobility exercises in her living room."*

## Out of scope

- Slide 3 photo (Vitals Check) — keeps icon placeholder until photo provided.
- Slide 4 photo (Wellness) — keeps icon placeholder until photo provided.
- Image preloading / blur placeholders.
- Lite-YouTube swap for the services carousel (separate concern).

## Verification

1. `bun run build` — types pass, hero carousel still prerenders as static.
2. Local dev: `/` shows photo on slides 1 & 2; icon still on 3 & 4.
3. Resize browser below 640px: photo stacks above the headline; frame scales down.
4. Lighthouse / DevTools: slide 1 image has `fetchpriority="high"` (set by `priority`); slides 2-4 don't.
