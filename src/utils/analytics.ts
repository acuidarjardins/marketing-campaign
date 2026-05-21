export type WhatsAppConversionMode = "gtm" | "gtag";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag_report_conversion?: (url?: string) => boolean | void;
  }
}

const FORM_OPEN_STORAGE_PREFIX = "acuidar_form_open_";

let sessionFallbackFormOpens: Set<string> | undefined;

function formOpenStorageKey(formName: string) {
  return `${FORM_OPEN_STORAGE_PREFIX}${formName}`;
}

/** true = já houve form_open nesta sessão equivalente ao sessionStorage para este form_name */
function isFormOpenAlreadyTracked(formName: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const key = formOpenStorageKey(formName);
    if (sessionStorage.getItem(key) === "1") return true;
    sessionStorage.setItem(key, "1");
    return false;
  } catch {
    sessionFallbackFormOpens ??= new Set();
    if (sessionFallbackFormOpens.has(formName)) return true;
    sessionFallbackFormOpens.add(formName);
    return false;
  }
}

const logAnalyticsDebug = (payload: Record<string, unknown>) => {
  if (process.env.NEXT_PUBLIC_DEBUG_ANALYTICS !== "1") return;
  // eslint-disable-next-line no-console
  console.info("[analytics] dataLayer.push", payload);
};

function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  logAnalyticsDebug(payload);
  window.dataLayer.push(payload);
}

/** Primeira vez que o modal de lead fica visível nesta sessão (por landing). */
export function trackFormOpen(formName: string) {
  if (typeof window === "undefined") return;
  if (isFormOpenAlreadyTracked(formName)) return;
  pushToDataLayer({ event: "form_open", form_name: formName });
}

/** Após insert no Supabase sem erro */
export function trackFormFinish(formName: string) {
  pushToDataLayer({ event: "form_finish", form_name: formName });
}

/**
 * Imediatamente antes de abrir WhatsApp (`window.open`).
 * Em modo `gtag`, chama também `gtag_report_conversion` (landing sem GTM só Ads).
 */
export function trackWhatsappSend(
  formName: string,
  options?: { adsConversionMode?: WhatsAppConversionMode }
) {
  pushToDataLayer({ event: "whatsapp_send", form_name: formName });

  if (options?.adsConversionMode !== "gtag") return;

  if (process.env.NEXT_PUBLIC_DEBUG_ANALYTICS === "1" && typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.info("[analytics] gtag_report_conversion()", {
      defined: typeof window.gtag_report_conversion === "function",
    });
  }
  if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion();
  }
}
