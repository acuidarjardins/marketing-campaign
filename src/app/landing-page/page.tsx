import styles from "./page.module.css";
import { BannerSection, YoutubeSection } from "@/sections";

const Home = () => (
  <main className={styles.main}>
    <BannerSection maxHeight="640px" />
    <YoutubeSection />
  </main>
);

export default Home;
