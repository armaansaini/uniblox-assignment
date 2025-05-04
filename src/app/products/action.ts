"use server";

import db from "@/lib/db";

export const getProducts = async () => {
  return db("product").select("*");
};

export const handleAddToCart = async ({ product_id, quantity }) => {
  let userCartFromDB = await db("cart")
    .where({
      user_id: 1,
      status: "current",
    })
    .first();

  // if no current cart, add one
  if (!userCartFromDB) {
    userCartFromDB = await db("cart")
      .insert({ user_id: 1, status: "current" })
      .returning("*");
  }

  // check if the product already in cart
  const productFromCart = await db("cart_items")
    .where({
      cart_id: userCartFromDB.id,
      product_id,
      active: true,
    })
    .first();

  // if product present update the quantity
  if (productFromCart) {
    console.log("item was present soo updating");
    return db("cart_items")
      .where({ id: productFromCart.id })
      .update({ quantity });
  }

  // else add the product
  console.log("item wasn't there so adding");
  return db("cart_items").insert({
    cart_id: userCartFromDB.id,
    product_id,
    quantity,
  });
};
