# MDW Wellness Vitals Checks — dedicated /vitals page

**Date:** 2026-06-04
**Status:** Approved — building
**Owner:** MDW Wellness

## Goal

A dedicated landing page at `/vitals` for the Home Wellness Vitals Checks service: hero, what-we-check, how-it-works, pricing plans, sample reports, why-choose, FAQ, and a compliance disclaimer. All CTAs funnel into the existing booking modal (vitals_check) → WhatsApp.

## Decisions (from brainstorming)

| Topic | Decision |
|---|---|
| Route | `/vitals`; navbar item + homepage slide-3 CTA link here |
| Check-card visuals | Lucide icons on brand tiles (no photos) |
| Report visuals (sec 5) | Styled placeholders, swap-ready for real screenshots |
| All CTAs | Open booking modal pre-set to `vitals_check`, plan name pre-filled in message → WhatsApp |
| FAQ | shadcn (Base UI) accordion |
| Disclaimer | Slim muted strip after FAQ, before footer |

## Architecture

```
src/app/vitals/page.tsx              Composition + metadata (static page)
src/components/vitals/
  vitals-hero.tsx
  what-we-check.tsx
  how-it-works.tsx
  wellness-plans.tsx
  wellness-reports.tsx
  why-vitals.tsx
  vitals-faq.tsx
src/data/vitals.ts                   checks[], steps[], plans[], reasons[], faqs[]
src/components/ui/accordion.tsx      New Base UI accordion primitive
```

Data-driven: all copy lives in `src/data/vitals.ts`. Section components are presentational and import from there.

## Sections

1. **Hero** — "Home Wellness Vitals Checks" + BP/Weight/Pulse/Oxygen subhead, img9.jpg, coral ₹99 price-burst, "Check Your Vitals" CTA (opens booking modal, vitals).
2. **What We Check** — heading "What We Check"; 4 icon cards:
   - Blood Pressure (BP) / Activity / "Monitor BP trends and elevated readings"
   - Pulse Rate / HeartPulse / "Track resting pulse and wellness"
   - Oxygen Level (SpO2) / Wind / "Check oxygen saturation instantly"
   - Weight Monitoring / Scale / "Track body weight trends over time"
   - Footer note: "Measurements are performed using trusted devices."
3. **How It Works** — heading "How MDW Wellness Vitals Checks Works"; 4-step connected timeline (Book Visit, Home Visit by MDW Team, Instant Mobile Report, Track Progress).
4. **Choose Wellness Plan** — 3 cards:
   - One-Time Wellness Check — ₹99 — [1 Home Vitals Check, Mobile Report Card] — "Book Now"
   - Monthly Wellness Care — ₹149 — "Most Popular" — [2 Home Vitals Checks / alternate week, Mobile reports after each visit, Month-end wellness summary, Priority medicine delivery] — "Subscribe Now"
   - Quarterly Wellness Care+ — ₹499 — [6 Home Vitals Checks / alternate weeks, Printed physical report, Priority medicine delivery, Medicine stock priority, Flat ₹9 delivery fee, Priority WhatsApp support] — "Join Care+"
   - Each CTA → booking modal (vitals_check) with message prefilled `Interested in: <plan name> (₹<amount>)`.
5. **Professional Wellness Reports** — heading; 3 placeholder report images; line "Get a digital report after every visit and track your wellness over time."
6. **Why Choose** — heading "Why Choose MDW Wellness Vitals Checks"; 4 icon reasons (Trusted Medical Devices — Omron BP machines & professional medical tools; Trained Healthcare Team; Home Convenience; Data Privacy & Secure Reports).
7. **FAQ** — accordion, 5 Q&As (verbatim from owner).

**Disclaimer strip** — "MDW Wellness Vitals Checks is a wellness monitoring service and not a substitute for medical diagnosis or treatment."

## Wiring changes

- `src/data/navigation.ts`: navbar "MDW Wellness Vitals Check" href `#vitals` → `/vitals`.
- `src/data/slides.ts`: slide 3 gains `ctaHref: "/vitals"`.
- `src/components/hero-carousel.tsx`: when a slide has `ctaHref`, the CTA renders as a link to that route instead of opening the booking modal.

## Booking integration

CTAs call `useBookingModal().open({ service: "vitals_check", message: "Interested in: <plan> (₹<amount>)" })`. No new subscription/payment system. Matches existing booking → WhatsApp flow.

## Out of scope
- Real payment/subscription
- Real report screenshots (placeholders)
- Sugar/diabetes checks (FAQ states not included)

## SEO
`metadata`: title "Home Wellness Vitals Checks | MDW Wellness", description from the vitals subhead, `robots index/follow`.

## Verification
1. `bun run build` — page prerenders static, types pass.
2. `/vitals` renders all 7 sections + disclaimer in order.
3. Plan CTAs open booking modal with the right plan in the message.
4. FAQ accordion expands/collapses.
5. Navbar "Vitals Check" + homepage slide-3 CTA both land on `/vitals`.
