export type ServiceType = "online_consultation" | "home_therapy" | "vitals_check";

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
  message: string | null;
  status: string;
  created_at: string;
}

export interface BookingInput {
  name: string;
  phone: string;
  email?: string;
  service: ServiceType;
  preferredTime?: string;
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
