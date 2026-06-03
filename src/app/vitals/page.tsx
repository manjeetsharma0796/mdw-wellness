import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { VitalsHero } from "@/components/vitals/vitals-hero";
import { WhatWeCheck } from "@/components/vitals/what-we-check";
import { HowItWorks } from "@/components/vitals/how-it-works";
import { WellnessPlans } from "@/components/vitals/wellness-plans";
import { WellnessReports } from "@/components/vitals/wellness-reports";
import { WhyVitals } from "@/components/vitals/why-vitals";
import { VitalsFaq } from "@/components/vitals/vitals-faq";
import { VITALS_DISCLAIMER } from "@/data/vitals";

export const metadata: Metadata = {
  title: "Home Wellness Vitals Checks | MDW Wellness",
  description:
    "Track your Blood Pressure, Weight, Pulse and Oxygen Level from the comfort of your home. Professional wellness monitoring starting at ₹99.",
  robots: { index: true, follow: true },
};

export default function VitalsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <VitalsHero />
        <WhatWeCheck />
        <HowItWorks />
        <WellnessPlans />
        <WellnessReports />
        <WhyVitals />
        <VitalsFaq />

        <div className="border-t border-border bg-white px-4 py-6 md:px-8">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {VITALS_DISCLAIMER}
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
