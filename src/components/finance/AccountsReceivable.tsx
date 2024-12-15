import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Receivable {
  id: number;
  studentId: number;
  studentName: string;
  description: string;
  dueDate: string;
  value: number;
  paidValue: number;
  status: "pendente" | "parcial" | "pago" | "atrasado";
  type: "mensalidade" | "matricula" | "outros";
}

const mockReceivables: Receivable[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "João Silva",
    description: "Mensalidade - Março/2024",
    dueDate: "2024-03-20",
    value: 350,
    paidValue: 0,
    status: "pendente",
    type: "mensalidade"
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Maria Santos",
    description: "Mensalidade - Março/2024",
    dueDate: "2024-03-25",
    value: 350,
    paidValue: 175,
    status: "parcial",
    type: "mensalidade"
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Pedro Oliveira",
    description: "Matrícula",
    dueDate: "2024-03-15",
    value: 100,
    paidValue: 100,
    status: "pago",
    type: "matricula"
  }
];

const mockChartData = [
  { month: "Mar", value: 700 },
  { month: "Abr", value: 1050 },
  { month: "Mai", value: 1400 },
  { month: "Jun", value: 1050 }
];

const chartConfig = {
  receivable: {
    theme: {
      light: "rgb(34, 197, 94)",
      dark: "rgb(34, 197, 94)",
    },
  },
};

export function AccountsReceivable() {
  const { toast } = useToast();

  // Verificar mensalidades vencidas
  const checkOverduePayments = () => {
    const today = new Date();
    const overduePayments = mockReceivables.filter(receivable => {
      const dueDate = new Date(receivable.dueDate);
      return dueDate < today && (receivable.status === "pendente" || receivable.status === "parcial");
    });

    if (overduePayments.length > 0) {
      toast({
        title: "Mensalidades Vencidas",
        description: `Existem ${overduePayments.length} mensalidade(s) vencida(s)`,
        variant: "destructive",
      });
    }
  };

  // Verificar mensalidades ao montar o componente
  React.useEffect(() => {
    checkOverduePayments();
  }, []);

  const getStatusBadge = (status: Receivable["status"]) => {
    const styles = {
      pendente: "bg-yellow-100 text-yellow-800",
      parcial: "bg-blue-100 text-blue-800",
      pago: "bg-green-100 text-green-800",
      atrasado: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contas a Receber</h3>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Cobrança
          </Button>
        </div>

        <div className="h-[200px] mb-6">
          <ChartContainer className="h-full" config={chartConfig}>
            <AreaChart data={mockChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(34, 197, 94)"
                fill="rgba(34, 197, 94, 0.2)"
              />
            </AreaChart>
          </ChartContainer>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReceivables.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>R$ {item.value.toFixed(2)}</TableCell>
                <TableCell>R$ {item.paidValue.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}