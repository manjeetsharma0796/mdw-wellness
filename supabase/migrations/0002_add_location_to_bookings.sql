-- Add a free-text location column to bookings so guest enquiries record
-- the customer's city / area. Required at the form level for Home Therapy
-- and Vitals Check; the back-office team needs it for dispatch.
--
-- Run this in Supabase Dashboard -> SQL Editor -> New Query, then click Run.

alter table public.bookings
  add column if not exists location text;
