"use client";
import { useState, useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/product";
import { handleAddToCart } from "../products/action";
import Spinner from "./Spinner";

export default function ProductCard({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, startTransition] = useTransition();

  return (
    <Card key={product.id} className="pt-0.5 w-[250px]">
      <CardHeader className="px-0 h-80 flex flex-col items-center">
        <Image
          src={product.image_url ?? ""}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain min-h-[200px] max-h-[200px]"
        />
        <CardTitle className="text-left w-full px-4">
          <>{product.name}</>
        </CardTitle>
        <CardDescription className="text-left line-clamp-4 w-full px-4">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between h-10">
        <div>${product.price}</div>
        <div className="flex">
          <Button
            className="w-[30px] h-[30px] rounded-r-none"
            onClick={() =>
              setQuantity((q) => {
                if (q > 1) return q - 1;
                return 1;
              })
            }
          >
            -
          </Button>
          <span className="flex items-center justify-center w-[30px] h-[30px] border-t border-b">
            {quantity}
          </span>
          <Button
            className="w-[30px] h-[30px] rounded-l-none"
            onClick={() =>
              setQuantity((q) => {
                if (q < 10) return q + 1;
                return 10;
              })
            }
          >
            +
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          className="w-[100px]"
          disabled={isLoading}
          onClick={() =>
            startTransition(() =>
              handleAddToCart({ product_id: product.id, quantity })
            )
          }
        >
          {isLoading ? <Spinner /> : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
