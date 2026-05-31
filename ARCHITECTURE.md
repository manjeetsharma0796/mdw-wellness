# MyDawaiWala — Architecture Overview

> **Read this before touching anything that crosses repo boundaries.**
> Companion to [`BACKEND_INTEGRATION.md`](./BACKEND_INTEGRATION.md), which
> is task-specific. This file is the bird's-eye view: what every system
> is, what it owns, who talks to whom, and where data lives.

---

## The three systems

The MyDawaiWala product is **three separate deployments** that together
form one experience. They are NOT a monorepo. They live in three
different GitHub repos, deploy to two different platforms, and have
different audiences.

```
                   ┌─────────────────────────────────┐
                   │ MONGODB ATLAS                   │
                   │ (single source of truth for     │
                   │  appointments, doctors, users)  │
                   └────────────────┬────────────────┘
                                    ▲
                                    │ Mongoose ODM
                                    │
            ┌───────────────────────┴───────────────────────┐
            │                                               │
            │ WELLNESS BACKEND (Express 5 + Mongoose 8)     │
            │ Repo:  MyDawaiWala10/WellnessBackend          │
            │ Host:  Render                                 │
            │ URL:   wellnessbackend-8fxe.onrender.com      │
            │ Owns:  /api/users, /api/appointments,         │
            │        /api/therapist, /api/metrics           │
            │                                               │
            └────────────┬──────────────────────┬───────────┘
                         │                      │
              JWT cookie │                      │ NEW: public no-auth
                   auth  │                      │ POST endpoint
                         │                      │
        ┌────────────────┴────────┐     ┌───────┴──────────────────────┐
        │                         │     │                              │
        │ DASHBOARD (Next.js 16)  │     │ PUBLIC SITE (Next.js, this   │
        │ Back-office team app    │     │ repo — C:\workspace\mdw)     │
        │ Repo: WellnessFrontend  │     │ Repo: mdw-wellness           │
        │ Host: Vercel            │     │ Host: Vercel                 │
        │                         │     │ URL:  mdw-wellness.          │
        │ Audience:               │     │       vercel.app             │
        │   - Owner               │     │                              │
        │   - Admin               │     │ Audience:                    │
        │   - Customer Care       │     │   - Patients (anon)          │
        │   - Therapists          │     │   - Returning users (auth    │
        │                         │     │     via Supabase)            │
        │ Reads & writes:         │     │                              │
        │   - All appointments    │     │ Reads: Supabase (its own DB) │
        │   - Therapist directory │     │ Writes: Wellness Backend's   │
        │   - Staff users         │     │         MongoDB (via the     │
        │   - Analytics           │     │         /public POST)        │
        │                         │     │         + Supabase for its   │
        │                         │     │         own features         │
        └─────────────────────────┘     └──────────────────────────────┘
```

---

## What each system owns

### 1. Wellness Backend (`MyDawaiWala10/WellnessBackend` on Render)

**Owns:** the single source of truth for all booking/appointment data,
the therapist directory, and back-office staff user accounts.

**Database:** MongoDB Atlas, collection names auto-pluralized by Mongoose:
- `appointmentbookings` — every enquiry, consultation, and physio
  session lives here. **The booking form in THIS repo writes here.**
- `doctors` — therapist directory
- `users` — back-office staff accounts (NOT patient accounts)
- `counters` — atomic sequence counter for enquiry IDs (`ENQ-NNNN`)

**API endpoints** (all under `https://wellnessbackend-8fxe.onrender.com`):

| Method | Path | Auth | Who uses it |
|---|---|---|---|
| `POST` | `/api/appointments/public` | **None** (rate-limited) | **This repo — the booking form** |
| `POST` | `/api/appointments` | JWT cookie | Dashboard only |
| `GET` | `/api/appointments` | JWT cookie | Dashboard only |
| `PUT` | `/api/appointments/:id` | JWT cookie | Dashboard only |
| `DELETE` | `/api/appointments/:id` | JWT cookie | Dashboard only |
| `POST/GET/PUT/DELETE` | `/api/therapist*` | JWT cookie | Dashboard only |
| `POST/GET` | `/api/users*` | JWT cookie | Dashboard only |
| `GET` | `/api/metrics` | JWT cookie | Dashboard only |

