"use client";

import { CSSProperties, PropsWithChildren } from "react";
import { whatsAppLink } from "@/modules/constants";
import { sendGTMEvent } from "@next/third-parties/google";

import styles from "./button.module.css";

export type ButtonProps = {
  width?: string;
  height?: string;
  fontSize?: string;
  background?: string;
  backgroundHover?: string;
};

const Button = ({
  children,
  width,
  height,
  fontSize,
  background,
  backgroundHover,
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
      href={whatsAppLink}
      onClick={() => sendGTMEvent({ event: "clickWhatsapp", value: "click" })}
    >
      {children}
    </a>
  );
};

export default Button;
