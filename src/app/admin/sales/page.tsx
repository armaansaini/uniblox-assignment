import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { ClientSaleType, getAdminSales } from "./action";

export default async function SalesPage() {
  const sales: ClientSaleType[] = await getAdminSales();

  if (!sales || sales.length === 0)
    return (
      <div className="flex w-1/2 justify-center text-neutral-500 my-4 text-lg tracking-wide leading-5 mx-auto">
        You have no sales
      </div>
    );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Promocode</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.order_id}>
              <TableCell>{sale.order_id}</TableCell>
              <TableCell>{sale.customer_name}</TableCell>
              <TableCell>{sale.customer_email}</TableCell>
              <TableCell className="font-medium">
                {new Date(sale.order_date).toUTCString()}
              </TableCell>
              <TableCell>{sale.status}</TableCell>
              <TableCell className="text-green-700">{sale.promocode}</TableCell>
              <TableCell>${sale.final_amount}</TableCell>
              <TableCell>
                <Link href={`/admin/sales/confirmed/${sale.order_id}`}>
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
