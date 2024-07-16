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
      src="https://www.googletagmanager.com/gtag/js?id=AW-16633865118"
    ></Script>
    <Script id="gtag-init">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16633865118');
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
              'send_to': 'AW-16633865118/d2tMCOfUqcMZEJ7H0vs9',
              'event_callback': callback
          });
          return false;
        }
      `}
    </Script>
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
