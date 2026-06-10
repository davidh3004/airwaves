import fs from "fs/promises";
import path from "path";
import type { Lang } from "@/i18n/translations";
import type { SiteContent, SiteContentStore } from "@/types/site-content";
import { contentKey } from "@/types/site-content";
import { getDefaultContent, DEFAULT_CONTENT } from "@/lib/default-content";
import { deepMerge } from "@/lib/deep-merge";
import { createServiceClient } from "@/lib/supabase";

const CMS_FILE = path.join(process.cwd(), "cms", "content.json");

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return (
    url.length > 0 &&
    !url.includes("your-project") &&
    key.length > 0 &&
    key !== "your-service-role-key"
  );
}

async function readFileStore(): Promise<Partial<SiteContentStore>> {
  try {
    const raw = await fs.readFile(CMS_FILE, "utf8");
    return JSON.parse(raw) as Partial<SiteContentStore>;
  } catch {
    return {};
  }
}

async function writeFileStore(store: SiteContentStore): Promise<void> {
  await fs.mkdir(path.dirname(CMS_FILE), { recursive: true });
  await fs.writeFile(CMS_FILE, JSON.stringify(store, null, 2), "utf8");
}

async function loadPatch(lang: Lang): Promise<Partial<SiteContent> | null> {
  const key = contentKey(lang);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .single();
      if (!error && data?.value) {
        return data.value as Partial<SiteContent>;
      }
    } catch {
      /* fall through to file store */
    }
  }

  const fileStore = await readFileStore();
  return fileStore[lang] ?? null;
}

/** Resolved content for one language (defaults + saved overrides). */
export async function getSiteContent(lang: Lang): Promise<SiteContent> {
  const patch = await loadPatch(lang);
  if (!patch) return getDefaultContent(lang);
  return deepMerge(getDefaultContent(lang), patch);
}

/** Both languages — for admin editor. */
export async function getAllSiteContent(): Promise<SiteContentStore> {
  const [en, es] = await Promise.all([
    getSiteContent("en"),
    getSiteContent("es"),
  ]);
  return { en, es };
}

export async function saveSiteContent(
  lang: Lang,
  content: SiteContent,
): Promise<void> {
  const key = contentKey(lang);

  if (isSupabaseConfigured()) {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value: content }, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return;
  }

  const fileStore = await readFileStore();
  const merged: SiteContentStore = {
    en: fileStore.en
      ? deepMerge(DEFAULT_CONTENT.en, fileStore.en)
      : DEFAULT_CONTENT.en,
    es: fileStore.es
      ? deepMerge(DEFAULT_CONTENT.es, fileStore.es)
      : DEFAULT_CONTENT.es,
  };
  merged[lang] = content;
  await writeFileStore(merged);
}
