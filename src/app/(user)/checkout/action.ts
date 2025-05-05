"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ClientCartType } from "../cart/action";
import { OrderType } from "@/types/order";
import { verifySession } from "@/lib/session";

export const getDiscountAvailable = async () => {
  const session = await verifySession();

  // using store id = 1 because there is only one store for simplicity
  const storeData = await db("store_data").where({ id: 1 }).first();

  const lastDiscountAppliedOrder: OrderType = await db("order")
    .where({ user_id: session.userId })
    .whereNot("discount_applied", "=", 0)
    .orderBy("id", "desc")
    .first();

  const lastDiscountAppliedOrderDate = lastDiscountAppliedOrder?.order_date;

  let orderCount = 0;
  if (!lastDiscountAppliedOrder) {
    orderCount = (await db("order")
      .where({ user_id: session.userId })
      .count("id as count")
      .then((res) => res[0].count)) as number;
  } else {
    orderCount = (await db("order")
      .where({ user_id: session.userId })
      .where("order_date", ">", lastDiscountAppliedOrderDate)
      .count("id as count")
      .then((res) => res[0].count)) as number;
  }

  return {
    available: orderCount >= storeData.orders_to_unlock_discount,
    percentage: storeData.discount_percentage,
  };
};

export const checkoutCart = async ({
  cart,
  isDiscountApplied,
}: {
  cart: ClientCartType[];
  isDiscountApplied: boolean;
}) => {
  const session = await verifySession();

  const discount = await getDiscountAvailable();

  const total_amount = cart.reduce((prev: number, curr) => {
    prev += curr.product_price * curr.product_quantity;
    return prev;
  }, 0);

  let discount_applied = 0;

  console.log({ discount });

  if (isDiscountApplied && discount.available) {
    discount_applied = Math.round((total_amount * discount.percentage) / 100);
  }

  const final_amount = total_amount - discount_applied;

  const order = {
    user_id: session.userId,
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
