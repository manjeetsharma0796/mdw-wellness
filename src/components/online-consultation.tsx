import { HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { getWhatsAppUrl } from "@/data/site";

export function OnlineConsultation() {
  return (
    <SectionWrapper id="online-consult" className="bg-primary/5">
      <div className="mx-auto max-w-[640px] rounded-2xl border border-primary/15 bg-white p-8 shadow-md md:p-10">
        <div className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/25 via-primary/10 to-[var(--mdw-accent-green)]/10">
          <div className="relative flex items-end">
            <HeartPulse
              className="h-24 w-24 text-primary/40"
              strokeWidth={1.5}
              aria-hidden
            />
            <Stethoscope
              className="ml-4 h-12 w-12 text-[var(--mdw-accent-green)]/70"
              aria-hidden
            />
          </div>
        </div>
        <span className="mt-6 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Online Consultation
        </span>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-5xl font-semibold text-foreground">₹499</span>
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
