import { GoogleMapsEmbed } from "@next/third-parties/google";
import styles from "./map.module.css";
import { getEnv } from "@/modules/utils";

const MapSection = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>
      <span>Estamos prontos para oferecer</span>
      <span> o que há de melhor em cuidados</span>
      <span className={styles.last_line}>
        <span> para quem você ama</span>
        <span> no conforto do seu lar.</span>
      </span>
    </h2>
    <div className={styles.map}>
      <GoogleMapsEmbed
        apiKey={getEnv("GOOGLE_MAPS_API_KEY")}
        zoom="16"
        style="width: 100%; height: 100%;"
        height={350}
        language="pt-BR"
        loading="eager"
        mode="place"
        allowfullscreen={false}
        maptype=""
        q="Av. Engenheiro Luís Carlos Berrini, 1681 - Cidade Monções, São Paulo - SP, 04571-011"
      />
    </div>
  </section>
);

export default MapSection;
