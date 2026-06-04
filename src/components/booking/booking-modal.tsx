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
      {/* Fixed header — stays put while the body scrolls. pr-12 reserves
          room for the absolute X close button on narrow (320px) sheets */}
      <div className="shrink-0 bg-primary px-5 py-4 pr-12">
        <p className="text-lg font-semibold text-white sm:text-xl">{headerLabel}</p>
      </div>
      {/* Body fills remaining height; min-h-0 lets its child scroll region work */}
      <div className="flex min-h-0 flex-1 flex-col">
        {view === "booking" ? (
          <BookingForm
            prefill={prefill}
            onShowAuth={() => setView("auth")}
            onSuccess={handleSuccess}
          />
        ) : (
          <div className="overflow-y-auto p-4 pb-[max(env(safe-area-inset-bottom),1.5rem)] sm:p-6">
            <AuthForm
              onBack={() => setView("booking")}
              onSuccess={handleSuccess}
            />
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="flex max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl p-0"
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
      {/* w-[calc(100%-2rem)] safety net: twMerge strips shadcn's base max-w viewport guard when we add max-w-md, so we re-enforce 1rem side gutters at narrow widths.
          max-h-[90dvh] + flex column keeps the modal inside the viewport (even at 125% zoom) so the body can scroll and the footer stays pinned. */}
      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">{headerLabel}</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
}
