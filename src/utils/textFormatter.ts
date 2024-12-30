import { Product } from "@/types/product";

export function formatProductText(product: Product): string {
  if (product.quantity === 0 && product.bags === 0) {
    return `${product.name} 0`;
  }

  let text = product.name;

  if (product.quantity > 0) {
    text += ` ${product.quantity} ${product.type}`;
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
}

export function formatFinalText(products: Product[]): string {
  return products.map(formatProductText).join("\n");
}