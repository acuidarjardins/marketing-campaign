"use client";

import { CSSProperties, PropsWithChildren, useMemo } from "react";
import {
  whatsAppAlternativeLink,
  whatsAppDefaultLink,
} from "@/modules/constants";
import { sendGTMEvent } from "@next/third-parties/google";

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
}: PropsWithChildren<ButtonProps>) => {
  const buttonStyle: CSSProperties = {
    "--button-width": width,
    "--button-height": height,
    "--button-font-size": fontSize,
    "--button-background": background,
    "--button-background-hover": backgroundHover,
  } as React.CSSProperties;

  const href = useMemo(() => {
    if (customHref) return customHref;

    return useAlternativeLink ?
      whatsAppAlternativeLink :
      whatsAppDefaultLink;
  }, [customHref, useAlternativeLink]);

  return (
    <a
      className={styles.button}
      style={buttonStyle}
      href={href}
      onClick={() => {
        if (skipAnalytics) return;
        if (useAlternativeLink) return window.gtag_report_conversion();

        sendGTMEvent({ event: "clickWhatsapp", value: "click" });
      }}
    >
      {children}
    </a>
  );
};

export default Button;
