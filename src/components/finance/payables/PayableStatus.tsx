import { Badge } from "@/components/ui/badge";

export const payableStatuses = {
  pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  parcial: { label: "Parcialmente Pago", color: "bg-blue-100 text-blue-800" },
  pago: { label: "Pago", color: "bg-green-100 text-green-800" },
  atrasado: { label: "Atrasado", color: "bg-red-100 text-red-800" },
  cancelado: { label: "Cancelado", color: "bg-gray-100 text-gray-800" },
};

interface PayableStatusProps {
  status: keyof typeof payableStatuses;
}

export function PayableStatus({ status }: PayableStatusProps) {
  const statusConfig = payableStatuses[status];
  
  return (
    <Badge variant="outline" className={`${statusConfig.color}`}>
      {statusConfig.label}
    </Badge>
  );
}