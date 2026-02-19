import { getEnv } from "./utils";

export const whatsAppDefaultLink =
  `https://wa.me/${getEnv("ACUIDAR_WHATSAPP_NUMBER") || "5511958189900"}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Acuidar.`;

export const whatsAppAlternativeLink =
  `https://wa.me/${getEnv("ACUIDAR_WHATSAPP_NUMBER") || "5511958189900"}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Acuidar.`;

