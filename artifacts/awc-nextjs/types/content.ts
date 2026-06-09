export interface HeroContent {
  tag: string;
  headline: string;
  subheadline: string;
  ctaEstimate: string;
  ctaEmergency: string;
}

export interface TrustBadge {
  label: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

export interface GalleryItem {
  src: string;
  alt: string;
  label: string;
}

export interface MaintenancePlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone1: string;
  phone2: string;
  address: string;
  website: string;
  license: string;
}

export interface SiteContent {
  hero: HeroContent;
  trustBadges: TrustBadge[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  maintenancePlans: MaintenancePlan[];
  reviews: Review[];
  serviceAreas: string[];
  faq: FaqItem[];
  contact: ContactInfo;
}

export interface QuoteSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message?: string;
  lang: "en" | "es";
  created_at?: string;
}
