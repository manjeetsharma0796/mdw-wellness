import { ListChecks } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { vitalSteps } from "@/data/vitals";

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-muted">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrowIcon={ListChecks}
          eyebrowLabel="Simple Process"
          title="How MDW Wellness Vitals Checks Works"
        />

        <ol className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {vitalSteps.map((step) => (
            <li
              key={step.number}
              className="relative flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm"
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <step.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mdw-secondary)] text-xs font-bold text-white shadow"
                  aria-hidden
                >
                  {step.number}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.subtitle}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
}
