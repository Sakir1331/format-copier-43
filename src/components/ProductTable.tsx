import { Table, TableBody } from "@/components/ui/table";
import { Product } from "@/types/product";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
  products: Product[];
  updateProduct: (id: string, field: keyof Product, value: any) => void;
  deleteProduct: (id: string) => void;
  onSortByQuantity: () => void;
  onSortByName: () => void;
}

export default function ProductTable({ 
  products, 
  updateProduct, 
  deleteProduct,
  onSortByQuantity,
  onSortByName
}: ProductTableProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <ProductTableHeader 
          onSortByQuantity={onSortByQuantity}
          onSortByName={onSortByName}
        />
        <TableBody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}