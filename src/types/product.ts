export interface Product {
  id: string;
  name: string;
  type: "كرتون" | "كيس" | "شوال" | "كيلو" | "شدة";
  quantity: number;
  bags: number;
  size?: number;
  location?: string;
}