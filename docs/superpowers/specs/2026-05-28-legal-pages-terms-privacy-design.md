# Legal pages: Terms & Conditions and Privacy Policy

**Date:** 2026-05-28
**Status:** Approved — proceeding to implementation
**Owner:** MDW Wellness

## Goal

Convert the two Google Docs links currently in the footer (Terms & Conditions, Privacy Policy) into native website pages with provided content. Footer links open these pages in a new tab. No other site behavior changes.

## Decisions

| Topic | Decision |
|---|---|
| URL paths | `/terms` and `/privacy` |
| Open in new tab | Yes — for both internal policy links |
| Grievance link | Leave as `#grievance` (anchor) for now; out of scope |
| Content shape | Structured typed data + shared renderer |
| Layout | Site chrome retained (`Navbar` + content + `Footer`) |
| SEO | Indexable, per-page `title` + `description` |
| Source-text fidelity | Verbatim, with a single typo correction: "Situationsl" → "Situations" in Terms §7 |
| Disclaimer wording | Retained verbatim (e.g. "does not guarantee cure / permanent improvement / recovery timelines") — this is compliance-correct disclaimer context, not a marketing claim |

## Architecture

```
src/
  app/
    terms/page.tsx           # imports termsDoc, renders <LegalPage doc={termsDoc} />
    privacy/page.tsx         # imports privacyDoc, renders <LegalPage doc={privacyDoc} />
  components/
    legal-page.tsx           # one renderer for both documents
  data/
    legal/
      types.ts               # LegalBlock | LegalSection | LegalContact | LegalDocument
      terms.ts               # full Terms & Conditions content
      privacy.ts             # full Privacy Policy content
    navigation.ts            # MODIFIED: links now point to /terms /privacy with newTab flag
  components/
    footer.tsx               # MODIFIED: honor link.newTab in addition to http-prefix detection
```

## Data schema

```ts
export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "subsection"; label: string; title: string; body: LegalBlock[] };

export type LegalSection = {
  number: number;
  title: string;
  body: LegalBlock[];
};

export type LegalContact = {
  legalEntity: string;
  brand: string;
  address: string;
  supportPhone: string;
  supportEmail: string;
  grievanceEmail: string;
};

export type LegalDocument = {
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
  contact?: LegalContact;
};
```

The `subsection` block recurses through `body: LegalBlock[]`, so Privacy Policy §2 (A/B/C/D), §6 (A/B/C/D), and any future nested structure is handled by one renderer.

## Renderer behavior

`<LegalPage doc={...} />`:

- Outer container: `max-w-3xl mx-auto px-4 py-12 md:py-16`
- H1: `siteConfig`-aligned navy heading (`text-[var(--mdw-secondary)]`)
- Effective date: small muted line under H1
- Intro paragraphs: regular body text, vertical rhythm
- Each section: navy `<h2>` formatted as `"<number>. <title>"`
- Subsections: smaller `<h3>` formatted as `"<label>. <title>"`
- Lists: bullet (default) or numbered when `ordered: true`
- Contact block: rendered as a definition-list-style closing section
- No em-dashes anywhere (per `AGENTS.md`)
- Inter font inherited from root layout

## Footer link rewire

`src/data/navigation.ts`:

```ts
export type FooterLink = {
  label: string;
  href: string;
  newTab?: boolean;
};

export const footerLinks = {
  policies: [
    { label: "Terms & Conditions", href: "/terms", newTab: true },
    { label: "Privacy Policy", href: "/privacy", newTab: true },
    { label: "Grievance Redressal", href: "#grievance" },
  ],
  knowUs: [...],
};
```

`src/components/footer.tsx` policies block changes the predicate:

```ts
const opensInNewTab = link.newTab ?? link.href.startsWith("http");
```

Backwards compatible — http URLs still get `target="_blank"` automatically; new internal links can opt in via `newTab: true`.

## SEO metadata (per page)

```ts
export const metadata: Metadata = {
  title: "Terms & Conditions | MDW Wellness",
  description: "Terms & Conditions for MDW Wellness wellness, rehabilitation-support, and therapist-assisted services.",
  robots: { index: true, follow: true },
};
```

Mirror for Privacy Policy with appropriate description.

## Out of scope

- Grievance Redressal page (kept as `#grievance` per decision)
- Refund/Cancellation policy page (referenced in Terms §6 but no content provided)
- Cookie banner (Policy §13 references cookies; full consent flow not requested)
- Page-level analytics events for "policy viewed"
- Search/anchor-based deep linking inside policy sections

## Verification plan

1. `bun run build` — types pass, both pages prerender as static
2. Visual check: visit `/terms` and `/privacy` locally; headings, lists, subsections render with brand styling
3. Footer policies links: click triggers new tab to `/terms` and `/privacy` respectively
4. SEO check: `<head>` of each page contains correct title and description
