import { HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { getWhatsAppUrl } from "@/data/site";

export function OnlineConsultation() {
  return (
    <SectionWrapper id="online-consult">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/12 to-[var(--mdw-accent-green)]/15 shadow-sm">
        <div
          className="pointer-events-none absolute -left-16 -top-10 h-72 w-72 rounded-full bg-primary/25 opacity-60 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -bottom-10 h-80 w-80 rounded-full bg-primary/15 opacity-60 blur-3xl"
          aria-hidden
        />
        <div className="relative grid items-center gap-8 p-8 sm:p-10 md:grid-cols-2 md:p-12 lg:p-16">
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--mdw-primary-dark)] shadow-sm backdrop-blur-sm">
              <Stethoscope className="h-3.5 w-3.5" /> Online Consultation
            </span>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-5xl lg:text-6xl">
              Expert <span className="text-[var(--mdw-primary-dark)]">Online</span> Consultations
            </h2>
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              Connect with certified physiotherapists from the comfort of your home. Personalized treatment plans via video call.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-muted-foreground line-through">₹999</span>
              <span className="text-5xl font-bold tracking-tight text-[var(--mdw-primary-dark)]">₹499</span>
              <span className="text-sm text-muted-foreground">/ session</span>
            </div>
            <Button
              size="lg"
              nativeButton={false}
              className="mt-2 w-full rounded-xl bg-[var(--mdw-accent-green)] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit"
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
          <div className="relative mx-auto hidden h-full w-full items-center justify-center md:flex">
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/80 to-white/40 shadow-2xl backdrop-blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <HeartPulse className="h-40 w-40 text-primary" strokeWidth={1.5} />
                  <Stethoscope
                    className="absolute -bottom-4 -right-4 h-20 w-20 text-[var(--mdw-accent-green)]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-[var(--mdw-primary-dark)] px-3 py-1.5 text-xs font-bold text-white shadow-md">
                From ₹499
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
