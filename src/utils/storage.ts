import { Product } from "@/types/product";
import { defaultProducts } from "@/data";

export const loadProducts = (): Product[] => {
  if (typeof window === "undefined") return defaultProducts;
  const saved = localStorage.getItem("products");
  return saved ? JSON.parse(saved) : defaultProducts;
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products));
  }
};

export const loadDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("darkMode") === "true";
};

export const saveDarkMode = (isDark: boolean): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("darkMode", String(isDark));
    document.documentElement.classList.toggle("dark", isDark);
  }
};