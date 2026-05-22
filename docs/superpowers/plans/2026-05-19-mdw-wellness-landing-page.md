# MDW Wellness Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality Next.js landing page for MDW Wellness with sticky navbar, hero carousel, video reels services, testimonials, health tips, footer, and floating WhatsApp CTA.

**Architecture:** Single-page Next.js 15 App Router app. All content is static TypeScript data files. Components are server-rendered where possible, client components only where interactivity is needed (carousel, scroll animations, video hover). shadcn/ui for base components, Framer Motion for animations.

**Tech Stack:** Bun, Next.js 15, Tailwind CSS 4, shadcn/ui, Lucide React, Embla Carousel, Framer Motion, TypeScript

---

## File Map

| File                                 | Responsibility                               | Created In                    |
| ------------------------------------ | -------------------------------------------- | ----------------------------- |
| `src/data/site.ts`                   | Site metadata, WhatsApp number, contact info | Task 2                        |
| `src/data/navigation.ts`             | Nav items, footer links                      | Task 2                        |
| `src/data/slides.ts`                 | Hero carousel slide content                  | Task 2                        |
| `src/data/services.ts`               | Service reel card data                       | Task 2                        |
| `src/data/testimonials.ts`           | Testimonial entries                          | Task 2                        |
| `src/data/health-tips.ts`            | Health tip articles                          | Task 2                        |
| `src/app/layout.tsx`                 | Root layout, Inter font, metadata            | Task 3                        |
| `src/app/page.tsx`                   | Landing page composing all sections          | Task 3 (extended each task)   |
| `src/app/globals.css`                | Tailwind directives, CSS custom properties   | Task 3                        |
| `src/components/navbar.tsx`          | Sticky navbar + mobile sheet drawer          | Task 4                        |
| `src/components/hero-carousel.tsx`   | Hero carousel with autoplay                  | Task 5                        |
| `src/components/services-reels.tsx`  | Horizontal scrollable video reel cards       | Task 6                        |
| `src/components/testimonials.tsx`    | Testimonial carousel                         | Task 7                        |
| `src/components/health-tips.tsx`     | Health tips 3-column grid                    | Task 8                        |
| `src/components/footer.tsx`          | 4-column footer                              | Task 9                        |
| `src/components/whatsapp-fab.tsx`    | Floating WhatsApp button                     | Task 10                       |
| `src/components/section-wrapper.tsx` | Reusable Framer Motion fade-in wrapper       | Task 3                        |
| `src/lib/utils.ts`                   | shadcn/ui `cn()` utility                     | Task 1 (scaffolded by shadcn) |

---

### Task 1: Scaffold Next.js Project + Install Dependencies

**Files:**

- Create: Full Next.js project scaffold
- Create: `components.json` (shadcn config)

- [ ] **Step 1: Create Next.js project with Bun**

```bash
bunx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-bun --turbopack
```

Select defaults: no `src/` already set via flag, App Router yes, Turbopack yes.

- [ ] **Step 2: Initialize shadcn/ui**

```bash
bunx shadcn@latest init -d
```

This creates `components.json`, `src/lib/utils.ts`, and configures Tailwind CSS variables.

- [ ] **Step 3: Install shadcn/ui components we need**

```bash
bunx shadcn@latest add button card sheet carousel badge
```

- [ ] **Step 4: Install Framer Motion**

```bash
bun add framer-motion
```

- [ ] **Step 5: Verify dev server starts**

```bash
bun run dev
```

Expected: Dev server running at `http://localhost:3000` with default Next.js page.

- [ ] **Step 6: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 15 with shadcn/ui, Tailwind, Framer Motion"
```

---

### Task 2: Create Static Data Files

**Files:**

- Create: `src/data/site.ts`
- Create: `src/data/navigation.ts`
- Create: `src/data/slides.ts`
- Create: `src/data/services.ts`
- Create: `src/data/testimonials.ts`
- Create: `src/data/health-tips.ts`

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const siteConfig = {
  name: "MDW Wellness",
  tagline: "Your Partner in Health & Recovery",
  description:
    "Expert physiotherapy and wellness services — online consultations, home therapy, and comprehensive vitals checks.",
  whatsappNumber: "919230189093",
  whatsappMessage: "Hi, I'd like to book a consultation with MDW Wellness.",
  phone: "+91 99999 99999",
  email: "info@mdwwellness.in",
  address: "New Delhi, India",
  socials: {
    instagram: "https://instagram.com/mdwwellness",
    facebook: "https://facebook.com/mdwwellness",
    youtube: "https://youtube.com/@mdwwellness",
  },
} as const;

export function getWhatsAppUrl(message?: string) {
  const msg = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
}
```

