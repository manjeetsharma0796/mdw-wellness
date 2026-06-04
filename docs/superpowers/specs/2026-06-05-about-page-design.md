# About Us — dedicated /about page

**Date:** 2026-06-05
**Status:** Approved — building
**Owner:** MDW Wellness

## Goal

A dedicated `/about` page (no homepage section) that tells visitors who MDW Wellness is, why to trust it, and its parent/location — using verified facts only.

## Decisions (from brainstorming)

| Topic | Decision |
|---|---|
| Placement | Dedicated `/about` route; nothing on the homepage |
| Links | Navbar + footer "About Us" repoint `#about` → `/about` |
| Facts | Known facts only — no invented year, team names, or stats |
| Blocks | Mission/who-we-are, Why trust us, Parent company & location |
| Image | Reuse `your_wellness.jpg` (the MDW team photo) in the intro |

## Architecture

```
src/app/about/page.tsx        Composition + metadata + breadcrumb JSON-LD
src/data/about.ts             Mission copy, trust points, company info
```
Section markup lives inline in `page.tsx` (moderate size, one page). Content is data-driven via `src/data/about.ts`.

## Sections

1. **Intro split** — h1 "About MDW Wellness" + mission paragraph (left), team photo `your_wellness.jpg` (right). Stacks on mobile.
2. **Why trust us** — 4 icon items: Qualified therapists, Trusted medical devices, Home convenience, Data privacy & secure reports.
3. **Company & location** — MDW Wellness (My Dawai Wala Wellness) is a unit of SwiftMeds Pharma Pvt Ltd, Kidderpore, Kolkata + registered address + a "Book on WhatsApp" CTA (opens booking modal).

## Copy (verified facts only)

- Mission: home + online therapy-led physiotherapy and wellness for Kolkata; convenient, comfortable, person-centered.
- Trust: qualified physiotherapists, trusted medical devices (Omron etc.), home convenience, private/secure reports.
- Company: brand MDW Wellness / My Dawai Wala Wellness; legal entity SwiftMeds Pharma Pvt Ltd; address 26/1A, Ekbalpore Road, Kidderpore, Kolkata 700023.
- No cure/guarantee language. No invented numbers, founding year, or names.

## Wiring
- `src/data/navigation.ts`: navbar + footer "About Us" → `/about`.
- `src/app/sitemap.ts`: add `/about` (priority 0.6).

## SEO
`title: "About Us"` (template appends "| MDW Wellness"), description, `alternates.canonical: "/about"`, BreadcrumbList JSON-LD (Home → About).

## Out of scope
- Stats band / team profiles (no real data)
- Founder story / timeline
- Homepage About section

## Verification
1. `bun run build` — `/about` prerenders static, types pass.
2. Nav + footer "About Us" land on `/about` from any page.
3. `/about` in sitemap; canonical + breadcrumb present.
4. CTA opens the booking modal.
