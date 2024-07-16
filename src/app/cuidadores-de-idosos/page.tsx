import { GoogleTagManager } from "@next/third-parties/google";

import {
  MapSection,
  BannerSection,
  YoutubeSection,
  BenefitsSection,
  LaborIssuesSection,
  GoogleReviewsSection,
} from "@/sections";
import { getEnv } from "@/modules/utils";
import { BodyWrapper } from "@/components";

import styles from "./page.module.css";

const Home = () => (
  <>
    <GoogleTagManager gtmId={getEnv("ACUIDAR_EXTERNAL_GTM")} />
    <BodyWrapper useAlternativeLink>
      <main className={styles.main}>
        <BannerSection maxHeight="640px" />
        <YoutubeSection useAlternativeLink />
        <BenefitsSection useAlternativeLink />
        <LaborIssuesSection useAlternativeLink />
        <GoogleReviewsSection useAlternativeLink />
        <MapSection />
      </main>
    </BodyWrapper>
  </>
);

export default Home;
