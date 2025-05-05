import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="text-xl tracking-wider leading-5">
        Fruits Basket Store
      </div>

      <div className="flex flex-col my-5 gap-y-2">
        <Link href="/products">
          <Button className="w-[200px]">Browse Products</Button>
        </Link>

        <Link href="/login">
          <Button className="w-[200px]">Login</Button>
        </Link>
      </div>
    </div>
  );
}
