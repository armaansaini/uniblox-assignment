"use client";
import { Button } from "@/components/ui/button";
import { checkoutCart } from "../checkout/action";
import { useEffect, useState, useTransition } from "react";
import { ClientCartType } from "../cart/action";

export default function DiscountCheckoutSection({
  discount,
  cart,
}: {
  discount: { available: boolean; percentage: number };
  cart: ClientCartType[];
}) {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const discountValue = Math.round(
    (totalAmount * (discount.percentage ?? 1)) / 100
  );

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
      {discount.available ? (
        <div className="text-lg flex justify-between items-center">
          You have a discount coupon for {discount.percentage}%!{" "}
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
            <span className="pr-2 text-green-500">(-${discountValue})</span>
          ) : null}{" "}
          ${totalAmount - (isDiscountApplied ? discountValue : 0)}
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
