import {
  BadgeCheck,
  Clock,
  Heart,
  Home,
  LineChart,
  ShieldCheck,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

export interface WhyChooseUsItem {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    id: 1,
    title: "Personalized wellness support",
    subtitle: "Therapy-led care from qualified physiotherapists",
    icon: ThumbsUp,
  },
  {
    id: 2,
    title: "Verified & Trained Therapists",
    subtitle:
      "All physiotherapists are credential-verified and undergo regular training",
    icon: BadgeCheck,
  },
  {
    id: 3,
    title: "Home Visit at Your Convenience",
    subtitle: "Sessions delivered at your doorstep on your schedule",
    icon: Home,
  },
  {
    id: 4,
    title: "Safe, Hygienic & Trusted Care",
    subtitle: "Strict hygiene protocols and trusted clinical practices",
    icon: Heart,
  },
  {
    id: 5,
    title: "Flexible Time Slots",
    subtitle: "Morning to evening slots that work around your day",
    icon: Clock,
  },
  {
    id: 6,
    title: "Ongoing Support & Progress Tracking",
    subtitle: "Continuous follow-up with structured progress notes",
    icon: LineChart,
  },
  {
    id: 7,
    title: "Secure Payment",
    subtitle: "Encrypted, transparent billing with no hidden charges",
    icon: ShieldCheck,
  },
];
