import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { month: "Jan", receita: 18000, despesa: 12000, inadimplencia: 900 },
  { month: "Fev", receita: 21000, despesa: 13000, inadimplencia: 1050 },
  { month: "Mar", receita: 24000, despesa: 14000, inadimplencia: 1200 },
  { month: "Abr", receita: 22000, despesa: 13500, inadimplencia: 1100 },
];

const expensesByCategory = [
  { categoria: "Funcionários", valor: 8000 },
  { categoria: "Aluguel", valor: 3000 },
  { categoria: "Equipamentos", valor: 1500 },
  { categoria: "Marketing", valor: 1000 },
];

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
  valor: {
    label: "Valor",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  }
};

export function FinancialReports() {
  return (
    <Tabs defaultValue="balance" className="space-y-4">
      <TabsList>
        <TabsTrigger value="balance">Balanço Mensal</TabsTrigger>
        <TabsTrigger value="expenses">Despesas por Categoria</TabsTrigger>
        <TabsTrigger value="projection">Projeção Financeira</TabsTrigger>
      </TabsList>

      <TabsContent value="balance">
        <Card>
          <CardHeader>
            <CardTitle>Balanço Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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

      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
            <div className="h-[300px]">
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
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}