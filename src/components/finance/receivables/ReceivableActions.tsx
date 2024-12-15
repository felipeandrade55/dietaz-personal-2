import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, FileText, CheckCircle2, AlertCircle, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Receivable {
  id: string;
  studentName: string;
  email: string;
  value: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "partial";
}

interface ReceivableActionsProps {
  receivable: Receivable;
  onStatusChange: (id: string, newStatus: Receivable["status"]) => void;
}

export function ReceivableActions({ receivable, onStatusChange }: ReceivableActionsProps) {
  const { toast } = useToast();

  const handleSendReminder = async () => {
    try {
      // Simulating email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const handleMarkAsPaid = () => {
    onStatusChange(receivable.id, "paid");
    toast({
      title: "Pagamento registrado",
      description: `Pagamento de ${receivable.studentName} registrado com sucesso!`,
    });
  };

  const handleMarkAsOverdue = () => {
    onStatusChange(receivable.id, "overdue");
    toast({
      title: "Status atualizado",
      description: `Cobrança de ${receivable.studentName} marcada como atrasada.`,
    });
  };

  const handleCancelReceivable = () => {
    // Here you would typically call an API to cancel the receivable
    toast({
      title: "Cobrança cancelada",
      description: `Cobrança de ${receivable.studentName} foi cancelada.`,
    });
  };

  const handleGenerateInvoice = () => {
    // Here you would typically generate a PDF invoice
    toast({
      title: "Fatura gerada",
      description: `Fatura para ${receivable.studentName} gerada com sucesso!`,
    });
  };

  return (
    <TooltipProvider>
      <div className="flex justify-end gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSendReminder}
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
              onClick={handleMarkAsPaid}
              disabled={receivable.status === "paid"}
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
              onClick={handleMarkAsOverdue}
              disabled={receivable.status === "overdue" || receivable.status === "paid"}
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
              onClick={handleCancelReceivable}
              disabled={receivable.status === "paid"}
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
              onClick={handleGenerateInvoice}
            >
              <FileText className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Gerar fatura</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}