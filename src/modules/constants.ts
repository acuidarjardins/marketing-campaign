import { getEnv } from "./utils";

export const whatsappNumber = getEnv("ACUIDAR_WHATSAPP_NUMBER") || "5511958189900";

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const whatsAppDefaultLink =
  `https://wa.me/${whatsappNumber}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Acuidar.`;

export const whatsAppAlternativeLink =
  `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Acuidar.`;

export const workWithUsLink =
  getEnv("ACUIDAR_WORK_WITH_US_URL") || "https://whatsapp.com/channel/0029VbBeBr6Jf05Uk1rwlP3k";

export const placeId = "ChIJd_dFVTBZzpQRotBOQd5zbro";

export const FormSources = {
  TESTES: 0,
  REDE_DE_PESQUISA: 1,
  P_MAX: 2,
};

export type CtaMode = "direct" | "lead-only" | "full";
