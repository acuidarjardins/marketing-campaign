import { GoogleTagManager } from "@next/third-parties/google";
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

const Home = () => (
  <>
    <GoogleTagManager gtmId={process.env.ACUIDAR_DEFAULT_GTM!} />
    <BodyWrapper ctaMode="direct" analyticsFormName="home">
      <main className={styles.main}>
        <BannerSection maxHeight="640px" />
        <YoutubeSection />
        <BenefitsSection />
        <LaborIssuesSection />
        <GoogleReviewsSection />
        <MapSection />
      </main>
    </BodyWrapper>
  </>
);

export default Home;
