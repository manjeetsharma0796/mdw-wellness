"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { vitalSteps } from "@/data/vitals";
import { cn } from "@/lib/utils";

// Node x-centers (matching 4-column grid centers) and a gentle wave that
// passes through each node center, bumping up/down between them.
const WAVE_PATH =
  "M125,28 Q250,10 375,28 Q500,46 625,28 Q750,10 875,28";

export function HowItWorks() {
  const [active, setActive] = React.useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="how-it-works" className="bg-muted">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="How MDW Wellness Vitals Checks Works" />

        {/* Desktop: wave-connected stepper with hover focus */}
        <ol
          className="relative mt-14 hidden grid-cols-4 gap-6 md:grid"
          onMouseLeave={() => setActive(null)}
        >
          {/* Continuous wave behind the node row */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full"
            viewBox="0 0 1000 56"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* faint base track */}
            <path
              d={WAVE_PATH}
              fill="none"
              stroke="var(--mdw-primary)"
              strokeOpacity={0.18}
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* brand line that draws in on scroll */}
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="var(--mdw-primary)"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={shouldReduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={
                shouldReduce
                  ? undefined
                  : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
              }
            />
          </svg>

          {vitalSteps.map((step, i) => {
            const dimmed = active !== null && active !== i;
            const focused = active === i;
            return (
              <li
                key={step.number}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "group relative flex flex-col items-center gap-3 text-center transition-all duration-300",
                  dimmed ? "opacity-40" : "opacity-100",
                  focused && "-translate-y-1.5"
                )}
              >
                <div
                  className={cn(
                    "relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-all duration-300",
                    focused
                      ? "scale-110 shadow-xl shadow-primary/40 ring-4 ring-primary/15"
                      : "shadow-md shadow-primary/25"
                  )}
                >
                  <step.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mdw-secondary)] text-xs font-bold text-white ring-2 ring-muted"
                    aria-hidden
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                  {step.title}
                </h3>
                <p className="max-w-[15rem] text-sm text-muted-foreground">
                  {step.subtitle}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Mobile: vertical timeline */}
        <ol className="mt-10 flex flex-col gap-8 md:hidden">
          {vitalSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <li className="relative flex gap-4 pl-2">
                {i < vitalSteps.length - 1 ? (
                  <span
                    className="absolute left-[1.75rem] top-14 h-[calc(100%-2rem)] w-0.5 bg-primary/20"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
                  <step.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mdw-secondary)] text-xs font-bold text-white ring-2 ring-muted"
                    aria-hidden
                  >
                    {step.number}
                  </span>
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.subtitle}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
}
