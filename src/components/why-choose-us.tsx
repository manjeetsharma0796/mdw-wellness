"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SectionWrapper } from "@/components/section-wrapper";
import { whyChooseUsItems } from "@/data/why-choose-us";
import { cn } from "@/lib/utils";

const AUTOPLAY_INTERVAL_MS = 4000;

export function WhyChooseUs() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Embla provides imperative API; initial snap must be read once on mount
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    startAutoplay();

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopAutoplay();
      api.off("select", onSelect);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [api, startAutoplay, stopAutoplay]);

  return (
    <SectionWrapper id="why-us">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--mdw-secondary)] px-3 py-1 text-xs font-medium text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Our Difference
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            What sets MDW Wellness apart.
          </p>
        </div>

        <div
          className="group relative mt-10"
          aria-roledescription="carousel"
          aria-label="Why choose MDW Wellness"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {whyChooseUsItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group/card flex h-full flex-col items-center text-center gap-3 rounded-2xl border border-primary/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                      <item.icon
                        className="h-7 w-7 text-white"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                    <h3 className="text-base font-semibold text-[var(--mdw-secondary)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border border-primary/20 p-2 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 lg:opacity-0 opacity-70 md:opacity-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Previous benefit"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border border-primary/20 p-2 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 lg:opacity-0 opacity-70 md:opacity-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Next benefit"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {whyChooseUsItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => api?.scrollTo(idx)}
                aria-current={current === idx ? "true" : undefined}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  current === idx
                    ? "w-8 bg-[var(--mdw-secondary)]"
                    : "w-2.5 bg-primary/30 hover:bg-primary/50",
                )}
                aria-label={`Go to benefit ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
