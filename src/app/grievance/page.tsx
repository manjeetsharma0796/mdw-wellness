import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { ContactGrievance } from "@/components/legal/contact-grievance";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { legalContact } from "@/data/legal/contact";

export const metadata: Metadata = {
  title: "Grievance Redressal",
  description:
    "Raise a grievance with MDW Wellness. Contact and grievance redressal details for SwiftMeds Pharma Pvt Ltd.",
  alternates: { canonical: "/grievance" },
};

export default function GrievancePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Grievance Redressal", path: "/grievance" },
        ])}
      />
      <Navbar />
      <main className="flex-1 pt-16">
        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <header className="border-b border-[var(--mdw-secondary-soft)] pb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
              Grievance Redressal
            </h1>
          </header>

          <div className="mt-8 space-y-4 text-[15px] leading-7 text-foreground md:text-base">
            <p>
              We take every concern seriously. If you have a complaint or
              grievance about a booking, a session, a payment, a report, or any
              MDW Wellness service, please reach out using the details below and
              our team will respond.
            </p>
            <p>
              For the fastest response, write to our grievance email with your
              name, registered phone number, and a short description of the
              issue. You can also call our support number during working hours.
            </p>
          </div>

          <ContactGrievance contact={legalContact} className="mt-8" />
        </article>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
