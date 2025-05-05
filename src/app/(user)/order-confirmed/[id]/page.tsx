import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientOrderType, getOrderDetails } from "./action";
import Image from "next/image";

export default async function OrderConfirmedPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const orderDetails: ClientOrderType[] = await getOrderDetails(parseInt(id));
  console.log(orderDetails);
  return (
    <div className="flex flex-col w-1/2 mx-auto">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Order Id:</TableCell>
            <TableCell>{orderDetails[0].order_id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Status:</TableCell>
            <TableCell>{orderDetails[0].order_status}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Date:</TableCell>
            <TableCell>
              {new Date(orderDetails[0].order_date).toUTCString()}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Payment Id:</TableCell>
            <TableCell>{orderDetails[0].payment_id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order Final Amount:</TableCell>
            <TableCell>${orderDetails[0].order_final_amount}</TableCell>
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
          {orderDetails.map((item) => (
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
