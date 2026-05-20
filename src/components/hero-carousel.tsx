"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { slides } from "@/data/slides";
import { getWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 5000);
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
    const onSelect = () => setCurrent(api.selectedScrollSnap());
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
    <section
      className="group relative w-full overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative flex min-h-[460px] items-center bg-gradient-to-br from-primary/20 via-primary/5 to-[var(--mdw-accent-green)]/10 md:min-h-[600px]">
                <div className="absolute inset-0 -z-0 opacity-70">
                  <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
                  <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
                </div>
                <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-8">
                  <div className="flex flex-col justify-center gap-5 py-12">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-[var(--mdw-primary-dark)]">
                      <HeartPulse className="h-3.5 w-3.5" />
                      MDW Wellness
                    </div>
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
                      {slide.headline}
                    </h1>
                    <p className="max-w-lg text-base text-muted-foreground md:text-lg">
                      {slide.description}
                    </p>
                    <Button
                      size="lg"
                      nativeButton={false}
                      className="mt-2 w-fit rounded-lg bg-[var(--mdw-accent-green)] px-8 text-base text-white hover:bg-[var(--mdw-accent-green)]/90"
                      render={
                        <a
                          href={getWhatsAppUrl(slide.headline + " — I'd like to book.")}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      {slide.ctaText}
                    </Button>
                  </div>
                  <div className="hidden items-center justify-center md:flex">
                    <div className="relative h-80 w-80 lg:h-96 lg:w-96">
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/50 via-primary/30 to-primary/10" />
                      <div className="absolute inset-4 rounded-[1.75rem] bg-white/80 backdrop-blur-sm shadow-xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <HeartPulse className="h-20 w-20 text-primary" strokeWidth={1.75} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          onClick={() => api?.scrollPrev()}
          className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 lg:opacity-0 opacity-70 md:opacity-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 lg:opacity-0 opacity-70 md:opacity-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            aria-current={current === idx ? "true" : undefined}
            className={cn(
              "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              current === idx
                ? "w-8 bg-primary"
                : "w-2.5 bg-primary/30 hover:bg-primary/50"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
