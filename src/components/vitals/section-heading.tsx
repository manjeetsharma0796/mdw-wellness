import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "text-muted-foreground",
            align === "center" && "mx-auto max-w-xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
