export type ProductType = {
  id: number;
  name: string;
  slug_name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category: string;
  active: boolean;
  updated_at: string;
  created_at: string;
};
