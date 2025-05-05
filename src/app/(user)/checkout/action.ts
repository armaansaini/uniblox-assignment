"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ClientCartType } from "../cart/action";
import { OrderType } from "@/types/order";
import { verifySession } from "@/lib/session";
import crypto from "crypto";

export const getPromocodeAvailable = async () => {
  const session = await verifySession();

  const promocode = await db("promocode")
    .where({
      user_id: session.userId,
      active: true,
    })
    .first();

  return promocode ?? {};
};

export const checkoutCart = async ({
  cart,
  promocode,
}: {
  cart: ClientCartType[];
  promocode: string;
}) => {
  const session = await verifySession();

  const promocodeFromDB = await db("promocode")
    .where({
      code: promocode || "",
      user_id: session.userId,
      active: true,
    })
    .first();

  const total_amount = cart.reduce((prev: number, curr) => {
    prev += curr.product_price * curr.product_quantity;
    return prev;
  }, 0);

  let discount_applied = 0;

  if (promocode && promocodeFromDB && promocodeFromDB.active) {
    discount_applied = Math.round(
      (total_amount * promocodeFromDB.discount_percentage) / 100
    );
  }

  const final_amount = total_amount - discount_applied;

  const order = {
    user_id: session.userId,
    order_date: new Date().toISOString(),
    status: "payment_captured",
    total_amount,
    discount_applied,
    promocode_id: promocodeFromDB?.id ?? null,
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

  // mark the promocode as used
  if (promocodeFromDB?.id) {
    await db("promocode")
      .where({ id: promocodeFromDB.id })
      .update({ active: false });
  }

  const discountAvailable = await db("promocode").where({
    user_id: session.userId,
    active: true,
  });

  // create a discount code for the user if eligible
  if (discountAvailable.length === 0)
    await createUserDiscount({ userId: session.userId as number });

  return redirect(`/order-confirmed/${orderCreated[0].id}`);
};

const createUserDiscount = async ({ userId }: { userId: number }) => {
  // using store id = 1 because there is only one store for simplicity
  const storeData = await db("store_data").where({ id: 1 }).first();

  const lastDiscountAppliedOrder: OrderType = await db("order")
    .where({ user_id: userId })
    .whereNot("discount_applied", "=", 0)
    .orderBy("id", "desc")
    .first();

  const lastDiscountAppliedOrderDate = lastDiscountAppliedOrder?.order_date;

  let orderCount = 0;
  if (!lastDiscountAppliedOrder) {
    orderCount = (await db("order")
      .where({ user_id: userId })
      .count("id as count")
      .then((res) => res[0].count)) as number;
  } else {
    orderCount = (await db("order")
      .where({ user_id: userId })
      .where("order_date", ">", lastDiscountAppliedOrderDate)
      .count("id as count")
      .then((res) => res[0].count)) as number;
  }

  if (orderCount >= storeData.orders_to_unlock_discount) {
    await db("promocode").insert({
      user_id: userId,
      code: generateRandomString(),
      discount_percentage: storeData.discount_percentage,
    });
  }
};

function generateRandomString(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.randomBytes(length);
  const result = Array.from(bytes, (byte) => chars[byte % chars.length]).join(
    ""
  );
  return result;
}
