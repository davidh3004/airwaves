import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

export interface QuoteEmailData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  lang: "en" | "es";
}

/** Send a request through the Resend connector and throw if it fails. */
async function resendSend(payload: object): Promise<void> {
  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // connectors.proxy resolves even on 4xx/5xx — check explicitly
  const status: number = (response as any)?.status ?? (response as any)?.statusCode ?? 0;
  if (status && status >= 400) {
    const body = JSON.stringify((response as any)?.body ?? response);
    throw new Error(`Resend API error ${status}: ${body}`);
  }
}

export async function sendQuoteNotification(data: QuoteEmailData): Promise<void> {
  const subject = `New Quote Request — ${data.name} (${data.serviceType})`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f4f7fb;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0A2A6E;padding:28px 40px;text-align:center;">
            <p style="color:#00AEEF;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px 0;">Air Waves Comfort, LLC</p>
            <h1 style="color:#ffffff;font-size:22px;margin:0;">New Quote Request</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="color:#6B7280;margin:0 0 24px 0;font-size:14px;">A customer just submitted a quote request from your website. Details below:</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Name</span><br/>
                  <span style="color:#0A2A6E;font-size:16px;font-weight:600;">${data.name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                  <a href="mailto:${data.email}" style="color:#00AEEF;font-size:16px;font-weight:600;text-decoration:none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Phone</span><br/>
                  <a href="tel:${data.phone.replace(/\D/g, "")}" style="color:#00AEEF;font-size:16px;font-weight:600;text-decoration:none;">${data.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Service Requested</span><br/>
                  <span style="color:#0A2A6E;font-size:16px;font-weight:600;">${data.serviceType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</span><br/>
                  <p style="color:#374151;font-size:15px;line-height:1.6;margin:6px 0 0 0;">${data.message || "<em style='color:#9CA3AF'>No message provided</em>"}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#00AEEF;color:#ffffff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">Reply to ${data.name}</a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F4F7FB;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
            <p style="color:#9CA3AF;font-size:12px;margin:0;">Air Waves Comfort, LLC &bull; 9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016 &bull; License #CAC1820880</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resendSend({
    from: "Air Waves Comfort <onboarding@resend.dev>",
    to: ["airwavescomfort33@gmail.com"],
    subject,
    html,
    reply_to: data.email,
  });
}

export async function sendQuoteConfirmation(data: QuoteEmailData): Promise<void> {
  const isEs = data.lang === "es";

  const subject = isEs
    ? "Recibimos su solicitud — Air Waves Comfort"
    : "We received your quote request — Air Waves Comfort";

  const greeting = isEs ? `Hola ${data.name},` : `Hi ${data.name},`;
  const intro = isEs
    ? "Gracias por contactar a Air Waves Comfort. Hemos recibido su solicitud de presupuesto y nos pondremos en contacto con usted muy pronto."
    : "Thank you for contacting Air Waves Comfort. We've received your quote request and will be in touch shortly.";
  const summaryTitle = isEs ? "Su solicitud:" : "Your request:";
  const serviceLabel = isEs ? "Servicio:" : "Service:";
  const msgLabel = isEs ? "Mensaje:" : "Message:";
  const urgentText = isEs
    ? "¿Necesita ayuda urgente? Llámenos ahora:"
    : "Need urgent help? Call us now:";
  const closing = isEs
    ? "El equipo de Air Waves Comfort"
    : "The Air Waves Comfort Team";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f4f7fb;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#0A2A6E;padding:28px 40px;text-align:center;">
            <p style="color:#00AEEF;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px 0;">Air Waves Comfort, LLC</p>
            <h1 style="color:#ffffff;font-size:22px;margin:0;">${isEs ? "¡Solicitud Recibida!" : "Request Received!"}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="color:#0A2A6E;font-size:18px;font-weight:600;margin:0 0 12px 0;">${greeting}</p>
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px 0;">${intro}</p>
            <div style="background:#F4F7FB;border-left:4px solid #00AEEF;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px;">
              <p style="color:#9CA3AF;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px 0;">${summaryTitle}</p>
              <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>${serviceLabel}</strong> ${data.serviceType}</p>
              ${data.message ? `<p style="margin:4px 0;color:#374151;font-size:14px;"><strong>${msgLabel}</strong> ${data.message}</p>` : ""}
            </div>
            <p style="color:#6B7280;font-size:14px;line-height:1.6;">${urgentText}</p>
            <p style="text-align:center;margin:16px 0 24px 0;">
              <a href="tel:7863623648" style="display:inline-block;background:#F72D36;color:#ffffff;font-weight:700;font-size:17px;padding:14px 32px;border-radius:50px;text-decoration:none;">📞 (786) 362-3648</a>
            </p>
            <p style="color:#9CA3AF;font-size:13px;">${closing}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#F4F7FB;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
            <p style="color:#9CA3AF;font-size:12px;margin:0;">Air Waves Comfort, LLC &bull; 9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resendSend({
    from: "Air Waves Comfort <onboarding@resend.dev>",
    to: [data.email],
    subject,
    html,
  });
}
