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
  policies: [
    { label: "Terms and Conditions", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Grievance Redressal", href: "#grievance" },
  ],
  knowUs: [
    { label: "FAQ", href: "#faq" },
    { label: "About Us", href: "#about" },
    { label: "Contact Support", href: "#contact-support" },
  ],
};
