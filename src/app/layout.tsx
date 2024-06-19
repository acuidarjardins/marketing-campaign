import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { Footer, Navbar } from "@/components";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Acuidar Jardins",
  description: "Seu idoso, nosso cuidado",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt_BR">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
