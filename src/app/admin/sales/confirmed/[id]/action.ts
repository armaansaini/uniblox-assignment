"use server";

import { verifyAdminSession } from "@/app/admin/util/verifyAdminSession";
import db from "@/lib/db";

export type ClientSaleDetailsType = {
  order_id: number;
  user_id: number;
  customer_name: string;
  customer_email: string;
  order_item_id: number;
  order_date: string;
  order_status: string;
  order_payment_id: string;
  order_total_amount: number;
  order_discount_applied: number;
  order_final_amount: number;
  order_product_id: number;
  order_product_quantity: number;
  order_product_name: string;
  order_product_image_url: string;
  promocode: string;
};

const getSalesDetails = async (params: { userId: number; args: [number] }) => {
  const saleId = params.args[0];

  return db("order")
    .where({ "order.id": saleId })
    .leftJoin("order_item", "order_item.order_id", "order.id")
    .leftJoin("product", "order_item.product_id", "product.id")
    .leftJoin("user", "order.user_id", "user.id")
    .leftJoin("promocode", "order.promocode_id", "promocode.id")
    .select(
      "order.id as order_id",
      "user.id as user_id",
      "order_item.id as order_item_id",
      "user.name as customer_name",
      "user.email as customer_email",
      "order.order_date as order_date",
      "order.status as order_status",
      "order.payment_id as order_payment_id",
      "order.total_amount as order_total_amount",
      "order.discount_applied as order_discount_applied",
      "order.final_amount as order_final_amount",
      "order_item.product_id as order_product_id",
      "order_item.quantity as order_product_quantity",
      "product.name as order_product_name",
      "product.image_url as order_product_image_url",
      "promocode.code as promocode"
    );
};

export const getAdminSalesDetails = verifyAdminSession(getSalesDetails);
