/* eslint-disable @next/next/next-script-for-ga */
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
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=AW-16633865118"
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16633865118');
          `,
      }}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16633865118/SqSYCMD9n8IZEJ7H0vs9',
                  'event_callback': callback
              });
              return false;
            }
          `,
      }}
    />
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
