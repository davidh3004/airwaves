import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "quotes@airwavesc.com";
const NOTIFY = process.env.QUOTE_NOTIFY_EMAIL ?? "airwavescomfort33@gmail.com";

interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message?: string;
  lang: "en" | "es";
}

export async function sendQuoteEmails(payload: QuotePayload) {
  const { name, email, phone, serviceType, message, lang } = payload;
  const isEs = lang === "es";

  const internalHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)">
    <div style="background:linear-gradient(135deg,#0A2A6E,#00AEEF);padding:30px;text-align:center">
      <h1 style="color:#fff;margin:0;font-size:24px">🌬️ New Quote Request</h1>
      <p style="color:rgba(255,255,255,.8);margin:8px 0 0">Air Waves Comfort — airwavesc.com</p>
    </div>
    <div style="padding:30px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px;border-bottom:1px solid #eee;color:#666;width:140px">Name</td><td style="padding:10px;border-bottom:1px solid #eee;font-weight:600">${name}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #eee;color:#666">Phone</td><td style="padding:10px;border-bottom:1px solid #eee;font-weight:600">${phone}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:10px;border-bottom:1px solid #eee;font-weight:600">${email}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #eee;color:#666">Service</td><td style="padding:10px;border-bottom:1px solid #eee;font-weight:600">${serviceType}</td></tr>
        ${message ? `<tr><td style="padding:10px;color:#666;vertical-align:top">Message</td><td style="padding:10px">${message}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;text-align:center">
        <a href="mailto:${email}?subject=Re: Your Air Waves Comfort Quote Request" style="background:#0A2A6E;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Reply to ${name}</a>
      </div>
    </div>
    <div style="background:#f9f9f9;padding:16px;text-align:center;font-size:12px;color:#999">Air Waves Comfort LLC · (786) 362-3648 · CAC1820880</div>
  </div>
</body>
</html>`;

  const confirmHtml = isEs ? `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)">
    <div style="background:linear-gradient(135deg,#0A2A6E,#00AEEF);padding:30px;text-align:center">
      <h1 style="color:#fff;margin:0;font-size:24px">🌬️ ¡Solicitud Recibida!</h1>
      <p style="color:rgba(255,255,255,.8);margin:8px 0 0">Air Waves Comfort — airwavesc.com</p>
    </div>
    <div style="padding:30px">
      <p style="font-size:16px;color:#333">Hola <strong>${name}</strong>,</p>
      <p style="color:#555;line-height:1.6">Hemos recibido su solicitud para <strong>${serviceType}</strong>. Uno de nuestros especialistas se comunicará con usted en menos de una hora durante el horario normal de atención.</p>
      <div style="background:#f0f7ff;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
        <p style="margin:0 0 8px;color:#666;font-size:14px">¿Necesita asistencia inmediata?</p>
        <a href="tel:+17863623648" style="font-size:22px;font-weight:700;color:#0A2A6E;text-decoration:none">(786) 362-3648</a>
        <p style="margin:4px 0 0;color:#999;font-size:12px">Servicio de Emergencia 24/7</p>
      </div>
    </div>
    <div style="background:#f9f9f9;padding:16px;text-align:center;font-size:12px;color:#999">Air Waves Comfort LLC · CAC1820880 · airwavesc.com</div>
  </div>
</body>
</html>` : `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)">
    <div style="background:linear-gradient(135deg,#0A2A6E,#00AEEF);padding:30px;text-align:center">
      <h1 style="color:#fff;margin:0;font-size:24px">🌬️ Request Received!</h1>
      <p style="color:rgba(255,255,255,.8);margin:8px 0 0">Air Waves Comfort — airwavesc.com</p>
    </div>
    <div style="padding:30px">
      <p style="font-size:16px;color:#333">Hi <strong>${name}</strong>,</p>
      <p style="color:#555;line-height:1.6">We've received your quote request for <strong>${serviceType}</strong>. One of our specialists will reach out within the hour during normal business hours.</p>
      <div style="background:#f0f7ff;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
        <p style="margin:0 0 8px;color:#666;font-size:14px">Need immediate help?</p>
        <a href="tel:+17863623648" style="font-size:22px;font-weight:700;color:#0A2A6E;text-decoration:none">(786) 362-3648</a>
        <p style="margin:4px 0 0;color:#999;font-size:12px">24/7 Emergency Line</p>
      </div>
    </div>
    <div style="background:#f9f9f9;padding:16px;text-align:center;font-size:12px;color:#999">Air Waves Comfort LLC · CAC1820880 · airwavesc.com</div>
  </div>
</body>
</html>`;

  await Promise.all([
    getResend().emails.send({
      from: FROM,
      to: NOTIFY,
      replyTo: email,
      subject: `New Quote Request — ${serviceType} (${name})`,
      html: internalHtml,
    }),
    getResend().emails.send({
      from: FROM,
      to: email,
      subject: isEs
        ? "Air Waves Comfort — Solicitud Recibida ✓"
        : "Air Waves Comfort — Request Received ✓",
      html: confirmHtml,
    }),
  ]);
}
