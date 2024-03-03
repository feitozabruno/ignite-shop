import Stripe from "stripe";

let stripeApiCalls = 0;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Ignite Shop",
  },
});

// Função para incrementar o contador
export function incrementStripeApiCalls() {
  stripeApiCalls++;
}

// Função para obter o número atual de chamadas
export function getStripeApiCalls() {
  return stripeApiCalls;
}

// types for products in stripe
export interface ProductData {
  id: string;
  name: string;
  imageUrl: string;
  price: string | number;
}
