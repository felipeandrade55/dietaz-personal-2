import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReceivableActions } from "./ReceivableActions";
import { useState } from "react";

interface Receivable {
  id: string;
  description: string;
  studentName: string;
  email: string;
  dueDate: string;
  value: number;
  status: "pending" | "paid" | "overdue" | "partial";
}

interface ReceivablesTableProps {
  receivables: Receivable[];
}

export function ReceivablesTable({ receivables: initialReceivables }: ReceivablesTableProps) {
  const [receivables, setReceivables] = useState(initialReceivables);

  const getStatusBadge = (status: Receivable["status"]) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
      partial: "bg-blue-100 text-blue-800"
    };

    const labels = {
      pending: "Pendente",
      paid: "Pago",
      overdue: "Atrasado",
      partial: "Parcial"
    };

    return (
      <Badge variant="outline" className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const handleStatusChange = (id: string, newStatus: Receivable["status"]) => {
    setReceivables(prevReceivables =>
      prevReceivables.map(receivable =>
        receivable.id === id
          ? { ...receivable, status: newStatus }
          : receivable
      )
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Aluno</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {receivables.map((receivable) => (
          <TableRow key={receivable.id}>
            <TableCell>{receivable.description}</TableCell>
            <TableCell>{receivable.studentName}</TableCell>
            <TableCell>
              {new Date(receivable.dueDate).toLocaleDateString('pt-BR')}
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(receivable.value)}
            </TableCell>
            <TableCell>{getStatusBadge(receivable.status)}</TableCell>
            <TableCell>
              <ReceivableActions 
                receivable={receivable}
                onStatusChange={handleStatusChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}