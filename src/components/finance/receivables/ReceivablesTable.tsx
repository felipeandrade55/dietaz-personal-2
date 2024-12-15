import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, FileText, CheckCircle2, AlertCircle, Ban } from "lucide-react";
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

  const handleMarkAsPaid = (receivable: Receivable) => {
    toast({
      title: "Pagamento registrado",
      description: `Pagamento de ${receivable.studentName} registrado com sucesso!`,
    });
  };

  const handleMarkAsOverdue = (receivable: Receivable) => {
    toast({
      title: "Status atualizado",
      description: `Cobrança de ${receivable.studentName} marcada como atrasada.`,
    });
  };

  const handleCancelReceivable = (receivable: Receivable) => {
    toast({
      title: "Cobrança cancelada",
      description: `Cobrança de ${receivable.studentName} foi cancelada.`,
    });
  };

  return (
    <TooltipProvider>
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
                <div className="flex justify-end gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleSendReminder(receivable)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enviar lembrete</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMarkAsPaid(receivable)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Marcar como pago</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMarkAsOverdue(receivable)}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Marcar como atrasado</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCancelReceivable(receivable)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cancelar cobrança</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          toast({
                            title: "Fatura gerada",
                            description: "Fatura gerada com sucesso!"
                          });
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gerar fatura</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}