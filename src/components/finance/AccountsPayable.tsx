import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PayableForm } from "./PayableForm";
import { PayablesCalendar } from "./PayablesCalendar";
import { PayablesChart } from "./payables/PayablesChart";
import { PayablesTable } from "./payables/PayablesTable";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PayableStatusType = "pendente" | "parcial" | "pago" | "atrasado" | "cancelado";

interface Payable {
  id: number;
  description: string;
  dueDate: string;
  value: number;
  status: PayableStatusType;
  category: string;
  recurrence: string;
}

const mockPayables: Payable[] = [
  {
    id: 1,
    description: "Aluguel",
    dueDate: "2024-03-10",
    value: 2000,
    status: "pago",
    category: "aluguel",
    recurrence: "monthly"
  },
  {
    id: 2,
    description: "Energia Elétrica",
    dueDate: "2024-03-15",
    value: 450,
    status: "pendente",
    category: "energia",
    recurrence: "monthly"
  },
  {
    id: 3,
    description: "Internet",
    dueDate: "2024-03-05",
    value: 200,
    status: "atrasado",
    category: "internet",
    recurrence: "monthly"
  },
  {
    id: 4,
    description: "Manutenção Equipamentos",
    dueDate: "2024-03-20",
    value: 800,
    status: "parcial",
    category: "manutencao",
    recurrence: "none"
  }
];

const mockChartData = [
  { month: "Mar", value: 2450 },
  { month: "Abr", value: 2500 },
  { month: "Mai", value: 2600 },
  { month: "Jun", value: 2450 }
];

export function AccountsPayable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Verificar contas vencidas e exibir alertas
  const checkOverduePayables = () => {
    const today = new Date();
    const overduePayables = mockPayables.filter(payable => {
      const dueDate = new Date(payable.dueDate);
      return dueDate < today && payable.status === "pendente";
    });

    if (overduePayables.length > 0) {
      toast({
        title: "Contas Vencidas",
        description: `Você tem ${overduePayables.length} conta(s) vencida(s)`,
        variant: "destructive",
      });
    }
  };

  // Verificar contas próximas do vencimento
  const checkUpcomingPayables = () => {
    const today = new Date();
    const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));
    
    const upcomingPayables = mockPayables.filter(payable => {
      const dueDate = new Date(payable.dueDate);
      return dueDate <= threeDaysFromNow && dueDate >= today && payable.status === "pendente";
    });

    if (upcomingPayables.length > 0) {
      toast({
        title: "Vencimentos Próximos",
        description: `Você tem ${upcomingPayables.length} conta(s) para vencer nos próximos 3 dias`,
      });
    }
  };

  // Verificar alertas ao montar o componente
  React.useEffect(() => {
    checkOverduePayables();
    checkUpcomingPayables();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contas a Pagar</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Conta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Conta</DialogTitle>
              </DialogHeader>
              <PayableForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PayablesChart data={mockChartData} />
          <PayablesCalendar payables={mockPayables} />
        </div>

        <div className="mt-6">
          <PayablesTable payables={mockPayables} />
        </div>
      </Card>
    </div>
  );
}