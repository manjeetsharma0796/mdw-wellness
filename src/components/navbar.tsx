"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems } from "@/data/navigation";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            nativeButton={false}
            className="rounded-lg bg-[var(--mdw-accent-green)] px-5 text-white hover:bg-[var(--mdw-accent-green)]/90"
            render={<a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" />}
          >
            Book Now
          </Button>
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
            <SheetTitle className="px-6 pt-6 text-lg font-semibold">
              {siteConfig.name}
            </SheetTitle>
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
              <SheetClose
                nativeButton={false}
                render={
                  <Button
                    nativeButton={false}
                    className="mt-4 w-full rounded-lg bg-[var(--mdw-accent-green)] text-white hover:bg-[var(--mdw-accent-green)]/90"
                    render={<a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" />}
                  />
                }
              >
                Book Now
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
      <div className="absolute inset-x-0 bottom-0 h-px bg-primary/20" />
    </header>
  );
}
