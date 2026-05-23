"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Stethoscope, Home, HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBooking } from "@/app/actions/bookings";
import { getWhatsAppUrl } from "@/data/site";
import {
  TIME_OF_DAY_LABELS,
  type TimeOfDay,
} from "@/lib/types/database";
import type {
  BookingPrefill,
  Service,
} from "@/components/booking/booking-modal-provider";

const TIME_OPTIONS: TimeOfDay[] = [
  "morning",
  "afternoon",
  "evening",
  "night",
  "flexible",
];

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: z.string().min(10, "Enter a valid phone"),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  service: z.enum(["online_consultation", "home_therapy", "vitals_check"]),
  preferredTime: z.enum([
    "morning",
    "afternoon",
    "evening",
    "night",
    "flexible",
  ]),
  message: z.string().max(500, "Too long").optional().or(z.literal("")),
});

type BookingFormValues = z.infer<typeof schema>;

const serviceLabels: Record<Service, string> = {
  online_consultation: "Online Consultation",
  home_therapy: "Home Therapy",
  vitals_check: "MDW Wellness Vitals Check",
};

const serviceOptions: Array<{
  value: Service;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "online_consultation", label: "Online Consultation", Icon: Stethoscope },
  { value: "home_therapy", label: "Home Therapy", Icon: Home },
  { value: "vitals_check", label: "Vitals Check", Icon: HeartPulse },
];

type BookingFormProps = {
  prefill: Partial<BookingPrefill>;
  onShowAuth: () => void;
  onSuccess: () => void;
};

export function BookingForm({
  prefill,
  onShowAuth,
  onSuccess,
}: BookingFormProps) {
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: prefill.name ?? "",
      phone: prefill.phone ?? "",
      email: prefill.email ?? "",
      service: prefill.service ?? "online_consultation",
      preferredTime: (prefill.preferredTime as TimeOfDay) ?? "flexible",
      message: prefill.message ?? "",
    },
  });

  // Re-apply prefill whenever the modal is re-opened with different values.
  React.useEffect(() => {
    form.reset({
      name: prefill.name ?? "",
      phone: prefill.phone ?? "",
      email: prefill.email ?? "",
      service: prefill.service ?? "online_consultation",
      preferredTime: (prefill.preferredTime as TimeOfDay) ?? "flexible",
      message: prefill.message ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    prefill.name,
    prefill.phone,
    prefill.email,
    prefill.service,
    prefill.preferredTime,
    prefill.message,
  ]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const result = await createBooking({
      name: values.name,
      phone: values.phone,
      email: values.email || undefined,
      service: values.service,
      preferredTime: values.preferredTime || undefined,
      message: values.message || undefined,
    });

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    const msg = [
      `Hi! I'd like to book a session.`,
      ``,
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Service: ${serviceLabels[values.service]}`,
      `Preferred time: ${TIME_OF_DAY_LABELS[values.preferredTime]}`,
      values.message ? `Message: ${values.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    if (typeof window !== "undefined") {
      window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    }

    onSuccess();
    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-4">
        {serverError ? (
          <div
            role="alert"
            className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {serverError}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional — for receipts and reminders
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-2">
                  {serviceOptions.map((option) => {
                    const selected = field.value === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => field.onChange(option.value)}
                        // min-h-[88px] keeps chips uniform when "Online Consultation" wraps to 2 lines at ~88px chip width (320px sheet)
                        // p-2 sm:p-3 trims interior padding at narrow widths so the label has more room before wrapping
                        className={
                          selected
                            ? "flex min-h-[88px] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-primary bg-primary/10 p-2 sm:p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
                            : "flex min-h-[88px] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-border bg-white p-2 sm:p-3 text-center transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
                        }
                      >
                        <option.Icon
                          className={
                            selected
                              ? "h-6 w-6 text-primary"
                              : "h-6 w-6 text-muted-foreground"
                          }
                        />
                        <span
                          className={
                            selected
                              ? "text-[11px] font-semibold leading-tight text-balance text-[var(--mdw-secondary)] sm:text-xs"
                              : "text-[11px] font-medium leading-tight text-balance text-foreground sm:text-xs"
                          }
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred time</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v as TimeOfDay)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="When works best?">
                      {(value: string | null) =>
                        value ? TIME_OF_DAY_LABELS[value as TimeOfDay] : null
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((value) => (
                      <SelectItem key={value} value={value}>
                        {TIME_OF_DAY_LABELS[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={2}
                  placeholder="Anything specific we should know?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-11 w-full rounded-xl bg-[var(--mdw-accent-green)] text-base font-semibold text-white shadow-md shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90"
        >
          {isSubmitting ? "Sending..." : "Book on WhatsApp"}
        </Button>

        {/* Two-line layout at narrow widths so the CTA doesn't wrap mid-phrase on 320–360px screens; inline on sm+ */}
        <button
          type="button"
          onClick={onShowAuth}
          className="flex flex-col items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground sm:flex-row sm:justify-center sm:gap-1"
        >
          <span>Save your details for next time?</span>
          <span className="font-medium text-primary hover:text-[var(--mdw-secondary)] underline-offset-2 hover:underline">
            Sign in / Sign up
          </span>
        </button>

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          We respect your privacy. Details only used to confirm your booking.
        </p>
      </form>
    </Form>
  );
}
