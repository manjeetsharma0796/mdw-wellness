"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { signIn, signUp } from "@/app/actions/auth";
import { useAuth } from "@/components/auth/auth-provider";

const signUpSchema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: z.string().min(10, "Enter a valid phone"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;
type SignInValues = z.infer<typeof signInSchema>;

type AuthFormProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export function AuthForm({ onBack, onSuccess }: AuthFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to booking
      </button>

      <Tabs defaultValue="signin" className="w-full">
        {/* w-full forces 2 tabs to share full width via TabsTrigger's flex-1; px-0 trims default container padding for very narrow widths */}
        <TabsList className="w-full">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="mt-4">
          <SignInPanel onSuccess={onSuccess} />
        </TabsContent>

        <TabsContent value="signup" className="mt-4">
          <SignUpPanel onSuccess={onSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SignInPanel({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const { refresh: refreshAuth } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const result = await signIn(values);
    if (!result.ok) {
      setServerError(result.error);
      return;
    }
    // Pull the new user + profile into AuthProvider state immediately so the
    // navbar avatar shows up the moment the modal closes.
    await refreshAuth();
    // Also re-fetch server components so any cached auth-aware render is fresh.
    router.refresh();
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your password"
                  autoComplete="current-password"
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
          className="mt-2 h-11 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}

function SignUpPanel({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const { refresh: refreshAuth } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", phone: "", email: "", password: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const result = await signUp(values);
    if (!result.ok) {
      setServerError(result.error);
      return;
    }
    // Pull the new user + profile into AuthProvider state immediately so the
    // navbar avatar shows up the moment the modal closes.
    await refreshAuth();
    // Also re-fetch server components so any cached auth-aware render is fresh.
    router.refresh();
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
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
          className="mt-2 h-11 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
