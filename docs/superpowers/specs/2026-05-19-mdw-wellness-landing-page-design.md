# MDW Wellness — Landing Page Design Spec

## Overview

A Next.js landing page for MDW Wellness, a physiotherapy and wellness service. Inspired by getphysio.in but elevated with a Minimal Clinical aesthetic — clean, professional, easy on the eyes. All booking CTAs redirect to WhatsApp for the initial version.

## Tech Stack

- **Runtime / Package Manager:** Bun (used consistently for install, scripts, and dev server)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Icons:** Lucide React (SVG)
- **Carousel:** Embla Carousel (shadcn/ui integration)
- **Animations:** Framer Motion
- **Language:** TypeScript

## Design System

### Color Palette (Light Mode)

| Token         | Hex       | Usage                              |
|---------------|-----------|-------------------------------------|
| Primary       | #4A90D9   | Buttons, links, active states       |
| Primary Dark  | #2E6BB0   | Hover states, emphasis              |
| Background    | #FAFBFC   | Page background                     |
| Surface       | #FFFFFF   | Cards, navbar, modals               |
| Text Primary  | #1A2B3C   | Headings, body text                 |
| Text Secondary| #5A6B7C   | Subtitles, captions, metadata       |
| Border        | #E2E8F0   | Card borders, dividers              |
| Accent Green  | #25D366   | WhatsApp CTA, success states        |
| Footer BG     | #1E293B   | Footer background (deep navy/slate) |
| Footer Text   | #CBD5E1   | Footer body text                    |

### Typography

- **Font Family:** Inter (Google Fonts) — clean, medical-professional feel
- **Headings:** Semi-bold (600), sizes: H1 (48/36 mobile), H2 (36/28), H3 (24/20)
- **Body:** Regular (400), 16px/18px line height 1.6
- **Small:** 14px for captions, metadata

### Spacing & Radius

- Section padding: 80px vertical desktop, 48px mobile
- Card border radius: 12px
- Button border radius: 8px
- Consistent 8px spacing grid

## Page Sections (Top to Bottom)

### 1. Navbar (Sticky)

- **Position:** Fixed top, white background, subtle shadow on scroll
- **Left:** MDW Wellness text logo (placeholder, swappable for brand asset later)
- **Center/Right items:** Home | Online Consultation | Home Therapy | About Us | MDW Wellness Vitals Check
- **Far right:** "Book Now" WhatsApp CTA button (green accent)
- **Mobile:** Hamburger icon → slide-in sheet/drawer with all nav items + WhatsApp button
- **Behavior:** Transparent at page top, transitions to white with shadow on scroll
- **Smooth scroll:** Clicking nav items smooth-scrolls to corresponding page sections

### 2. Hero Carousel

- **Layout:** Full-width, 4-5 slides
- **Each slide:** Background image/illustration (placeholder) + headline + short description + "Book on WhatsApp" CTA
- **Auto-rotate:** 5-second interval, pause on hover
- **Navigation:** Dot indicators (bottom center) + left/right arrow buttons (subtle, appear on hover)
- **Transition:** Smooth crossfade between slides
- **Library:** Embla Carousel via shadcn/ui carousel component
- **Responsive:** Text stacks above image on mobile, side-by-side on desktop
- **Placeholder content:** 3-4 slides covering key services (Online Consultation, Home Therapy, Vitals Check, general wellness)

### 3. Services (Video Reels)

- **Heading:** "Our Services" + subtitle
- **Layout:** Horizontal scrollable row, 4-6 vertical cards (9:16 aspect ratio)
- **Each card:**
  - Autoplay short video (muted, loops) on hover (desktop) / viewport entry (mobile)
  - Service name overlay at bottom with gradient fade-to-black
  - "Learn More" or WhatsApp CTA appears on hover
  - Framer Motion hover scale-up (1.02x)
- **Scrolling:** CSS snap scroll on mobile (one card at a time), 4 cards visible on desktop with peek of next
- **Placeholder:** Static images with play icon overlay until real videos are provided
- **Slots:** 4-6, flexible — content not finalized

### 4. Testimonials

- **Heading:** "What Our Clients Say" + subtitle
- **Layout:** Horizontal carousel, 3 cards visible desktop, 1 on mobile
- **Each card:**
  - Circular client avatar (placeholder image)
  - Client name + condition treated (e.g., "Back Pain Recovery")
  - Star rating (1-5, SVG stars)
  - Short quote (2-3 lines)
