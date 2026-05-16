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

const Home = () => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ACUIDAR_GTAG_ID || ""}`}
    ></Script>
    <Script id="gtag-init">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.ACUIDAR_GTAG_ID || ""}');
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
              'send_to': '${process.env.ACUIDAR_GTAG_ID || ""}/${process.env.ACUIDAR_GTAG_METRIC || ""}',
              'event_callback': callback
          });
          return false;
        }
      `}
    </Script>
    <BodyWrapper
      analyticsFormName="cuidadores-de-idosos"
      whatsappConversionMode="gtag"
    >
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
