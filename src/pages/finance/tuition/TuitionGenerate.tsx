import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarRange, DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState, useEffect } from "react";

// Mock function to fetch students - replace with actual API call later
const fetchStudents = async () => {
  return [
    {
      id: "1",
      name: "João Silva",
      plan: { name: "Plano Básico", price: 250.00 }
    },
    {
      id: "2",
      name: "Maria Santos",
      plan: { name: "Plano Premium", price: 350.00 }
    }
  ];
};

export default function TuitionGenerate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [monthRef, setMonthRef] = useState(format(new Date(), 'yyyy-MM'));
  const [dueDay, setDueDay] = useState("");
  const [selectedStudents, setSelectedStudents] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  useEffect(() => {
    // Validate if all fields are filled
    const isValid = monthRef !== "" && 
                   dueDay !== "" && 
                   selectedStudents !== "" && 
                   paymentStatus !== "";
    setIsFormValid(isValid);
  }, [monthRef, dueDay, selectedStudents, paymentStatus]);

  const handleGenerateTuition = (event: React.FormEvent) => {
    event.preventDefault();
    
    toast({
      title: "Mensalidades Geradas",
      description: `As mensalidades foram geradas com sucesso! ${autoGenerate ? 'Geração automática ativada.' : ''}`,
    });
  };

  const currentMonth = format(new Date(), 'MMMM yyyy');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gerar Mensalidades</h2>
            <p className="text-muted-foreground">
              Gere mensalidades para os alunos selecionados
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/finance")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Alunos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mês de Referência
              </CardTitle>
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMonth}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {students?.reduce((acc, student) => acc + student.plan.price, 0).toFixed(2) || "0.00"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Geração</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateTuition} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="month">Mês de Referência</Label>
                  <Input
                    id="month"
                    type="month"
                    value={monthRef}
                    onChange={(e) => setMonthRef(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDay">Dia do Vencimento</Label>
                  <Input
                    id="dueDay"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Ex: 10"
                    value={dueDay}
                    onChange={(e) => setDueDay(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Alunos</Label>
                  <Select value={selectedStudents} onValueChange={setSelectedStudents}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os alunos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Alunos</SelectItem>
                      <SelectItem value="active">Apenas Ativos</SelectItem>
                      <SelectItem value="selected">Selecionados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status do Pagamento</Label>
                  <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="paid">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoGenerate"
                  checked={autoGenerate}
                  onCheckedChange={(checked) => setAutoGenerate(checked as boolean)}
                  disabled={!isFormValid}
                />
                <Label
                  htmlFor="autoGenerate"
                  className={!isFormValid ? "text-muted-foreground" : ""}
                >
                  Gerar mensalidades automaticamente
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Gerar Mensalidades
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}