export const siteConfig = {
  name: "MDW Wellness",
  tagline: "Your Partner in Health & Recovery",
  description:
    "Expert physiotherapy and wellness services — online consultations, home therapy, and comprehensive vitals checks.",
  whatsappNumber: "919999999999",
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
