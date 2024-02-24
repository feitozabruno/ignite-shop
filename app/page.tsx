"use client";

import { HomeContainer, Product } from "@/app/styles/ui/home";
import Image from "next/image";

import camisa1 from "@/public/assets/camisa-ignite-lab.png";
import camisa2 from "@/public/assets/camisa-igniter-aboard.png";
import camisa3 from "@/public/assets/camisa-maratona-2.png";
import camisa4 from "@/public/assets/camisa-maratona.png";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camisa1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camisa2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 89,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camisa3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 99,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camisa4} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta 4</strong>
          <span>R$ 109,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
