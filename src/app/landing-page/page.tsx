import {
  BannerSection,
  YoutubeSection,
  BenefitsSection,
  LaborIssuesSection,
} from "@/sections";

import styles from "./page.module.css";

const Home = () => (
  <main className={styles.main}>
    <BannerSection maxHeight="640px" />
    <YoutubeSection />
    <BenefitsSection />
    <LaborIssuesSection />
  </main>
);

export default Home;
