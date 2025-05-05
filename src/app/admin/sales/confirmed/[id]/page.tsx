import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientSaleDetailsType, getAdminSalesDetails } from "./action";
import Image from "next/image";

export default async function OrderConfirmedPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const salesDetails: ClientSaleDetailsType[] = await getAdminSalesDetails(
    parseInt(id)
  );
  return (
    <div className="flex flex-col w-1/2 mx-auto">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Order Id:</TableCell>
            <TableCell>{salesDetails[0].order_id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Customer Name:</TableCell>
            <TableCell>{salesDetails[0].customer_name}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Customer Email:</TableCell>
            <TableCell>{salesDetails[0].customer_email}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Status:</TableCell>
            <TableCell>{salesDetails[0].order_status}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Date:</TableCell>
            <TableCell>
              {new Date(salesDetails[0].order_date).toUTCString()}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Payment Id:</TableCell>
            <TableCell>{salesDetails[0].order_payment_id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Total Amount:</TableCell>
            <TableCell>${salesDetails[0].order_total_amount}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Discount Applied:</TableCell>
            <TableCell>
              {salesDetails[0].order_discount_applied
                ? `-$${salesDetails[0].order_discount_applied}`
                : "-"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Final Amount:</TableCell>
            <TableCell>${salesDetails[0].order_final_amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead />
            <TableHead className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesDetails.map((item) => (
            <TableRow key={item.order_product_id}>
              <TableCell className="w-[70px]">
                <Image
                  src={item.order_product_image_url}
                  width={50}
                  height={50}
                  alt={item.order_product_name}
                  className="object-contain"
                />
              </TableCell>
              <TableCell className="font-medium">
                {item.order_product_name}
              </TableCell>
              <TableCell className="font-medium text-right">
                {item.order_product_quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
