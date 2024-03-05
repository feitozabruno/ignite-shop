import Image from "next/image";

import Head from "next/head";

import { MantineProvider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import { HomeContainer, Product } from "@/src/styles/ui/home";
import { GetStaticProps } from "next";

import { stripe, ProductData } from "@/src/lib/stripe";

import { Stripe } from "stripe";
import Link from "next/link";

interface HomeProps {
  productList: ProductData[];
}

export default function Home({ productList }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

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
            {productList.map((product) => (
              <Carousel.Slide key={product.id}>
                <Link href={`/product/${product.id}`} prefetch={false}>
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
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </MantineProvider>
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const productList = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    };
  });

  return {
    props: {
      productList,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
