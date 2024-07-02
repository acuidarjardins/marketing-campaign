import Image from "next/image";
import { CSSProperties } from "react";

import styles from "./banner.module.css";

type BannerSectionProps = {
  maxHeight?: string;
};
const BannerSection = ({ maxHeight }: BannerSectionProps) => {
  const sectionStyle: CSSProperties = {
    "--section-maxHeight": maxHeight,
  } as React.CSSProperties;

  return (
    <section className={styles.section} style={sectionStyle}>
      <Image
        src="/banner_desktop.png"
        alt="Acuidar Cuidadores Especializados de Idosos, Adultos e Crianças"
        width={1408}
        height={475}
        className={styles.banner_desktop}
      />
      <Image
        src="/banner_mobile.png"
        alt="Acuidar Cuidadores Especializados de Idosos, Adultos e Crianças"
        width={850}
        height={930}
        className={styles.banner_mobile}
      />
    </section>
  );
};

export default BannerSection;
