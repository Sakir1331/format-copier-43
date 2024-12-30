import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import "@fontsource/tajawal";

interface Product {
  id: string;
  name: string;
  type: "كرتون" | "كيس" | "شوال" | "كيلو" | "شدة";
  quantity: number;
  bags: number;
  size?: number;
  location?: string;
}

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

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
    }
  };

  // Add new product
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

  // Update product
  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, [field]: value };
      }
      return product;
    }));
  };

  // Delete product
  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج بنجاح",
    });
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
            text += ` و ${product.bags} ${product.bags > 10 ? "اكياس" : "كيس"}`;
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
                <TableCell>
                  <Input
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={product.type}
                    onValueChange={(value) => updateProduct(product.id, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="كرتون">كرتون</SelectItem>
                      <SelectItem value="كيس">كيس</SelectItem>
                      <SelectItem value="شوال">شوال</SelectItem>
                      <SelectItem value="كيلو">كيلو</SelectItem>
                      <SelectItem value="شدة">شدة</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateProduct(product.id, "quantity", product.quantity + 1)}
                    >
                      +
                    </Button>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(product.id, "quantity", Number(e.target.value))}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateProduct(product.id, "quantity", Math.max(0, product.quantity - 1))}
                    >
                      -
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateProduct(product.id, "bags", product.bags + 1)}
                    >
                      +
                    </Button>
                    <Input
                      type="number"
                      value={product.bags}
                      onChange={(e) => updateProduct(product.id, "bags", Number(e.target.value))}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateProduct(product.id, "bags", Math.max(0, product.bags - 1))}
                    >
                      -
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.size || ""}
                    onChange={(e) => updateProduct(product.id, "size", Number(e.target.value))}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={product.location || ""}
                    onChange={(e) => updateProduct(product.id, "location", e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteProduct(product.id)}
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