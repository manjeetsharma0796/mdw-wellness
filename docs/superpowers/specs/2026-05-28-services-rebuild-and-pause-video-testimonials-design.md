# Services rebuild with photos; pause video testimonials

**Date:** 2026-05-28
**Status:** Approved — proceeding to implementation
**Owner:** MDW Wellness

## Goal

1. Replace the 5-service YouTube-iframe carousel with 6 photo-driven service cards reflecting the actual service taxonomy.
2. Pause the video testimonials section on the homepage. Preserve component + data so it can be flipped back on when real client videos arrive.

## Service taxonomy and image mapping

| # | Service | Image | Alt text |
|---|---|---|---|
| 1 | Physiotherapy | `/images/img1.jpg` | "MDW physiotherapist fitting an ankle brace on a client at home." |
| 2 | Dry Cupping Therapy | `/images/img5.jpg` | "Dry cupping therapy session with three cups placed on a client's back." |
| 3 | Acupuncture | `/images/img8.jpg` | "Acupuncture session with multiple thin needles placed along the back." |
| 4 | Dry Needling | `/images/img4.jpg` | "Closeup of dry needling, a single fine needle held by a gloved practitioner." |
| 5 | Massage Therapy | `/images/img7.jpg` | "MDW massage therapist working on a client's shoulders during a relaxation massage." |
| 6 | Sports Rehabilitation | `/images/img2.jpg` | "MDW therapist examining a footballer's knee on a sports field." |

img3 and img6 stay in the hero carousel (Online Consultation and Home Therapy slides). No image is reused across sections.

## Card aspect

Square `1:1`. The previous `9:16` portrait was built for video and crops landscape/square photos aggressively. Square preserves more of each photo while keeping the 3-up grid balanced visually.

## Data shape

```ts
// src/data/services.ts
export interface Service {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  /** When videos return, populate this and the carousel will switch back to iframe rendering. */
  youtubeId?: string | null;
  /** Legacy field kept for future use. */
  thumbnailSrc?: string;
}
```

## Carousel behavior

`src/components/services-carousel.tsx`:

- Card frame: `aspect-square` (replacing `aspect-[9/16]`)
- Render branch ordering (top to bottom):
  1. If `service.youtubeId`: render YouTube iframe (current behavior preserved for later)
  2. Else if `service.imageSrc`: render `<Image fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover">`
  3. Else: icon fallback on `bg-primary`

Same gradient bottom strip with service title overlay stays.

New icon map for the 6-service taxonomy:

```ts
const serviceIcons: Record<string, LucideIcon> = {
  "Physiotherapy": Activity,
  "Dry Cupping Therapy": Droplets,
  "Acupuncture": Sparkles,
  "Dry Needling": Zap,
  "Massage Therapy": HandHeart,
  "Sports Rehabilitation": Trophy,
};
```

These rarely render in practice (all 6 services have images), but they keep the type contract intact.

## Video testimonials pause

`src/app/page.tsx`:

- Comment out the `import { VideoTestimonials }` line.
- Comment out the `<VideoTestimonials />` JSX line in the layout.

Leave inline notes: `/* Re-enable when real client videos are uploaded. */`

Do NOT delete:
- `src/components/video-testimonials.tsx` — fully intact.
- `src/data/video-testimonials.ts` — fully intact.

Restoration is a 2-line uncomment when videos exist.

## Out of scope

- Service descriptions / hover-state copy. Cards remain title-only (matches the existing pattern).
- Reordering homepage sections.
- Updating text testimonials section.
- Modifying service icons beyond the 6-service map.
- Booking-flow changes (services don't appear in the booking form — `ServiceType` enum stays `online_consultation | home_therapy | vitals_check`).

## Verification

1. `bun run build` — passes; `/` still prerenders static.
2. Homepage shows 6 service cards in a 3-up carousel with square photos.
3. Each photo lines up with the right service per the mapping table.
4. Where "What Our Clients Say" used to be, that section is now absent. Spacing between Why Choose Us and Text Testimonials should still feel balanced (no awkward double-gap).
5. Reverting: uncomment the two lines in `page.tsx`; section returns identical.
