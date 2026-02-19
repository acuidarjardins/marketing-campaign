import { getEnv } from "./utils";

const whatsappNumber = getEnv("ACUIDAR_WHATSAPP_NUMBER") || "5511958189900";

export const whatsAppDefaultLink =
  `https://wa.me/${whatsappNumber}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Acuidar.`;

export const whatsAppAlternativeLink =
  `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Acuidar.`;

export const workWithUsLink =
  getEnv("ACUIDAR_WORK_WITH_US_URL") || "https://whatsapp.com/channel/0029VbBeBr6Jf05Uk1rwlP3k";