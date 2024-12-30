import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import "@fontsource/tajawal";

interface Product {
  id: string;
  name: string;
  type: "كرتون" | "كيس" | "شوال" | "كيلو";
  quantity: number;
  bags: number;
  size?: number;
  location?: string;
}

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const { toast } = useToast();

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
    }
  };

  // Copy final text
  const copyFinalText = () => {
    const text = products
      .map((product) => {
        let text = `${product.name} `;
        
        if (product.quantity === 0 && product.bags === 0) {
          return `${product.name} 0`;
        }

        if (product.quantity > 0) {
          text += `${product.quantity} ${product.type}`;
          if (product.bags > 0) {
            text += ` و ${product.bags} ${
              product.bags > 10 ? "اكياس" : "كيس"
            }`;
          }
        } else if (product.bags > 0) {
          text += `${product.bags} ${product.bags > 10 ? "اكياس" : "كيس"}`;
        }

        if (product.size) {
          text += ` رقم ${product.size}`;
        }

        return text;
      })
      .join("\n");

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

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المنتج</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">الكمية</TableHead>
              <TableHead className="text-right">الأكياس</TableHead>
              <TableHead className="text-right">الحجم</TableHead>
              <TableHead className="text-right">الموقع</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.bags}</TableCell>
                <TableCell>{product.size || "-"}</TableCell>
                <TableCell>{product.location || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setProducts(products.filter((p) => p.id !== product.id));
                      toast({
                        title: "تم الحذف",
                        description: "تم حذف المنتج بنجاح",
                      });
                    }}
                  >
                    🗑️
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="fixed bottom-4 left-4 space-x-2 rtl:space-x-reverse">
        <Button
          onClick={copyFinalText}
          className="rounded-full shadow-lg"
          size="icon"
        >
          📋
        </Button>
        <Button
          onClick={() => {
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
          }}
          className="rounded-full shadow-lg"
          size="icon"
        >
          ➕
        </Button>
      </div>
    </div>
  );
}