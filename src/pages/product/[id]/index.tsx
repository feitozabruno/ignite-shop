import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/ui/products";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { ProductData, stripe } from "@/src/lib/stripe";
import Stripe from "stripe";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

interface ProductProps {
  product: ProductData;
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true);
      const response = await axios.post("/api/v1/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckout(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button disabled={isCreatingCheckout} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "prod_PfIoPLrYVHVgtP" } },
      { params: { id: "prod_OmbUD90y0SfUTT" } },
      { params: { id: "prod_OmbTlkisKheCxS" } },
      { params: { id: "prod_OmbS8seVdVhZPl" } },
      { params: { id: "prod_OmbSJObQkd7nIi" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
