import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { vitalSteps } from "@/data/vitals";

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-muted">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="How MDW Wellness Vitals Checks Works" />

        <ol className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {/* Connector line behind the nodes (desktop only) */}
          <span
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-primary/20 md:block"
            aria-hidden
          />
          {vitalSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <li className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
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
                <p className="text-sm text-muted-foreground">{step.subtitle}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
}
