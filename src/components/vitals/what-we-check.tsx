import { SectionWrapper } from "@/components/section-wrapper";
import { vitalChecks } from "@/data/vitals";

export function WhatWeCheck() {
  return (
    <SectionWrapper id="what-we-check">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
          What We Check
        </h2>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {vitalChecks.map((check) => (
            <div
              key={check.title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <check.icon
                  className="h-8 w-8 text-primary"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                {check.title}
              </h3>
              <p className="text-sm text-muted-foreground">{check.subtitle}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Measurements are performed using trusted devices.
        </p>
      </div>
    </SectionWrapper>
  );
}
