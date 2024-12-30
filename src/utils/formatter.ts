import { Product } from "@/types/product";

export const formatProductText = (product: Product): string => {
  if (product.quantity === 0 && product.bags === 0) {
    return `${product.name} 0`;
  }

  let text = product.name;
  const type = product.type === "custom" ? product.customType : product.type;

  if (product.quantity > 0) {
    text += ` ${product.quantity} ${type}`;
    if (product.bags > 0) {
      text += ` و ${product.bags} ${product.bags > 10 ? "اكياس" : "كيس"}`;
    }
  } else if (product.bags > 0) {
    text += ` ${product.bags} ${product.bags > 10 ? "اكياس" : "كيس"}`;
  }

  if (product.size) {
    text += ` رقم ${product.size}`;
  }

  return text;
};

export const formatFinalText = (products: Product[]): string => {
  return products.map(formatProductText).join("\n");
};