import { BsArrowRight } from "react-icons/bs";
import { YouTubeEmbed } from "@next/third-parties/google";

import styles from "./youtube.module.css";
import Button from "../../components/button/button";

const YoutubeSection = ({
  useAlternativeLink,
}: {
  useAlternativeLink?: boolean;
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.sub_section}>
        <div className={styles.paragraph}>
          <h1 className={styles.title}>Acuidar SP Jardins</h1>
          <h2 className={styles.subtitle}>São Paulo / SP</h2>
          <section className={styles.content}>
            <p>Tranquilidade e segurança para você,</p>
            <p>Cuidado e conforto para quem você ama,</p>
            <p>Qualidade de vida para todos.</p>
          </section>
        </div>
        <Button
          width="17rem"
          background="#132E33"
          backgroundHover="#395358"
          useAlternativeLink={useAlternativeLink}
        >
          <div className={styles.button_content}>
            Solicite um orçamento
            <BsArrowRight size="1.25rem" color="#96b570" />
          </div>
        </Button>
      </div>
      <div className={styles.youtube_embed}>
        <YouTubeEmbed
          videoid="D-KEy5cK4Rg"
          style="border-radius: 3rem; width:100%;"
        />
      </div>
    </section>
  );
};

export default YoutubeSection;
