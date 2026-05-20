"use client";

import { useState } from "react";
import { MessageSquareQuote, Play } from "lucide-react";
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
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <SectionWrapper id="video-testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--mdw-secondary)] px-3 py-1 text-xs font-medium text-white">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            Real Stories
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            Hear from people we&apos;ve helped recover and thrive.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [grid-auto-flow:dense]">
          {videoTestimonials.map((t) => {
            const isPlaying = playingId === t.id && !!t.youtubeId;

            return (
              <div
                key={t.id}
                className={cn(
                  sizeClasses[t.size],
                  "relative h-full w-full overflow-hidden rounded-2xl bg-muted shadow-sm"
                )}
              >
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={`${t.name} testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingId(t.id)}
                    aria-label={`Play testimonial from ${t.name} — ${t.condition}`}
                    className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {t.youtubeId ? (
                      // eslint-disable-next-line @next/next/no-img-element -- external YouTube CDN; next/image would require remote pattern config
                      <img
                        src={`https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary" />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mdw-secondary)] transition-transform duration-200 group-hover:scale-110">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </div>
                    </div>
                  </button>
                )}

                <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-[var(--mdw-secondary)] px-3 py-1 text-xs font-medium text-white">
                  {t.name} · {t.condition}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
