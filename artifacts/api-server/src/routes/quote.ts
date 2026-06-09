import { Router, type IRouter } from "express";
import { z } from "zod";
import { sendQuoteNotification, sendQuoteConfirmation } from "../lib/resend";

const router: IRouter = Router();

const QuoteBody = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  serviceType: z.string().min(1).max(100),
  message: z.string().max(2000).optional().default(""),
  lang: z.enum(["en", "es"]).optional().default("en"),
});

router.post("/quote", async (req, res): Promise<void> => {
  const parsed = QuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
    return;
  }

  const data = parsed.data;

  try {
    await Promise.all([
      sendQuoteNotification(data),
      sendQuoteConfirmation(data),
    ]);
    res.json({ ok: true });
  } catch (err: any) {
    req.log.error({ err }, "Failed to send quote emails");
    res.status(500).json({ error: "Failed to send email. Please call us directly." });
  }
});

export default router;
