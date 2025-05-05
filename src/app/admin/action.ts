"use server";

import db from "@/lib/db";
import { verifyAdminSession } from "./util/verifyAdminSession";
import { redirect } from "next/navigation";

const getStoreData = async () => {
  // right now we have one store only, so the store id is used as 1
  return db("store_data").where({ id: 1 }).first();
};

const updateStoreData = async (params: {
  userId: number;
  args: [unknown, FormData];
}) => {
  const formData = params.args[1];
  const orders_to_unlock_discount = await formData.get(
    "orders_to_unlock_discount"
  );
  const discount_percentage = await formData.get("discount_percentage");

  const checkNumber = (value: number) =>
    typeof value === "number" && !isNaN(Number(value));

  if (
    !orders_to_unlock_discount ||
    !discount_percentage ||
    !checkNumber(parseInt(orders_to_unlock_discount as string)) ||
    !checkNumber(parseInt(discount_percentage as string))
  ) {
    return {
      errors: {
        err: "Invalid Data",
      },
    };
  }

  if (parseInt(discount_percentage as string) >= 100) {
    return {
      errors: {
        err: "Discount Percentage cannot be 100 or more.",
      },
    };
  }

  await db("store_data").where({ id: 1 }).update({
    orders_to_unlock_discount,
    discount_percentage,
  });

  return redirect("/admin");
};

export const getAdminStoreData = verifyAdminSession(getStoreData);
export const updateAdminStoreData = verifyAdminSession(updateStoreData);
