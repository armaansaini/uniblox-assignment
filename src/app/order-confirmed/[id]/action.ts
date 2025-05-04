"use server";

import db from "@/lib/db";

export type ClientOrderType = {
  order_id: number;
  order_date: string;
  order_status: string;
  order_final_amount: number;
  payment_id: string;
  order_product_id: number;
  order_product_quantity: number;
  order_product_name: string;
  order_product_image_url: string;
};

export const getOrderDetails = async (orderId: number) => {
  return db("order")
    .where({ "order.id": orderId })
    .leftJoin("order_item", "order.id", "order_item.order_id")
    .leftJoin("product", "order_item.product_id", "product.id")
    .select(
      "order.id as order_id",
      "order_item.id as order_item_id",
      "order.order_date as order_date",
      "order.status as order_status",
      "order.payment_id as payment_id",
      "order.final_amount as order_final_amount",
      "order_item.product_id as order_product_id",
      "order_item.quantity as order_product_quantity",
      "product.name as order_product_name",
      "product.image_url as order_product_image_url"
    );
};