- [ ] **Step 2: Create `src/data/navigation.ts`**

```ts
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Online Consultation", href: "#services" },
  { label: "Home Therapy", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Vitals Check", href: "#vitals" },
];

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Online Consultation", href: "#services" },
    { label: "Home Therapy", href: "#services" },
    { label: "Vitals Check", href: "#vitals" },
  ],
};
```

- [ ] **Step 3: Create `src/data/slides.ts`**

```ts
export interface Slide {
  id: number;
  headline: string;
  description: string;
  ctaText: string;
  imagePlaceholder: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    headline: "Expert Online Consultations",
    description:
      "Connect with certified physiotherapists from the comfort of your home. Get personalized treatment plans via video call.",
    ctaText: "Book on WhatsApp",
    imagePlaceholder: "/images/slide-online.jpg",
  },
  {
    id: 2,
    headline: "Home Therapy Sessions",
    description:
      "Our therapists come to you. Professional physiotherapy treatments delivered at your doorstep.",
    ctaText: "Book Home Visit",
    imagePlaceholder: "/images/slide-home.jpg",
  },
  {
    id: 3,
    headline: "MDW Wellness Vitals Check",
    description:
      "Comprehensive health screening — vitals, posture analysis, flexibility assessment, and personalized wellness report.",
    ctaText: "Check Your Vitals",
    imagePlaceholder: "/images/slide-vitals.jpg",
  },
  {
    id: 4,
    headline: "Your Recovery, Our Mission",
    description:
      "Trusted by hundreds of clients. Evidence-based physiotherapy for pain relief, mobility, and long-term wellness.",
    ctaText: "Get Started",
    imagePlaceholder: "/images/slide-wellness.jpg",
  },
];
```

- [ ] **Step 4: Create `src/data/services.ts`**

```ts
export interface Service {
  id: number;
  title: string;
  videoSrc: string | null;
  thumbnailSrc: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Online Consultation",
    videoSrc: null,
    thumbnailSrc: "/images/service-online.jpg",
  },
  {
    id: 2,
    title: "Home Therapy",
    videoSrc: null,
    thumbnailSrc: "/images/service-home.jpg",
  },
  {
    id: 3,
    title: "Pain Management",
    videoSrc: null,
    thumbnailSrc: "/images/service-pain.jpg",
  },
  {
    id: 4,
    title: "Sports Rehabilitation",
    videoSrc: null,
    thumbnailSrc: "/images/service-sports.jpg",
  },
  {
    id: 5,
    title: "Post-Surgery Recovery",
    videoSrc: null,
    thumbnailSrc: "/images/service-surgery.jpg",
  },
];
```

- [ ] **Step 5: Create `src/data/testimonials.ts`**

```ts
export interface Testimonial {
  id: number;
  name: string;
  condition: string;
  quote: string;
  rating: number;
  avatarSrc: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    condition: "Back Pain Recovery",
    quote:
      "After just 4 sessions, my chronic back pain reduced significantly. The therapist was incredibly knowledgeable and caring.",
    rating: 5,
    avatarSrc: "/images/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    condition: "Sports Injury",
    quote:
      "Got back on the field in half the expected recovery time. The home therapy sessions made it so convenient.",
    rating: 5,
    avatarSrc: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Anita Desai",
    condition: "Post-Surgery Rehab",
    quote:
      "The online consultation was a lifesaver when I couldn't travel. Professional, punctual, and effective treatment.",
    rating: 4,
    avatarSrc: "/images/avatar-3.jpg",
  },
  {
    id: 4,
    name: "Vikram Singh",
    condition: "Neck & Shoulder Pain",
    quote:
      "I was skeptical about online physio, but the results speak for themselves. Highly recommend MDW Wellness.",
    rating: 5,
    avatarSrc: "/images/avatar-4.jpg",
  },
  {
    id: 5,
    name: "Meera Patel",
    condition: "Posture Correction",
    quote:
      "The vitals check gave me a clear picture of my health. The follow-up therapy plan was exactly what I needed.",
    rating: 5,
    avatarSrc: "/images/avatar-5.jpg",
  },
];
```

- [ ] **Step 6: Create `src/data/health-tips.ts`**

