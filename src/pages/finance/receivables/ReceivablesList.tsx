import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReceivablesTable } from "@/components/finance/receivables/ReceivablesTable";
import { ReceivablesFilter } from "@/components/finance/receivables/ReceivablesFilter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewReceivableForm } from "@/components/finance/receivables/NewReceivableForm";

interface Receivable {
  id: string;
  studentName: string;
  email: string;
  dueDate: string;
  value: number;
  status: "pending" | "paid" | "overdue";
  paymentMethod?: string;
}

const mockReceivables: Receivable[] = [
  {
    id: "1",
    studentName: "João Silva",
    email: "joao@email.com",
    dueDate: "2024-04-10",
    value: 150.00,
    status: "pending",
    paymentMethod: "pix"
  },
  {
    id: "2",
    studentName: "Maria Santos",
    email: "maria@email.com",
    dueDate: "2024-03-15",
    value: 100.00,
    status: "paid",
    paymentMethod: "credit"
  }
];

export default function ReceivablesList() {
  const navigate = useNavigate();

  return (
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Cobrança
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nova Cobrança</DialogTitle>
              </DialogHeader>
              <NewReceivableForm />
            </DialogContent>
          </Dialog>
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
  );
}