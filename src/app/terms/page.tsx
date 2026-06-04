import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { LegalPage } from "@/components/legal-page";
import { termsDocument } from "@/data/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for MDW Wellness wellness, rehabilitation-support, and therapist-assisted services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <LegalPage doc={termsDocument} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
