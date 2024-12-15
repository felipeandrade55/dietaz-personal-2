import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Repeat } from "lucide-react";

export const recurrenceOptions = [
  { id: "none", name: "Sem recorrência" },
  { id: "daily", name: "Diária" },
  { id: "weekly", name: "Semanal" },
  { id: "monthly", name: "Mensal" },
  { id: "yearly", name: "Anual" },
];

interface PayableRecurrenceProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function PayableRecurrence({ value, onValueChange }: PayableRecurrenceProps) {
  return (
    <div className="flex items-center gap-2">
      <Repeat className="w-4 h-4" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Recorrência" />
        </SelectTrigger>
        <SelectContent>
          {recurrenceOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}