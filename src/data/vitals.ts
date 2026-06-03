import {
  Activity,
  HeartPulse,
  Wind,
  Scale,
  CalendarCheck,
  Home,
  FileText,
  LineChart,
  ShieldCheck,
  Users,
  House,
  Lock,
  type LucideIcon,
} from "lucide-react";

export interface VitalCheck {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const vitalChecks: VitalCheck[] = [
  {
    title: "Blood Pressure (BP)",
    subtitle: "Monitor BP trends and elevated readings",
    icon: Activity,
  },
  {
    title: "Pulse Rate",
    subtitle: "Track resting pulse and wellness",
    icon: HeartPulse,
  },
  {
    title: "Oxygen Level (SpO2)",
    subtitle: "Check oxygen saturation instantly",
    icon: Wind,
  },
  {
    title: "Weight Monitoring",
    subtitle: "Track body weight trends over time",
    icon: Scale,
  },
];

export interface VitalStep {
  number: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const vitalSteps: VitalStep[] = [
  {
    number: 1,
    title: "Book Visit",
    subtitle: "Choose a one-time or subscription plan.",
    icon: CalendarCheck,
  },
  {
    number: 2,
    title: "Home Visit by MDW Team",
    subtitle: "Vitals checked at your doorstep.",
    icon: Home,
  },
  {
    number: 3,
    title: "Instant Mobile Report",
    subtitle: "Receive a digital report after every visit.",
    icon: FileText,
  },
  {
    number: 4,
    title: "Track Progress",
    subtitle:
      "Subscribers receive trend reports and quarterly wellness summaries (physical printed reports).",
    icon: LineChart,
  },
];

export interface WellnessPlan {
  id: string;
  name: string;
  amount: number;
  cadence: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export const wellnessPlans: WellnessPlan[] = [
  {
    id: "one-time",
    name: "One-Time Wellness Check",
    amount: 99,
    cadence: "one-time",
    features: ["1 Home Vitals Check", "Mobile Report Card"],
    ctaLabel: "Book Now",
  },
  {
    id: "monthly",
    name: "Monthly Wellness Care",
    amount: 149,
    cadence: "per month",
    badge: "Most Popular",
    highlighted: true,
    features: [
      "2 Home Vitals Checks / alternate week",
      "Mobile reports after each visit",
      "Month-end wellness summary",
      "Priority medicine delivery",
    ],
    ctaLabel: "Subscribe Now",
  },
  {
    id: "quarterly",
    name: "Quarterly Wellness Care+",
    amount: 499,
    cadence: "per quarter",
    features: [
      "6 Home Vitals Checks / alternate weeks",
      "Printed physical report to keep your record",
      "Priority medicine delivery",
      "Medicine stock priority",
      "Flat ₹9 delivery fee",
      "Priority WhatsApp support",
    ],
    ctaLabel: "Join Care+",
  },
];

export interface VitalReason {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const vitalReasons: VitalReason[] = [
  {
    title: "Trusted Medical Devices",
    subtitle: "Omron BP machines and professional medical tools",
    icon: ShieldCheck,
  },
  {
    title: "Trained Healthcare Team",
    subtitle: "Vitals taken by trained MDW healthcare staff",
    icon: Users,
  },
  {
    title: "Home Convenience",
    subtitle: "Checks performed at your doorstep on your schedule",
    icon: House,
  },
  {
    title: "Data Privacy & Secure Reports",
    subtitle: "Your readings stay private and securely stored",
    icon: Lock,
  },
];

export interface VitalFaq {
  question: string;
  answer: string;
}

export const vitalFaqs: VitalFaq[] = [
  {
    question: "Is this a medical diagnosis?",
    answer: "No. This is a wellness vitals monitoring service.",
  },
  {
    question: "Which devices are used?",
    answer:
      "Omron BP monitors and other professional medical wellness tools are used.",
  },
  {
    question: "Will I receive a report?",
    answer: "Yes. A digital report is shared after every check.",
  },
  {
    question: "Do you check sugar / diabetes?",
    answer: "Currently not included.",
  },
  {
    question: "How fast is booking?",
    answer:
      "Based on slot availability. We try to deliver within 30 minutes.",
  },
];

export const VITALS_DISCLAIMER =
  "MDW Wellness Vitals Checks is a wellness monitoring service and not a substitute for medical diagnosis or treatment.";
