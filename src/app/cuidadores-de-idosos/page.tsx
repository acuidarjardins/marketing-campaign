import { GoogleAnalytics } from "@next/third-parties/google";
import {
  MapSection,
  BannerSection,
  YoutubeSection,
  BenefitsSection,
  LaborIssuesSection,
  GoogleReviewsSection,
} from "@/sections";
import { BodyWrapper } from "@/components";

import styles from "./page.module.css";
import { getEnv } from "@/modules/utils";

const Home = () => (
  <>
    <GoogleAnalytics gaId={getEnv("ACUIDAR_DEFAULT_GA")} />
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
