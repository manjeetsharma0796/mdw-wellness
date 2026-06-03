import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";
import { vitalReasons } from "@/data/vitals";

export function WhyVitals() {
  return (
    <SectionWrapper id="why-vitals">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            title="Why Choose MDW Wellness Vitals Checks"
            subtitle="Clinical-grade monitoring, delivered with the comfort and privacy of home."
          />
        </div>

        <ul className="lg:col-span-7 lg:divide-y lg:divide-primary/10">
          {vitalReasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.06}>
              <li className="flex items-start gap-4 py-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <reason.icon
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {reason.subtitle}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
