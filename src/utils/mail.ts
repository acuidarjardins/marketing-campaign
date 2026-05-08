import nodemailer from "nodemailer";
import { getEnv } from "@/modules/utils";
import { sourceLabels } from "@/app/leads/analysis/source-config";

const LOGO_URL = "https://www.acuidarjardins.com.br/acuidar.jpg";

const transporter = nodemailer.createTransport({
  host: getEnv("SMTP_HOST"),
  port: Number(getEnv("SMTP_PORT")) || 587,
  secure: Number(getEnv("SMTP_PORT")) === 465,
  auth: {
    user: getEnv("SMTP_USER"),
    pass: getEnv("SMTP_PASS"),
  },
});

type LeadEmailData = {
  fullName: string;
  phone: string;
  email?: string | null;
  neighborhood?: string;
  need?: string;
  source: number;
};

function buildWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const number = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${number}`;
}

function buildEmailHtml(lead: LeadEmailData): string {
  const whatsappLink = buildWhatsAppLink(lead.phone);
  const sourceLabel = sourceLabels[lead.source] || `Source ${lead.source}`;
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:32px 24px 16px;text-align:center;border-bottom:2px solid #e8f5e9;">
              <img src="${LOGO_URL}" alt="Acuidar Jardins" width="80" height="80" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid #e8f5e9;" />
            </td>
          </tr>
          <!-- Intro -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <h1 style="margin:0 0 8px;font-size:20px;color:#2d5c2e;">Novo Lead Cadastrado</h1>
              <p style="margin:0;font-size:14px;color:#555;line-height:1.5;">
                Um novo contato foi registrado na plataforma Acuidar Jardins. Confira os dados abaixo:
              </p>
            </td>
          </tr>
          <!-- Data Table -->
          <tr>
            <td style="padding:16px 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 12px;font-size:13px;color:#666;font-weight:bold;background-color:#f0f7f0;border-bottom:1px solid #e0e0e0;width:130px;">Nome</td>
                  <td style="padding:10px 12px;font-size:14px;color:#222;background-color:#f0f7f0;border-bottom:1px solid #e0e0e0;">${lead.fullName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;font-size:13px;color:#666;font-weight:bold;border-bottom:1px solid #e0e0e0;width:130px;">Telefone</td>
                  <td style="padding:10px 12px;font-size:14px;color:#222;border-bottom:1px solid #e0e0e0;">
                    <a href="${whatsappLink}" style="color:#2d5c2e;text-decoration:none;">${lead.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;font-size:13px;color:#666;font-weight:bold;background-color:#f0f7f0;border-bottom:1px solid #e0e0e0;width:130px;">E-mail</td>
                  <td style="padding:10px 12px;font-size:14px;color:#222;background-color:#f0f7f0;border-bottom:1px solid #e0e0e0;">${lead.email || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;font-size:13px;color:#666;font-weight:bold;border-bottom:1px solid #e0e0e0;width:130px;">Bairro</td>
                  <td style="padding:10px 12px;font-size:14px;color:#222;border-bottom:1px solid #e0e0e0;">${lead.neighborhood || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;font-size:13px;color:#666;font-weight:bold;background-color:#f0f7f0;border-bottom:1px solid #e0e0e0;width:130px;">Necessidade</td>
                  <td style="padding:10px 12px;font-size:14px;color:#222;background-color:#f0f7f0;border-bottom:1px solid #e0e0e0;">${lead.need || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;font-size:13px;color:#666;font-weight:bold;width:130px;">Origem</td>
                  <td style="padding:10px 12px;font-size:14px;color:#222;">${sourceLabel}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- WhatsApp CTA -->
          <tr>
            <td style="padding:0 32px 24px;text-align:center;">
              <a href="${whatsappLink}" target="_blank" style="display:inline-block;padding:12px 28px;background-color:#25D366;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;border-radius:6px;">
                Conversar no WhatsApp
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background-color:#f9f9f9;border-top:1px solid #e8e8e8;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;">
                Recebido em ${now} <br/> Acuidar Jardins
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendLeadNotification(lead: LeadEmailData) {
  const recipients = getEnv("NOTIFY_RECIPIENTS");
  if (!recipients) return;

  await transporter.sendMail({
    from: `"Acuidar Jardins" <${getEnv("SMTP_USER")}>`,
    to: recipients,
    subject: `Novo Lead: ${lead.fullName}`,
    html: buildEmailHtml(lead),
  });
}
