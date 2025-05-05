"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "../../login/action";

export default function Navbar() {
  return (
    <div className="flex px-4 justify-between items-center h-20 border-b border-b-neutral-500 shadow-md">
      <Link href="/products">
        <div className="flex text-xl tracking-wider leading-5">
          Welcome to Fruits Basket
        </div>
      </Link>

      <div className="flex gap-x-2">
        <Link href="/orders">
          <Button className="relative">My Orders</Button>
        </Link>
        <Link href="/cart">
          <Button className="relative">Go to Cart</Button>
        </Link>
        <Button variant="outline" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
