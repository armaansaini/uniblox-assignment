import { Button } from "@/components/ui/button";

export default function DiscountCheckoutSection() {
  return (
    <div className="flex flex-col">
      <div>
        You have a discount coupon for 10%!{" "}
        <Button className="bg-green-500">Apply</Button>
      </div>
      <Button className="justify-self-end mt-5">Proceed To Checkout</Button>
    </div>
  );
}
