"use client";
import { Button } from "@/components/ui/button";
import { checkoutCart } from "../checkout/action";
import { useEffect, useState, useTransition } from "react";
import { ClientCartType } from "../cart/action";

export default function DiscountCheckoutSection({
  isDiscountAvailable,
  cart,
}: {
  isDiscountAvailable: boolean;
  cart: ClientCartType[];
}) {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const discount = Math.round((totalAmount * 10) / 100);

  useEffect(() => {
    const total_amount = cart.reduce((prev: number, curr) => {
      prev += curr.product_quantity * curr.product_price;
      return prev;
    }, 0);
    setTotalAmount(total_amount);
    console.log(cart, total_amount);
  }, [cart]);

  return (
    <div className="flex flex-col w-3/4">
      {isDiscountAvailable ? (
        <div className="text-lg flex justify-between items-center">
          You have a discount coupon for 10%!{" "}
          <Button
            className="bg-green-500 hover:bg-green-700"
            onClick={() => setIsDiscountApplied((s) => !s)}
          >
            {isDiscountApplied ? "Remove" : "Apply"}
          </Button>
        </div>
      ) : null}

      <div className="flex my-2 justify-between items-center">
        <div>Total Price: </div>
        <div>
          {isDiscountApplied ? (
            <span className="pr-2 text-green-500">(-${discount})</span>
          ) : null}{" "}
          ${totalAmount - (isDiscountApplied ? discount : 0)}
        </div>
      </div>
      <Button
        disabled={isPending}
        className="mt-5 w-fit self-end"
        onClick={() =>
          startTransition(() =>
            checkoutCart({
              cart,
              isDiscountApplied,
            })
          )
        }
      >
        Proceed To Checkout
      </Button>
    </div>
  );
}
