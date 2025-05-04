"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "../action";

export default function Navbar() {
  return (
    <div className="flex px-4 justify-between items-center h-20 border-b border-b-neutral-500 shadow-md">
      <div className="flex items-center text-xl tracking-wider leading-5">
        Welcome to Ecom Website
      </div>

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
