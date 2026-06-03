import { SectionWrapper } from "@/components/section-wrapper";
import { vitalReasons } from "@/data/vitals";

export function WhyVitals() {
  return (
    <SectionWrapper id="why-vitals">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
          Why Choose MDW Wellness Vitals Checks
        </h2>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {vitalReasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <reason.icon
                  className="h-7 w-7 text-white"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground">{reason.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
