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
    { label: "Terms and Conditions", href: "https://docs.google.com/document/d/1PgXybDcd5Xn4xG9fpz-XtUrInAvrf8b3/edit?usp=drivesdk&ouid=112207226859408290059&rtpof=true&sd=true" },
    { label: "Privacy Policy", href: "https://docs.google.com/document/d/1b7MwzhXs42Vvp9oBzQd7HbbQpKt61kUz/edit?usp=drivesdk&ouid=112207226859408290059&rtpof=true&sd=true" },
    { label: "Grievance Redressal", href: "#grievance" },
  ],
  knowUs: [
    { label: "FAQ", href: "#faq" },
    { label: "About Us", href: "#about" },
    { label: "Contact Support", href: "#contact-support" },
  ],
};
