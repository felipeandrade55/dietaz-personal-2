import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TuitionPayment {
  id: string;
  studentId: string;
  studentName: string;
  dueDate: string;
  value: number;
  paidValue: number;
  status: "pendente" | "parcial" | "pago" | "atrasado";
  paymentHistory: {
    date: string;
    value: number;
    method: string;
  }[];
}

const mockTuitionPayments: TuitionPayment[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "João Silva",
    dueDate: "2024-03-20",
    value: 350,
    paidValue: 175,
    status: "parcial",
    paymentHistory: [
      {
        date: "2024-03-15",
        value: 175,
        method: "PIX"
      }
    ]
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Maria Santos",
    dueDate: "2024-03-25",
    value: 350,
    paidValue: 0,
    status: "pendente",
    paymentHistory: []
  }
];

export function TuitionManagement() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerateCharges = () => {
    toast({
      title: "Cobranças Geradas",
      description: "As cobranças do próximo mês foram geradas com sucesso!",
    });
  };

  const handlePayment = (tuitionId: string) => {
    // Implementar lógica de pagamento
    toast({
      title: "Pagamento Registrado",
      description: "O pagamento foi registrado com sucesso!",
    });
  };

  const viewHistory = (studentId: string) => {
    navigate(`/finance/student/${studentId}/history`);
  };

  const getStatusBadge = (status: TuitionPayment["status"]) => {
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Gestão de Mensalidades</CardTitle>
          <Button onClick={handleGenerateCharges}>
            <Plus className="w-4 h-4 mr-2" />
            Gerar Cobranças
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Valor Pago</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Histórico</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTuitionPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.studentName}</TableCell>
                <TableCell>
                  {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>R$ {payment.value.toFixed(2)}</TableCell>
                <TableCell>R$ {payment.paidValue.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewHistory(payment.studentId)}
                  >
                    <History className="w-4 h-4 mr-2" />
                    Ver Histórico
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handlePayment(payment.id)}
                    disabled={payment.status === "pago"}
                  >
                    Registrar Pagamento
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}