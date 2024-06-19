import { CSSProperties } from "react";

import styles from "./button.module.css";
import { whatsAppLink } from "@/modules/constants";

export type ButtonProps = {
  title: string;
  width?: string;
  fontSize?: string;
};

const Button = ({ title, width, fontSize }: ButtonProps) => {
  const buttonStyle: CSSProperties = {
    "--button-width": width,
    "--button-font-size": fontSize,
  } as React.CSSProperties;

  return (
    <a className={styles.button} style={buttonStyle} href={whatsAppLink}>
      {title}
    </a>
  );
};

export default Button;
