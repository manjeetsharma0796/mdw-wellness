import type { LegalBlock, LegalDocument } from "@/data/legal/types";

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, idx) => {
        if (block.kind === "paragraph") {
          return (
            <p
              key={idx}
              className="text-[15px] leading-7 text-foreground md:text-base md:leading-7"
            >
              {block.text}
            </p>
          );
        }

        if (block.kind === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          const listClass = block.ordered
            ? "list-decimal pl-6 space-y-1.5"
            : "list-disc pl-6 space-y-1.5";
          return (
            <ListTag
              key={idx}
              className={`${listClass} text-[15px] leading-7 text-foreground marker:text-[var(--mdw-secondary)] md:text-base`}
            >
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ListTag>
          );
        }

        // subsection
        return (
          <section key={idx} className="space-y-3">
            <h3 className="text-base font-semibold text-[var(--mdw-secondary)] md:text-lg">
              {block.label}. {block.title}
            </h3>
            <div className="space-y-3 pl-4 border-l-2 border-[var(--mdw-secondary-soft)]">
              <Blocks blocks={block.body} />
            </div>
          </section>
        );
      })}
    </>
  );
}

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <header className="border-b border-[var(--mdw-secondary-soft)] pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective Date: {doc.effectiveDate}
        </p>
      </header>

      <div className="mt-8 space-y-4">
        {doc.intro.map((para, i) => (
          <p
            key={i}
            className="text-[15px] leading-7 text-foreground md:text-base md:leading-7"
          >
            {para}
          </p>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {doc.sections.map((section) => (
          <section key={section.number} className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-2xl">
              {section.number}. {section.title}
            </h2>
            <div className="space-y-4">
              <Blocks blocks={section.body} />
            </div>
          </section>
        ))}
      </div>

      {doc.contact ? (
        <section className="mt-12 rounded-2xl border border-[var(--mdw-secondary-soft)] bg-[color:var(--mdw-secondary-soft)]/30 p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--mdw-secondary)] md:text-2xl">
            Contact &amp; Grievance Details
          </h2>
          <dl className="mt-4 grid gap-3 text-[15px] leading-6 md:text-base">
            <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
              <dt className="font-medium text-[var(--mdw-secondary)]">
                Legal Entity
              </dt>
              <dd className="text-foreground">{doc.contact.legalEntity}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
              <dt className="font-medium text-[var(--mdw-secondary)]">Brand</dt>
              <dd className="text-foreground">{doc.contact.brand}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
              <dt className="font-medium text-[var(--mdw-secondary)]">
                Registered Address
              </dt>
              <dd className="text-foreground">{doc.contact.address}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
              <dt className="font-medium text-[var(--mdw-secondary)]">
                Support Number
              </dt>
              <dd className="text-foreground">
                <a
                  href={`tel:${doc.contact.supportPhone.replace(/\s/g, "")}`}
                  className="hover:underline"
                >
                  {doc.contact.supportPhone}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
              <dt className="font-medium text-[var(--mdw-secondary)]">
                Support Email
              </dt>
              <dd className="text-foreground">
                <a
                  href={`mailto:${doc.contact.supportEmail}`}
                  className="hover:underline"
                >
                  {doc.contact.supportEmail}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
              <dt className="font-medium text-[var(--mdw-secondary)]">
                Grievance Email
              </dt>
              <dd className="text-foreground">
                <a
                  href={`mailto:${doc.contact.grievanceEmail}`}
                  className="hover:underline"
                >
                  {doc.contact.grievanceEmail}
                </a>
              </dd>
            </div>
          </dl>
        </section>
      ) : null}
    </article>
  );
}
