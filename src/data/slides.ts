export interface Slide {
  id: number;
  headline: string;
  description: string;
  ctaText: string;
  imagePlaceholder: string;
  /** Actual photo path. When set, the carousel renders this instead of the icon placeholder. */
  imageSrc?: string;
  /** Accessible alt text. Required when `imageSrc` is set. */
  imageAlt?: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    headline: "Personalized Online Consultations",
    description:
      "Connect with qualified physiotherapists from the comfort of your home. Get personalized wellness plans via video call.",
    ctaText: "Book on WhatsApp",
    imagePlaceholder: "/images/img3.jpg",
    imageSrc: "/images/img3.jpg",
    imageAlt:
      "MDW Wellness physiotherapist on a video consultation, shown on a laptop in a home setting.",
  },
  {
    id: 2,
    headline: "Home Therapy Sessions",
    description:
      "Our therapists come to you. Comfort-focused therapy services delivered at your doorstep.",
    ctaText: "Book Home Visit",
    imagePlaceholder: "/images/img6.jpg",
    imageSrc: "/images/img6.jpg",
    imageAlt:
      "MDW Wellness therapist assisting an elderly client with knee mobility exercises in her living room.",
  },
  {
    id: 3,
    headline: "Home Wellness Vitals Checks",
    description:
      "Track your Blood Pressure, Weight, Pulse and Oxygen Level from the comfort of your home. Professional wellness monitoring starting at ₹99.",
    ctaText: "Check Your Vitals",
    imagePlaceholder: "/images/img9.jpg",
    imageSrc: "/images/img9.jpg",
    imageAlt:
      "MDW Wellness therapist with a clipboard during a vitals assessment with an elderly client.",
  },
  {
    id: 4,
    headline: "Your Wellness, Our Focus",
    description:
      "Trusted by hundreds of clients. Therapy-led support for mobility, comfort, and long-term wellness.",
    ctaText: "Get Started",
    imagePlaceholder: "/images/your_wellness.jpg",
    imageSrc: "/images/your_wellness.jpg",
    imageAlt:
      "The MDW Wellness team of physiotherapists in branded shirts at a wellness studio.",
  },
];
