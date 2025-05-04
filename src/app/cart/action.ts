"use server";

import db from "@/lib/db";
import { verifySession } from "@/lib/session";

export type ClientCartType = {
  cart_id: number;
  user_id: number;
  product_id: number;
  product_quantity: number;
  product_name: string;
  product_image_url: string;
  product_description: string;
  product_price: number;
};

export const getUserCart = async () => {
  const session = await verifySession();

  return db("cart")
    .where({ user_id: session.userId, status: "current" })
    .leftJoin("cart_items", "cart.id", "cart_items.cart_id")
    .leftJoin("product", "cart_items.product_id", "product.id")
    .select(
      "cart.id as cart_id",
      "cart.user_id as user_id",
      "cart_items.product_id as product_id",
      "cart_items.quantity as product_quantity",
      "product.name as product_name",
      "product.image_url as product_image_url",
      "product.description as product_description",
      "product.price as product_price"
    );
};
