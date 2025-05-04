import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { getTotalCartItems } from "../cart/action";

export default async function Navbar() {
  // const cartItems = await getTotalCartItems();

  return (
    <div className="flex px-4 justify-between items-center h-20 border-b border-b-neutral-500 shadow-md">
      <div className="flex items-center text-xl tracking-wider leading-5">
        Welcome to Ecom Website
      </div>

      <div className="flex gap-x-2">
        <Link href="/cart">
          <Button className="relative">
            Go to Cart
            {/* {cartItems !== 0 ? (
              <div className="absolute top-[-5px] right-[-5px] px-1 py-0.5 text-xs bg-red-500 rounded-full">
                {cartItems}
              </div>
            ) : null} */}
          </Button>
        </Link>
        <Button variant="outline">Logout</Button>
      </div>
    </div>
  );
}
