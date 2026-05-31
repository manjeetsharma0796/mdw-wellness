# Wellness Backend Integration — Booking Form Sync

> **Audience:** AI agent implementing the changes + the repo owner reviewing them.
> Implement section: read top-to-bottom.
> Owner section: jump to **[For the owner — checklist](#for-the-owner--checklist)** for env vars and dependencies you need to provide.

---

## What we're building

Today the **"Book on WhatsApp"** form in this repo only opens a WhatsApp deep-link. The customer messages the business, but the booking never lands in the back-office dashboard, so executives have to log it manually.

We're going to make every form submission **also POST to the wellness backend** so the booking appears as a fresh enquiry on the dashboard's `/dashboard/enquiries` page automatically. WhatsApp still opens for the customer's confirmation — the backend post happens in parallel.

### High-level flow after this change

```
┌──────────────────────────────────────────────────────────────────┐
│ Public visitor                                                   │
│   ↓ fills "Book your session" form, clicks "Book on WhatsApp"    │
└────────────────────────────┬─────────────────────────────────────┘
                             │
              ┌──────────────┴───────────────┐
              ▼                              ▼
   ┌─────────────────────┐   ┌──────────────────────────────────┐
   │ Opens WhatsApp deep │   │ POST /api/appointments/public    │
   │ link (existing)     │   │ on wellnessbackend-8fxe          │
   └─────────────────────┘   │ .onrender.com (new endpoint)     │
                             └────────────┬─────────────────────┘
                                          │
                                          ▼
                            ┌─────────────────────────────────┐
                            │ Backend writes to MongoDB       │
                            │ collection: appointmentbookings │
                            │ status: "enquiry"               │
                            │ enquiryId: ENQ-NNNN allocated   │
                            └────────────┬────────────────────┘
                                         │
                                         ▼
                            ┌─────────────────────────────────┐
                            │ Dashboard (separate Next.js     │
                            │ app) shows new row in           │
                            │ "Needs first contact" within    │
                            │ 5 minutes (React Query refetch) │
                            └─────────────────────────────────┘
```

The customer message + the backend record both happen on the single button click. The customer doesn't notice anything different — they get the WhatsApp window like before. The back-office team gets a structured row they can work the funnel on.

---

## The backend we're integrating with

| Property | Value |
|---|---|
| **Service** | Express 5 + Mongoose 8 + TypeScript |
| **Production URL** | `https://wellnessbackend-8fxe.onrender.com` |
| **Source repo** | `https://github.com/MyDawaiWala10/WellnessBackend` (private) |
| **Database** | MongoDB (managed) — collection `appointmentbookings` |
| **Booking endpoint we're adding** | `POST /api/appointments/public` (no auth, rate-limited) |

The dashboard that consumes this collection lives at `https://github.com/MyDawaiWala10/WellnessFrontend` and is deployed on Vercel. **You do not need to touch the dashboard for this work** — it auto-shows new enquiries via React Query polling.

---

## What's missing in the current form

Looking at the screenshot of the existing form ("Book your session"):

| Field | Status | Decision |
|---|---|---|
| Name | ✅ present | Keep |
| Phone | ✅ present (10-digit) | Keep; **must be sent to backend as a `Number` not a string** |
| Email | ✅ present (optional) | Keep |
| Service (3 buttons: Online Consultation / Home Therapy / Vitals Check) | ✅ present | Map to backend's `typeOfappointment` + prepend label to `note` |
| Preferred time (dropdown) | ✅ present | Map preset → `{from, to}` time window |
| Message | ✅ present | Keep; sent to backend as `note` |
| **Location / City** | ❌ **MISSING — add this** | Free-text input, required for Home Therapy + Vitals Check, optional for Online Consultation |
| Age | ⚪ optional add later | Skipped for MVP |
| Gender | ⚪ optional add later | Skipped for MVP |
| Date preference | ⚪ optional add later | Executive collects on call |
| Referral source | ⚪ optional add later | Marketing nice-to-have |

**The only NEW field this work requires on the form is Location / City.** Everything else maps from existing fields.

---

## Field mapping — public form → backend record

This is the exact transformation the form's submit handler must do.

| Public form field | Backend field | Transformation |
|---|---|---|
| `name` (string) | `name` (string) | Direct |
| `phone` (string "9812345678") | `phonenumber` (number 9812345678) | `Number(phone.replace(/\D/g, ''))` |
| `email` (string, optional) | `email` (string, optional) | Direct; omit if empty |
| `location` (string, NEW field) | `location` (string, optional) | Direct |
| `service` ("Online Consultation" / "Home Therapy" / "Vitals Check") | `typeOfappointment` ("consultation" / "appointment") + `note` prefix | See logic below |
| `preferredTime` ("Morning" / "Afternoon" / "Evening" / "I'm flexible") | `preferredReachOutTime` ({from, to} or omitted) | See preset map below |
| `message` (string, optional) | `note` (string, prefixed with service label) | `[Service: <label>]\n<message>` |
| — | `status` | Always `"enquiry"` |
| — | `source` (optional new field, see below) | `"public_booking_form"` |

### Service mapping logic

```ts
function mapService(service: ServiceChoice): {
  typeOfappointment: "consultation" | "appointment";
  serviceLabel: string;
} {
  switch (service) {
    case "Online Consultation":
      return { typeOfappointment: "consultation", serviceLabel: "Online Consultation" };
    case "Home Therapy":
      return { typeOfappointment: "appointment", serviceLabel: "Home Therapy" };
    case "Vitals Check":
      return { typeOfappointment: "appointment", serviceLabel: "Vitals Check" };
  }
}
```

### Preferred time preset map

```ts
const TIME_PRESETS: Record<string, { from: string; to: string } | undefined> = {
  "Morning":    { from: "09:00", to: "12:00" },
  "Afternoon":  { from: "12:00", to: "17:00" },
  "Evening":    { from: "17:00", to: "21:00" },
  "I'm flexible": undefined,  // backend treats omitted as no preference
};
```

If `TIME_PRESETS[choice]` is `undefined`, **omit the `preferredReachOutTime` field entirely** from the POST body (don't send `null` or empty object — Zod on backend would reject malformed shape).

### Final example payload

For a visitor entering: Anita / 9812345678 / anita@example.com / Bandra / Online Consultation / Morning / "Lower back pain":

```json
{
  "name": "Anita",
  "phonenumber": 9812345678,
  "email": "anita@example.com",
  "location": "Bandra",
  "typeOfappointment": "consultation",
  "preferredReachOutTime": { "from": "09:00", "to": "12:00" },
  "note": "[Service: Online Consultation] Lower back pain",
  "status": "enquiry",
  "source": "public_booking_form"
}
```

---

## Backend change required (one new endpoint)

The existing `POST /api/appointments` requires JWT auth via cookies — that's for the back-office dashboard. Public visitors have no JWT, so we need a separate unauthenticated endpoint.

**Goal:** add `POST /api/appointments/public` to the WellnessBackend repo.

### Files to add/modify in `MyDawaiWala10/WellnessBackend`

#### 1. New controller function in `controllers/appointmentController.ts`

```ts
import { nextSequence } from "../lib/counters.ts";

// In-memory rate limiter — simple bucket per IP per 60s window.
// For production scale, replace with Redis-based limiter.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_PER_MINUTE = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count++;
  return bucket.count > RATE_LIMIT_PER_MINUTE;
}

export const addPublicEnquiry = async (req: Request, res: Response) => {
  try {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
      || req.socket.remoteAddress
      || "unknown";

    if (tooManyRequests(ip)) {
      return res.status(429).send({
        success: false,
        message: "Too many submissions. Please try again in a minute.",
      });
    }

    const {
      name, phonenumber, email, location, typeOfappointment,
      preferredReachOutTime, note, source,
    } = req.body;

    // Minimum required: name + phonenumber.
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).send({
        success: false,
        message: "Name is required (at least 2 characters).",
      });
    }
    if (!phonenumber || typeof phonenumber !== "number") {
      return res.status(400).send({
        success: false,
        message: "Phone number is required (numeric).",
      });
    }

    // Status-aware duplicate-phone check — match the existing /api/appointments behaviour.
    const OPEN_STATUSES = ["enquiry", "scheduled", "ongoing"];
    const existing = await AppointmentBooking.findOne({
      phonenumber,
      status: { $in: OPEN_STATUSES },
    });
    if (existing) {
      // Don't reveal too much to public callers; just acknowledge.
      return res.status(200).send({
        success: true,
        message: "We already have an open enquiry for this number. Our team will reach out.",
        data: { enquiryId: existing.enquiryId },
      });
    }

    // Allocate sequential enquiry ID.
    const seq = await nextSequence("enquiry");
    const enquiryId = `ENQ-${String(seq).padStart(4, "0")}`;

    const record = new AppointmentBooking({
      name: name.trim(),
      phonenumber,
      email: email || undefined,
      location: location || undefined,
      typeOfappointment: typeOfappointment || undefined,
      preferredReachOutTime: preferredReachOutTime || undefined,
      note: note || undefined,
      source: source || "public_booking_form",
      status: "enquiry",
      enquiryId,
    });
    await record.save();

    return res.status(201).send({
      success: true,
      message: "Booking received — our team will reach out shortly.",
      data: { enquiryId },
    });
  } catch (error: any) {
    console.error("[addPublicEnquiry]", error);
    return res.status(500).send({
      success: false,
      message: "Server error — please try again.",
    });
  }
};
```

#### 2. New route in `routes/appointmentBookingRoutes.ts`

Add ONE line — note the **lack of `userAuth`** middleware:

```ts
appointmentRouter.post("/public", addPublicEnquiry);
```

Order matters in Express — put it before the catch-all `appointmentRouter.post("/", userAuth, addAppointmentsDetails);` if any conflict.

#### 3. Optional schema field (add `source` to track origin)

In `models/appointmentsBookingModel.ts`, add inside the schema definition:

```ts
// Where the record originated. Useful for analytics:
//   "public_booking_form" — from the public mdw site
//   "dashboard"           — created via the back-office dashboard
//   undefined             — pre-source-tracking record
source: { type: String },
```

Mongoose `strict: true` would drop this field without the schema entry, so this step is required if you want the source tracked.

### CORS — important

The Express server's CORS config currently allows only `process.env.FRONT_END_URL` (the dashboard's domain). The public mdw site lives at a different origin — you need to add it.

Edit `server.ts` to allow both:

```ts
const allowedOrigins = [
  process.env.FRONT_END_URL,                    // dashboard
  process.env.PUBLIC_SITE_URL,                  // public mdw site
  "http://localhost:3000",                      // local dev (either app)
  "http://localhost:3001",                      // local dev (if both running)
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  }),
);
```

Add `PUBLIC_SITE_URL=<your-mdw-deployment-url>` to the WellnessBackend's Render env vars after deploying these changes.

---

## Frontend changes (this repo — `C:\workspace\mdw`)

### Files to add/modify

| File | Change |
|---|---|
| Form component (wherever the booking form lives — likely `src/components/booking-form.tsx` or similar — find it) | Add `location` field; wire submit handler to also POST to backend |
| `src/lib/wellness-backend.ts` (new) | Thin client for the public booking endpoint |
| `.env.local` (your local) and Vercel project env | Add `NEXT_PUBLIC_WELLNESS_BACKEND_URL` |

### 1. New client wrapper

Create `src/lib/wellness-backend.ts`:

```ts
/**
 * Client for the WellnessBackend public booking endpoint.
 * Used by the booking form to submit enquiries that show up on the
 * back-office dashboard at /dashboard/enquiries.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_WELLNESS_BACKEND_URL;

export type ServiceChoice = "Online Consultation" | "Home Therapy" | "Vitals Check";
export type TimePreset = "Morning" | "Afternoon" | "Evening" | "I'm flexible";

export interface PublicBookingInput {
  name: string;
  phone: string;          // accepts string from the form input
  email?: string;
  location?: string;
  service: ServiceChoice;
  preferredTime: TimePreset;
  message?: string;
}

const TIME_PRESETS: Record<TimePreset, { from: string; to: string } | undefined> = {
  "Morning":      { from: "09:00", to: "12:00" },
  "Afternoon":    { from: "12:00", to: "17:00" },
  "Evening":      { from: "17:00", to: "21:00" },
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
): Promise<{ success: boolean; enquiryId?: string; message?: string }> {
  if (!BACKEND_URL) {
    console.error("NEXT_PUBLIC_WELLNESS_BACKEND_URL is not set");
    return { success: false, message: "Booking service is misconfigured." };
  }

  const phoneNumeric = Number(input.phone.replace(/\D/g, ""));
  if (!phoneNumeric || String(phoneNumeric).length < 10) {
    return { success: false, message: "Please enter a valid 10-digit phone number." };
  }

  const { typeOfappointment, label: serviceLabel } = mapService(input.service);
  const preferred = TIME_PRESETS[input.preferredTime];

  const notePieces = [`[Service: ${serviceLabel}]`];
  if (input.message?.trim()) notePieces.push(input.message.trim());

  const payload = {
    name: input.name.trim(),
    phonenumber: phoneNumeric,
    email: input.email?.trim() || undefined,
    location: input.location?.trim() || undefined,
    typeOfappointment,
    preferredReachOutTime: preferred,  // undefined => omitted by JSON.stringify
    note: notePieces.join("\n"),
    source: "public_booking_form",
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/appointments/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));
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
    console.error("[submitPublicBooking]", err);
    return {
      success: false,
      message: "Network error — please try again or contact us on WhatsApp.",
    };
  }
}
```

### 2. Booking form changes

Find the existing form component (search for `"Book on WhatsApp"` or `"Book your session"` in the codebase). In it:

**(a)** Add a Location field after Phone:

```tsx
<div>
  <Label htmlFor="location">City / Area</Label>
  <Input
    id="location"
    type="text"
    placeholder="e.g. Bandra, Mumbai"
    value={form.location}
    onChange={(e) => setForm({ ...form, location: e.target.value })}
    required={form.service !== "Online Consultation"}
  />
  <p className="text-xs text-muted-foreground mt-1">
    {form.service === "Online Consultation"
      ? "Optional for online consultations"
      : "Required for Home Therapy and Vitals Check"}
  </p>
</div>
```

**(b)** Update the submit handler. The "Book on WhatsApp" button currently presumably just opens a WhatsApp URL. Wrap that with a call to `submitPublicBooking` first:

```tsx
import { submitPublicBooking } from "@/lib/wellness-backend";

async function handleBookingSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitting(true);

  // 1. Send to backend so it lands on the dashboard funnel.
  //    Don't block WhatsApp on this — if it fails, user can still
  //    contact via WhatsApp and the team logs manually.
  const backendResult = await submitPublicBooking({
    name: form.name,
    phone: form.phone,
    email: form.email,
    location: form.location,
    service: form.service,
    preferredTime: form.preferredTime,
    message: form.message,
  });

  if (backendResult.success) {
    toast.success(backendResult.message || "Booking received");
  } else {
    // Soft-fail — log it, continue to WhatsApp anyway so the customer
    // still has a path forward.
    console.warn("Backend submission failed:", backendResult.message);
    toast.error(backendResult.message || "Couldn't save booking — opening WhatsApp.");
  }

  // 2. Open WhatsApp (existing behaviour).
  const waMessage = encodeURIComponent(
    `Hi! I'd like to book a ${form.service}.\n` +
    `Name: ${form.name}\nPhone: ${form.phone}` +
    (form.location ? `\nCity: ${form.location}` : "") +
    (form.preferredTime !== "I'm flexible" ? `\nPreferred time: ${form.preferredTime}` : "") +
    (form.message ? `\nMessage: ${form.message}` : "")
  );
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // existing
  window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");

  setSubmitting(false);
}
```

**(c)** If the form currently uses a controlled state shape, extend it to include `location`. If it uses `react-hook-form`, add `location` to the resolver/schema.

### 3. Error UX

For the visitor: if the backend POST fails (network, rate-limit, etc.), the WhatsApp link still opens — the customer experience isn't blocked. Just surface a non-blocking toast/error.

---

## For the owner — checklist

> **Section for the human owner of this repo.** Things only you can provide.

### Env vars you need to set

Set these in **both** local `.env.local` and the Vercel project's environment variables for this repo:

| Var | Value | Used for | Scope |
|---|---|---|---|
| `NEXT_PUBLIC_WELLNESS_BACKEND_URL` | `https://wellnessbackend-8fxe.onrender.com` | Where the booking form POSTs | All environments. `NEXT_PUBLIC_` prefix because it's referenced from client-side code. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your business WhatsApp number, digits only (e.g. `919812345678`) | The WhatsApp deep-link | Only set if not already configured for the existing form |

