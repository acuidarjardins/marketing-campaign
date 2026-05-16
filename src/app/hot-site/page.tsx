import { GoogleTagManager } from "@next/third-parties/google";

import styles from "./page.module.css";
import { BannerSection } from "@/sections";
import { Button, BodyWrapper } from "@/components";

const Home = () => (
  <>
    <GoogleTagManager gtmId={process.env.ACUIDAR_DEFAULT_GTM || ""} />
    <BodyWrapper analyticsFormName="hot-site">
      <main className={styles.main}>
        <BannerSection />
        <div className={styles.whatsapp_button}>
          <Button width="15rem">Solicite um cuidador</Button>
        </div>
      </main>
    </BodyWrapper>
  </>
);

export default Home;