```ts
export interface HealthTip {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  therapistName: string;
  publishedDate: string;
  thumbnailSrc: string;
}

export const healthTips: HealthTip[] = [
  {
    id: 1,
    title: "5 Stretches to Relieve Lower Back Pain",
    excerpt:
      "Simple daily stretches that can significantly reduce lower back discomfort and improve flexibility.",
    category: "Back Care",
    therapistName: "Dr. Anil Mehta",
    publishedDate: "2026-05-15",
    thumbnailSrc: "/images/tip-back.jpg",
  },
  {
    id: 2,
    title: "Desk Posture: Are You Sitting Right?",
    excerpt:
      "Hours at a desk can wreck your posture. Here's how to set up your workspace for spinal health.",
    category: "Posture",
    therapistName: "Dr. Sneha Rao",
    publishedDate: "2026-05-08",
    thumbnailSrc: "/images/tip-posture.jpg",
  },
  {
    id: 3,
    title: "Recovery After Knee Surgery: Week by Week",
    excerpt:
      "A practical guide to what you should expect and do in the first 8 weeks after knee surgery.",
    category: "Recovery",
    therapistName: "Dr. Anil Mehta",
    publishedDate: "2026-05-01",
    thumbnailSrc: "/images/tip-knee.jpg",
  },
];
```

- [ ] **Step 7: Create placeholder images directory**

```bash
mkdir -p public/images
```

Create a single placeholder SVG that all image references will fall back to. Create `public/images/placeholder.svg`:

```svg
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#E2E8F0"/>
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#5A6B7C" font-family="Inter, sans-serif" font-size="24">MDW Wellness</text>
</svg>
```

- [ ] **Step 8: Commit**

```bash
git add src/data/ public/images/
git commit -m "feat: add static data files and placeholder assets"
```

---

### Task 3: Root Layout, Global Styles, Section Wrapper

**Files:**

- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/section-wrapper.tsx`
- Modify: `src/app/page.tsx` (strip default content)

- [ ] **Step 1: Update `src/app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";
@plugin "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #fafbfc;
  --foreground: #1a2b3c;
  --primary: #4a90d9;
  --primary-dark: #2e6bb0;
  --surface: #ffffff;
  --text-secondary: #5a6b7c;
  --border: #e2e8f0;
  --accent-green: #25d366;
  --footer-bg: #1e293b;
  --footer-text: #cbd5e1;
  --radius: 0.75rem;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

- [ ] **Step 2: Update `src/app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Create `src/components/section-wrapper.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  className,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("px-4 py-12 md:px-8 md:py-20", className)}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 4: Strip `src/app/page.tsx` to skeleton**

Replace with:

```tsx
export default function Home() {
  return (
    <main id="home">
      <p className="p-8 text-center text-[var(--text-secondary)]">
        MDW Wellness — sections coming soon
      </p>
    </main>
  );
}
```

- [ ] **Step 5: Verify dev server renders**

```bash
bun run dev
```

Open `http://localhost:3000` — should show "MDW Wellness — sections coming soon" on the light background with Inter font.

- [ ] **Step 6: Commit**

```bash
git add src/app/ src/components/section-wrapper.tsx
git commit -m "feat: root layout with Inter font, design tokens, section wrapper"
```

---

### Task 4: Sticky Navbar + Mobile Drawer

**Files:**

