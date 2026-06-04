"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/booking/booking-modal-provider";

export function AboutCta() {
  const { open: openBookingModal } = useBookingModal();
  return (
    <Button
      size="lg"
      onClick={() => openBookingModal()}
      className="w-full rounded-xl bg-[var(--mdw-accent-green)] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90 sm:w-fit"
    >
      Book on WhatsApp
    </Button>
  );
}
