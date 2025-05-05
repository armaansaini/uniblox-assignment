import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserCart } from "./action";
import DiscountCheckoutSection from "../components/DiscountCheckoutSection";
import { getPromocodeAvailable } from "../checkout/action";

export default async function Cart() {
  const cart = await getUserCart();
  const promocode = await getPromocodeAvailable();

  if (!cart || cart.length === 0)
    return (
      <div className="flex w-1/2 justify-center text-neutral-500 my-4 text-lg tracking-wide leading-5 mx-auto">
        Your cart is empty
      </div>
    );

  return (
    <div className="flex flex-col w-1/2 mx-auto items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item.product_id}>
              <TableCell className="font-medium">{item.product_name}</TableCell>
              <TableCell>{item.product_quantity}</TableCell>
              <TableCell>${item.product_price}</TableCell>
              <TableCell className="text-right">
                ${item.product_price * item.product_quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DiscountCheckoutSection promocode={promocode} cart={cart} />
    </div>
  );
}
