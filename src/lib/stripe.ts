import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Ignite Shop",
  },
});

// types for products in stripe
export interface ProductData {
  id: string;
  name: string;
  imageUrl: string;
  price: string | number;
}
