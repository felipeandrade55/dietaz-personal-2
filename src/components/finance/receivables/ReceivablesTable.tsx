import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendPaymentEmail } from "@/utils/emailService";

interface Receivable {
  id: string;
  description: string;
  studentName: string;
  dueDate: string;
  value: number;
  status: "pending" | "paid" | "overdue" | "partial";
  type: "monthly" | "enrollment" | "other";
}

interface ReceivablesTableProps {
  receivables: Receivable[];
}

export function ReceivablesTable({ receivables }: ReceivablesTableProps) {
  const { toast } = useToast();

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

  const handleSendReminder = async (receivable: Receivable) => {
    try {
      await sendPaymentEmail({
        to: "email@exemplo.com",
        name: receivable.studentName,
        planName: "Plano Básico",
        price: receivable.value,
        dueDate: receivable.dueDate,
        period: receivable.description
      });

      toast({
        title: "Lembrete enviado",
        description: `Email enviado para ${receivable.studentName}`,
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar lembrete",
        description: "Não foi possível enviar o email de lembrete.",
        variant: "destructive",
      });
    }
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
          <TableHead>Ações</TableHead>
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendReminder(receivable)}
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Fatura gerada",
                      description: "Fatura gerada com sucesso!"
                    });
                  }}
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}