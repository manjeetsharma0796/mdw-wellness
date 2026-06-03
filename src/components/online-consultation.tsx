"use client";

import Image from "next/image";
import { Stethoscope, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { useBookingModal } from "@/components/booking/booking-modal-provider";

// Inline WhatsApp glyph (lucide-react 1.16 ships no brand icons).
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const ctaClass =
  "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--mdw-accent-green)] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit";

// Light green that stays legible on the brand-blue card background
// (passes large-text contrast; the WhatsApp green #25D366 is too low-contrast on blue).
const ACCENT_GREEN = "#86EFAC";

export function OnlineConsultation() {
  const { open: openBookingModal } = useBookingModal();

  return (
    <SectionWrapper id="online-consult">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Card 1: Online Consultation */}
        <div className="relative overflow-hidden rounded-3xl bg-primary shadow-sm">
          <div className="flex flex-col gap-6 p-8 sm:p-10 md:p-12 lg:p-10 xl:p-12">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--mdw-secondary)] border-0 shadow-sm">
                <Stethoscope className="h-3.5 w-3.5" /> Online Consultation
              </span>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-4xl xl:text-5xl">
                Personalized{" "}
                <span style={{ color: ACCENT_GREEN }}>Online</span>{" "}
                Consultations
              </h2>
              <p className="text-base text-white/85 md:text-lg">
                Connect with qualified physiotherapists from the comfort of your home. Personalized wellness plans via video call.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span
                  className="text-lg font-semibold line-through"
                  style={{ color: "#FF6B6B" }}
                >
                  ₹999
                </span>
                <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  ₹500
                </span>
                <span className="text-sm text-white/70">/ session</span>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: "#FF6B6B" }}
                >
                  50% OFF
                </span>
              </div>
              <Button
                size="lg"
                onClick={() =>
                  openBookingModal({ service: "online_consultation" })
                }
                className={ctaClass}
              >
                <WhatsAppGlyph className="h-5 w-5" />
                Book a Consultation
              </Button>
            </div>
            <div className="relative w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
                <Image
                  src="/images/online-consultation-banner.jpg"
                  alt="MDW physiotherapist on a tablet video consultation with a senior client at home."
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute right-4 top-4 rounded-full bg-[var(--mdw-secondary)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  From ₹500
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Home Wellness Vitals Checks */}
        <div className="relative overflow-hidden rounded-3xl bg-primary shadow-sm">
          <div className="flex flex-col gap-6 p-8 sm:p-10 md:p-12 lg:p-10 xl:p-12">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--mdw-secondary)] border-0 shadow-sm">
                <HeartPulse className="h-3.5 w-3.5" /> Vitals Check
              </span>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-4xl xl:text-5xl">
                <span style={{ color: ACCENT_GREEN }}>Home</span>{" "}
                Wellness Vitals Checks
              </h2>
              <p className="text-base text-white/85 md:text-lg">
                Track your Blood Pressure, Weight, Pulse and Oxygen Level from the comfort of your home. Professional wellness monitoring starting at ₹100.
              </p>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  ₹100
                </span>
                <span className="text-sm text-white/70">/ session</span>
              </div>
              <Button
                size="lg"
                onClick={() => openBookingModal({ service: "vitals_check" })}
                className={ctaClass}
              >
                <WhatsAppGlyph className="h-5 w-5" />
                Book a Vitals Check
              </Button>
            </div>
            <div className="relative w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
                <Image
                  src="/images/img9.jpg"
                  alt="MDW therapist with a clipboard during a vitals assessment with an elderly client."
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute right-4 top-4 rounded-full bg-[var(--mdw-secondary)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  From ₹100
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