Also tell the backend repo owner (the same person, you, but in the WellnessBackend repo) to add ONE env var on Render:

| Var | Value | Where |
|---|---|---|
| `PUBLIC_SITE_URL` | The Vercel URL of THIS site (e.g. `https://mdw-wellness.vercel.app`) | Render env vars for the WellnessBackend service. Needed for CORS allow-list. |

### Dependencies to install

If the form component already exists and uses these, they're already installed. If anything below is NOT in your `package.json`, install it:

```bash
# UI primitives (likely already installed since you have a styled form)
npm install sonner          # toast notifications (used in the example handler)
```

That's it for this work. **No new heavy deps required** — just one tiny toast library if you don't have one. No database client, no auth library, no React Query — the booking POST is a simple `fetch`.

### What you do, in order

1. **Set the two env vars above** in `.env.local` for local dev, and in your Vercel project for production
2. **Tell the wellness backend owner** (or have them apply via PR) to:
   - Add `PUBLIC_SITE_URL` env var on Render
   - Merge the backend changes described above (new controller, route, CORS update) — these go in a separate PR on `MyDawaiWala10/WellnessBackend`
3. **Let the agent run** with this guide — it will modify this repo (the public site) to add the Location field + submit handler
4. **Smoke test** (see below)

---

## Smoke test plan (do this after both repos deploy)

