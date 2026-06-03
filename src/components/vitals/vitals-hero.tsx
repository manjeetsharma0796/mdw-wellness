"use client";

import Image from "next/image";
import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { useBookingModal } from "@/components/booking/booking-modal-provider";

export function VitalsHero() {
  const { open: openBookingModal } = useBookingModal();

  return (
    <SectionWrapper id="vitals-hero" className="bg-primary/8">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-10">
        <div className="order-2 flex flex-col gap-5 md:order-1">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white text-[var(--mdw-secondary)] border border-primary/20 shadow-sm px-3 py-1 text-xs font-medium">
            <HeartPulse className="h-3.5 w-3.5" />
            MDW Wellness
          </span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--mdw-secondary)] md:text-5xl lg:text-6xl">
            Home Wellness Vitals Checks
          </h1>
          <p className="max-w-lg text-base text-muted-foreground md:text-lg">
            Track your Blood Pressure, Weight, Pulse and Oxygen Level from the
            comfort of your home. Professional wellness monitoring starting at{" "}
            <span className="font-bold text-[#FF6B6B]">₹99</span>.
          </p>
          <Button
            size="lg"
            onClick={() => openBookingModal({ service: "vitals_check" })}
            className="mt-2 w-fit rounded-xl bg-[var(--mdw-accent-green)] px-8 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90"
          >
            Check Your Vitals
          </Button>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md md:aspect-square md:h-80 md:w-80 md:max-w-none lg:h-96 lg:w-96">
            <div className="absolute -left-3 -top-3 z-10 flex -rotate-[8deg] flex-col items-center rounded-2xl bg-[#FF6B6B] px-4 py-2 text-center text-white shadow-xl ring-2 ring-white/80">
              <span className="text-[10px] font-medium uppercase leading-tight tracking-wide">
                Starting at
              </span>
              <span className="text-2xl font-extrabold leading-none">₹99</span>
              <span className="text-[10px] font-semibold leading-tight">only</span>
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/25 ring-1 ring-primary/25">
              <Image
                src="/images/img9.jpg"
                alt="MDW Wellness therapist with a clipboard during a vitals assessment with an elderly client."
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 640px) 448px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
