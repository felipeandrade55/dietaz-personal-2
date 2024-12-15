import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PayableStatus } from "./PayableStatus";

interface Payable {
  id: number;
  description: string;
  dueDate: string;
  value: number;
  status: "pendente" | "parcial" | "pago" | "atrasado" | "cancelado";
  category: string;
  recurrence: string;
}

interface PayablesTableProps {
  payables: Payable[];
}

export function PayablesTable({ payables }: PayablesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Recorrência</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payables.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.description}</TableCell>
            <TableCell className="capitalize">{item.category}</TableCell>
            <TableCell>
              {new Date(item.dueDate).toLocaleDateString('pt-BR')}
            </TableCell>
            <TableCell>R$ {item.value.toFixed(2)}</TableCell>
            <TableCell className="capitalize">{item.recurrence}</TableCell>
            <TableCell>
              <PayableStatus status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}