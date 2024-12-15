import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PayableForm } from "./PayableForm";
import { PayablesCalendar } from "./PayablesCalendar";
import { Plus, ChartBar, ChartPie, ChartLine, Calendar, Filter } from "lucide-react";
import { PayableStatus } from "./payables/PayableStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfig = {
  value: {
    theme: {
      light: "rgb(239, 68, 68)",
      dark: "rgb(239, 68, 68)"
    }
  }
};

export function AccountsPayable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chartType, setChartType] = useState<'area' | 'bar' | 'pie'>('area');
  const [period, setPeriod] = useState('month');

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={mockChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={mockChartData}
              dataKey="value"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {mockChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip />
          </PieChart>
        );
      default:
        return (
          <AreaChart data={mockChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(239, 68, 68)"
              fill="rgba(239, 68, 68, 0.2)"
            />
          </AreaChart>
        );
    }
  };

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
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Última Semana</SelectItem>
                    <SelectItem value="month">Último Mês</SelectItem>
                    <SelectItem value="quarter">Último Trimestre</SelectItem>
                    <SelectItem value="year">Último Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={chartType === 'area' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('area')}
                >
                  <ChartLine className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                >
                  <ChartBar className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'pie' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('pie')}
                >
                  <ChartPie className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="h-[200px]">
              <ChartContainer className="h-full" config={chartConfig}>
                {renderChart()}
              </ChartContainer>
            </div>
          </div>

          <PayablesCalendar payables={mockPayables} />
        </div>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Recorrência</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayables.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell>
                    {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>R$ {item.value.toFixed(2)}</TableCell>
                  <TableCell className="capitalize">{item.recurrence}</TableCell>
                  <TableCell>
                    <PayableStatus status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}