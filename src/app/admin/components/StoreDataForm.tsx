"use client";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { updateAdminStoreData } from "../action";
import { Button } from "@/components/ui/button";

export default function StoreDataForm() {
  const [state, updateData] = useActionState(updateAdminStoreData, undefined);

  return (
    <>
      <form action={updateData}>
        <div className="flex justify-between my-5">
          <label htmlFor="orders_to_unlock_discount">
            Orders To Unlock Discount
          </label>
          <Input
            id="orders_to_unlock_discount"
            name="orders_to_unlock_discount"
            className="w-[300px]"
          />
        </div>

        <div className="flex justify-between gap-x-4 mb-5">
          <label htmlFor="discount_percentage">Discount Percentage</label>
          <Input
            id="discount_percentage"
            name="discount_percentage"
            className="w-[300px]"
          />
        </div>

        {state?.errors?.err && (
          <p className="text-red-500 my-2">{state.errors.err}</p>
        )}

        <Button type="submit">Update</Button>
      </form>
    </>
  );
}
