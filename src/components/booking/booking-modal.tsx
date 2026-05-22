"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { BookingForm } from "@/components/booking/booking-form";
import { AuthForm } from "@/components/booking/auth-form";
import type { BookingPrefill } from "@/components/booking/booking-modal-provider";
import { useIsMobile } from "@/hooks/use-is-mobile";

type View = "booking" | "auth";

interface BookingModalProps {
  isOpen: boolean;
  prefill: Partial<BookingPrefill>;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ isOpen, prefill, onOpenChange }: BookingModalProps) {
  const isMobile = useIsMobile();
  const [view, setView] = useState<View>("booking");

  // Reset view shortly after the modal closes (so closing animation looks right).
  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setView("booking"), 150);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const handleSuccess = () => onOpenChange(false);

  const headerLabel = view === "booking" ? "Book your session" : "Sign in / Sign up";

  const content = (
    <>
      <div className="bg-primary px-5 py-4">
        {/* Single compact heading — no eyebrow line. Visible Title also satisfies a11y. */}
        {/* TitleSlot is rendered separately below by Dialog/Sheet wrappers — duplicate visible title is OK for design and a11y */}
        <p className="text-lg font-semibold text-white sm:text-xl">{headerLabel}</p>
      </div>
      <div className="p-4 sm:p-6">
        {view === "booking" ? (
          <BookingForm
            prefill={prefill}
            onShowAuth={() => setView("auth")}
            onSuccess={handleSuccess}
          />
        ) : (
          <AuthForm
            onBack={() => setView("booking")}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="max-h-[92vh] overflow-y-auto rounded-t-2xl p-0"
          showCloseButton
        >
          <SheetTitle className="sr-only">{headerLabel}</SheetTitle>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">{headerLabel}</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
}
