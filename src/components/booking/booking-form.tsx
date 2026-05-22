"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "@/app/actions/bookings";
import { getWhatsAppUrl } from "@/data/site";
import type {
  BookingPrefill,
  Service,
} from "@/components/booking/booking-modal-provider";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: z.string().min(10, "Enter a valid phone"),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  service: z.enum(["online_consultation", "home_therapy", "vitals_check"]),
  preferredTime: z.string().optional().or(z.literal("")),
  message: z.string().max(500, "Too long").optional().or(z.literal("")),
});

type BookingFormValues = z.infer<typeof schema>;

const serviceLabels: Record<Service, string> = {
  online_consultation: "Online Consultation",
  home_therapy: "Home Therapy",
  vitals_check: "MDW Wellness Vitals Check",
};

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
      preferredTime: prefill.preferredTime ?? "",
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
      preferredTime: prefill.preferredTime ?? "",
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
      values.preferredTime ? `Preferred time: ${values.preferredTime}` : null,
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
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {serverError ? (
          <div
            role="alert"
            className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {serverError}
          </div>
        ) : null}

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
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="online_consultation">
                    Online Consultation
                  </SelectItem>
                  <SelectItem value="home_therapy">Home Therapy</SelectItem>
                  <SelectItem value="vitals_check">Vitals Check</SelectItem>
                </SelectContent>
              </Select>
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
                <Input
                  placeholder="e.g. Tomorrow evening, 7pm"
                  {...field}
                />
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
                  rows={3}
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

        <button
          type="button"
          onClick={onShowAuth}
          className="mt-1 text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Save your details for next time?{" "}
          <span className="font-medium text-primary underline-offset-2 hover:underline">
            Sign in / Sign up
          </span>
        </button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          We respect your privacy. Details only used to confirm your booking.
        </p>
      </form>
    </Form>
  );
}
