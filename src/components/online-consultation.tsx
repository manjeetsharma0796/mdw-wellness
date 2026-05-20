import { HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { getWhatsAppUrl } from "@/data/site";

export function OnlineConsultation() {
  return (
    <SectionWrapper id="online-consult" className="bg-gradient-to-b from-primary/12 via-primary/6 to-primary/10">
      <div className="relative mx-auto max-w-[640px] overflow-hidden rounded-2xl border border-primary/25 bg-white p-8 shadow-md md:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-[var(--mdw-primary-dark)] to-primary" />
        <div className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/35 via-primary/20 to-[var(--mdw-accent-green)]/15">
          <div className="relative flex items-end">
            <HeartPulse
              className="h-24 w-24 text-primary/60"
              strokeWidth={1.5}
              aria-hidden
            />
            <Stethoscope
              className="ml-4 h-12 w-12 text-[var(--mdw-accent-green)]/70"
              aria-hidden
            />
          </div>
        </div>
        <span className="mt-6 inline-block w-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-[var(--mdw-primary-dark)]">
          Online Consultation
        </span>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-5xl font-semibold text-[var(--mdw-primary-dark)]">₹499</span>
          <span className="text-sm text-muted-foreground">/ session</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Talk to a Certified Physiotherapist Today
        </h2>
        <Button
          size="lg"
          nativeButton={false}
          className="mt-6 w-full rounded-lg bg-[var(--mdw-accent-green)] text-base text-white hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit sm:px-10"
          render={
            <a
              href={getWhatsAppUrl("Hi, I'd like to book an Online Consultation (₹499).")}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          Book on WhatsApp
        </Button>
      </div>
    </SectionWrapper>
  );
}
