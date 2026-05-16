"use client";

import { PropsWithChildren } from "react";
import { LeadModalProvider } from "@/contexts/lead-modal-context";
import { CtaMode } from "@/modules/constants";
import type { WhatsAppConversionMode } from "@/utils/analytics";
import LeadModal from "../lead-modal/lead-modal";
import IntentModal from "../intent-modal/intent-modal";

type ClientProvidersProps = PropsWithChildren<{
  ctaMode?: CtaMode;
  defaultSource?: number;
  analyticsFormName?: string;
  whatsappConversionMode?: WhatsAppConversionMode;
}>;

const ClientProviders = ({
  children,
  ctaMode,
  defaultSource,
  analyticsFormName,
  whatsappConversionMode,
}: ClientProvidersProps) => (
  <LeadModalProvider
    ctaMode={ctaMode}
    defaultSource={defaultSource}
    analyticsFormName={analyticsFormName}
    whatsappConversionMode={whatsappConversionMode}
  >
    {children}
    <IntentModal />
    <LeadModal />
  </LeadModalProvider>
);

export default ClientProviders;
