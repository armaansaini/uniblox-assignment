import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getOrders } from "./action";
import { OrderType } from "@/types/order";
import Link from "next/link";

export default async function OrdersPage() {
  const orders: OrderType[] = await getOrders();

  if (!orders || orders.length === 0)
    return (
      <div className="flex w-1/2 justify-center text-neutral-500 my-4 text-lg tracking-wide leading-5 mx-auto">
        You have no orders
      </div>
    );

  return (
    <div className="flex w-1/2 mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="font-medium">
                {new Date(order.order_date).toUTCString()}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>${order.final_amount}</TableCell>
              <TableCell>
                <Link href={`/order-confirmed/${order.id}`}>
                  <Button>Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
