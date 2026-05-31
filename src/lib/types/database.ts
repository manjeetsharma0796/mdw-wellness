export type ServiceType = "online_consultation" | "home_therapy" | "vitals_check";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night" | "flexible";

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  morning: "Morning (8am - 11am)",
  afternoon: "Afternoon (12pm - 3pm)",
  evening: "Evening (4pm - 7pm)",
  night: "Night (7pm - 9pm)",
  flexible: "I'm flexible",
};

export interface Profile {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string | null;
  name: string;
  phone: string;
  service: ServiceType;
  preferred_time: string | null;
  location: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface BookingInput {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service: ServiceType;
  preferredTime?: TimeOfDay;
  message?: string;
}

export interface SignUpInput {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export type ActionResult = { ok: true } | { ok: false; error: string };
