"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { slides, type Slide } from "@/data/slides";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/components/booking/booking-modal-provider";

// Render the slide description, highlighting the price amount (if any)
// in bold coral so it stands out within the sentence.
function renderDescription(slide: Slide) {
  const amount = slide.priceBurst?.amount;
  if (!amount || !slide.description.includes(amount)) {
    return slide.description;
  }
  const idx = slide.description.indexOf(amount);
  return (
    <>
      {slide.description.slice(0, idx)}
      <span className="font-bold text-[#FF6B6B]">{amount}</span>
      {slide.description.slice(idx + amount.length)}
    </>
  );
}

const slideServiceMap: Record<number, "online_consultation" | "home_therapy" | "vitals_check"> = {
  1: "online_consultation",
  2: "home_therapy",
  3: "vitals_check",
  4: "online_consultation",
};

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { open: openBookingModal } = useBookingModal();

  const startAutoplay = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 3000);
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
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative bg-primary/8 md:flex md:min-h-[600px] md:items-center">
                <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 md:grid-cols-2 md:gap-8 md:px-8 md:py-0">
                  <div className="order-2 flex flex-col justify-center gap-5 md:order-1 md:py-12">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white text-[var(--mdw-secondary)] border border-primary/20 shadow-sm px-3 py-1 text-xs font-medium">
                      <HeartPulse className="h-3.5 w-3.5" />
                      MDW Wellness
                    </div>
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--mdw-secondary)] md:text-5xl">
                      {slide.headline}
                    </h1>
                    <p className="max-w-lg text-base text-muted-foreground md:text-lg">
                      {renderDescription(slide)}
                    </p>
                    <Button
                      size="lg"
                      onClick={() =>
                        openBookingModal({
                          service: slideServiceMap[slide.id] ?? "online_consultation",
                        })
                      }
                      className="mt-2 w-fit rounded-lg bg-[var(--mdw-accent-green)] px-8 text-base text-white shadow-lg shadow-[var(--mdw-accent-green)]/30 transition-shadow hover:bg-[var(--mdw-accent-green)]/90 hover:shadow-xl hover:shadow-[var(--mdw-accent-green)]/40"
                    >
                      {slide.ctaText}
                    </Button>
                  </div>
                  <div className="order-1 flex items-center justify-center md:order-2">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-md md:aspect-square md:h-80 md:w-80 md:max-w-none lg:h-96 lg:w-96">
                      {slide.priceBurst ? (
                        <div className="absolute -left-3 -top-3 z-10 flex -rotate-[8deg] flex-col items-center rounded-2xl bg-[#FF6B6B] px-4 py-2 text-center text-white shadow-xl ring-2 ring-white/80">
                          {slide.priceBurst.prefix ? (
                            <span className="text-[10px] font-medium uppercase leading-tight tracking-wide">
                              {slide.priceBurst.prefix}
                            </span>
                          ) : null}
                          <span className="text-2xl font-extrabold leading-none">
                            {slide.priceBurst.amount}
                          </span>
                          {slide.priceBurst.suffix ? (
                            <span className="text-[10px] font-semibold leading-tight">
                              {slide.priceBurst.suffix}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                      {slide.imageSrc ? (
                        <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/25 ring-1 ring-primary/25">
                          <Image
                            src={slide.imageSrc}
                            alt={slide.imageAlt ?? slide.headline}
                            fill
                            sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 640px) 448px, 100vw"
                            className="object-cover"
                            priority={slide.id === 1}
                          />
                        </div>
                      ) : (
                        <div className="relative flex h-full w-full items-center justify-center rounded-[2rem] bg-primary/15 shadow-2xl shadow-primary/25 ring-1 ring-primary/25">
                          <HeartPulse
                            className="h-24 w-24 text-primary"
                            strokeWidth={1.5}
                          />
                        </div>
                      )}
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