**This repo only touches one endpoint: `POST /api/appointments/public`.**

### 2. Dashboard (`MyDawaiWala10/WellnessFrontend` on Vercel)

**Owns:** the back-office UI. The screens at `/dashboard/enquiries`,
`/dashboard/appointments`, `/dashboard/alltherapist`, `/dashboard/settings`.

**Audience:** owner, admin, customer-care staff, therapists. They log in
with their staff account.

**Reads/writes:** Goes through the wellness backend's JWT-authenticated
endpoints. Has no direct DB access.

**Relevant to this repo:** the dashboard is the **destination** of
every booking. When a customer submits the form on THIS site, the
record lands in MongoDB and shows up on the dashboard's
`/dashboard/enquiries` page within ~5 minutes (React Query
polling). The dashboard team takes it from there.

### 3. Public site (THIS repo, `mdw-wellness` on Vercel)

**Owns:** the customer-facing experience — landing page, services info,
the "Book your session" form, optional account features
(via Supabase auth).

**Two distinct data stores it touches:**

| Data | Where it goes | Why |
|---|---|---|
| **Bookings / enquiries** (from the form) | **Wellness Backend → MongoDB** | Single source of truth for the business. The dashboard team works these. |
| Patient accounts (sign in / sign up) | **Supabase** | Used for "Save your details for next time" — separate concept from booking. Patient accounts are NOT staff accounts. |
| Marketing content, blog posts, etc. | This repo (static) or Supabase | Whatever's already wired |

**Important:** patient account data in Supabase is **not synced** to the
wellness backend's `users` collection. They're different identities.

---

## Data flow — the booking lifecycle

This is the only cross-system flow you (the agent) will be implementing.
Read this carefully.

```
┌──────────────────────────────────────────────────────────────────┐
│ Step 1: Customer (Anita) lands on mdw-wellness.vercel.app        │
│         Fills "Book your session" form: name, phone, email,      │
│         city, service type, preferred time, message              │
└──────────────────────────────┬───────────────────────────────────┘
                               │ clicks "Book on WhatsApp"
                               ▼
            ┌──────────────────────────────────────┐
            │ Step 2: Form submit handler does     │
            │ TWO things in parallel               │
            └──────────────────────────────────────┘
                    │                      │
        ┌───────────┴────────┐    ┌────────┴───────────────────┐
        ▼                    ▼    ▼                            ▼
┌───────────────────┐    ┌──────────────────────────────────────────┐
│ Step 3a:          │    │ Step 3b: Submit POST to                  │
│ window.open(      │    │   https://wellnessbackend-8fxe           │
│   `wa.me/...`     │    │   .onrender.com/api/appointments/public  │
│ )                 │    │                                          │
│                   │    │ Body shape (see BACKEND_INTEGRATION.md   │
│ Customer's        │    │ for the exact mapping):                  │
│ WhatsApp opens    │    │   {                                      │
│ with pre-filled   │    │     name, phonenumber (Number),          │
│ message           │    │     email, location, typeOfappointment,  │
│                   │    │     preferredReachOutTime: {from, to},   │
│                   │    │     note, status:"enquiry", source:      │
│                   │    │     "public_booking_form"                │
│                   │    │   }                                      │
└───────────────────┘    └────────────────┬─────────────────────────┘
                                          │
                                          ▼
                          ┌─────────────────────────────────────────┐
                          │ Step 4: Backend validates + stores      │
                          │   - Allocates ENQ-NNNN (sequential)     │
                          │   - Checks for duplicate open phone     │
                          │   - Inserts into appointmentbookings    │
                          │   - Returns 201 with { enquiryId }      │
                          └────────────────┬────────────────────────┘
                                           │
                                           ▼
                          ┌─────────────────────────────────────────┐
                          │ Step 5: Mongo write completes           │
                          └────────────────┬────────────────────────┘
                                           │
                                           │  (asynchronously,
                                           │  next time dashboard
                                           │  refetches — within
                                           │  5 min staleTime)
                                           ▼
                          ┌─────────────────────────────────────────┐
                          │ Step 6: Dashboard's React Query refetch │
                          │   - Anita shows up in "Needs first      │
                          │     contact" section                    │
                          │   - Customer-care staff calls her,      │
                          │     ticks "Mark as reached out"         │
                          │   - Funnel proceeds through dashboard   │
                          └─────────────────────────────────────────┘
```

