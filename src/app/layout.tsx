import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Acuidar Jardins",
  description: "Seu idoso, nosso cuidado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
