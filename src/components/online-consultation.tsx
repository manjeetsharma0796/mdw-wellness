"use client";

import { HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { useBookingModal } from "@/components/booking/booking-modal-provider";

export function OnlineConsultation() {
  const { open: openBookingModal } = useBookingModal();
  return (
    <SectionWrapper id="online-consult">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary shadow-sm">
        <div className="relative grid items-center gap-8 p-8 sm:p-10 md:grid-cols-2 md:p-12 lg:p-16">
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--mdw-secondary)] border-0 shadow-sm">
              <Stethoscope className="h-3.5 w-3.5" /> Online Consultation
            </span>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
              Expert <span className="text-white underline decoration-white/40 decoration-4 underline-offset-4">Online</span> Consultations
            </h2>
            <p className="max-w-md text-base text-white/85 md:text-lg">
              Connect with certified physiotherapists from the comfort of your home. Personalized treatment plans via video call.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-white/60 line-through">₹999</span>
              <span className="text-5xl font-bold tracking-tight text-white">₹499</span>
              <span className="text-sm text-white/70">/ session</span>
            </div>
            <Button
              size="lg"
              onClick={() => openBookingModal({ service: "online_consultation" })}
              className="mt-2 w-full rounded-xl bg-[var(--mdw-accent-green)] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit"
            >
              Book on WhatsApp
            </Button>
          </div>
          <div className="relative mx-auto hidden h-full w-full items-center justify-center md:flex">
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-[2rem] bg-white shadow-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <HeartPulse className="h-40 w-40 text-primary" strokeWidth={1.5} />
                  <Stethoscope
                    className="absolute -bottom-4 -right-4 h-20 w-20 text-[var(--mdw-accent-green)]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-[var(--mdw-secondary)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                From ₹499
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
