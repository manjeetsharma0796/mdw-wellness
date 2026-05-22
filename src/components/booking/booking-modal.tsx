"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/booking/booking-form";
import { AuthForm } from "@/components/booking/auth-form";
import type { BookingPrefill } from "@/components/booking/booking-modal-provider";

type BookingModalProps = {
  isOpen: boolean;
  prefill: Partial<BookingPrefill>;
  onOpenChange: (open: boolean) => void;
};

export function BookingModal({
  isOpen,
  prefill,
  onOpenChange,
}: BookingModalProps) {
  const [view, setView] = React.useState<"booking" | "auth">("booking");

  // Reset view to "booking" whenever the modal closes.
  React.useEffect(() => {
    if (!isOpen) {
      const id = setTimeout(() => setView("booking"), 150);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden gap-0 bg-white">
        <div className="bg-primary p-5 text-white">
          <p className="text-xs uppercase tracking-wider opacity-80">
            {view === "booking" ? "Quick Booking" : "Save your details"}
          </p>
          <DialogTitle className="mt-1 text-xl font-semibold text-white">
            {view === "booking" ? "Book your session" : "Sign in / Sign up"}
          </DialogTitle>
        </div>

        <div className="p-5 sm:p-6">
          {view === "booking" ? (
            <BookingForm
              prefill={prefill}
              onShowAuth={() => setView("auth")}
              onSuccess={handleClose}
            />
          ) : (
            <AuthForm
              onBack={() => setView("booking")}
              onSuccess={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
