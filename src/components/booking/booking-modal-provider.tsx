"use client";

import * as React from "react";

import { BookingModal } from "@/components/booking/booking-modal";

export type Service = "online_consultation" | "home_therapy" | "vitals_check";

export type BookingPrefill = {
  name: string;
  phone: string;
  email: string;
  service: Service;
  preferredTime: string;
  message: string;
};

type BookingModalContextValue = {
  open: (prefill?: Partial<BookingPrefill>) => void;
  close: () => void;
  isOpen: boolean;
};

const BookingModalContext = React.createContext<BookingModalContextValue | null>(
  null
);

export function BookingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [prefill, setPrefill] = React.useState<Partial<BookingPrefill>>({});

  const open = React.useCallback((next?: Partial<BookingPrefill>) => {
    setPrefill(next ?? {});
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenChange = React.useCallback((next: boolean) => {
    setIsOpen(next);
  }, []);

  const value = React.useMemo<BookingModalContextValue>(
    () => ({ open, close, isOpen }),
    [open, close, isOpen]
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal
        isOpen={isOpen}
        prefill={prefill}
        onOpenChange={handleOpenChange}
      />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = React.useContext(BookingModalContext);
  if (!ctx) {
    throw new Error(
      "useBookingModal must be used within a <BookingModalProvider>"
    );
  }
  return ctx;
}
