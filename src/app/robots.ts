import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Auth callback has no SEO value and should not be crawled.
      disallow: ["/auth/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
