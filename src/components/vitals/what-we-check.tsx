import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { vitalChecks } from "@/data/vitals";

export function WhatWeCheck() {
  return (
    <SectionWrapper id="what-we-check">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="What We Check" />

        {/* Vitals readout panel: cells divided by hairlines (gap-px over a
            tinted container) instead of separate boxed cards. */}
        <Reveal className="mt-10">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-primary/15 bg-primary/10 shadow-sm sm:grid-cols-2">
            {vitalChecks.map((check) => (
              <div
                key={check.title}
                className="flex items-start gap-4 bg-white p-6 transition-colors hover:bg-primary/[0.03] sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <check.icon
                    className="h-6 w-6 text-primary"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--mdw-secondary)]">
                    {check.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {check.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Measurements are performed using trusted devices.
        </p>
      </div>
    </SectionWrapper>
  );
}
