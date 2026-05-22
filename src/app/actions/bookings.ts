"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { BookingInput, ActionResult } from "@/lib/types/database";

export async function createBooking(input: BookingInput): Promise<ActionResult> {
  const schema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
    service: z.enum(["online_consultation", "home_therapy", "vitals_check"]),
    preferredTime: z
      .enum(["morning", "afternoon", "evening", "night", "flexible"])
      .optional(),
    message: z.string().max(500).optional().or(z.literal("")),
  });

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("bookings").insert({
    user_id: user?.id ?? null,
    name: parsed.data.name,
    phone: parsed.data.phone,
    service: parsed.data.service,
    preferred_time: parsed.data.preferredTime || null,
    message: parsed.data.message || null,
  });

  if (error) {
    console.error("createBooking error", error);
    return { ok: false, error: "Could not save your booking. Please try again." };
  }

  return { ok: true };
}
