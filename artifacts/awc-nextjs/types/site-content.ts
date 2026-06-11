import type { Lang } from "@/i18n/translations";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

/** Full editable site copy for one language (EN or ES). */
export interface SiteContent {
  nav: {
    services: string;
    gallery: string;
    maintenance: string;
    financing: string;
    reviews: string;
    faq: string;
    scheduleService: string;
    call: string;
  };
  hero: {
    scroll: string;
    tag: string;
    headline: string;
    subheadline: string;
    ctaEstimate: string;
    ctaEmergency: string;
  };
  trustBadges: { label: string }[];
  services: {
    label: string;
    heading: string;
    body: string;
    learnMore: string;
    items: {
      title: string;
      description: string;
      highlight?: boolean;
    }[];
  };
  gallery: {
    heading: string;
    body: string;
    images: GalleryImage[];
  };
  comfort: {
    label: string;
    heading: string;
    body: string;
    bullets: string[];
    imageSrc: string;
    imageAlt: string;
    stats: {
      years: string;
      clients: string;
      emergency: string;
      satisfaction: string;
    };
  };
  emergency: {
    badge: string;
    heading: string;
    body: string;
  };
  maintenance: {
    label: string;
    heading: string;
    body: string;
    mostPopular: string;
    choose: string;
    plans: {
      name: string;
      description: string;
      features: string[];
      highlight?: boolean;
    }[];
  };
  financing: {
    label: string;
    heading: string;
    body: string;
    cta: string;
    disclaimer: string;
    perks: { title: string; description: string }[];
  };
  reviews: {
    label: string;
    heading: string;
    body: string;
    items: {
      name: string;
      location: string;
      text: string;
      rating: number;
    }[];
  };
  areas: {
    label: string;
    heading: string;
    body: string;
    hq: string;
    notFound: string;
  };
  faq: {
    label: string;
    heading: string;
    items: { question: string; answer: string }[];
  };
  quote: {
    label: string;
    heading: string;
    body: string;
    labelName: string;
    labelPhone: string;
    labelEmail: string;
    labelService: string;
    labelMessage: string;
    placeholderName: string;
    placeholderPhone: string;
    placeholderEmail: string;
    placeholderService: string;
    placeholderMessage: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    disclaimer: string;
    errorGeneric: string;
  };
  cta: {
    heading: string;
    body: string;
    schedule: string;
    call: string;
  };
  contact: {
    phone1: string;
    phone2: string;
    address: string;
    license: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    ourServices: string;
    contactUs: string;
    emergencyLine: string;
    office: string;
    address: string;
    license: string;
    privacy: string;
    terms: string;
    rights: string;
    links: {
      services: string;
      gallery: string;
      maintenance: string;
      reviews: string;
      faq: string;
    };
    serviceLinks: {
      repair: string;
      installation: string;
      maintenance: string;
      commercial: string;
      iaq: string;
      emergency: string;
    };
  };
}

export type SiteContentStore = Record<Lang, SiteContent>;

export function contentKey(lang: Lang): string {
  return `content_${lang}`;
}
