import { FileText } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";

// Placeholder report tiles. Swap each `src` for a real report screenshot
// (e.g. /images/report-1.jpg) when available; the layout is ready.
const reportPlaceholders = [1, 2, 3];

export function WellnessReports() {
  return (
    <SectionWrapper id="wellness-reports" className="bg-muted">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
          Professional Wellness Reports
        </h2>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-3">
          {reportPlaceholders.map((n) => (
            <div
              key={n}
              className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 bg-white text-muted-foreground shadow-sm"
            >
              <FileText className="h-12 w-12 text-primary/40" strokeWidth={1.5} aria-hidden />
              <span className="text-sm font-medium">Report {n}</span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
          Get a digital report after every visit and track your wellness over
          time.
        </p>
      </div>
    </SectionWrapper>
  );
}
