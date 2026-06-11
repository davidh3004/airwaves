import { translations, type Lang } from "@/i18n/translations";
import type { SiteContent, SiteContentStore } from "@/types/site-content";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/default-gallery";

function buildDefault(lang: Lang): SiteContent {
  const t = translations[lang];
  return {
    nav: { ...t.nav },
    hero: { ...t.hero },
    trustBadges: t.trustBadges.map((b) => ({ ...b })),
    services: {
      ...t.services,
      items: t.services.items.map((item) => ({ ...item })),
    },
    gallery: {
      ...t.gallery,
      images: DEFAULT_GALLERY_IMAGES.map((img) => ({ ...img })),
    },
    comfort: {
      ...t.comfort,
      bullets: [...t.comfort.bullets],
      imageSrc: "/gallery/fleet-office-1.png",
      imageAlt:
        lang === "es"
          ? "Camionetas de servicio de Air Waves Comfort en un sitio comercial"
          : "Air Waves Comfort service vans at a commercial job site",
      stats: { ...t.comfort.stats },
    },
    emergency: { ...t.emergency },
    maintenance: {
      ...t.maintenance,
      plans: t.maintenance.plans.map((p) => ({
        ...p,
        features: [...p.features],
      })),
    },
    financing: {
      ...t.financing,
      perks: t.financing.perks.map((p) => ({ ...p })),
    },
    reviews: {
      ...t.reviews,
      items: t.reviews.items.map((r) => ({ ...r })),
    },
    areas: { ...t.areas },
    faq: {
      ...t.faq,
      items: t.faq.items.map((item) => ({ ...item })),
    },
    quote: { ...t.quote },
    cta: { ...t.cta },
    contact: {
      phone1: "(786) 362-3648",
      phone2: "(786) 424-2925",
      address: "9802 NW 80 Ave Bay G48\nHialeah Gardens, FL 33016",
      license: "CAC1820880",
    },
    footer: {
      ...t.footer,
      links: { ...t.footer.links },
      serviceLinks: { ...t.footer.serviceLinks },
    },
  };
}

export const DEFAULT_CONTENT: SiteContentStore = {
  en: buildDefault("en"),
  es: buildDefault("es"),
};

export function getDefaultContent(lang: Lang): SiteContent {
  return structuredClone(DEFAULT_CONTENT[lang]);
}
