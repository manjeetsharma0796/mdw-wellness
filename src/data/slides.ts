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
    headline: "Personalized Online Consultations",
    description:
      "Connect with qualified physiotherapists from the comfort of your home. Get personalized wellness plans via video call.",
    ctaText: "Book on WhatsApp",
    imagePlaceholder: "/images/slide-online.jpg",
  },
  {
    id: 2,
    headline: "Home Therapy Sessions",
    description:
      "Our therapists come to you. Comfort-focused therapy services delivered at your doorstep.",
    ctaText: "Book Home Visit",
    imagePlaceholder: "/images/slide-home.jpg",
  },
  {
    id: 3,
    headline: "MDW Wellness Vitals Check",
    description:
      "Comprehensive health screening: vitals, posture analysis, flexibility assessment, and personalized wellness report.",
    ctaText: "Check Your Vitals",
    imagePlaceholder: "/images/slide-vitals.jpg",
  },
  {
    id: 4,
    headline: "Your Wellness, Our Focus",
    description:
      "Trusted by hundreds of clients. Therapy-led support for mobility, comfort, and long-term wellness.",
    ctaText: "Get Started",
    imagePlaceholder: "/images/slide-wellness.jpg",
  },
];
