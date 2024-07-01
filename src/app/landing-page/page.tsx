import styles from "./page.module.css";
import { BannerSection, BenefitsSection, YoutubeSection } from "@/sections";

const Home = () => (
  <main className={styles.main}>
    <BannerSection maxHeight="640px" />
    <YoutubeSection />
    <BenefitsSection />
  </main>
);

export default Home;
