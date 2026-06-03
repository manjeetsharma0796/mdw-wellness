export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
  /**
   * Force the link to open in a new tab. External (http) hrefs already open
   * in a new tab automatically; set this for internal hrefs that should also
   * open in a new tab (e.g. legal pages opened from the footer).
   */
  newTab?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Online Consultation", href: "#online-consult" },
  { label: "Home Therapy", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "MDW Wellness Vitals Check", href: "#vitals" },
];

export const footerLinks: {
  policies: FooterLink[];
  knowUs: FooterLink[];
} = {
  policies: [
    { label: "Terms & Conditions", href: "/terms", newTab: true },
    { label: "Privacy Policy", href: "/privacy", newTab: true },
    { label: "Grievance Redressal", href: "#grievance" },
  ],
  knowUs: [
    { label: "FAQ", href: "#faq" },
    { label: "About Us", href: "#about" },
    { label: "Contact Support", href: "#contact-support" },
  ],
};
