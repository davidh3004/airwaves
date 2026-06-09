import { type IRouter, Router } from "express";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetContentResponse, SiteContent } from "@workspace/api-zod";

const router: IRouter = Router();

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    tag: "Miami's Premier Climate Control",
    headline: "Where Experience Meets Cool.",
    subheadline: "Miami's Most Trusted HVAC Service — 15+ Years of Excellence.",
    ctaEstimate: "Get a Free Estimate",
    ctaEmergency: "Emergency Service",
  },
  trustBadges: [
    { label: "15+ Years Experience" },
    { label: "Licensed & Insured" },
    { label: "5-Star Rated" },
    { label: "Same-Day Service" },
    { label: "Financing Available" },
  ],
  services: [
    {
      title: "AC Repair",
      description: "Fast, reliable diagnostics and repair to get your system cooling again.",
      icon: "Wrench",
    },
    {
      title: "AC Installation",
      description: "Premium high-efficiency system replacements with expert sizing.",
      icon: "ThermometerSun",
    },
    {
      title: "AC Maintenance",
      description: "Preventative tune-ups to extend lifespan and lower energy bills.",
      icon: "PenTool",
    },
    {
      title: "Commercial HVAC",
      description: "Heavy-duty solutions for Miami businesses and industrial spaces.",
      icon: "Building2",
    },
    {
      title: "Indoor Air Quality",
      description: "Advanced filtration and UV purification for healthier breathing.",
      icon: "Wind",
    },
    {
      title: "Emergency Service",
      description: "24/7 rapid response when you need cooling the most.",
      icon: "AlertTriangle",
      highlight: true,
    },
  ],
  gallery: [
    {
      src: "/gallery/vans-back.jpeg",
      alt: "Air Waves Comfort service vans",
      label: "Our Fleet",
    },
    {
      src: "/gallery/van-close.jpeg",
      alt: "Air Waves Comfort van — brand partners",
      label: "Brand Partners: Trane, Daikin, Rheem, York, Goodman",
    },
    {
      src: "/gallery/commercial-1.jpeg",
      alt: "Commercial HVAC service van at client building",
      label: "Commercial Projects",
    },
    {
      src: "/gallery/commercial-2.jpeg",
      alt: "Two service vans at commercial location",
      label: "Full-Service Commercial HVAC",
    },
    {
      src: "/gallery/commercial-3.jpeg",
      alt: "Air Waves Comfort fleet at commercial building",
      label: "Miami & South Florida Coverage",
    },
    {
      src: "/gallery/goodman-unit.jpeg",
      alt: "Goodman AC unit installation",
      label: "Expert AC Installations",
    },
  ],
  maintenancePlans: [
    {
      name: "Basic Care",
      price: "15",
      period: "/mo",
      description: "Essential preventative maintenance for a single system.",
      features: [
        "2 Maintenance Visits/Year",
        "Standard Filter Replacement",
        "Condenser Coil Cleaning",
        "System Performance Check",
        "5% Off Repairs",
      ],
    },
    {
      name: "Comfort Plus",
      price: "25",
      period: "/mo",
      description: "Comprehensive coverage and priority service for ultimate peace of mind.",
      features: [
        "2 Maintenance Visits/Year",
        "Premium Filter Replacement",
        "Deep Coil & Blower Cleaning",
        "Priority Scheduling (24hr)",
        "No Emergency Fees",
        "15% Off Repairs",
      ],
      highlight: true,
    },
    {
      name: "Premium Elite",
      price: "45",
      period: "/mo",
      description: "The ultimate white-glove service for multiple systems or large homes.",
      features: [
        "4 Maintenance Visits/Year",
        "HEPA Filter Replacements",
        "Duct Inspection & Sanitization",
        "VIP Front-of-Line Service",
        "No Emergency Fees",
        "20% Off Repairs",
        "Annual IAQ Assessment",
      ],
    },
  ],
  reviews: [
    {
      name: "Maria Rodriguez",
      location: "Coral Gables",
      text: "My AC died on a Sunday in July. Air Waves Comfort was here within 2 hours. The technician was incredibly professional, wore shoe covers, and fixed the capacitor quickly. Worth every penny.",
      rating: 5,
    },
    {
      name: "James Chen",
      location: "Brickell",
      text: "Replaced our entire 15-year-old system. The sales process was zero pressure, pricing was transparent, and the installation crew left my condo cleaner than they found it.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      location: "Pinecrest",
      text: "I've been using their Comfort Plus maintenance plan for 3 years. My electric bills are lower, and the system runs perfectly. It's so refreshing to find an honest HVAC company in Miami.",
      rating: 5,
    },
    {
      name: "David Alverez",
      location: "Coconut Grove",
      text: "Called them for a second opinion after another company told me I needed a whole new unit. Air Waves fixed a minor leak and recharged the freon. Saved me thousands.",
      rating: 5,
    },
    {
      name: "Elena Thompson",
      location: "Aventura",
      text: "Top-tier service from start to finish. The office staff is communicative, dispatch lets you know when they are arriving, and the techs are experts.",
      rating: 5,
    },
    {
      name: "Michael Torres",
      location: "Miami Beach",
      text: "They installed a new high-efficiency system and a whole-home UV purifier. The air quality difference in our home is night and day. Highly recommend Air Waves.",
      rating: 5,
    },
  ],
  serviceAreas: [
    "Coral Gables",
    "Brickell",
    "Pinecrest",
    "Coconut Grove",
    "Aventura",
    "Miami Beach",
    "Kendall",
    "Doral",
    "South Miami",
    "Key Biscayne",
    "Sunny Isles",
    "Palmetto Bay",
  ],
  faq: [
    {
      question: "How quickly can you respond to an AC emergency?",
      answer: "We offer 24/7 emergency repair services. In most cases, we can dispatch a technician to your home within hours of your call. We prioritize complete system failures, especially during extreme heat.",
    },
    {
      question: "How often should I have my AC system serviced?",
      answer: "In Miami's demanding climate, we strongly recommend preventative maintenance twice a year—ideally in the spring before the intense summer heat, and in the fall. Regular maintenance prevents up to 80% of unexpected breakdowns.",
    },
    {
      question: "Do you offer financing for new AC installations?",
      answer: "Yes, we offer flexible financing options with approved credit, including 0% APR for up to 60 months. We handle the application process instantly to get you cooling as soon as possible.",
    },
    {
      question: "What brands of equipment do you install?",
      answer: "We install premium, high-efficiency equipment from top manufacturers like Carrier, Trane, and Lennox. We match the specific brand and model to your home's unique requirements rather than pushing a one-size-fits-all solution.",
    },
    {
      question: "How do I know if I need a repair or a full replacement?",
      answer: "Generally, if your system is over 10-12 years old, uses R-22 Freon, or requires a repair that costs more than a third of a new system, replacement is more cost-effective. Our technicians provide honest, data-driven assessments without high-pressure sales tactics.",
    },
    {
      question: "Are your technicians licensed and insured?",
      answer: "Absolutely. We are fully licensed (CAC1820880) and insured. Our technicians are NATE-certified, undergo rigorous background checks, and receive ongoing training on the latest HVAC technologies.",
    },
  ],
  contact: {
    phone1: "(786) 362-3648",
    phone2: "(786) 362-3648",
    address: "Miami, FL 33173",
    website: "www.airwavescomfort.com",
    license: "#CAC1820880",
  },
};

router.get("/content", async (_req, res): Promise<void> => {
  const rows = await db.select().from(siteSettingsTable);
  const content = { ...DEFAULT_CONTENT };

  for (const row of rows) {
    if (row.key in content) {
      (content as any)[row.key] = row.value;
    }
  }

  res.json(GetContentResponse.parse(content));
});

export default router;
