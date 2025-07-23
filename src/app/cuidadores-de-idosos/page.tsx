import Script from "next/script";
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
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${getEnv(
        "ACUIDAR_GTAG_ID"
      )}`}
    ></Script>
    <Script id="gtag-init">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${getEnv("ACUIDAR_GTAG_ID")}');
      `}
    </Script>
    <Script id="gtag-conversion">
      {`
        function gtag_report_conversion(url) {
          var callback = function () {
            if (typeof(url) != 'undefined') {
              window.location = url;
            }
          };
          gtag('event', 'conversion', {
              'send_to': '${getEnv("ACUIDAR_GTAG_ID")}/${getEnv(
        "ACUIDAR_GTAG_METRIC"
      )}',
              'event_callback': callback
          });
          return false;
        }
      `}
    </Script>
    <BodyWrapper>
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
