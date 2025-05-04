"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ClientCartType } from "../cart/action";

export const getDiscountAvailable = async () => {};

export const checkoutCart = async ({
  cart,
  isDiscountApplied,
}: {
  cart: ClientCartType[];
  isDiscountApplied: boolean;
}) => {
  const total_amount = cart.reduce((prev: number, curr) => {
    prev += curr.product_price * curr.product_quantity;
    return prev;
  }, 0);

  let discount_applied = 0;

  if (isDiscountApplied) {
    discount_applied = Math.round((total_amount * 10) / 100);
  }

  const final_amount = total_amount - discount_applied;

  const order = {
    user_id: 1,
    order_date: new Date().toISOString(),
    status: "payment_captured",
    total_amount,
    discount_applied,
    final_amount,
    shipping_address: "user shipping address",
    payment_id: uuidv4(), // in prod app, it will be returned by the payment provider
    payment_partner: "wallet",
  };

  const cartId = cart[0].cart_id;

  const orderCreated = await db("order").insert(order).returning("*");

  // add order items
  cart.forEach(async (item: ClientCartType) => {
    await db("order_item").insert({
      order_id: orderCreated[0].id,
      product_id: item.product_id,
      quantity: item.product_quantity,
      price: item.product_price,
    });
  });

  // mark the cart as checked out
  await db("cart").where({ id: cartId }).update({ status: "checked_out" });

  return redirect(`/order-confirmed/${orderCreated[0].id}`);
};
