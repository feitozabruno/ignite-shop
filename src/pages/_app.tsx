import type { AppProps } from "next/app";
import Image from "next/image";
import { globalStyles } from "@/src/styles/stitches.global";
import { Container, Header } from "@/src/styles/ui/header";
import logo from "@/public/logo.svg";
import { roboto } from "@/src/styles/fonts";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={`${roboto.className} antialiased`}>
      <Header>
        <Image src={logo} width={130} height={52} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
