export type OrderType = {
  id: number;
  user_id: number;
  order_date: string;
  status: "pending" | "payment_captured" | "shipped" | "delivered";
  total_amount: number;
  discount_applied: number;
  final_amount: number;
  shipping_address: string;
  payment_id: string;
  payment_partner: "stripe" | "razorpay" | "wallet";
  updated_at: string;
  created_at: string;
};

export type OrderItemsType = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  updated_at: string;
  created_at: string;
};
