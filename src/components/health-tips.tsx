import { Calendar, User, BookOpen, Activity, Footprints, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { healthTips } from "@/data/health-tips";
import { getWhatsAppUrl } from "@/data/site";
import { SectionWrapper } from "@/components/section-wrapper";

const categoryColors: Record<string, string> = {
  "Back Care": "bg-blue-50 text-blue-700",
  Posture: "bg-emerald-50 text-emerald-700",
  Recovery: "bg-amber-50 text-amber-700",
};

const categoryIcons: Record<string, typeof BookOpen> = {
  "Back Care": Activity,
  Posture: Footprints,
  Recovery: HeartHandshake,
};

export function HealthTips() {
  return (
    <SectionWrapper id="health-tips">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--mdw-secondary)] px-3 py-1 text-xs font-medium text-white">
            <BookOpen className="h-3.5 w-3.5" />
            Weekly Updates
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
            Health Tips &amp; Wellness
          </h2>
          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            Fresh insights from our therapists, updated every week
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthTips.map((tip) => {
            const categoryClass =
              categoryColors[tip.category] ?? "bg-white text-[var(--mdw-secondary)] border border-primary/20";
            const CategoryIcon = categoryIcons[tip.category] ?? BookOpen;
            return (
              <Card
                key={tip.id}
                className="group overflow-hidden border-primary/15 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CategoryIcon className="h-12 w-12 text-white/85" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="absolute left-3 top-3">
                    <Badge className={`${categoryClass} border-0 hover:opacity-90`}>
                      {tip.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="flex flex-col gap-3 p-5 pt-4">
                  <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[var(--mdw-secondary)] transition-colors group-hover:text-primary">
                    {tip.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {tip.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {tip.therapistName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(tip.publishedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <a
                    href={getWhatsAppUrl(`Hi, I'd like to know more about: ${tip.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more about ${tip.title}`}
                    className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-[var(--mdw-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    Read More
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