1. Open the public site in a browser
2. Click "Book your session"
3. Fill: Name=`Test User`, Phone=`9999999000`, Email=blank, City=`Test City`, Service=`Online Consultation`, Preferred=`Morning`, Message=`Smoke test from public site`
4. Click "Book on WhatsApp"
5. ✅ WhatsApp opens with pre-filled message (existing behaviour)
6. ✅ A toast appears: "Booking received — our team will reach out shortly."
7. Open the dashboard at `https://<dashboard-url>/dashboard/enquiries`
8. ✅ A new row should appear in **"Needs first contact"** within 5 minutes (React Query staleTime):
   - ID: `ENQ-XXXX` (a real sequential ID, not ENQ-9XXX)
   - Name: `Test User`
   - Phone: `9999999000`
   - Preferred: `9:00 AM – 12:00 PM`
   - Status: `Enquiry`
   - Last active: just now
9. Open the lead's drawer → confirm: Note shows `[Service: Online Consultation]\nSmoke test from public site`; Location shows `Test City`

If step 8 doesn't show the row → check:
- Browser DevTools → Network → did the `POST /api/appointments/public` request return 201?
- If 4xx → backend logs on Render
- If CORS error → `PUBLIC_SITE_URL` env var on Render
- If network error → `NEXT_PUBLIC_WELLNESS_BACKEND_URL` typo in this repo's env