- **Card style:** White background, soft shadow, 12px radius
- **Behavior:** Auto-scroll, dot indicators, draggable/swipeable on mobile
- **Animation:** Framer Motion fade-in on scroll viewport entry
- **Placeholder:** 5-6 sample testimonials with realistic placeholder data

### 5. Health Tips

- **Heading:** "Health Tips & Wellness" + subtitle "Weekly insights from our therapists"
- **Layout:** 3-column grid desktop, single column mobile
- **Each card:**
  - Thumbnail image (placeholder)
  - Category tag chip (e.g., "Back Care", "Posture", "Recovery")
  - Title + 2-line excerpt
  - Therapist name + published date
  - "Read More" link (links to WhatsApp or future blog)
- **Card style:** Subtle hover lift effect (translateY -4px + shadow increase)
- **Data:** Static JSON array, latest 3 displayed. Designed for easy CMS integration later.
- **Update cadence:** Once per week by therapist

### 6. Footer

- **Background:** Deep navy/slate (#1E293B)
- **Layout:** 4-column grid desktop, stacks on mobile
  - **Column 1 — Brand:** Logo, 1-line tagline, social icons (Instagram, Facebook, YouTube — Lucide SVGs)
  - **Column 2 — Quick Links:** Home, About Us, Online Consultation, Home Therapy, Vitals Check
  - **Column 3 — Health Tips:** Links to latest 2-3 published tips
  - **Column 4 — Contact:** Phone, email, WhatsApp link, address (all placeholder)
- **Bottom bar:** Copyright "© 2026 MDW Wellness. All rights reserved." | Privacy Policy | Terms of Service
- **Text color:** Light slate (#CBD5E1) for body, white for headings

### 7. Floating WhatsApp FAB

- **Position:** Fixed bottom-right corner, always visible
- **Style:** Green (#25D366) circular button with WhatsApp SVG icon
- **Behavior:** Opens WhatsApp link (pre-filled message) in new tab
- **Animation:** Subtle pulse/bounce on first load to draw attention, then static
- **Z-index:** Above all other content

## Global Behaviors

- **Smooth scrolling:** `scroll-behavior: smooth` globally, nav items scroll to sections
- **Responsive breakpoints:** Mobile-first — sm(640), md(768), lg(1024), xl(1280)
- **Scroll animations:** Framer Motion `whileInView` fade-up for all sections
- **Performance:** Next.js Image component for all images, lazy loading below the fold
- **SEO:** Proper meta tags, Open Graph, semantic HTML throughout
- **Accessibility:** Proper ARIA labels, keyboard navigation, focus states, color contrast AA compliant

## Data Architecture

All content is static for V1 — stored as TypeScript constants/JSON:

- `data/slides.ts` — Carousel slide content
- `data/services.ts` — Service reel cards
- `data/testimonials.ts` — Testimonial entries
- `data/healthTips.ts` — Health tip articles
- `data/navigation.ts` — Nav items and footer links
- `data/site.ts` — Site metadata, WhatsApp number, contact info

Designed so any of these can be swapped to a CMS (e.g., Sanity, Contentful) or database later by replacing the imports with API calls.

## File Structure

```
src/
  app/
    layout.tsx          — Root layout, fonts, metadata
    page.tsx            — Landing page (composes all sections)
    globals.css         — Tailwind directives, custom CSS vars
  components/
    navbar.tsx          — Sticky navbar + mobile drawer
    hero-carousel.tsx   — Hero carousel section
    services-reels.tsx  — Video reels service cards
    testimonials.tsx    — Testimonials carousel
    health-tips.tsx     — Health tips grid
    footer.tsx          — Footer
    whatsapp-fab.tsx    — Floating WhatsApp button
    ui/                 — shadcn/ui components (button, card, sheet, carousel, etc.)
  data/
    slides.ts
    services.ts
    testimonials.ts
    healthTips.ts
    navigation.ts
    site.ts
  lib/
    utils.ts            — shadcn/ui cn() utility
```

## Out of Scope (V1)

- User authentication / accounts
- In-app booking system
- Blog/article pages (health tips link to WhatsApp for now)
- Dark mode
- CMS integration
- Payment processing
- Multi-language support
