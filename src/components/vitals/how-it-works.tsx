"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { vitalSteps } from "@/data/vitals";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const [active, setActive] = React.useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="how-it-works" className="bg-muted">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="How MDW Wellness Vitals Checks Works" />

        {/* Desktop: center rail, alternating cards, hover focus */}
        <ol
          className="relative mt-14 hidden md:block"
          onMouseLeave={() => setActive(null)}
        >
          {/* Center rail: faint track + line that draws in on scroll (z-0, sits behind the solid nodes) */}
          <span
            className="absolute left-1/2 top-0 z-0 h-full w-0.5 -translate-x-1/2 bg-primary/15"
            aria-hidden
          />
          <motion.span
            className="absolute left-1/2 top-0 z-0 h-full w-0.5 -translate-x-1/2 origin-top bg-primary"
            aria-hidden
            initial={shouldReduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              shouldReduce ? undefined : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }
          />
          {/* Direction arrow at the end of the rail */}
          <motion.span
            className="absolute -bottom-1 left-1/2 z-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-sm"
            aria-hidden
            initial={shouldReduce ? false : { opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={shouldReduce ? undefined : { duration: 0.4, delay: 1 }}
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </motion.span>

          {vitalSteps.map((step, i) => {
            const onLeft = i % 2 === 0;
            const dimmed = active !== null && active !== i;
            const focused = active === i;
            return (
              <li
                key={step.number}
                onMouseEnter={() => setActive(i)}
                className="grid min-h-[8.5rem] grid-cols-[1fr_auto_1fr] items-center gap-3"
              >
                <div
                  className={cn(
                    "flex items-center justify-end transition-opacity duration-300",
                    dimmed && "opacity-50"
                  )}
                >
                  {onLeft ? (
                    <>
                      <StepCard step={step} focused={focused} align="right" />
                      <span
                        className="h-px w-6 shrink-0 bg-primary/40"
                        aria-hidden
                      />
                    </>
                  ) : null}
                </div>

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

                <div
                  className={cn(
                    "flex items-center justify-start transition-opacity duration-300",
                    dimmed && "opacity-50"
                  )}
                >
                  {!onLeft ? (
                    <>
                      <span
                        className="h-px w-6 shrink-0 bg-primary/40"
                        aria-hidden
                      />
                      <StepCard step={step} focused={focused} align="left" />
                    </>
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