### Duplicate-phone test (negative-path)

Submit the form a second time with the same phone (`9999999000`) within 5 min:
- ✅ WhatsApp still opens
- ✅ Toast says "We already have an open enquiry for this number" (or similar)
- ✅ Dashboard does NOT show a duplicate row — the original record stands

### Rate-limit test

Submit 6 times in 60 seconds from the same IP:
- ✅ First 5 succeed
- ✅ 6th returns HTTP 429 with friendly message ("Too many submissions. Please try again in a minute.")

---

## Notes & known limitations

- **Rate limiter is in-memory.** Fine for single-instance Render free tier. If you scale to multiple replicas or want stricter protection, swap for a Redis-based limiter (Upstash works well).
- **No CAPTCHA.** Public POST endpoint is technically scrape-able for spam. Rate limiter helps; for production-scale traffic, add hCaptcha or Vercel BotID (https://vercel.com/docs/botid).
- **Phone format.** This guide treats phone as a 10-digit Indian number stored as `Number`. If you support international, change the field to `string` everywhere and update the validation regex.
- **WhatsApp fallback.** If the user's device can't open WhatsApp (some desktop browsers), the deep-link silently fails. The backend record still gets created — your team will see the enquiry and can reach out via phone instead.
- **Supabase remains untouched.** This repo currently uses Supabase for other features. The booking flow does NOT use Supabase — it goes straight to the wellness MongoDB. Supabase auth ("Sign in / Sign up" link in the form) is separate.

---

## TL;DR for the AI agent

**Changes in this repo (`C:\workspace\mdw`):**
1. Add `src/lib/wellness-backend.ts` (code provided in full above)
2. Find the booking form component, add a Location field, wire the submit handler to call `submitPublicBooking` before opening WhatsApp
3. Add `NEXT_PUBLIC_WELLNESS_BACKEND_URL=https://wellnessbackend-8fxe.onrender.com` to `.env.local.example` and document it in the README
4. Install `sonner` if not already present
5. TypeScript check + dev-server smoke (don't try to test against live backend until owner confirms backend deploy is done)
6. Commit on a feature branch, open a PR

**Out of scope for this repo:**
- Backend changes (separate PR on `MyDawaiWala10/WellnessBackend` — described above for the owner to coordinate)
- Dashboard changes (none needed)
- Database migration (none — backend handles it)

**Stop and ask the owner if:**
- You can't find the existing form component
- The form uses a state library you're unfamiliar with (e.g., XState, Jotai) — confirm the pattern before guessing
- You see a CAPTCHA already wired (e.g. Turnstile, hCaptcha) — confirm whether to keep it
