import Image from "next/image";
import { useEffect, useState } from "react";

import { MantineProvider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import { HomeContainer, Product } from "@/src/styles/ui/home";
import { ProductData } from "@/src/lib/stripe";

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <HomeContainer>
      <MantineProvider>
        <Carousel
          slideSize="520px"
          dragFree
          height="100%"
          align="start"
          withControls={false}
          slidesToScroll={3}
        >
          {products.map((product) => (
            <Carousel.Slide key={product.id}>
              <Product>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  priority={true}
                  alt=""
                />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Carousel.Slide>
          ))}
        </Carousel>
      </MantineProvider>
    </HomeContainer>
  );
}
