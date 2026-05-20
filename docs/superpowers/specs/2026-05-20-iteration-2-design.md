# MDW Wellness — Iteration 2 Design Spec

## Overview

Iteration 2 of the MDW Wellness landing page. Adds two new sections, restructures three existing ones, and updates the brand color. Preserves the Minimal Clinical aesthetic established in iteration 1.

## What Changes

| Status | Section |
|--------|---------|
| NEW | Online Consultation @ ₹499 — feature card section |
| NEW | Why Choose Us — 5-item icon grid |
| UPDATED | Services — converted to true video carousel (3 visible, center plays) |
| UPDATED | Testimonials — video masonry + text card row below |
| UPDATED | Footer — restructured columns (Policies, Know Us, Contact, Brand+Socials) |
| UPDATED | Brand primary color → `#018bc4` |
| UNCHANGED | Navbar, Hero Carousel, Health Tips, WhatsApp FAB |

## New Section Flow (Top to Bottom)

1. Navbar (sticky)
2. Hero Carousel
3. **Online Consultation @ ₹499** ⭐ new
4. Services (video carousel)
5. **Why Choose Us** ⭐ new
6. Testimonials (video masonry + text cards)
7. Health Tips
8. Footer
9. WhatsApp FAB (floating)

## Design System Updates

### Color Palette

Replace the existing primary blue with the official brand color:

| Token | Old | New |
|-------|-----|-----|
| `--mdw-primary` | `#4A90D9` | `#018bc4` |
| `--mdw-primary-dark` | `#2E6BB0` | `#016a96` |

All other tokens unchanged. The change propagates automatically through every component using `var(--mdw-primary)`, the shadcn `--primary` mapping, and Tailwind `primary` utility.

## Section Specs

### 1. Online Consultation @ ₹499 (NEW)

**Position:** Directly after hero, before services.

**Layout:** Single centered feature card on a soft tinted background strip (`bg-primary/5`).

**Card structure:**
- Small uppercase badge: "Online Consultation" (primary tint pill)
- Large price display: **₹499** (4xl/5xl) with "/ session" small text alongside
- Headline (2xl/3xl): "Talk to a Certified Physiotherapist Today"
- 4-item bullet list with green check icons:
  - Video consult with expert physio
  - 30-minute focused session
  - Personalized treatment plan
  - Follow-up via WhatsApp
- Primary CTA button: "Book on WhatsApp" (green accent, anchor)
- Small subtext: "No hidden charges · Money-back if not satisfied"

**Styling:** White surface, soft shadow, 16px border radius, subtle primary-tinted border (`border-primary/15`). Max width ~640px, centered.

**Mobile:** Card padding reduces, bullets remain visible, button is full-width.

**Animation:** Framer Motion fade-up on viewport entry (via existing SectionWrapper).

### 2. Services — Video Carousel (UPDATED)

**Replaces:** Current horizontal-scroll video reels.

**Layout:** Embla carousel with 3 cards visible (peek-center-peek pattern) on desktop, 1 card on mobile. 9:16 aspect ratio per card. Loop mode enabled.

**Behavior:**
- The center (active) card autoplays muted by default
- Side cards are paused and dimmed (opacity 60), showing poster + Play icon overlay
- Clicking a side card slides it to center (`api.scrollTo(idx)`)
- Active card has a scale-up (1.04) via Framer Motion
- Active card displays a volume toggle button (Lucide `Volume2`/`VolumeX`) and a "Book on WhatsApp" CTA in the bottom overlay
- Prev/Next arrow buttons and dot indicators below carousel

**Accessibility:**
- `aria-roledescription="carousel"` on wrapper
- `aria-current` on active dot
- All buttons keyboard accessible with focus-visible rings
- Respect `prefers-reduced-motion` (no autoplay if reduced)

**Placeholder:** When `videoSrc` is `null`, show a gradient background with the existing per-service Lucide icon overlay; treat as a still poster.

**Data:** Reuses existing `Service` interface (`id`, `title`, `videoSrc`, `thumbnailSrc`). 5 placeholder entries.

### 3. Why Choose Us (NEW)

**Position:** After Services, before Testimonials.

**Heading:** "Why Choose Us?" (centered, h2 same scale as other sections) with a short subtitle: "What sets MDW Wellness apart."

**Layout:** 5 cards in a row on desktop (lg: 5-col), 2-col on tablet (sm: 2-col), 1-col on mobile. Items center-aligned within their card.

**Each card:**
- Circular icon badge (h-16 w-16, soft primary tint bg, primary icon color) at top
- Title (semibold, base size) below icon
- 1-line subtitle (text-muted-foreground, sm size) below title
- Soft hover lift (translateY -2px + shadow bump)

**5 items:**

| Title | Lucide icon | Subtitle |
|-------|-------------|----------|
| Best Treatment | `ThumbsUp` | Evidence-based therapies from certified physiotherapists |
| Consult & Collaborate | `Users` | We work with your existing doctors for unified care |
| Self-Care Interventions | `Activity` | Daily exercises and routines you can do at home |
| Secure Payment | `ShieldCheck` | Encrypted, transparent billing with no hidden charges |
| Customised Care Plan | `ClipboardList` | Treatment tailored to your specific condition and goals |

**Data:** New static file `src/data/why-choose-us.ts` exporting an array of `{ id, title, icon, subtitle }`. Icon stored as a Lucide component reference.

