import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";

const mockData = [
  { month: "Jan", revenue: 4500 },
  { month: "Fev", revenue: 5200 },
  { month: "Mar", revenue: 4800 },
  { month: "Abr", revenue: 5800 },
  { month: "Mai", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
];

const mockTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Pagamento - João Silva",
    type: "receita",
    value: 350,
  },
  {
    id: 2,
    date: "2024-03-14",
    description: "Material de treino",
    type: "despesa",
    value: -120,
  },
  {
    id: 3,
    date: "2024-03-13",
    description: "Pagamento - Maria Santos",
    type: "receita",
    value: 350,
  },
];

export default function Finance() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Controle Financeiro</h2>
          <p className="text-gray-600">Gerencie suas finanças de forma eficiente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ 5.500</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% este mês
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Despesas</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ 1.200</h3>
                <p className="text-sm text-red-600 mt-1 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -5% este mês
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ 4.300</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8% este mês
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pagamentos Pendentes</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                <p className="text-sm text-yellow-600 mt-1">R$ 1.050 a receber</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Receitas x Despesas</h3>
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mês</SelectItem>
                  <SelectItem value="year">Este Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[300px]">
              <ChartContainer
                className="h-full"
                config={{
                  revenue: {
                    theme: {
                      light: "rgb(34, 197, 94)",
                      dark: "rgb(34, 197, 94)",
                    },
                  },
                }}
              >
                <AreaChart data={mockData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="rgb(34, 197, 94)"
                    fill="rgba(34, 197, 94, 0.2)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Últimas Transações</h3>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span
                    className={`font-medium ${
                      transaction.type === 'receita'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'receita' ? '+' : '-'}
                    R$ {Math.abs(transaction.value)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Histórico de Transações</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'receita'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        transaction.type === 'receita'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {transaction.type === 'receita' ? '+' : '-'}
                      R$ {Math.abs(transaction.value)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}