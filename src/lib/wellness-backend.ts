/**
 * Client for the WellnessBackend public booking endpoint.
 *
 * Used by the booking form to submit enquiries that show up on the
 * back-office dashboard at /dashboard/enquiries. Soft-fails on network
 * or backend errors so the WhatsApp deep-link path remains available
 * to the customer even if the dashboard sync fails.
 *
 * Backend repo:  https://github.com/MyDawaiWala10/WellnessBackend
 * Endpoint:      POST /api/appointments/public  (unauthenticated, rate-limited)
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_WELLNESS_BACKEND_URL;

export type ServiceChoice =
  | "Online Consultation"
  | "Home Therapy"
  | "Vitals Check";
export type TimePreset = "Morning" | "Afternoon" | "Evening" | "I'm flexible";

export interface PublicBookingInput {
  name: string;
  /** Form input as a string; converted to numeric for the backend. */
  phone: string;
  email?: string;
  location?: string;
  service: ServiceChoice;
  preferredTime: TimePreset;
  message?: string;
}

export interface PublicBookingResult {
  success: boolean;
  enquiryId?: string;
  message?: string;
  /** True when the request was aborted because it exceeded the timeout. */
  timedOut?: boolean;
}

/**
 * Request timeout for the backend POST. Render free-tier cold starts
 * are usually 10-15s; 20s gives them a buffer without keeping the user
 * waiting forever on a dead backend. On timeout the form falls back to
 * the WhatsApp deep-link.
 */
const REQUEST_TIMEOUT_MS = 20_000;

const TIME_PRESETS: Record<TimePreset, { from: string; to: string } | undefined> = {
  Morning: { from: "09:00", to: "12:00" },
  Afternoon: { from: "12:00", to: "17:00" },
  Evening: { from: "17:00", to: "21:00" },
  "I'm flexible": undefined,
};

function mapService(service: ServiceChoice): {
  typeOfappointment: "consultation" | "appointment";
  label: string;
} {
  switch (service) {
    case "Online Consultation":
      return { typeOfappointment: "consultation", label: "Online Consultation" };
    case "Home Therapy":
      return { typeOfappointment: "appointment", label: "Home Therapy" };
    case "Vitals Check":
      return { typeOfappointment: "appointment", label: "Vitals Check" };
  }
}

export async function submitPublicBooking(
  input: PublicBookingInput,
): Promise<PublicBookingResult> {
  if (!BACKEND_URL) {
    console.error(
      "[wellness-backend] NEXT_PUBLIC_WELLNESS_BACKEND_URL is not set",
    );
    return { success: false, message: "Booking service is misconfigured." };
  }

  const phoneNumeric = Number(input.phone.replace(/\D/g, ""));
  if (!phoneNumeric || String(phoneNumeric).length < 10) {
    return {
      success: false,
      message: "Please enter a valid 10-digit phone number.",
    };
  }

  const { typeOfappointment, label: serviceLabel } = mapService(input.service);
  const preferred = TIME_PRESETS[input.preferredTime];

  const notePieces = [`[Service: ${serviceLabel}]`];
  if (input.message?.trim()) notePieces.push(input.message.trim());

  // undefined values are omitted by JSON.stringify, so we never send
  // null or empty objects that Zod on the backend would reject.
  const payload = {
    name: input.name.trim(),
    phonenumber: phoneNumeric,
    email: input.email?.trim() || undefined,
    location: input.location?.trim() || undefined,
    typeOfappointment,
    preferredReachOutTime: preferred,
    note: notePieces.join("\n"),
    source: "public_booking_form",
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );

  try {
    const res = await fetch(`${BACKEND_URL}/api/appointments/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const body = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
      data?: { enquiryId?: string };
    };
    if (!res.ok) {
      return {
        success: false,
        message: body.message || `Booking failed (HTTP ${res.status}).`,
      };
    }
    return {
      success: true,
      enquiryId: body.data?.enquiryId,
      message: body.message,
    };
  } catch (err) {
    if (
      err instanceof DOMException &&
      err.name === "AbortError"
    ) {
      console.warn("[submitPublicBooking] aborted (timeout)");
      return {
        success: false,
        timedOut: true,
        message:
          "Our team is taking longer than expected. Sending you to WhatsApp instead.",
      };
    }
    console.error("[submitPublicBooking]", err);
    return {
      success: false,
      message:
        "Network error. Please try again or reach us on WhatsApp.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