### 4. Testimonials — Video Masonry + Text Cards (UPDATED)

**Replaces:** Current text-only carousel.

**Section heading:** "What Our Clients Say" (unchanged) with subtitle: "Hear from people we've helped recover and thrive."

**Top half — Video masonry:**
- CSS columns-based masonry layout: 3 columns desktop, 2 columns tablet, 1 column mobile
- 6-8 video tiles with intentionally varied heights (mix of 9:16 portrait, 1:1 square, 4:3 landscape posters)
- Each tile:
  - Poster image (gradient placeholder until real assets) filling the tile
  - Centered Play icon overlay (white, with subtle dark backdrop circle)
  - Small client name + condition pill at bottom corner
  - Hover: scale 1.02, shadow lift
  - Click: opens modal with full video + audio
- Tiles render in a `column-fill: balance` CSS columns container; each tile uses `break-inside-avoid` to prevent splitting

**Modal:**
- shadcn `Dialog` component
- Black backdrop (90% opacity), centered video player (max 90vw × 80vh)
- Native HTML5 `<video>` with `controls`, autoplay on open, looped
- Close via backdrop click, X button (top-right), or Esc key
- Trap focus inside modal while open (shadcn handles this)
- Respect `prefers-reduced-motion`: disable autoplay on open if reduced

**Bottom half — Text testimonials:**
- 3-card grid (no carousel, no autoplay — static collage)
- Reuse the existing text testimonial card design (avatar circle with initial, star rating, quote, name + condition)
- Selects 3 from the existing `testimonials.ts` data
- Subtle divider (border-top, 32px above) between the video and text halves

**Data:** New `src/data/video-testimonials.ts` with 6-8 entries: `{ id, name, condition, posterSrc, videoSrc, aspectRatio: "portrait"|"square"|"landscape" }`. Existing `src/data/testimonials.ts` continues to feed the text row.

### 5. Footer — Restructured (UPDATED)

**Background:** Deep navy `#1E293B` (unchanged).

**Layout:** 4 columns on desktop (`md:grid-cols-4`), 2 on tablet, 1 on mobile.

**Column 1 — Brand:**
- MDW Wellness logo text (h3, white)
- Tagline (text-sm)
- Description (text-sm, white/80)
- 6 social icons in a row:
  - Facebook (existing inline SVG)
  - Instagram (existing inline SVG)
  - YouTube (existing inline SVG)
  - **X** — new inline SVG (the modern X / Twitter logo)
  - **LinkedIn** — new inline SVG
  - **Medial** — stylized "M" letter mark in a circle (no standard logo SVG; link goes to medial.app profile)
- Same circular tinted-bg button style as iteration 1

**Column 2 — Our Policies:**
- Terms and Conditions → `#terms`
- Privacy Policy → `#privacy`
- Grievance Redressal → `#grievance`

**Column 3 — Know Us:**
- FAQ → `#faq`
- About Us → `#about`
- Contact Support → opens WhatsApp via existing helper

**Column 4 — Contact Info:**
- **Phone:** +91 6291495007 (tel link: `tel:+916291495007`)
- **Address:** 26/1A, Ekbalpore Road, Kidderpore, Kolkata 23 (text, MapPin icon)
- **Email:** support@mydawaiwala.com (mailto link)

**Bottom bar:** Unchanged copyright + Privacy/Terms shortcut links.

**Data:**
- Update `src/data/navigation.ts` to add `policies`, `knowUs` link groups
- Update `src/data/site.ts`:
  - `phone` → `+91 6291495007`
  - `address` → `26/1A, Ekbalpore Road, Kidderpore, Kolkata 23`
  - `email` → `support@mydawaiwala.com`
  - `socials` → add `x`, `linkedin`, `medial` URL fields
  - WhatsApp number kept at placeholder per user direction

## File Changes Summary

### New files
- `src/components/online-consultation.tsx` — ₹499 feature card section
- `src/components/services-carousel.tsx` — replaces `services-reels.tsx`
- `src/components/why-choose-us.tsx` — 5-item icon grid
- `src/components/video-testimonials.tsx` — masonry of video tiles with modal
- `src/data/why-choose-us.ts` — 5 benefit items
- `src/data/video-testimonials.ts` — 6-8 video testimonial entries

### Updated files
- `src/app/globals.css` — `--mdw-primary` → `#018bc4`, `--mdw-primary-dark` → `#016a96`
- `src/app/page.tsx` — new section composition with the new ordering
- `src/components/testimonials.tsx` — strip the carousel/autoplay, render a static 3-card row (text only)
- `src/components/footer.tsx` — add Policies + Know Us columns, add X/LinkedIn/Medial social SVGs, update contact info
- `src/data/site.ts` — new contact info, new social URLs
- `src/data/navigation.ts` — add `policies` and `knowUs` arrays under `footerLinks`

### Removed
- `src/components/services-reels.tsx` (replaced by `services-carousel.tsx`)

### shadcn components to add
- `dialog` — for the video testimonial modal: `bunx --bun shadcn@latest add dialog --yes`

## Out of Scope (V2)

- Real video files (placeholders only until provided)
- Backend/CMS integration
- Routes for policy pages (links are `#` placeholders)
- FAQ accordion section (only the footer link)
- About Us page
- Multi-language support
