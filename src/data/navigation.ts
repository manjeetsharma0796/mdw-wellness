export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Online Consultation", href: "#services" },
  { label: "Home Therapy", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "MDW Wellness Vitals Check", href: "#vitals" },
];

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Online Consultation", href: "#services" },
    { label: "Home Therapy", href: "#services" },
    { label: "MDW Wellness Vitals Check", href: "#vitals" },
  ],
};
