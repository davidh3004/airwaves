import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

/**
 * GET /api/content?key=<key>
 * Returns a single site_settings value.
 * Returns all settings when key is omitted.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  try {
    const supabase = createServiceClient();

    if (key) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .eq("key", key)
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 404 });
      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content
 * Body: { key: string; value: unknown }
 * Updates or inserts a site_settings row.
 * Protected — requires valid admin session (checked in middleware).
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body as { key: string; value: unknown };

    if (!key || value === undefined) {
      return NextResponse.json({ error: "key and value are required" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
