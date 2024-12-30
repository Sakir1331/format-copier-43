import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import "@fontsource/tajawal";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/types/product";
import { formatFinalText } from "@/utils/formatter";
import { loadProducts, saveProducts, loadDarkMode, saveDarkMode } from "@/utils/storage";
import { Copy, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import HeaderActions from "@/components/HeaderActions";

export default function Index() {
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [darkMode, setDarkMode] = useState(loadDarkMode);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    saveDarkMode(newMode);
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

  const sortByQuantity = () => {
    const sorted = [...products].sort((a, b) => 
      sortDirection === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
    );
    setProducts(sorted);
    toast({
      title: "تم الترتيب",
      description: "تم ترتيب المنتجات حسب الكمية",
    });
  };

  const sortByName = () => {
    const sorted = [...products].sort((a, b) => 
      sortDirection === "asc" 
        ? a.name.localeCompare(b.name, 'ar')
        : b.name.localeCompare(a.name, 'ar')
    );
    setProducts(sorted);
    toast({
      title: "تم الترتيب",
      description: "تم ترتيب المنتجات حسب الأبجدية",
    });
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => {
      const newDirection = prev === "asc" ? "desc" : "asc";
      const currentProducts = [...products];
      const sorted = currentProducts.reverse();
      setProducts(sorted);
      
      toast({
        title: "تم تغيير اتجاه الترتيب",
        description: newDirection === "asc" ? "الترتيب تصاعدي" : "الترتيب تنازلي",
      });
      
      return newDirection;
    });
  };

  return (
    <div dir="rtl" className="container mx-auto p-4 font-[Tajawal]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">إدارة المخزون</h1>
        </div>
        <HeaderActions 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          toggleSortDirection={toggleSortDirection}
        />
      </div>

      <ProductTable
        products={products}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        onSortByQuantity={sortByQuantity}
        onSortByName={sortByName}
      />

      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={copyFinalText}
                className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
                size="icon"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>نسخ النص النهائي</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="fixed bottom-4 left-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={addProduct}
                className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إضافة منتج جديد</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
