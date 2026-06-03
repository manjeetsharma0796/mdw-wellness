import { FileText, Check } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { Reveal } from "@/components/vitals/reveal";

const reportRows = ["Blood Pressure", "Pulse Rate", "SpO2", "Weight"];
const highlights = [
  "Digital report shared after every visit",
  "Readings tracked so you can see trends over time",
  "Quarterly printed summary for subscribers",
];

function ReportMock({ className }: { className?: string }) {
  return (
    <div
      className={
        "w-full overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-lg shadow-primary/10 " +
        (className ?? "")
      }
    >
      <div className="flex items-center gap-2 bg-primary px-5 py-4 text-white">
        <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        <span className="text-sm font-semibold">Vitals Report</span>
      </div>
      <div className="space-y-4 p-5">
        {reportRows.map((row) => (
          <div key={row} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--mdw-secondary)]">
                {row}
              </span>
              <span className="h-2 w-10 rounded-full bg-primary/20" />
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary/40"
                style={{ width: "68%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WellnessReports() {
  return (
    <SectionWrapper id="wellness-reports" className="bg-muted">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Overlapping report-mock stack */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -right-4 top-4 hidden w-full rotate-6 opacity-60 sm:block">
              <ReportMock />
            </div>
            <div className="absolute -left-4 top-2 hidden w-full -rotate-6 opacity-60 sm:block">
              <ReportMock />
            </div>
            <div className="relative">
              <ReportMock />
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              align="left"
              title="Professional Wellness Reports"
            />
            <p className="text-base text-muted-foreground md:text-lg">
              Get a digital report after every visit and track your wellness
              over time.
            </p>
            <ul className="mt-1 flex flex-col gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mdw-accent-green)]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
