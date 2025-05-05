"use server";

import db from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { UserType } from "@/types/user";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const userFromDB: UserType = await db("user")
    .where({ email })
    .select("*")
    .first();

  if (!userFromDB || password !== userFromDB.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(userFromDB.id.toString());

  if (userFromDB.role === "customer") return redirect("/products");
  else return redirect("/admin");
}

export async function logout() {
  await deleteSession();
  return redirect("/");
}
