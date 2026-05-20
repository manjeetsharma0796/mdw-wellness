"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  Bandage,
  ChevronLeft,
  ChevronRight,
  Home,
  Play,
  Stethoscope,
  Trophy,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SectionWrapper } from "@/components/section-wrapper";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, typeof Play> = {
  "Online Consultation": Stethoscope,
  "Home Therapy": Home,
  "Pain Management": Activity,
  "Sports Rehabilitation": Trophy,
  "Post-Surgery Recovery": Bandage,
};

export function ServicesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playingIdRef = useRef<number | null>(null);

  useEffect(() => {
    playingIdRef.current = playingId;
  }, [playingId]);

  const startAutoplay = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (playingIdRef.current !== null) return;
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
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setPlayingId(null);
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

  useEffect(() => {
    if (playingId !== null) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }, [playingId, startAutoplay, stopAutoplay]);

  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Our Services
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Expert care tailored to your needs.
        </p>

        <div
          className="group relative mt-10"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          aria-roledescription="carousel"
          aria-label="Services"
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service) => {
                const Icon = serviceIcons[service.title] ?? Play;
                const isPlaying = playingId === service.id;
                const cardClass =
                  "relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-muted shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

                const thumbnail = service.youtubeId ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Plain img used to avoid configuring img.youtube.com domain
                  <img
                    src={`https://img.youtube.com/vi/${service.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/25 via-primary/10 to-[var(--mdw-accent-green)]/10">
                    <Icon
                      className="h-16 w-16 text-primary/50"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                );

                return (
                  <CarouselItem
                    key={service.id}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    {isPlaying && service.youtubeId ? (
                      <div className={cardClass}>
                        <iframe
                          src={`https://www.youtube.com/embed/${service.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                          title={service.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (service.youtubeId) setPlayingId(service.id);
                        }}
                        className={cn(cardClass, "text-left")}
                        aria-label={`Play ${service.title} video`}
                      >
                        {thumbnail}

                        {service.youtubeId && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-black/40 p-4 backdrop-blur-sm">
                              <Play
                                className="h-8 w-8 text-white"
                                fill="currentColor"
                                aria-hidden
                              />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-20">
                          <h3 className="text-base font-semibold text-white">
                            {service.title}
                          </h3>
                        </div>
                      </button>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 lg:opacity-0 opacity-70 md:opacity-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity hover:bg-white group-hover:opacity-100 lg:opacity-0 opacity-70 md:opacity-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {services.map((_, idx) => (
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
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
