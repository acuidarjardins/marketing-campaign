"use client";

import { CSSProperties, PropsWithChildren, useMemo } from "react";
import {
  whatsAppAlternativeLink,
  whatsAppDefaultLink,
} from "@/modules/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { useLeadModal } from "@/contexts/lead-modal-context";

import styles from "./button.module.css";

export type ButtonProps = {
  width?: string;
  height?: string;
  fontSize?: string;
  customHref?: string;
  background?: string;
  skipAnalytics?: boolean;
  backgroundHover?: string;
  useAlternativeLink?: boolean;
  source?: number;
};

const Button = ({
  children,
  width,
  height,
  fontSize,
  customHref,
  background,
  backgroundHover,
  useAlternativeLink,
  skipAnalytics = false,
  source,
}: PropsWithChildren<ButtonProps>) => {
  const { openIntentModal, defaultSource } = useLeadModal();

  const resolvedSource = source ?? defaultSource;

  const buttonStyle: CSSProperties = {
    "--button-width": width,
    "--button-height": height,
    "--button-font-size": fontSize,
    "--button-background": background,
    "--button-background-hover": backgroundHover,
  } as React.CSSProperties;

  const whatsappUrl = useMemo(
    () => (useAlternativeLink ? whatsAppAlternativeLink : whatsAppDefaultLink),
    [useAlternativeLink]
  );

  const isWhatsAppCTA = !customHref;

  const href = useMemo(() => {
    if (customHref) return customHref;
    return undefined;
  }, [customHref]);

  const handleClick = () => {
    if (isWhatsAppCTA) {
      openIntentModal(resolvedSource, whatsappUrl);
      return;
    }

    if (skipAnalytics) return;
    if (useAlternativeLink) return window.gtag_report_conversion?.();
    sendGTMEvent({ event: "clickWhatsapp", value: "click" });
  };

  const ButtonEl = (
    <a
      className={styles.button}
      style={buttonStyle}
      href={href}
      onClick={(e) => {
        if (isWhatsAppCTA) {
          e.preventDefault();
        }
        handleClick();
      }}
    >
      {children}
    </a>
  );

  return ButtonEl;
};

export default Button;
