import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { LegalPage } from "@/components/legal-page";
import { privacyDocument } from "@/data/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy describing how MDW Wellness collects, stores, uses, and protects personal and wellness-related information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <LegalPage doc={privacyDocument} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
