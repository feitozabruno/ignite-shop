import type { NextApiRequest, NextApiResponse } from "next";

import { stripe, ProductData } from "@/src/lib/stripe";

import { Stripe } from "stripe";

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse<ProductData[]>
) {
  const getProducts = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const productList = getProducts.data.map((product) => {
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

  return res.status(200).json(productList);
}
