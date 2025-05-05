import db from "@/lib/db";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyAdminSession = (func: any) => {
  return async function (...args: unknown[]) {
    const session = await verifySession();

    const userFromSession = await db("user")
      .where({ id: session.userId })
      .select("role")
      .first();

    if (
      !session?.userId ||
      !userFromSession ||
      userFromSession.role !== "admin"
    ) {
      redirect("/");
    }

    return func({ userId: session.userId, args });
  };
};
