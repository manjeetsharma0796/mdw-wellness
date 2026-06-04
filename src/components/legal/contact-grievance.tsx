import type { LegalContact } from "@/data/legal/types";

interface Row {
  label: string;
  value: React.ReactNode;
}

export function ContactGrievance({
  contact,
  className,
}: {
  contact: LegalContact;
  className?: string;
}) {
  const rows: Row[] = [
    { label: "Legal Entity", value: contact.legalEntity },
    { label: "Brand", value: contact.brand },
    { label: "Registered Address", value: contact.address },
    {
      label: "Support Number",
      value: (
        <a
          href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
          className="hover:underline"
        >
          {contact.supportPhone}
        </a>
      ),
    },
    {
      label: "Support Email",
      value: (
        <a href={`mailto:${contact.supportEmail}`} className="hover:underline">
          {contact.supportEmail}
        </a>
      ),
    },
    {
      label: "Grievance Email",
      value: (
        <a
          href={`mailto:${contact.grievanceEmail}`}
          className="hover:underline"
        >
          {contact.grievanceEmail}
        </a>
      ),
    },
  ];

  return (
    <section
      className={
        "rounded-2xl border border-[var(--mdw-secondary-soft)] bg-[color:var(--mdw-secondary-soft)]/30 p-6 md:p-8 " +
        (className ?? "")
      }
    >
      <h2 className="text-xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-2xl">
        Contact &amp; Grievance Details
      </h2>
      <dl className="mt-4 grid gap-3 text-[15px] leading-6 md:text-base">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 sm:grid-cols-[180px_1fr]">
            <dt className="font-medium text-[var(--mdw-secondary)]">
              {row.label}
            </dt>
            <dd className="text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
