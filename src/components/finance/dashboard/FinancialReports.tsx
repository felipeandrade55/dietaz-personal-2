import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { month: "Jan", receita: 18000, despesa: 12000, inadimplencia: 900 },
  { month: "Fev", receita: 21000, despesa: 13000, inadimplencia: 1050 },
  { month: "Mar", receita: 24000, despesa: 14000, inadimplencia: 1200 },
  { month: "Abr", receita: 22000, despesa: 13500, inadimplencia: 1100 },
  { month: "Mai", receita: 23000, despesa: 13800, inadimplencia: 980 },
  { month: "Jun", receita: 25000, despesa: 14200, inadimplencia: 850 },
];

const expensesByCategory = [
  { categoria: "Funcionários", valor: 8000 },
  { categoria: "Aluguel", valor: 3000 },
  { categoria: "Equipamentos", valor: 1500 },
  { categoria: "Marketing", valor: 1000 },
  { categoria: "Utilidades", valor: 800 },
  { categoria: "Outros", valor: 500 },
];

const defaultRateData = [
  { status: "Em dia", valor: 85 },
  { status: "Atrasado", valor: 10 },
  { status: "Inadimplente", valor: 5 },
];

const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

const chartConfig = {
  receita: {
    label: "Receita",
    theme: {
      light: "#22c55e",
      dark: "#22c55e"
    }
  },
  despesa: {
    label: "Despesa",
    theme: {
      light: "#ef4444",
      dark: "#ef4444"
    }
  },
  inadimplencia: {
    label: "Inadimplência",
    theme: {
      light: "#f59e0b",
      dark: "#f59e0b"
    }
  }
};

export function FinancialReports() {
  return (
    <Tabs defaultValue="balance" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        <TabsTrigger value="balance">Balanço Mensal</TabsTrigger>
        <TabsTrigger value="default">Inadimplência</TabsTrigger>
        <TabsTrigger value="expenses">Despesas por Categoria</TabsTrigger>
        <TabsTrigger value="projection">Projeção Financeira</TabsTrigger>
      </TabsList>

      <TabsContent value="balance">
        <Card>
          <CardHeader>
            <CardTitle>Balanço Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="#22c55e"
                    fill="rgba(34, 197, 94, 0.2)"
                    name="Receita"
                  />
                  <Area
                    type="monotone"
                    dataKey="despesa"
                    stroke="#ef4444"
                    fill="rgba(239, 68, 68, 0.2)"
                    name="Despesa"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="default">
        <Card>
          <CardHeader>
            <CardTitle>Análise de Inadimplência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={defaultRateData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {defaultRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <BarChart data={expensesByCategory}>
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="valor" fill="#8884d8" name="Valor" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projection">
        <Card>
          <CardHeader>
            <CardTitle>Projeção Financeira</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="#22c55e"
                    fill="rgba(34, 197, 94, 0.2)"
                    name="Receita Projetada"
                  />
                  <Area
                    type="monotone"
                    dataKey="despesa"
                    stroke="#ef4444"
                    fill="rgba(239, 68, 68, 0.2)"
                    name="Despesa Projetada"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}