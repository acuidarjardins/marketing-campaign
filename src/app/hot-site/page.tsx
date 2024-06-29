import styles from "./page.module.css";

import { Button } from "@/components";
import { BannerSection } from "@/sections";

const Home = () => (
  <main className={styles.main}>
    <BannerSection />
    <div className={styles.whatsapp_button}>
      <Button width="15rem">Solicite um cuidador</Button>
    </div>
  </main>
);

export default Home;
