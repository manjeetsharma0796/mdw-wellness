import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { footerLinks } from "@/data/navigation";
import { healthTips } from "@/data/health-tips";

const socialLinks = [
  { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
  { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer
      className="text-[color:var(--mdw-footer-text)]"
      style={{ backgroundColor: "var(--mdw-footer-bg)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:py-16">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">{siteConfig.name}</h3>
          <p className="text-sm leading-relaxed">{siteConfig.tagline}</p>
          <p className="text-sm leading-relaxed text-white/60">
            {siteConfig.description}
          </p>
          <div className="mt-2 flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Health Tips
          </h4>
          <ul className="flex flex-col gap-2.5">
            {healthTips.slice(0, 3).map((tip) => (
              <li key={tip.id}>
                <a
                  href={getWhatsAppUrl(`Hi, I'd like to know more about: ${tip.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 text-sm transition-colors hover:text-white"
                >
                  {tip.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-white"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs md:flex-row md:px-8">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
