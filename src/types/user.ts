export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  role: "customer" | "admin";
  active: boolean;
  updated_at: string;
  created_at: string;
};
