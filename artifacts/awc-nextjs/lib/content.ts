/**
 * Content helpers — fetch site content from Supabase with fallback defaults.
 * All defaults are the production Air Waves Comfort content in English.
 * The admin panel can override any key in the `site_settings` table.
 */

import { getSupabase } from "@/lib/supabase";

const SERVICE_AREAS = [
  "Miami", "Miami Beach", "Coral Gables", "Coconut Grove", "Brickell",
  "Downtown Miami", "Wynwood", "Little Havana", "Hialeah", "Hialeah Gardens",
  "Doral", "Sweetwater", "Westchester", "Kendall", "Pinecrest",
  "South Miami", "Palmetto Bay", "Cutler Bay", "Homestead", "Miami Lakes",
  "Opa-locka", "North Miami", "North Miami Beach", "Aventura", "Sunny Isles Beach",
  "Bal Harbour", "Surfside", "Miami Gardens", "Miramar", "Pembroke Pines",
  "Hollywood", "Hallandale Beach", "Fort Lauderdale",
];

export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await getSupabase()
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

export async function getServiceAreas(): Promise<string[]> {
  return getSiteSetting<string[]>("service_areas", SERVICE_AREAS);
}

export async function getContactInfo() {
  return getSiteSetting("contact", {
    phone1: "(786) 362-3648",
    phone2: "(786) 424-2925",
    address: "9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016",
    website: "airwavesc.com",
    license: "CAC1820880",
  });
}
