import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import "@fontsource/tajawal";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/types/product";
import { formatFinalText } from "@/utils/textFormatter";

export default function Index() {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("products");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
    }
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      type: "كرتون",
      quantity: 0,
      bags: 0,
    };
    setProducts([...products, newProduct]);
    toast({
      title: "تمت الإضافة",
      description: "تم إضافة منتج جديد",
    });
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, [field]: value };
      }
      return product;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج بنجاح",
    });
  };

  const copyFinalText = () => {
    const text = formatFinalText(products);
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النص إلى الحافظة",
    });
  };

  return (
    <div dir="rtl" className="container mx-auto p-4 font-[Tajawal]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المخزون</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {darkMode ? "🌞" : "🌙"}
        </Button>
      </div>

      <ProductTable
        products={products}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />

      <div className="fixed bottom-4 left-4 space-x-2 rtl:space-x-reverse">
        <Button
          onClick={copyFinalText}
          className="rounded-full shadow-lg"
          size="icon"
        >
          📋
        </Button>
        <Button
          onClick={addProduct}
          className="rounded-full shadow-lg"
          size="icon"
        >
          ➕
        </Button>
      </div>
    </div>
  );
}