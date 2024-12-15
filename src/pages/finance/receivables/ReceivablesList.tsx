import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReceivablesTable } from "@/components/finance/receivables/ReceivablesTable";
import { ReceivablesFilter } from "@/components/finance/receivables/ReceivablesFilter";

interface Receivable {
  id: string;
  description: string;
  studentName: string;
  dueDate: string;
  value: number;
  status: "pending" | "paid" | "overdue" | "partial";
  type: "monthly" | "enrollment" | "other";
}

const mockReceivables: Receivable[] = [
  {
    id: "1",
    description: "Mensalidade Abril/2024",
    studentName: "João Silva",
    dueDate: "2024-04-10",
    value: 150.00,
    status: "pending",
    type: "monthly"
  },
  {
    id: "2",
    description: "Matrícula 2024",
    studentName: "Maria Santos",
    dueDate: "2024-03-15",
    value: 100.00,
    status: "paid",
    type: "enrollment"
  },
  {
    id: "3",
    description: "Mensalidade Março/2024",
    studentName: "Pedro Oliveira",
    dueDate: "2024-03-10",
    value: 150.00,
    status: "overdue",
    type: "monthly"
  }
];

export default function ReceivablesList() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contas a Receber</h2>
            <p className="text-muted-foreground">
              Gerencie suas contas a receber de forma eficiente
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/finance")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={() => navigate("/finance/receivables/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Cobrança
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Contas a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <ReceivablesFilter />
            <ReceivablesTable receivables={mockReceivables} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
