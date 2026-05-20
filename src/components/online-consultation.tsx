import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/section-wrapper";
import { getWhatsAppUrl } from "@/data/site";

const bullets = [
  "Video consult with expert physio",
  "30-minute focused session",
  "Personalized treatment plan",
  "Follow-up via WhatsApp",
];

export function OnlineConsultation() {
  return (
    <SectionWrapper id="online-consult" className="bg-primary/5">
      <div className="mx-auto max-w-[640px] rounded-2xl border border-primary/15 bg-white p-8 shadow-md md:p-10">
        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Online Consultation
        </span>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-5xl font-semibold text-foreground">₹499</span>
          <span className="text-sm text-muted-foreground">/ session</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Talk to a Certified Physiotherapist Today
        </h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--mdw-accent-green)]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
        <p className="mt-4 text-xs text-muted-foreground">
          No hidden charges · Money-back if not satisfied
        </p>
      </div>
    </SectionWrapper>
  );
}
