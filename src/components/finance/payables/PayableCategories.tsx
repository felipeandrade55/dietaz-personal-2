import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "lucide-react";

export const categories = [
  { id: "aluguel", name: "Aluguel", color: "bg-blue-100 text-blue-800" },
  { id: "energia", name: "Energia Elétrica", color: "bg-yellow-100 text-yellow-800" },
  { id: "agua", name: "Água", color: "bg-cyan-100 text-cyan-800" },
  { id: "internet", name: "Internet", color: "bg-purple-100 text-purple-800" },
  { id: "salarios", name: "Salários", color: "bg-pink-100 text-pink-800" },
  { id: "marketing", name: "Marketing", color: "bg-indigo-100 text-indigo-800" },
  { id: "manutencao", name: "Manutenção", color: "bg-orange-100 text-orange-800" },
  { id: "impostos", name: "Impostos", color: "bg-red-100 text-red-800" },
  { id: "seguros", name: "Seguros", color: "bg-emerald-100 text-emerald-800" },
  { id: "outros", name: "Outros", color: "bg-gray-100 text-gray-800" },
];

interface PayableCategoriesProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function PayableCategories({ value, onValueChange }: PayableCategoriesProps) {
  return (
    <div className="flex items-center gap-2">
      <Tag className="w-4 h-4" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <span className={`px-2 py-1 rounded-full text-xs ${category.color}`}>
                {category.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}