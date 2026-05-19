"use client";

import { useRef } from "react";
import { Play, Stethoscope, Home, Activity, Trophy, Bandage } from "lucide-react";
import { motion } from "framer-motion";
import { services, type Service } from "@/data/services";
import { getWhatsAppUrl } from "@/data/site";
import { SectionWrapper } from "@/components/section-wrapper";

const serviceIcons: Record<string, typeof Play> = {
  "Online Consultation": Stethoscope,
  "Home Therapy": Home,
  "Pain Management": Activity,
  "Sports Rehabilitation": Trophy,
  "Post-Surgery Recovery": Bandage,
};

function ServiceCard({ service }: { service: Service }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = serviceIcons[service.title] ?? Play;

  const handleMouseEnter = () => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative aspect-[9/16] w-52 flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl bg-muted shadow-sm sm:w-56 md:w-60 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {service.videoSrc ? (
        <video
          ref={videoRef}
          src={service.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${service.title} preview video`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/25 via-primary/10 to-[var(--mdw-accent-green)]/10">
          <Icon className="h-16 w-16 text-primary/50" strokeWidth={1.5} aria-hidden />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-20">
        <h3 className="text-base font-semibold text-white">{service.title}</h3>
        <a
          href={getWhatsAppUrl(`Hi, I'm interested in ${service.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-sm text-white/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Learn More &rarr;
        </a>
      </div>
    </motion.article>
  );
}

export function ServicesReels() {
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Our Services
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Expert care tailored to your needs — swipe to explore
        </p>

        <div className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:justify-center md:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
