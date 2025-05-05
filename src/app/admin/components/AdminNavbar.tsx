"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="flex px-4 justify-between items-center h-20 border-b border-b-neutral-500 shadow-md">
      <Link href="/products">
        <div className="flex text-xl tracking-wider leading-5">
          Welcome to Fruits Basket
        </div>
      </Link>

      <div className="flex gap-x-2">
        <Link href="/admin">
          <Button className="relative">Edit Store</Button>
        </Link>
        <Link href="/admin/sales">
          <Button className="relative">Sales</Button>
        </Link>
        <Link href="/products">
          <Button className="relative">Go To Store</Button>
        </Link>
      </div>
    </div>
  );
}
