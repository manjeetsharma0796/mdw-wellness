import { FileText } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";

// Stylised report mockups standing in for real report screenshots.
// When real images are ready, replace each card body with an <Image>.
const reportMocks = [
  { title: "Vitals Summary", rows: ["Blood Pressure", "Pulse Rate", "SpO2"] },
  { title: "Trend Report", rows: ["Weekly Average", "Comparison", "Notes"] },
  { title: "Wellness Card", rows: ["Readings", "Observations", "Next Visit"] },
];

export function WellnessReports() {
  return (
    <SectionWrapper id="wellness-reports" className="bg-muted">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrowIcon={FileText}
          eyebrowLabel="Reports"
          title="Professional Wellness Reports"
        />

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reportMocks.map((report) => (
            <div
              key={report.title}
              className="overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Report header bar */}
              <div className="flex items-center gap-2 bg-primary px-5 py-4 text-white">
                <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                <span className="text-sm font-semibold">{report.title}</span>
              </div>
              {/* Skeleton report body */}
              <div className="space-y-4 p-5">
                {report.rows.map((row) => (
                  <div key={row} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[var(--mdw-secondary)]">
                        {row}
                      </span>
                      <span className="h-2 w-10 rounded-full bg-primary/20" />
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary/40" style={{ width: "70%" }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--mdw-accent-green)]" />
                  <span className="text-[11px] text-muted-foreground">
                    Digital report shared after the visit
                  </span>
                </div>
              </div>
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
