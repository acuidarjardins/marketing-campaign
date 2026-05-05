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
  isLeadsterCTA?: boolean;
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
  isLeadsterCTA,
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

  const isWhatsAppCTA = !isLeadsterCTA && !customHref;

  const href = useMemo(() => {
    if (isLeadsterCTA) return undefined;
    if (customHref) return customHref;
    return undefined;
  }, [isLeadsterCTA, customHref]);

  const handleClick = () => {
    if (isWhatsAppCTA) {
      if (!skipAnalytics) {
        if (useAlternativeLink) {
          window.gtag_report_conversion();
        } else {
          sendGTMEvent({ event: "clickWhatsapp", value: "click" });
        }
      }
      openIntentModal(resolvedSource, whatsappUrl);
      return;
    }

    if (skipAnalytics) return;
    if (useAlternativeLink) return window.gtag_report_conversion();
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

  if (isLeadsterCTA) {
    return <div className="leadster-cta">{ButtonEl}</div>;
  }

  return ButtonEl;
};

export default Button;
