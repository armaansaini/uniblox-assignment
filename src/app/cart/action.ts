"use server";

import db from "@/lib/db";

export const getUserCart = async () => {
  return db("cart")
    .where({ user_id: 1, status: "current" })
    .leftJoin("cart_items", "cart.id", "cart_id")
    .leftJoin("product", "cart_items.product_id", "product.id")
    .select(
      "cart_items.product_id as product_id",
      "cart_items.quantity as quantity",
      "product.name as product_name",
      "product.image_url as product_image_url",
      "product.description as product_description",
      "product.price as product_price"
    );
};
