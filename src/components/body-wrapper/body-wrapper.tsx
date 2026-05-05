import { PropsWithChildren } from "react";
import { CtaMode } from "@/modules/constants";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import ClientProviders from "./client-providers";

type BodyWrapperProps = PropsWithChildren<{
  ctaMode?: CtaMode;
  defaultSource?: number;
  isLeadsterCTA?: boolean;
}>;

const BodyWrapper = ({
  children,
  ctaMode,
  defaultSource,
  isLeadsterCTA = false,
}: BodyWrapperProps) => (
  <ClientProviders ctaMode={ctaMode} defaultSource={defaultSource}>
    <Navbar isLeadsterCTA={isLeadsterCTA} />
    {children}
    <Footer />
  </ClientProviders>
);

export default BodyWrapper;
