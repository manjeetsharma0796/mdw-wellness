import {
  ThumbsUp,
  Users,
  Activity,
  ShieldCheck,
  ClipboardList,
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
    title: "Consult & Collaborate",
    subtitle: "We work with your existing doctors for unified care",
    icon: Users,
  },
  {
    id: 3,
    title: "Self-Care Interventions",
    subtitle: "Daily exercises and routines you can do at home",
    icon: Activity,
  },
  {
    id: 4,
    title: "Secure Payment",
    subtitle: "Encrypted, transparent billing with no hidden charges",
    icon: ShieldCheck,
  },
  {
    id: 5,
    title: "Customised Care Plan",
    subtitle: "Care tailored to your specific condition and goals",
    icon: ClipboardList,
  },
];
