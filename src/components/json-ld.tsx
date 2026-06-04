/**
 * Renders a JSON-LD structured-data script tag.
 * Server component — safe to drop into any page/layout.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe structured data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
