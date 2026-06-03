"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/section-wrapper";
import { vitalFaqs } from "@/data/vitals";

export function VitalsFaq() {
  // Controlled so the panel can open on hover (desktop) while click +
  // keyboard still work for touch devices and accessibility.
  const [openItems, setOpenItems] = React.useState<(string | number)[]>([]);

  return (
    <SectionWrapper id="vitals-faq" className="bg-muted">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
          FAQ
        </h2>

        <Accordion
          value={openItems}
          onValueChange={setOpenItems}
          className="mt-8 rounded-2xl border border-border bg-white px-5 sm:px-6"
        >
          {vitalFaqs.map((faq, idx) => {
            const value = `faq-${idx}`;
            return (
              <AccordionItem
                key={idx}
                value={value}
                onMouseEnter={() => setOpenItems([value])}
                onMouseLeave={() => setOpenItems([])}
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
