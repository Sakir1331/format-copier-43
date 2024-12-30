export interface Product {
  id: string;
  name: string;
  type: "كرتون" | "كيس" | "شوال" | "كيلو" | "شدة" | "custom";
  customType?: string;
  quantity: number;
  bags: number;
  size?: string | number;
  location?: string;
}