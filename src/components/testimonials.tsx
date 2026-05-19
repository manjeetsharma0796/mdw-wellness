"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import { SectionWrapper } from "@/components/section-wrapper";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-amber-400 text-amber-400"
              : "h-4 w-4 fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="bg-primary/5">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Real stories from people we&apos;ve helped recover and thrive
        </p>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-10 w-full max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                      <StarRating rating={t.rating} />
                      <Quote className="h-6 w-6 text-primary/30" />
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 border-t border-border pt-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.condition}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </SectionWrapper>
  );
}
