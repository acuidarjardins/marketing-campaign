import { PropsWithChildren } from "react";
import { CtaMode } from "@/modules/constants";
import type { WhatsAppConversionMode } from "@/utils/analytics";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import ClientProviders from "./client-providers";

type BodyWrapperProps = PropsWithChildren<{
  ctaMode?: CtaMode;
  defaultSource?: number;
  analyticsFormName?: string;
  whatsappConversionMode?: WhatsAppConversionMode;
}>;

const BodyWrapper = ({
  children,
  ctaMode,
  defaultSource,
  analyticsFormName,
  whatsappConversionMode,
}: BodyWrapperProps) => (
  <ClientProviders
    ctaMode={ctaMode}
    defaultSource={defaultSource}
    analyticsFormName={analyticsFormName}
    whatsappConversionMode={whatsappConversionMode}
  >
    <Navbar />
    {children}
    <Footer />
  </ClientProviders>
);

export default BodyWrapper;
