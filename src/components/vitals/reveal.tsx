"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Subtle scroll-reveal wrapper (fade + rise). Honors prefers-reduced-motion.
 * Used to stagger grid/list children on the vitals page.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        shouldReduce ? undefined : { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
