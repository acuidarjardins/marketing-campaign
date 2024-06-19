import Image from "next/image";

import styles from "./page.module.css";
import { Button } from "@/components";

const Home = () => (
  <main className={styles.main}>
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

    <div className={styles.whatsapp_button}>
      <Button title="Solicite um cuidador" width="240px" />
    </div>
  </main>
);

export default Home;
