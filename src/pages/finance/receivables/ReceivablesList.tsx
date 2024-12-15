import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Search, Mail, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
        to: "email@exemplo.com", // In a real implementation, this would come from the student data
        name: receivable.studentName,
        planName: "Plano Básico", // This would come from the student's plan data
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
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nome ou descrição"
                  className="max-w-sm"
                  type="search"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="paid">Pagos</SelectItem>
                  <SelectItem value="overdue">Atrasados</SelectItem>
                  <SelectItem value="partial">Parciais</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                {mockReceivables.map((receivable) => (
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}