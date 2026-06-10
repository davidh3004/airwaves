import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAllSiteContent, saveSiteContent } from "@/lib/cms";
import type { Lang } from "@/i18n/translations";
import type { SiteContent } from "@/types/site-content";

async function requireAdmin() {
  const ok = await getAdminSession();
  if (!ok) return null;
  return true;
}

/** GET — full EN + ES content for the CMS editor. */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const content = await getAllSiteContent();
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

/** PUT — save one language. Body: { lang: "en"|"es", content: SiteContent } */
export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as {
      lang?: Lang;
      content?: SiteContent;
    };
    if (
      (body.lang !== "en" && body.lang !== "es") ||
      !body.content ||
      typeof body.content !== "object"
    ) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    await saveSiteContent(body.lang, body.content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
