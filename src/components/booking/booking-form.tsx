"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { getWhatsAppUrl } from "@/data/site";
import {
  submitPublicBooking,
  type ServiceChoice,
  type TimePreset,
} from "@/lib/wellness-backend";
import {
  TIME_OF_DAY_LABELS,
  type TimeOfDay,
} from "@/lib/types/database";
import type {
  BookingPrefill,
  Service,
} from "@/components/booking/booking-modal-provider";
import { useAuth } from "@/components/auth/auth-provider";

const TIME_OPTIONS: TimeOfDay[] = [
  "morning",
  "afternoon",
  "evening",
  "night",
  "flexible",
];

const schema = z
  .object({
    name: z.string().min(2, "Name too short"),
    phone: z.string().min(10, "Enter a valid phone"),
    email: z
      .string()
      .email("Enter a valid email")
      .optional()
      .or(z.literal("")),
    location: z.string().max(120, "Too long").optional().or(z.literal("")),
    service: z.enum(["online_consultation", "home_therapy", "vitals_check"]),
    preferredTime: z.enum([
      "morning",
      "afternoon",
      "evening",
      "night",
      "flexible",
    ]),
    message: z.string().max(500, "Too long").optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Location is required for the in-person services so the back-office
    // team knows where to dispatch a therapist. Online consultations don't
    // need it.
    if (
      data.service !== "online_consultation" &&
      (!data.location || data.location.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["location"],
        message: "City / Area is required for Home Therapy and Vitals Check",
      });
    }
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

// Mapping from the form's internal enums to the wellness backend's
// human-readable ServiceChoice / TimePreset strings. Kept here so this
// component is the only file that has to know both naming conventions.
// Vitals Check sub-options shown to the customer (multi-select + "Other").
const VITALS_OPTIONS = ["Blood Pressure (BP)", "Blood Sugar", "Other"];

const backendServiceMap: Record<Service, ServiceChoice> = {
  online_consultation: "Online Consultation",
  home_therapy: "Home Therapy",
  vitals_check: "Vitals Check",
};

const backendTimeMap: Record<TimeOfDay, TimePreset> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  // The backend doesn't model a separate Night window. Round to Evening so
  // the customer's preference still maps to a reasonable outreach slot.
  night: "Evening",
  flexible: "I'm flexible",
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
  const { user, profile } = useAuth();

  const initialValues = React.useMemo<BookingFormValues>(
    () => ({
      name: prefill.name ?? profile?.name ?? "",
      phone: prefill.phone ?? profile?.phone ?? "",
      email: prefill.email ?? profile?.email ?? "",
      location: "",
      service: (prefill.service ?? "online_consultation") as BookingFormValues["service"],
      preferredTime: (prefill.preferredTime as TimeOfDay) ?? "flexible",
      message: prefill.message ?? "",
    }),
    [
      prefill.name,
      prefill.phone,
      prefill.email,
      prefill.service,
      prefill.preferredTime,
      prefill.message,
      profile?.name,
      profile?.phone,
      profile?.email,
    ],
  );

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  // Re-apply prefill (merged with profile) whenever inputs change.
  React.useEffect(() => {
    form.reset(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const isSubmitting = form.formState.isSubmitting;
  const [vitals, setVitals] = React.useState<string[]>([]);
  const [vitalsOther, setVitalsOther] = React.useState("");
  const watchedService = form.watch("service");
  const locationRequired = watchedService !== "online_consultation";

  const onSubmit = form.handleSubmit((values) => {
    // Vitals sub-selections only apply to the Vitals Check service. Replace the
    // bare "Other" with the typed text when provided.
    const selectedVitals =
      values.service === "vitals_check"
        ? vitals.map((v) =>
            v === "Other" && vitalsOther.trim()
              ? `Other: ${vitalsOther.trim()}`
              : v,
          )
        : [];

    // Decoupled flow: open WhatsApp instantly, sync to the dashboard in the
    // background. The customer is never blocked on the backend (Render can
    // cold-start ~30-60s) and we never lose the lead.

    // 1. Open the WhatsApp deep-link FIRST — synchronously inside the submit
    //    handler so popup blockers don't eat it (an await before window.open
    //    loses the user-gesture context).
    const msg = [
      `Hi! I'd like to book a session.`,
      ``,
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.location ? `City: ${values.location}` : null,
      `Service: ${serviceLabels[values.service]}`,
      selectedVitals.length ? `Vitals: ${selectedVitals.join(", ")}` : null,
      `Preferred time: ${TIME_OF_DAY_LABELS[values.preferredTime]}`,
      values.message ? `Message: ${values.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    if (typeof window !== "undefined") {
      window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    }

    // 2. Fire the dashboard sync in the BACKGROUND — do NOT await. keepalive +
    //    a long timeout (see wellness-backend.ts) let it complete through a
    //    Render cold start, even if this tab closes. The customer already has
    //    WhatsApp, so on failure we only log.
    void submitPublicBooking({
      name: values.name,
      phone: values.phone,
      email: values.email || undefined,
      location: values.location || undefined,
      service: backendServiceMap[values.service],
      preferredTime: backendTimeMap[values.preferredTime],
      message: values.message || undefined,
      vitals: selectedVitals.length ? selectedVitals : undefined,
    }).then((backend) => {
      if (!backend.success && !backend.timedOut) {
        console.warn("[booking] dashboard sync failed:", backend.message);
      }
    });

    // 3. Optimistic confirmation + close.
    toast.success("Opening WhatsApp — we’ve got your details.");
    onSuccess();
    form.reset();
    setVitals([]);
    setVitalsOther("");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col gap-3 overflow-y-auto p-4 sm:gap-4 sm:p-6">
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
                Optional. For receipts and reminders.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City / Area
                {locationRequired ? (
                  <span className="text-destructive" aria-hidden>
                    {" "}
                    *
                  </span>
                ) : null}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. Ekbalpore, Kolkata"
                  autoComplete="address-level2"
                  aria-required={locationRequired}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {locationRequired
                  ? "Required for Home Therapy and Vitals Check."
                  : "Optional for online consultations."}
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

        {watchedService === "vitals_check" && (
          <div className="space-y-2">
            <FormLabel>Which vitals?</FormLabel>
            <div className="flex flex-col gap-2">
              {VITALS_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={vitals.includes(opt)}
                    onChange={(e) =>
                      setVitals((prev) =>
                        e.target.checked
                          ? [...prev, opt]
                          : prev.filter((v) => v !== opt),
                      )
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
            {vitals.includes("Other") && (
              <Input
                placeholder="Tell us which measurement"
                value={vitalsOther}
                onChange={(e) => setVitalsOther(e.target.value)}
              />
            )}
          </div>
        )}

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

        </div>

        {/* Pinned footer — stays visible while the fields above scroll.
            Safe-area padding clears the iOS home indicator. */}
        <div className="shrink-0 border-t border-border bg-white px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.85rem)] sm:px-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl bg-[var(--mdw-accent-green)] text-base font-semibold text-white shadow-md shadow-[var(--mdw-accent-green)]/25 hover:bg-[var(--mdw-accent-green)]/90"
          >
            {isSubmitting ? "Submitting..." : "Book on WhatsApp"}
          </Button>

          {/* Two-line layout at narrow widths so the CTA doesn't wrap mid-phrase on 320–360px screens; inline on sm+ */}
          {!user ? (
            <button
              type="button"
              onClick={onShowAuth}
              className="mt-2.5 flex w-full flex-col items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground sm:flex-row sm:justify-center sm:gap-1"
            >
              <span>Save your details for next time?</span>
              <span className="font-medium text-primary hover:text-[var(--mdw-secondary)] underline-offset-2 hover:underline">
                Sign in / Sign up
              </span>
            </button>
          ) : (
            <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
              Signed in as{" "}
              <span className="font-semibold text-[var(--mdw-secondary)]">
                {profile?.name || user.email}
              </span>
            </p>
          )}

          <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
            We respect your privacy. Details only used to confirm your booking.
          </p>
        </div>
      </form>
    </Form>
  );
}
