import { Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { whyChooseUsItems } from "@/data/why-choose-us";

export function WhyChooseUs() {
  return (
    <SectionWrapper id="why-us">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Our Difference
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            What sets MDW Wellness apart.
          </p>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUsItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center text-center gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <item.icon
                  className="h-7 w-7 text-primary"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
