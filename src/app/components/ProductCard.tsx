"use client";
import { useState } from "react";

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

export default function ProductCard({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <Card key={product.id} className="pt-0.5 w-[250px]">
      <CardHeader className="px-0 flex h-50 flex-col items-center">
        <Image
          src={product.image_url ?? ""}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain"
        />
        <CardTitle className="text-left w-full px-4">
          <>{product.name}</>
        </CardTitle>
        <CardDescription className="text-left w-full px-4">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between h-15">
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
          onClick={() => handleAddToCart({ product_id: product.id, quantity })}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
