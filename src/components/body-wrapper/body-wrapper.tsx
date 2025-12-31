import { PropsWithChildren } from "react";
import { Poppins } from "next/font/google";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

const BodyWrapper = ({ children }: PropsWithChildren) => (
  <body className={poppins.className} suppressHydrationWarning={true}>
    <Navbar isLeadsterCTA={false} />
    {children}
    <Footer />
  </body>
);

export default BodyWrapper;
