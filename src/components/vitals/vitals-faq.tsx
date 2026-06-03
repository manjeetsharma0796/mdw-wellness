"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/section-wrapper";
import { vitalFaqs } from "@/data/vitals";

export function VitalsFaq() {
  return (
    <SectionWrapper id="vitals-faq" className="bg-muted">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
          FAQ
        </h2>

        <Accordion className="mt-8 rounded-2xl border border-border bg-white px-5 sm:px-6">
          {vitalFaqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
