"use client";

import Image from "next/image";
import { HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { useBookingModal } from "@/components/booking/booking-modal-provider";

export function OnlineConsultation() {
  const { open: openBookingModal } = useBookingModal();
  return (
    <SectionWrapper id="online-consult">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Card 1: Online Consultation */}
        <div className="relative overflow-hidden rounded-3xl bg-primary shadow-sm">
          <div className="flex flex-col gap-6 p-8 sm:p-10 md:p-12 lg:p-10 xl:p-12">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--mdw-secondary)] border-0 shadow-sm">
                <Stethoscope className="h-3.5 w-3.5" /> Online Consultation
              </span>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-4xl xl:text-5xl">
                Personalized{" "}
                <span className="text-white underline decoration-white/40 decoration-4 underline-offset-4">
                  Online
                </span>{" "}
                Consultations
              </h2>
              <p className="max-w-md text-base text-white/85 md:text-lg">
                Connect with qualified physiotherapists from the comfort of your home. Personalized wellness plans via video call.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-white/60 line-through">
                  ₹999
                </span>
                <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  ₹499
                </span>
                <span className="text-sm text-white/70">/ session</span>
              </div>
              <Button
                size="lg"
                onClick={() =>
                  openBookingModal({ service: "online_consultation" })
                }
                className="mt-2 w-full rounded-xl bg-[var(--mdw-accent-green)] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit"
              >
                Book on WhatsApp
              </Button>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
                <Image
                  src="/images/online-consultation-banner.jpg"
                  alt="MDW physiotherapist on a tablet video consultation with a senior client at home."
                  fill
                  sizes="(min-width: 1024px) 35vw, (min-width: 640px) 70vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute right-4 top-4 rounded-full bg-[var(--mdw-secondary)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  From ₹499
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
                Home{" "}
                <span className="text-white underline decoration-white/40 decoration-4 underline-offset-4">
                  Wellness
                </span>{" "}
                Vitals Checks
              </h2>
              <p className="max-w-md text-base text-white/85 md:text-lg">
                Track your Blood Pressure, Weight, Pulse and Oxygen Level from the comfort of your home. Professional wellness monitoring starting at ₹99.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  ₹99
                </span>
                <span className="text-sm text-white/70">/ session</span>
              </div>
              <Button
                size="lg"
                onClick={() =>
                  openBookingModal({ service: "vitals_check" })
                }
                className="mt-2 w-full rounded-xl bg-[var(--mdw-accent-green)] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit"
              >
                Book on WhatsApp
              </Button>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
                <Image
                  src="/images/img9.jpg"
                  alt="MDW therapist with a clipboard during a vitals assessment with an elderly client."
                  fill
                  sizes="(min-width: 1024px) 35vw, (min-width: 640px) 70vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute right-4 top-4 rounded-full bg-[var(--mdw-secondary)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  From ₹99
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
