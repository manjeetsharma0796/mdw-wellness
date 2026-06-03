import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  eyebrowIcon: LucideIcon;
  eyebrowLabel: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({
  eyebrowIcon: EyebrowIcon,
  eyebrowLabel,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--mdw-secondary)] px-3 py-1 text-xs font-medium text-white">
        <EyebrowIcon className="h-3.5 w-3.5" aria-hidden />
        {eyebrowLabel}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto max-w-xl text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
