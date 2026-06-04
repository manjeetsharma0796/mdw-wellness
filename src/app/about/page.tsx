import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { SectionWrapper } from "@/components/section-wrapper";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { AboutCta } from "@/components/about/about-cta";
import { aboutMission, aboutTrustPoints, aboutCompany } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MDW Wellness, a unit of SwiftMeds Pharma Pvt Ltd, brings therapy-led physiotherapy and wellness support to homes across Kolkata, online and at your doorstep.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <Navbar />
      <main className="flex-1 pt-16">
        {/* 1. Intro split */}
        <SectionWrapper id="about" className="bg-primary/8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--mdw-secondary)] md:text-5xl">
                {aboutMission.heading}
              </h1>
              <p className="text-base text-foreground md:text-lg">
                {aboutMission.intro}
              </p>
              <p className="text-base text-muted-foreground">
                {aboutMission.body}
              </p>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/25 ring-1 ring-primary/25">
              <Image
                src={aboutMission.imageSrc}
                alt={aboutMission.imageAlt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </SectionWrapper>

        {/* 2. Why trust us */}
        <SectionWrapper>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
              Why Trust Us
            </h2>
            <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {aboutTrustPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <point.icon
                      className="h-7 w-7 text-white"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {point.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 3. Company & location */}
        <SectionWrapper className="bg-muted">
          <div className="mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-white p-8 shadow-sm md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-3xl">
              {aboutCompany.heading}
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              {aboutCompany.body}
            </p>
            <dl className="mt-6 grid gap-3 text-[15px] md:text-base">
              <div className="grid gap-1 sm:grid-cols-[160px_1fr]">
                <dt className="font-medium text-[var(--mdw-secondary)]">
                  Legal Entity
                </dt>
                <dd className="text-foreground">{aboutCompany.legalEntity}</dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[160px_1fr]">
                <dt className="font-medium text-[var(--mdw-secondary)]">
                  Registered Address
                </dt>
                <dd className="flex items-start gap-2 text-foreground">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {aboutCompany.address}
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <AboutCta />
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
