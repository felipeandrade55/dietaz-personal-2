import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export function ReceivablesFilter() {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Input
          placeholder="Buscar por nome ou descrição"
          className="max-w-sm pl-10"
          type="search"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="paid">Pagos</SelectItem>
          <SelectItem value="overdue">Atrasados</SelectItem>
          <SelectItem value="partial">Parciais</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}