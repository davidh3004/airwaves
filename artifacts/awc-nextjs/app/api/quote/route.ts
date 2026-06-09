import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase";
import { sendQuoteEmails } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  serviceType: z.string().min(2).max(100),
  message: z.string().max(2000).optional(),
  lang: z.enum(["en", "es"]).default("en"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, serviceType, message, lang } = parsed.data;

    // Store in Supabase
    const supabase = createServiceClient();
    await supabase.from("quote_submissions").insert({
      name,
      email,
      phone,
      service_type: serviceType,
      message: message ?? null,
      lang,
    });

    // Send emails via Resend
    await sendQuoteEmails({ name, email, phone, serviceType, message, lang });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
