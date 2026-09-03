interface ToolJsonLdProps {
  name: string;
  description: string;
  path: string;
}

/** Renders SoftwareApplication JSON-LD for a tool page, from its own metadata. */
export function ToolJsonLd({ name, description, path }: ToolJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name,
          description,
          url: `https://filespark.app${path}`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }),
      }}
    />
  );
}
