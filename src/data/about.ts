import {
  BadgeCheck,
  ShieldCheck,
  House,
  Lock,
  type LucideIcon,
} from "lucide-react";

export const aboutMission = {
  heading: "About MDW Wellness",
  intro:
    "MDW Wellness brings therapy-led physiotherapy and wellness support to your home and your screen. We believe quality wellness care should be convenient, comfortable, and centered on you.",
  body: "Whether it is an online consultation with a qualified physiotherapist, a home therapy session at your doorstep, or a home wellness vitals check, our focus stays the same: supportive, professional care that fits into your life.",
  imageSrc: "/images/your_wellness.jpg",
  imageAlt:
    "The MDW Wellness team of physiotherapists in branded shirts at a wellness studio.",
};

export interface AboutPoint {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const aboutTrustPoints: AboutPoint[] = [
  {
    title: "Qualified Therapists",
    subtitle: "Care delivered by trained, credential-verified physiotherapists.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Medical Devices",
    subtitle: "Omron BP machines and professional wellness tools.",
    icon: ShieldCheck,
  },
  {
    title: "Home Convenience",
    subtitle: "Sessions and checks delivered at your doorstep, on your schedule.",
    icon: House,
  },
  {
    title: "Data Privacy & Secure Reports",
    subtitle: "Your readings and reports stay private and securely stored.",
    icon: Lock,
  },
];

export const aboutCompany = {
  heading: "Who We Are",
  body: "MDW Wellness (also known as My Dawai Wala Wellness) is a unit of SwiftMeds Pharma Pvt Ltd. We serve clients across Kolkata with home-based and online wellness support.",
  legalEntity: "SwiftMeds Pharma Pvt Ltd",
  address:
    "26/1A, Ekbalpore Road, Kidderpore, Kolkata 700023, West Bengal, India",
};
