"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SignUpInput, SignInInput, ActionResult } from "@/lib/types/database";

export async function signUp(input: SignUpInput): Promise<ActionResult> {
  const schema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
      },
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function signIn(input: SignInInput): Promise<ActionResult> {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function signOut(): Promise<ActionResult> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  return { ok: true };
}
