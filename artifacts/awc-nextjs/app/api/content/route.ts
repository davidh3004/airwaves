import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/cms";
import type { Lang } from "@/i18n/translations";

/**
 * GET /api/content?lang=en|es
 * Public — returns merged site copy for the requested language.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");

  if (lang !== "en" && lang !== "es") {
    return NextResponse.json(
      { error: "lang query param must be en or es" },
      { status: 400 },
    );
  }

  try {
    const content = await getSiteContent(lang as Lang);
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
