import { GoogleMapsEmbed } from "@next/third-parties/google";
import styles from "./map.module.css";
import { getEnv } from "@/modules/utils";
import { placeId } from "@/modules/constants";

const MapSection = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>
      <span>O melhor cuidado</span>
      <span> a quem você ama,</span>
      <span className={styles.last_line}>
        <span> no conforto do seu lar.</span>
      </span>
    </h2>
    <a
      href="https://www.google.com/maps/place/?q=place_id:ChIJd_dFVTBZzpQRotBOQd5zbro"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.map_link}
    >
      Acuidar SP Jardins - Cuidadores de Idosos em São Paulo
    </a>
    <div className={styles.map}>
      <GoogleMapsEmbed
        apiKey={getEnv("GOOGLE_MAPS_API_KEY")}
        zoom="16"
        style="width: 100%; height: 100%;"
        height={350}
        language="pt-BR"
        loading="eager"
        mode="place"
        id={placeId}
        allowfullscreen={false}
        q="Acuidar SP Jardins - Cuidadores de Idosos em São Paulo"
      />
    </div>
  </section>
);

export default MapSection;
