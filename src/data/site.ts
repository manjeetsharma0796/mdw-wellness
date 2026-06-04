export const siteConfig = {
  name: "MDW Wellness",
  tagline: "Your Wellness, Our Focus",
  description:
    "Supportive rehabilitation services: online consultations, home therapy, and comprehensive vitals checks.",
  // Canonical production URL. Override with NEXT_PUBLIC_SITE_URL once a custom
  // domain (e.g. mydawaiwala.com) is attached.
  url: "https://mdw-wellness.vercel.app",
  whatsappNumber: "919230189093",
  whatsappMessage: "Hi, I'd like to book a consultation with MDW Wellness.",
  phone: "+91 9230189093",
  email: "support@mydawaiwala.com",
  address: "26/1A, Ekbalpore Road, Kidderpore, Kolkata 23",
  socials: {
    instagram: "https://instagram.com/mydawaiwala",
    facebook: "https://facebook.com/mydawaiwala",
    youtube: "https://youtube.com/@mydawaiwala",
    x: "https://x.com/mydawaiwala",
    linkedin: "https://www.linkedin.com/company/my-dawai-wala/",
    medial: "https://medial.app/user/my-dawai-wala-2a2cbadfe91d9",
  },
} as const;

export function getWhatsAppUrl(message?: string) {
  const msg = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
}

/** Canonical site origin, env-overridable for custom domains. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url
).replace(/\/$/, "");

/** Build an absolute URL for a path against the canonical origin. */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
