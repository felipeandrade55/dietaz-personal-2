import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, FileText, CheckCircle2, AlertCircle, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendPaymentEmail } from "@/utils/emailService";

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
      const emailData = {
        to: receivable.email,
        name: receivable.studentName,
        planName: "Mensalidade",
        price: receivable.value,
        dueDate: new Date(receivable.dueDate).toLocaleDateString('pt-BR'),
        period: new Date(receivable.dueDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      };

      const success = await sendPaymentEmail(emailData);

      if (success) {
        toast({
          title: "Lembrete enviado",
          description: `Email enviado para ${receivable.studentName}`,
        });
      } else {
        throw new Error("Falha ao enviar email");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar lembrete",
        description: "Não foi possível enviar o email de lembrete.",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsPaid = () => {
    if (receivable.status === "paid") {
      toast({
        title: "Aviso",
        description: "Esta cobrança já está marcada como paga.",
        variant: "destructive",
      });
      return;
    }

    onStatusChange(receivable.id, "paid");
    toast({
      title: "Pagamento registrado",
      description: `Pagamento de ${receivable.studentName} registrado com sucesso!`,
    });
  };

  const handleMarkAsOverdue = () => {
    if (receivable.status === "overdue") {
      toast({
        title: "Aviso",
        description: "Esta cobrança já está marcada como atrasada.",
        variant: "destructive",
      });
      return;
    }

    if (receivable.status === "paid") {
      toast({
        title: "Aviso",
        description: "Não é possível marcar como atrasada uma cobrança já paga.",
        variant: "destructive",
      });
      return;
    }

    onStatusChange(receivable.id, "overdue");
    toast({
      title: "Status atualizado",
      description: `Cobrança de ${receivable.studentName} marcada como atrasada.`,
    });
  };

  const handleCancelReceivable = () => {
    if (receivable.status === "paid") {
      toast({
        title: "Aviso",
        description: "Não é possível cancelar uma cobrança já paga.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você implementaria a lógica real de cancelamento
    toast({
      title: "Cobrança cancelada",
      description: `Cobrança de ${receivable.studentName} foi cancelada.`,
    });
  };

  const handleGenerateInvoice = () => {
    try {
      // Aqui você implementaria a geração real da fatura
      // Por exemplo, chamando uma API para gerar um PDF
      
      toast({
        title: "Fatura gerada",
        description: `Fatura para ${receivable.studentName} gerada com sucesso!`,
      });

      // Simular download do arquivo
      const link = document.createElement('a');
      link.href = '#';
      link.download = `fatura_${receivable.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Erro ao gerar fatura",
        description: "Não foi possível gerar a fatura no momento.",
        variant: "destructive",
      });
    }
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