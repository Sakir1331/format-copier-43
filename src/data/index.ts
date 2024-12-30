import { foodProducts } from "./products/food";
import { drinksProducts } from "./products/drinks";
import { packagingProducts } from "./products/packaging";
import { Product } from "@/types/product";

export const defaultProducts: Product[] = [
  ...foodProducts,
  ...drinksProducts,
  ...packagingProducts,
];