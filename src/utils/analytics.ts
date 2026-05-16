export type WhatsAppConversionMode = "gtm" | "gtag";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag_report_conversion?: (url?: string) => boolean | void;
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

export function pushLeadSuccess(formName: string) {
  pushToDataLayer({ event: "lead_success", form_name: formName });
}

export function reportSuccessfulWhatsappOpen(mode: WhatsAppConversionMode) {
  if (mode === "gtag") {
    if (process.env.NEXT_PUBLIC_DEBUG_ANALYTICS === "1" && typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.info("[analytics] gtag_report_conversion()", {
        defined: typeof window.gtag_report_conversion === "function",
      });
    }
    if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion();
    }
    return;
  }
  pushToDataLayer({ event: "clickWhatsapp", value: "click" });
}
