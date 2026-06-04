"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/section-wrapper";
import { SectionHeading } from "@/components/vitals/section-heading";
import { vitalFaqs } from "@/data/vitals";

// Render an answer string, converting **phrases** into bold spans.
function renderAnswer(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--mdw-secondary)]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const CLOSE_DELAY_MS = 140;

export function VitalsFaq() {
  // Click/keyboard drive `openItems` (the source of truth, accessible).
  // Hover is an additive enhancement on fine-pointer devices only: it opens
  // an item while hovered without destroying the click-driven state, and
  // closes after a short delay so moving the cursor onto the expanding
  // panel doesn't cause flicker.
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const canHover = React.useRef(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    canHover.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleEnter = (value: string) => {
    if (!canHover.current) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered(value);
  };

  const handleLeave = () => {
    if (!canHover.current) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHovered(null), CLOSE_DELAY_MS);
  };

  // Displayed open set = whatever the user clicked open, plus the hovered one.
  const value = hovered
    ? Array.from(new Set([...openItems, hovered]))
    : openItems;

  return (
    <SectionWrapper id="vitals-faq" className="bg-muted">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Frequently Asked Questions" />

        <Accordion
          value={value}
          onValueChange={(v) => setOpenItems(v as string[])}
          className="mt-8 overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-sm sm:px-6"
        >
          {vitalFaqs.map((faq) => {
            const itemValue = faq.question;
            return (
              <AccordionItem
                key={faq.question}
                value={itemValue}
                onMouseEnter={() => handleEnter(itemValue)}
                onMouseLeave={handleLeave}
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{renderAnswer(faq.answer)}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
