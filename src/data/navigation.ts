import type { Service } from "@/components/booking/booking-modal-provider";

export interface NavItem {
  label: string;
  href: string;
  /**
   * When set, clicking the nav item opens the booking modal with this
   * service pre-selected instead of navigating to `href`.
   */
  bookingService?: Service;
  /**
   * Homepage section id that should highlight this item via scrollspy.
   * Decoupled from `href` so the link can point to a route (e.g. "/") while
   * still lighting up when its section is in view.
   */
  sectionId?: string;
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
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Online Consultation", href: "/#online-consult", sectionId: "online-consult" },
  { label: "Home Therapy", href: "/", bookingService: "home_therapy" },
  { label: "About Us", href: "/about" },
  { label: "MDW Wellness Vitals Check", href: "/vitals" },
];

export const footerLinks: {
  policies: FooterLink[];
  knowUs: FooterLink[];
} = {
  policies: [
    { label: "Terms & Conditions", href: "/terms", newTab: true },
    { label: "Privacy Policy", href: "/privacy", newTab: true },
    { label: "Grievance Redressal", href: "/grievance", newTab: true },
  ],
  knowUs: [
    { label: "FAQ", href: "#faq" },
    { label: "About Us", href: "/about" },
    { label: "Contact Support", href: "#contact-support" },
  ],
};
