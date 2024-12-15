import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const mockReceivables = [
  {
    id: 1,
    description: "Mensalidade - João Silva",
    dueDate: "2024-03-20",
    value: 350,
    status: "pendente"
  },
  {
    id: 2,
    description: "Mensalidade - Maria Santos",
    dueDate: "2024-03-25",
    value: 350,
    status: "pendente"
  }
];

const mockChartData = [
  { month: "Mar", value: 700 },
  { month: "Abr", value: 1050 },
  { month: "Mai", value: 1400 },
  { month: "Jun", value: 1050 }
];

export function AccountsReceivable() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contas a Receber</h3>
        <div className="h-[200px] mb-6">
          <ChartContainer
            className="h-full"
            config={{
              receivable: {
                theme: {
                  light: "rgb(34, 197, 94)",
                  dark: "rgb(34, 197, 94)",
                },
              },
            }}
          >
            <AreaChart data={mockChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(34, 197, 94)"
                fill="rgba(34, 197, 94, 0.2)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReceivables.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>R$ {item.value.toFixed(2)}</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
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