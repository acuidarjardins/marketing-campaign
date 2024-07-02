import {
  BannerSection,
  YoutubeSection,
  BenefitsSection,
  LaborIssuesSection,
  GoogleReviewsSection,
} from "@/sections";

import styles from "./page.module.css";

const Home = () => (
  <main className={styles.main}>
    <BannerSection maxHeight="640px" />
    <YoutubeSection />
    <BenefitsSection />
    <LaborIssuesSection />
    <GoogleReviewsSection />
  </main>
);

export default Home;
