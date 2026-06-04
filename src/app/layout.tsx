import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { siteConfig, SITE_URL } from "@/data/site";
import { JsonLd } from "@/components/json-ld";
import {
  medicalBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { BookingModalProvider } from "@/components/booking/booking-modal-provider";
import { UrlCodeCleanup } from "@/components/booking/url-code-cleanup";
import { AuthProvider } from "@/components/auth/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const homeTitle =
  "MDW Wellness | Home Physiotherapy & Wellness in Kolkata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: "%s | MDW Wellness",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/site.webmanifest",
  keywords: [
    "physiotherapy Kolkata",
    "home physiotherapy",
    "online physiotherapy consultation",
    "home wellness vitals check",
    "blood pressure monitoring at home",
    "MDW Wellness",
    "My Dawai Wala",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  appleWebApp: {
    title: "MDW Wellness",
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#018bc4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} h-full antialiased`}>
      <head>
        <JsonLd data={medicalBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body className="min-h-full flex flex-col">
        <UrlCodeCleanup />
        <AuthProvider>
          <BookingModalProvider>{children}</BookingModalProvider>
        </AuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
