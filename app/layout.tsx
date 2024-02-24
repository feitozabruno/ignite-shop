import { getCssText } from "@/app/styles/stitches.config";
import { globalStyles } from "@/app/styles/stitches.global";
import { roboto } from "@/app/styles/fonts";
import type { Metadata } from "next";

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
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
