"use server";

import db from "@/lib/db";
import { verifyAdminSession } from "../util/verifyAdminSession";

export type ClientSaleType = {
  order_id: number;
  user_id: number;
  customer_name: string;
  customer_email: string;
  order_date: string;
  final_amount: number;
  status: string;
  discount_applied: number;
};

const getSales = async () => {
  return db("order")
    .leftJoin("user", "order.user_id", "user.id")
    .select(
      "order.id as order_id",
      "user.id as user_id",
      "user.name as customer_name",
      "user.email as customer_email",
      "order.order_date as order_date",
      "order.final_amount as final_amount",
      "order.status as status",
      "order.discount_applied as discount_applied"
    );
};

export const getAdminSales = verifyAdminSession(getSales);
