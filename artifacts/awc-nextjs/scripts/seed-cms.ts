/**
 * Push latest default gallery + contact into Supabase CMS.
 * Usage (from artifacts/awc-nextjs): pnpm run seed:cms
 */
import fs from "fs";
import path from "path";
import type { Lang } from "@/i18n/translations";
import { contentKey, type SiteContent } from "@/types/site-content";
import { getDefaultContent } from "@/lib/default-content";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/default-gallery";
import { deepMerge } from "@/lib/deep-merge";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

function configured(): boolean {
  return (
    SUPABASE_URL.length > 0 &&
    !SUPABASE_URL.includes("your-project") &&
    SERVICE_KEY.length > 0 &&
    SERVICE_KEY !== "your-service-role-key"
  );
}

async function fetchSaved(lang: Lang): Promise<Partial<SiteContent> | null> {
  const key = contentKey(lang);
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/site_settings?key=eq.${encodeURIComponent(key)}&select=value`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Fetch ${key} failed: ${res.status}`);
  const rows = (await res.json()) as { value: SiteContent }[];
  return rows[0]?.value ?? null;
}

async function upsertContent(lang: Lang, content: SiteContent): Promise<void> {
  const key = contentKey(lang);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_settings`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ key, value: content }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upsert ${key} failed: ${res.status} ${text}`);
  }
}

function buildUpdated(lang: Lang, saved: Partial<SiteContent> | null): SiteContent {
  const defaults = getDefaultContent(lang);
  const current = saved ? deepMerge(defaults, saved) : defaults;

  return {
    ...current,
    gallery: {
      ...current.gallery,
      images: DEFAULT_GALLERY_IMAGES.map((img) => ({ ...img })),
    },
    contact: { ...defaults.contact },
    comfort: {
      ...current.comfort,
      imageSrc: defaults.comfort.imageSrc,
      imageAlt: defaults.comfort.imageAlt,
    },
  };
}

async function main() {
  if (!configured()) {
    console.error("Supabase is not configured. Set env vars in .env.local first.");
    process.exit(1);
  }

  for (const lang of ["en", "es"] as Lang[]) {
    const saved = await fetchSaved(lang);
    const updated = buildUpdated(lang, saved);
    await upsertContent(lang, updated);
    console.log(
      `✓ ${lang}: saved ${updated.gallery.images.length} gallery images + contact info`,
    );
  }

  console.log("\nDone. Refresh the site or admin panel to see changes.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
