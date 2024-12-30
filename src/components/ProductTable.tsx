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
import { Product } from "@/types/product";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Minus, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  updateProduct: (id: string, field: keyof Product, value: any) => void;
  deleteProduct: (id: string) => void;
}

export default function ProductTable({ products, updateProduct, deleteProduct }: ProductTableProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
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
            <TableRow key={product.id} className="hover:bg-muted/50">
              <TableCell>
                <Input
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                  className="w-full"
                  placeholder="اسم المنتج"
                />
              </TableCell>
              <TableCell>
                {product.type === "custom" ? (
                  <Input
                    value={product.customType || ""}
                    onChange={(e) => updateProduct(product.id, "customType", e.target.value)}
                    className="w-full"
                    placeholder="نوع مخصص"
                  />
                ) : (
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
                      <SelectItem value="custom">تخصيص</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateProduct(product.id, "quantity", product.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>زيادة الكمية</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateProduct(product.id, "quantity", Number(e.target.value))}
                    className="w-20 text-center"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateProduct(product.id, "quantity", Math.max(0, product.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>تقليل الكمية</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateProduct(product.id, "bags", product.bags + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>زيادة الأكياس</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Input
                    type="number"
                    value={product.bags}
                    onChange={(e) => updateProduct(product.id, "bags", Number(e.target.value))}
                    className="w-20 text-center"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateProduct(product.id, "bags", Math.max(0, product.bags - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>تقليل الأكياس</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.size || ""}
                  onChange={(e) => updateProduct(product.id, "size", Number(e.target.value))}
                  className="w-20"
                  placeholder="الحجم"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={product.location || ""}
                  onChange={(e) => updateProduct(product.id, "location", e.target.value)}
                  className="w-full"
                  placeholder="الموقع"
                />
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteProduct(product.id)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>حذف المنتج</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}