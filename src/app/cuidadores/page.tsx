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
import { FormSources } from "@/modules/constants";

import styles from "./page.module.css";

const Cuidadores = () => (
  <>
    <GoogleTagManager gtmId={process.env.ACUIDAR_DEFAULT_GTM || ""} />
    <BodyWrapper ctaMode="full" defaultSource={FormSources.P_MAX} analyticsFormName="cuidadores">
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

export default Cuidadores;
