import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://airwavesc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Air Waves Comfort LLC | Miami's Premier HVAC Service",
    template: "%s | Air Waves Comfort LLC",
  },
  description:
    "Miami's most trusted HVAC company. AC repair, installation, maintenance & 24/7 emergency service. 15+ years of excellence across Miami-Dade & Broward. Licensed & insured — CAC1820880. Call (786) 362-3648.",
  applicationName: "Air Waves Comfort",
  keywords: [
    "HVAC Miami",
    "AC repair Miami",
    "air conditioning Miami",
    "emergency AC repair Miami",
    "AC installation Miami",
    "AC maintenance Miami",
    "commercial HVAC Miami",
    "indoor air quality Miami",
    "Hialeah HVAC",
    "Coral Gables AC repair",
    "Brickell air conditioning",
    "Miami Beach HVAC",
    "same-day AC service",
    "licensed HVAC contractor Miami",
  ],
  authors: [{ name: "Air Waves Comfort LLC" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Air Waves Comfort LLC | Miami's Premier HVAC Service",
    description:
      "Fast, reliable HVAC services across Miami-Dade. 24/7 emergency AC repair, installation & maintenance. Licensed & insured — CAC1820880.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_US"],
    url: SITE_URL,
    siteName: "Air Waves Comfort LLC",
    images: [
      {
        url: "/gallery/van-mansion.png",
        width: 1200,
        height: 630,
        alt: "Air Waves Comfort service van at a luxury Miami home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Waves Comfort LLC | Miami's Premier HVAC Service",
    description:
      "24/7 emergency AC repair, installation & maintenance across Miami-Dade. Licensed & insured.",
    images: ["/gallery/van-mansion.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logos.png",
    shortcut: "/logos.png",
    apple: "/logos.png",
  },
};

// LocalBusiness structured data — helps Google surface NAP, hours, ratings,
// and service area for local HVAC search.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Air Waves Comfort LLC",
  image: `${SITE_URL}/gallery/van-mansion.png`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+1-786-362-3648",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9802 NW 80 Ave Bay G48",
    addressLocality: "Hialeah Gardens",
    addressRegion: "FL",
    postalCode: "33016",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.8676,
    longitude: -80.3676,
  },
  areaServed: [
    "Miami",
    "Miami Beach",
    "Coral Gables",
    "Brickell",
    "Hialeah",
    "Doral",
    "Kendall",
    "Pinecrest",
    "Aventura",
    "Miami-Dade County",
    "Broward County",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "200",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HVAC Services",
    itemListElement: [
      "AC Repair",
      "AC Installation",
      "AC Maintenance",
      "Commercial HVAC",
      "Indoor Air Quality",
      "Emergency Service",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // Structured data must be injected as raw JSON
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
