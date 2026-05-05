"use client";

import { PropsWithChildren } from "react";
import { LeadModalProvider } from "@/contexts/lead-modal-context";
import { CtaMode } from "@/modules/constants";
import LeadModal from "../lead-modal/lead-modal";
import IntentModal from "../intent-modal/intent-modal";

type ClientProvidersProps = PropsWithChildren<{
  ctaMode?: CtaMode;
  defaultSource?: number;
}>;

const ClientProviders = ({
  children,
  ctaMode,
  defaultSource,
}: ClientProvidersProps) => (
  <LeadModalProvider ctaMode={ctaMode} defaultSource={defaultSource}>
    {children}
    <IntentModal />
    <LeadModal />
  </LeadModalProvider>
);

export default ClientProviders;
