"use client";

import { CSSProperties, PropsWithChildren } from "react";
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
  background?: string;
  backgroundHover?: string;
  useAlternativeLink?: boolean;
};

const Button = ({
  children,
  width,
  height,
  fontSize,
  background,
  backgroundHover,
  useAlternativeLink,
}: PropsWithChildren<ButtonProps>) => {
  const buttonStyle: CSSProperties = {
    "--button-width": width,
    "--button-height": height,
    "--button-font-size": fontSize,
    "--button-background": background,
    "--button-background-hover": backgroundHover,
  } as React.CSSProperties;

  return (
    <a
      className={styles.button}
      style={buttonStyle}
      href={useAlternativeLink ? whatsAppAlternativeLink : whatsAppDefaultLink}
      onClick={() => {
        if (useAlternativeLink) return window.gtag_report_conversion();

        sendGTMEvent({ event: "clickWhatsapp", value: "click" });
      }}
    >
      {children}
    </a>
  );
};

export default Button;
