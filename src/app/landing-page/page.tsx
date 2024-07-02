import {
  BannerSection,
  YoutubeSection,
  BenefitsSection,
  LaborIssuesSection,
  GoogleReviewsSection,
  MapSection,
} from "@/sections";

import styles from "./page.module.css";

const Home = () => (
  <main className={styles.main}>
    <BannerSection maxHeight="640px" />
    <YoutubeSection />
    <BenefitsSection />
    <LaborIssuesSection />
    <GoogleReviewsSection />
    <MapSection />
  </main>
);

export default Home;
