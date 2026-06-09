import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Air Waves Comfort LLC | Miami's Premier HVAC Service",
  description:
    "Miami's most trusted HVAC company. AC repair, installation, maintenance & emergency service. 15+ years of excellence in Miami-Dade and Broward. Call (786) 362-3648.",
  keywords: [
    "HVAC Miami",
    "AC repair Miami",
    "air conditioning Miami",
    "emergency AC service",
    "AC installation Miami",
    "Hialeah HVAC",
    "Coral Gables AC",
    "Brickell air conditioning",
  ],
  openGraph: {
    title: "Air Waves Comfort LLC | Miami's Premier HVAC Service",
    description:
      "Fast, reliable HVAC services across Miami-Dade. Emergency AC repair, installation & maintenance. Licensed & insured — CAC1820880.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
