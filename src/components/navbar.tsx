"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-white/70 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#home" className="text-xl font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            className="rounded-lg bg-[var(--mdw-accent-green)] px-5 text-white hover:bg-[var(--mdw-accent-green)]/90"
          >
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <SheetTitle className="px-6 pt-6 text-lg font-semibold">
              {siteConfig.name}
            </SheetTitle>
            <div className="mt-6 flex flex-col gap-1 px-4">
              {navItems.map((item) => (
                <SheetClose key={item.label} asChild>
                  <a
                    href={item.href}
                    className="rounded-md px-2 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button
                  asChild
                  className="mt-4 w-full rounded-lg bg-[var(--mdw-accent-green)] text-white hover:bg-[var(--mdw-accent-green)]/90"
                >
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
