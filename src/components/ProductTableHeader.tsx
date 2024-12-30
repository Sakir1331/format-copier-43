import { ArrowDownAZ, ArrowDownWideNarrow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProductTableHeaderProps {
  onSortByQuantity: () => void;
  onSortByName: () => void;
}

export default function ProductTableHeader({ onSortByQuantity, onSortByName }: ProductTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="hover:bg-muted/50">
        <TableHead className="text-right flex items-center justify-between">
          <span>المنتج</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onSortByName}
                  className="h-8 w-8"
                >
                  <ArrowDownAZ className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ترتيب حسب الأبجدية</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead className="text-right">النوع</TableHead>
        <TableHead className="text-right flex items-center justify-between">
          <span>الكمية</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onSortByQuantity}
                  className="h-8 w-8"
                >
                  <ArrowDownWideNarrow className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ترتيب حسب الكمية</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead className="text-right">الأكياس</TableHead>
        <TableHead className="text-right">الحجم</TableHead>
        <TableHead className="text-right">الموقع</TableHead>
        <TableHead className="text-right">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
}