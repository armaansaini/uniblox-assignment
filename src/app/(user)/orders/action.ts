"use server";

import db from "@/lib/db";
import { verifySession } from "@/lib/session";

export const getOrders = async () => {
  const session = await verifySession();

  const ordersFromDB = await db("order").where({ user_id: session.userId });

  return ordersFromDB;
};
