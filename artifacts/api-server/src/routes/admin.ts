import { type IRouter, Router } from "express";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetAdminContentResponse,
  UpdateContentBody,
  LoginBody,
} from "@workspace/api-zod";
import { DEFAULT_CONTENT } from "./content";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.password === process.env.ADMIN_PASSWORD) {
    (req.session as any).authenticated = true;
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  res.json({ authenticated: !!(req.session as any).authenticated });
});

// Middleware to protect admin routes
const requireAuth = (req: any, res: any, next: any) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

router.get("/admin/content", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(siteSettingsTable);
  const content = { ...DEFAULT_CONTENT };

  for (const row of rows) {
    if (row.key in content) {
      (content as any)[row.key] = row.value;
    }
  }

  res.json(GetAdminContentResponse.parse(content));
});

router.put("/admin/content", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { key, value } = parsed.data;

  await db
    .insert(siteSettingsTable)
    .values({ key, value })
    .onConflictDoUpdate({
      target: siteSettingsTable.key,
      set: { value, updatedAt: new Date() },
    });

  res.json({ ok: true });
});

export default router;
