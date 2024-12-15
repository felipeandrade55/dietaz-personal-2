import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PayableForm } from "./PayableForm";
import { Plus, ChartBar, ChartPie, ChartLine, Calendar, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockPayables = [
  {
    id: 1,
    description: "Aluguel",
    dueDate: "2024-03-10",
    value: 2000,
    status: "pago",
    category: "aluguel"
  },
  {
    id: 2,
    description: "Energia Elétrica",
    dueDate: "2024-03-15",
    value: 450,
    status: "pendente",
    category: "energia"
  }
];

const mockChartData = [
  { month: "Mar", value: 2450 },
  { month: "Abr", value: 2500 },
  { month: "Mai", value: 2600 },
  { month: "Jun", value: 2450 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

        <div className="flex gap-4 mb-4">
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

        <div className="h-[200px] mb-6">
          <ChartContainer
            className="h-full"
            config={{
              payable: {
                theme: {
                  light: "rgb(239, 68, 68)",
                  dark: "rgb(239, 68, 68)",
                },
              },
            }}
          >
            {renderChart()}
          </ChartContainer>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
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
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      item.status === 'pago'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'atrasado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}