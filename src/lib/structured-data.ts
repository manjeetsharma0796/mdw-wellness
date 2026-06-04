import { siteConfig, SITE_URL, absoluteUrl } from "@/data/site";
import { vitalFaqs } from "@/data/vitals";

const socials = Object.values(siteConfig.socials);

/**
 * MedicalBusiness (physiotherapy) local-business node. Uses only real data
 * from siteConfig. Opening hours and geo coordinates are intentionally
 * omitted to avoid publishing unverified info; add them when confirmed.
 */
export function medicalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: SITE_URL,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/icon.png"),
    logo: absoluteUrl("/icon.png"),
    priceRange: "₹₹",
    medicalSpecialty: "Physiotherapy",
    address: {
      "@type": "PostalAddress",
      streetAddress: "26/1A, Ekbalpore Road, Kidderpore",
      addressLocality: "Kolkata",
      postalCode: "700023",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Kolkata" },
    sameAs: socials,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteConfig.name,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: vitalFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
