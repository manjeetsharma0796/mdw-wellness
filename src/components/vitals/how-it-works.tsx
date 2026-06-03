"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { vitalSteps } from "@/data/vitals";
import { cn } from "@/lib/utils";

// Vertical serpentine connector: passes through 4 node centers down the
// middle (x=60), bowing right / left / right between them. Node y-centers
// land at 1/8, 3/8, 5/8, 7/8 of the height, so the path stays aligned
// regardless of total height (preserveAspectRatio="none").
const SERPENTINE =
  "M60,4 L60,64 C100,96 100,160 60,192 C20,224 20,288 60,320 C100,352 100,416 60,448 L60,508";

export function HowItWorks() {
  const [active, setActive] = React.useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="how-it-works" className="bg-muted">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="How MDW Wellness Vitals Checks Works" />

        {/* Desktop: vertical serpentine timeline with hover focus */}
        <ol
          className="relative mt-14 hidden md:block"
          onMouseLeave={() => setActive(null)}
        >
          {/* Curved connector down the center */}
          <svg
            className="pointer-events-none absolute left-1/2 top-0 h-full w-32 -translate-x-1/2"
            viewBox="0 0 120 512"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={SERPENTINE}
              fill="none"
              stroke="var(--mdw-primary)"
              strokeOpacity={0.18}
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={SERPENTINE}
              fill="none"
              stroke="var(--mdw-primary)"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={shouldReduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                shouldReduce ? undefined : { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
              }
            />
          </svg>

          {vitalSteps.map((step, i) => {
            const onLeft = i % 2 === 0;
            const dimmed = active !== null && active !== i;
            const focused = active === i;
            return (
              <li
                key={step.number}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "grid min-h-[8rem] grid-cols-[1fr_auto_1fr] items-center gap-6 transition-opacity duration-300",
                  dimmed ? "opacity-40" : "opacity-100"
                )}
              >
                {/* Left content */}
                <div className={cn("flex", onLeft ? "justify-end" : "")}>
                  {onLeft ? (
                    <StepCard step={step} focused={focused} align="right" />
                  ) : null}
                </div>

                {/* Center node */}
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

                {/* Right content */}
                <div className={cn("flex", onLeft ? "" : "justify-start")}>
                  {!onLeft ? (
                    <StepCard step={step} focused={focused} align="left" />
                  ) : null}
                </div>
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

function StepCard({
  step,
  focused,
  align,
}: {
  step: (typeof vitalSteps)[number];
  focused: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "max-w-xs rounded-2xl px-5 py-4 transition-all duration-300",
        align === "right" ? "text-right" : "text-left",
        focused
          ? "-translate-y-0.5 border border-primary/15 bg-white shadow-lg shadow-primary/10"
          : "border border-transparent"
      )}
    >
      <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
        {step.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>
    </div>
  );
}
