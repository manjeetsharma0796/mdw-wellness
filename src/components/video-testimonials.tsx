"use client";

import { MessageSquareQuote } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { videoTestimonials, type TileSize } from "@/data/video-testimonials";
import { cn } from "@/lib/utils";

const sizeClasses: Record<TileSize, string> = {
  large: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2 sm:row-span-1",
  tall: "sm:col-span-1 sm:row-span-2",
  small: "sm:col-span-1 sm:row-span-1",
};

export function VideoTestimonials() {
  return (
    <SectionWrapper id="video-testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-[var(--mdw-primary-dark)]">
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

        <div className="mt-10 grid auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [grid-auto-flow:dense]">
          {videoTestimonials.map((t) => (
            <div
              key={t.id}
              className={cn(
                sizeClasses[t.size],
                "relative h-full w-full overflow-hidden rounded-2xl bg-muted shadow-sm"
              )}
            >
              {t.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${t.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                  title={`${t.name} testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-[var(--mdw-accent-green)]/10" />
              )}

              <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                {t.name} · {t.condition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
