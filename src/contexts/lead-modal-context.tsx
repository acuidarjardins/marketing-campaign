"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import { FormSources, CtaMode } from "@/modules/constants";
import {
  reportSuccessfulWhatsappOpen,
  type WhatsAppConversionMode,
} from "@/utils/analytics";

type ModalStep = "closed" | "intent" | "lead-form" | "caregiver";

type LeadModalState = {
  step: ModalStep;
  source: number;
  whatsappUrl: string;
};

type LeadModalContextValue = {
  state: LeadModalState;
  ctaMode: CtaMode;
  analyticsFormName: string;
  whatsappConversionMode: WhatsAppConversionMode;
  defaultSource: number;
  openIntentModal: (source: number, whatsappUrl: string) => void;
  goToIntent: () => void;
  goToLeadForm: () => void;
  goToCaregiver: () => void;
  closeModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

type LeadModalProviderProps = PropsWithChildren<{
  ctaMode?: CtaMode;
  defaultSource?: number;
  analyticsFormName?: string;
  whatsappConversionMode?: WhatsAppConversionMode;
}>;

export const LeadModalProvider = ({
  children,
  ctaMode = "full",
  defaultSource = FormSources.TESTES,
  analyticsFormName = "landing",
  whatsappConversionMode = "gtm",
}: LeadModalProviderProps) => {
  const [state, setState] = useState<LeadModalState>({
    step: "closed",
    source: defaultSource,
    whatsappUrl: "",
  });

  const openIntentModal = useCallback(
    (source: number, whatsappUrl: string) => {
      if (ctaMode === "direct") {
        window.open(whatsappUrl, "_blank");
        reportSuccessfulWhatsappOpen(whatsappConversionMode);
        return;
      }
      if (ctaMode === "lead-only") {
        setState({ step: "lead-form", source, whatsappUrl });
        return;
      }
      setState({ step: "intent", source, whatsappUrl });
    },
    [ctaMode, whatsappConversionMode]
  );

  const goToIntent = useCallback(() => {
    setState((prev) => ({ ...prev, step: "intent" }));
  }, []);

  const goToLeadForm = useCallback(() => {
    setState((prev) => ({ ...prev, step: "lead-form" }));
  }, []);

  const goToCaregiver = useCallback(() => {
    setState((prev) => ({ ...prev, step: "caregiver" }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, step: "closed" }));
  }, []);

  return (
    <LeadModalContext.Provider
      value={{
        state,
        ctaMode,
        analyticsFormName,
        whatsappConversionMode,
        defaultSource,
        openIntentModal,
        goToIntent,
        goToLeadForm,
        goToCaregiver,
        closeModal,
      }}
    >
      {children}
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = () => {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
};
