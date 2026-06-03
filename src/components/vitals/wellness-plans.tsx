"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { useBookingModal } from "@/components/booking/booking-modal-provider";
import { wellnessPlans } from "@/data/vitals";
import { cn } from "@/lib/utils";

export function WellnessPlans() {
  const { open: openBookingModal } = useBookingModal();

  return (
    <SectionWrapper id="wellness-plans">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Choose Wellness Plan"
          subtitle="One-time or ongoing care, with reports after every visit."
        />

        <div className="mt-12 grid items-stretch gap-6 grid-cols-1 md:grid-cols-3">
          {wellnessPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="flex">
            <div
              className={cn(
                "relative flex w-full flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 sm:p-8",
                plan.highlighted
                  ? "border-primary bg-primary/5 ring-2 ring-primary/40 shadow-xl shadow-primary/15 md:-translate-y-2"
                  : "border-primary/15 bg-white hover:border-primary hover:shadow-lg"
              )}
            >
              {plan.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[var(--mdw-secondary)] px-3 py-1 text-xs font-bold text-white shadow-md">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  {plan.badge}
                </span>
              ) : null}

              <h3 className="text-lg font-semibold text-[var(--mdw-secondary)]">
                {plan.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-[var(--mdw-secondary)]">
                  ₹{plan.amount}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.cadence}
                </span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mdw-accent-green)]"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                onClick={() =>
                  openBookingModal({
                    service: "vitals_check",
                    message: `Interested in: ${plan.name} (₹${plan.amount})`,
                  })
                }
                className={cn(
                  "mt-8 w-full rounded-xl py-3 text-base font-semibold",
                  plan.highlighted
                    ? "bg-[var(--mdw-accent-green)] text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90"
                    : "bg-primary text-white hover:bg-[var(--mdw-primary-dark)]"
                )}
              >
                {plan.ctaLabel}
              </Button>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
