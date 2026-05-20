"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionWrapper } from "@/components/section-wrapper";
import { videoTestimonials, type VideoTestimonial } from "@/data/video-testimonials";
import { cn } from "@/lib/utils";

const aspectClasses: Record<VideoTestimonial["aspectRatio"], string> = {
  portrait: "aspect-[9/16]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

export function VideoTestimonials() {
  const [active, setActive] = useState<VideoTestimonial | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of platform media query on mount
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <SectionWrapper id="video-testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            Real Stories
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            Hear from people we&apos;ve helped recover and thrive.
          </p>
        </div>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {videoTestimonials.map((t) => (
            <div key={t.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(t)}
                aria-label={`Play testimonial from ${t.name} — ${t.condition}`}
                className={cn(
                  "group relative w-full overflow-hidden rounded-2xl bg-muted shadow-sm cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  aspectClasses[t.aspectRatio]
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-[var(--mdw-accent-green)]/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Play
                      className="h-6 w-6 text-white fill-white"
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                  {t.name} · {t.condition}
                </div>
              </button>
            </div>
          ))}
        </div>

        <Dialog
          open={active !== null}
          onOpenChange={(open) => {
            if (!open) setActive(null);
          }}
        >
          <DialogContent
            showCloseButton
            className="w-full max-w-[min(90vw,720px)] sm:max-w-[min(90vw,720px)] aspect-video overflow-hidden bg-black p-0 ring-0"
          >
            <DialogTitle className="sr-only">
              {active ? `${active.name} testimonial` : "Video testimonial"}
            </DialogTitle>
            {active?.videoSrc ? (
              <video
                src={active.videoSrc}
                controls
                autoPlay={!prefersReducedMotion}
                loop
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <Play className="h-7 w-7 text-white fill-white" aria-hidden />
                </div>
                <p className="text-sm font-medium">Video coming soon</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SectionWrapper>
  );
}
