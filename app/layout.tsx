import type { Metadata } from "next";
import Image from "next/image";
import { roboto } from "@/app/styles/fonts";
import { getCssText } from "@/app/styles/stitches.config";
import { globalStyles } from "@/app/styles/stitches.global";
import { Container, Header } from "@/app/styles/ui/header";

import logo from "@/public/logo.svg";

globalStyles();

export const metadata: Metadata = {
  title: "Ignite Shop",
  description: "Mini E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <Container>
          <Header>
            <Image src={logo} width={130} height={52} alt="" />
          </Header>
          {children}
        </Container>
      </body>
    </html>
  );
}
