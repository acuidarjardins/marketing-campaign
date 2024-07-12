import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acuidar Jardins",
  description: "Seu idoso, nosso cuidado",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <html lang="pt_BR">{children}</html>;

export default RootLayout;