- Create: `src/components/navbar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/navbar.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems } from "@/data/navigation";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a
          href="#home"
          className="text-xl font-semibold text-[var(--foreground)]"
        >
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            className="rounded-lg bg-[var(--accent-green)] px-5 text-white hover:bg-[var(--accent-green)]/90"
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <SheetTitle className="text-lg font-semibold">
              {siteConfig.name}
            </SheetTitle>
            <div className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <SheetClose key={item.label} asChild>
                  <a
                    href={item.href}
                    className="text-base font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <Button
                asChild
                className="mt-4 w-full rounded-lg bg-[var(--accent-green)] text-white hover:bg-[var(--accent-green)]/90"
              >
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Add Navbar to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <p className="p-8 text-center text-[var(--text-secondary)]">
          MDW Wellness — sections coming soon
        </p>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify navbar**

```bash
bun run dev
```

Check: sticky navbar visible, nav items render, mobile hamburger opens sheet drawer, "Book Now" links to WhatsApp, scroll transparency transition works.

- [ ] **Step 4: Commit**

```bash
git add src/components/navbar.tsx src/app/page.tsx
git commit -m "feat: sticky navbar with mobile sheet drawer and WhatsApp CTA"
```

---

### Task 5: Hero Carousel

**Files:**

- Create: `src/components/hero-carousel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/hero-carousel.tsx`**

```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { slides } from "@/data/slides";
import { getWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 5000);
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
    startAutoplay();

    return () => stopAutoplay();
  }, [api, startAutoplay, stopAutoplay]);

  return (
    <section
      className="relative w-full"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative flex min-h-[500px] items-center bg-gradient-to-br from-[var(--primary)]/10 via-[var(--background)] to-[var(--primary)]/5 md:min-h-[600px]">
                <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-8">
                  <div className="flex flex-col justify-center gap-4 py-12">
                    <h1 className="text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
                      {slide.headline}
                    </h1>
                    <p className="max-w-lg text-base text-[var(--text-secondary)] md:text-lg">
                      {slide.description}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="mt-2 w-fit rounded-lg bg-[var(--accent-green)] px-8 text-base text-white hover:bg-[var(--accent-green)]/90"
                    >
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {slide.ctaText}
                      </a>
                    </Button>
                  </div>
                  <div className="hidden items-center justify-center md:flex">
                    <div className="h-72 w-72 rounded-2xl bg-[var(--primary)]/10 lg:h-80 lg:w-96" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 md:opacity-60"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-[var(--foreground)]" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 md:opacity-60"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-[var(--foreground)]" />
        </button>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              current === idx
                ? "w-8 bg-[var(--primary)]"
                : "w-2.5 bg-[var(--primary)]/30",
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add HeroCarousel to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <HeroCarousel />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify carousel**

```bash
bun run dev
```

Check: slides render with text + CTA, auto-rotates every 5s, pauses on hover, dots navigate, arrows work, responsive layout.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero-carousel.tsx src/app/page.tsx
git commit -m "feat: hero carousel with autoplay, dot nav, and WhatsApp CTAs"
```

---

### Task 6: Services Video Reels Section

**Files:**

- Create: `src/components/services-reels.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/services-reels.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { getWhatsAppUrl } from "@/data/site";
import { SectionWrapper } from "@/components/section-wrapper";

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative aspect-[9/16] w-52 flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl bg-[var(--border)] sm:w-56 md:w-60"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {service.videoSrc ? (
        <video
          ref={videoRef}
          src={service.videoSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5">
          <Play className="h-12 w-12 text-[var(--primary)]/40" />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-16">
        <h3 className="text-base font-semibold text-white">{service.title}</h3>
        <a
          href={getWhatsAppUrl(`Hi, I'm interested in ${service.title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-white/80 opacity-0 transition-opacity group-hover:opacity-100"
        >
          Learn More &rarr;
        </a>
      </div>
    </motion.div>
  );
}

export function ServicesReels() {
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
          Our Services
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[var(--text-secondary)]">
          Expert care tailored to your needs — swipe to explore
        </p>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide md:justify-center md:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Add scrollbar-hide utility to `src/app/globals.css`**

Append to the end of `globals.css`:

```css
@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 3: Add ServicesReels to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesReels } from "@/components/services-reels";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <HeroCarousel />
        <ServicesReels />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify services section**

```bash
bun run dev
```

Check: horizontal scroll on mobile, snap scrolling works, hover scale effect on desktop, gradient overlay with title, "Learn More" appears on hover, placeholder icons visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/services-reels.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: services video reels section with snap scroll and hover effects"
```

---

### Task 7: Testimonials Carousel

**Files:**

- Create: `src/components/testimonials.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/testimonials.tsx`**

```tsx
"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import { SectionWrapper } from "@/components/section-wrapper";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="bg-[var(--primary)]/5">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[var(--text-secondary)]">
          Real stories from people we&apos;ve helped recover and thrive
        </p>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-10 w-full max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border-[var(--border)] bg-white shadow-sm">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <StarRating rating={t.rating} />
                    <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {t.name}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {t.condition}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Add Testimonials to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesReels } from "@/components/services-reels";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <HeroCarousel />
        <ServicesReels />
        <Testimonials />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify testimonials**

```bash
bun run dev
```

Check: 3 cards on desktop / 1 on mobile, star ratings render, carousel arrows work, cards have consistent height, smooth fade-in on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/testimonials.tsx src/app/page.tsx
git commit -m "feat: testimonials carousel with star ratings and client cards"
```

---

### Task 8: Health Tips Grid

**Files:**

- Create: `src/components/health-tips.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/health-tips.tsx`**

```tsx
import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { healthTips } from "@/data/health-tips";
import { getWhatsAppUrl } from "@/data/site";
import { SectionWrapper } from "@/components/section-wrapper";

export function HealthTips() {
  return (
    <SectionWrapper id="health-tips">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
          Health Tips &amp; Wellness
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[var(--text-secondary)]">
          Weekly insights from our therapists
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {healthTips.map((tip) => (
            <Card
              key={tip.id}
              className="group overflow-hidden border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-video bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5" />
              <CardContent className="flex flex-col gap-3 p-5">
                <Badge
                  variant="secondary"
                  className="w-fit bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/15"
                >
                  {tip.category}
                </Badge>
                <h3 className="text-lg font-semibold leading-snug text-[var(--foreground)]">
                  {tip.title}
                </h3>
                <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {tip.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {tip.therapistName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(tip.publishedDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <a
                  href={getWhatsAppUrl(
                    `Hi, I'd like to know more about: ${tip.title}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Read More &rarr;
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Add HealthTips to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesReels } from "@/components/services-reels";
import { Testimonials } from "@/components/testimonials";
import { HealthTips } from "@/components/health-tips";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <HeroCarousel />
        <ServicesReels />
        <Testimonials />
        <HealthTips />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify health tips**

```bash
bun run dev
```

Check: 3-column grid on desktop, single column mobile, category badges, hover lift effect, date formatting, "Read More" links to WhatsApp.

- [ ] **Step 4: Commit**

```bash
git add src/components/health-tips.tsx src/app/page.tsx
git commit -m "feat: health tips grid with category badges and hover effects"
```

---

### Task 9: Footer

**Files:**

- Create: `src/components/footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/footer.tsx`**

```tsx
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { footerLinks } from "@/data/navigation";
import { healthTips } from "@/data/health-tips";

const socialLinks = [
  { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
  { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:py-16">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">
            {siteConfig.name}
          </h3>
          <p className="text-sm leading-relaxed">{siteConfig.tagline}</p>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Health Tips
          </h4>
          <ul className="flex flex-col gap-2.5">
            {healthTips.slice(0, 3).map((tip) => (
              <li key={tip.id}>
                <a
                  href={getWhatsAppUrl(
                    `Hi, I'd like to know more about: ${tip.title}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-white"
                >
                  {tip.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs md:flex-row md:px-8">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesReels } from "@/components/services-reels";
import { Testimonials } from "@/components/testimonials";
import { HealthTips } from "@/components/health-tips";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <HeroCarousel />
        <ServicesReels />
        <Testimonials />
        <HealthTips />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify footer**

```bash
bun run dev
```

Check: 4-column layout on desktop, stacks on mobile, social icons render, links work, dark navy background, copyright bar.

- [ ] **Step 4: Commit**

```bash
git add src/components/footer.tsx src/app/page.tsx
git commit -m "feat: footer with quick links, health tips, contact info, and social icons"
```

---

### Task 10: Floating WhatsApp FAB

**Files:**

- Create: `src/components/whatsapp-fab.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/whatsapp-fab.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/data/site";

export function WhatsAppFab() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-green)] text-white shadow-lg transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}
```

- [ ] **Step 2: Add WhatsAppFab to `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesReels } from "@/components/services-reels";
import { Testimonials } from "@/components/testimonials";
import { HealthTips } from "@/components/health-tips";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="pt-16">
        <HeroCarousel />
        <ServicesReels />
        <Testimonials />
        <HealthTips />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
```

- [ ] **Step 3: Verify FAB**

```bash
bun run dev
```

Check: green circle in bottom-right, WhatsApp SVG icon, spring-in animation on load, hover scale, links to WhatsApp with pre-filled message, stays above all content when scrolling.

- [ ] **Step 4: Commit**

```bash
git add src/components/whatsapp-fab.tsx src/app/page.tsx
git commit -m "feat: floating WhatsApp FAB with spring animation"
```

---

### Task 11: Final Polish — Responsive QA + Smooth Scroll + SEO

**Files:**

- Modify: `src/app/layout.tsx` (add viewport meta if needed)
- Possibly tweak any component for responsive issues

- [ ] **Step 1: Run full responsive check**

```bash
bun run dev
```

Test at these widths: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop). Verify:

- Navbar collapses to hamburger below `lg` (1024px)
- Carousel text stacks on mobile
- Service reels snap-scroll on mobile
- Testimonial cards show 1/2/3 per breakpoint
- Health tips go from 1 to 2 to 3 columns
- Footer stacks on mobile
- WhatsApp FAB doesn't overlap content

- [ ] **Step 2: Fix any responsive issues found**

Address any layout breaks, overflow, or spacing issues discovered in Step 1.

- [ ] **Step 3: Verify smooth scroll works**

Click each nav item and confirm smooth scroll to the correct section. Verify mobile drawer closes after clicking a link (SheetClose handles this).

- [ ] **Step 4: Run build to check for errors**

```bash
bun run build
```

Expected: Build succeeds with no errors or warnings.

- [ ] **Step 5: Commit final polish**

```bash
git add -A
git commit -m "chore: responsive QA fixes and final polish"
```