### What "this repo" sees and doesn't see

- ✅ Customer's form data (before submit)
- ✅ Backend's response (success / failure + enquiryId)
- ❌ Anything that happens on the dashboard after submission
- ❌ Whether anyone has called Anita yet
- ❌ Whether her booking was completed or cancelled

**The public site is fire-and-forget after the POST.** The backend and
dashboard handle everything downstream.

---

## Where customer information lives (and where it doesn't)

If you're wondering "where do I save X", here's the cheat-sheet:

| Customer data | Lives in | Set how |
|---|---|---|
| Their name | Wellness Backend MongoDB | Via the form's POST to `/api/appointments/public` |
| Their phone | Wellness Backend MongoDB | Same |
| Their email | Wellness Backend MongoDB | Same |
| Their preferred time, service, message, city | Wellness Backend MongoDB | Same |
| Their **patient account credentials** (if they sign up) | Supabase | Via existing Supabase auth flows in this repo |
| Their **booking history** (if they log in and want to see it) | Wellness Backend MongoDB | Future feature — would need a new lookup endpoint by phone or email |

**You (the agent in this repo) write customer booking data exactly once
per submission: a single `POST /api/appointments/public` call.** That's
it. You do NOT write booking data to Supabase. You do NOT cache it
elsewhere. The backend's MongoDB is the single source of truth.

---

## Sanity checks for the agent before you start coding

Run through these mentally:

1. **Where does a new booking land?** → Wellness Backend MongoDB
   (`appointmentbookings` collection), NOT Supabase
2. **Where does the agent's code change live?** → THIS repo only (plus
   one small PR on the WellnessBackend repo for the new public endpoint,
   which the human owner will coordinate or hand to a separate agent)
3. **Who reads the bookings after submission?** → The dashboard team via
   `MyDawaiWala10/WellnessFrontend`, NOT this repo
4. **Does this repo need to display booking status back to the customer?**
   → Not in this scope. Future feature.
5. **What does Supabase get?** → Nothing new from this work. Supabase
   continues to handle whatever it was handling (likely patient auth,
   maybe a CMS).
6. **What's the auth surface for the public POST endpoint?** → None.
   Anyone with the URL can submit. Rate-limit + CAPTCHA (future) are the
   only defenses.

---

## Cross-references

- **What to actually build:** [`BACKEND_INTEGRATION.md`](./BACKEND_INTEGRATION.md)
  in this same directory. Full code samples, field mappings, env vars.
- **Engineering reference for the Wellness Backend:** lives in that
  repo at `WellnessBackend/docs/README.md`. Useful if you need to dig
  into the API or model structure.
- **Owner guide for the dashboard:** lives in the dashboard repo at
  `WellnessFrontend/docs/team/owner-guide.md`. Useful if you want to
  understand what the executive team does with the data after it's
  submitted.

---

## Common confusion points

> **"Should I store the booking in Supabase too as a fallback?"**
> No. The wellness backend's MongoDB is the source of truth. If the
> POST fails, surface the error to the user (toast) and let them
> retry via WhatsApp. Don't dual-write.

> **"Should I add the customer to Supabase auth on form submit?"**
> No. Form submission is anonymous by default. The "Save your details
> for next time? Sign in / Sign up" link is a SEPARATE flow that
> customers opt into. Don't auto-create accounts.

> **"Should I sync Supabase patient accounts to the wellness backend?"**
> No, not in this scope. Future feature if/when patient login becomes
> central. For now, the two systems are independent.

> **"Where do I put the WhatsApp number?"**
> Env var `NEXT_PUBLIC_WHATSAPP_NUMBER` in this repo's `.env.local` +
> Vercel. NOT in the wellness backend.

> **"The wellness backend has a `users` endpoint — should I use that
> for patient accounts?"**
> No. That `users` endpoint is for back-office STAFF accounts (admins,
> therapists, customer-care). Patients have nothing to do with it.

> **"What if the backend POST takes 30 seconds (Render cold start)?"**
> Show a "Submitting…" state in the button. If it times out, surface a
> friendly error and let the user retry — but don't fail the WhatsApp
> open. WhatsApp must always succeed; backend POST is best-effort.
