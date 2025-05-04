export type CartType = {
  id: number;
  user_id: number;
  status: "current" | "checked_out";
  updated_at: string;
  created_at: string;
};

export type CartItemsType = {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  active: boolean;
  updated_at: string;
  created_at: string;
};
