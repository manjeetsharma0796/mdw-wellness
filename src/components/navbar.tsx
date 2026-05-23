"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/components/booking/booking-modal-provider";
import { useAuth } from "@/components/auth/auth-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openBookingModal } = useBookingModal();
  const { user, profile, signOut } = useAuth();

  const firstName =
    profile?.name?.trim().split(" ")[0] ?? user?.email?.split("@")[0] ?? "";
  const initial = (firstName || "U").charAt(0).toUpperCase();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        scrolled && "shadow-sm"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
      >
        <a
          href="https://www.mydawaiwala.com/"
          aria-label={`${siteConfig.name} home`}
          className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Image
            src="/assets/mdw-logo.svg"
            alt={siteConfig.name}
            width={120}
            height={48}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>

        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative rounded-md text-sm font-medium text-black transition-colors hover:bg-[#018bc4]/10 px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#018bc4] transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <Button
            onClick={() => openBookingModal()}
            className="rounded-lg bg-[var(--mdw-accent-green)] px-5 text-white hover:bg-[var(--mdw-accent-green)]/90"
          >
            Book Now
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                nativeButton={false}
                render={
                  <button
                    type="button"
                    aria-label="Account menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {initial}
                  </button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
                  <span className="text-sm font-semibold text-[var(--mdw-secondary)]">
                    {profile?.name || firstName}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground truncate">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void signOut()}
                  className="text-sm cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden" aria-label={open ? "Close menu" : "Open menu"}>
            <span className="relative h-8 w-8 flex items-center justify-center">
              <span
                className={cn(
                  "absolute block h-0.5 w-5 origin-center bg-[var(--mdw-secondary)] transition-transform duration-300",
                  open ? "translate-y-0 rotate-45" : "-translate-y-2"
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-5 bg-[var(--mdw-secondary)] transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-5 origin-center bg-[var(--mdw-secondary)] transition-transform duration-300",
                  open ? "translate-y-0 -rotate-45" : "translate-y-2"
                )}
              />
            </span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white sm:w-80 rounded-l-2xl shadow-2xl overflow-hidden">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            {user ? (
              <div className="border-b border-border px-6 pb-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--mdw-secondary)] truncate">
                      {profile?.name || firstName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <SheetClose
                  nativeButton={false}
                  render={
                    <button
                      type="button"
                      onClick={() => void signOut()}
                      className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-destructive"
                    >
                      <LogOut className="h-3.5 w-3.5" aria-hidden />
                      Sign out
                    </button>
                  }
                />
              </div>
            ) : (
              <div className="px-6 pt-6 text-lg font-semibold">
                {siteConfig.name}
              </div>
            )}
            <div className="mt-6 flex flex-col gap-1 px-4">
              {navItems.map((item) => (
                <SheetClose
                  key={item.label}
                  nativeButton={false}
                  render={
                    <a
                      href={item.href}
                      className="rounded-md px-2 py-2.5 text-base font-medium text-[var(--mdw-secondary)]/80 transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
              <SheetClose>
                <Button
                  onClick={() => openBookingModal()}
                  className="mt-4 w-full rounded-lg bg-[var(--mdw-accent-green)] text-white hover:bg-[var(--mdw-accent-green)]/90"
                >
                  Book Now
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
      <div className="absolute inset-x-0 bottom-0 h-px bg-primary/20" />
    </header>
  );
}
