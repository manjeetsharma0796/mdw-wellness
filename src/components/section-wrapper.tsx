"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={shouldReduce ? undefined : { duration: 0.6, ease: "easeOut" }}
      className={cn("px-4 py-12 md:px-8 md:py-20", className)}
    >
      {children}
    </motion.section>
  );
}
