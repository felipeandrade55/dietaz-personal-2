import { useState } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { ChartBar, ChartPie, ChartLine } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfig = {
  value: {
    theme: {
      light: "rgb(239, 68, 68)",
      dark: "rgb(239, 68, 68)"
    }
  }
};

interface PayablesChartProps {
  data: Array<{ month: string; value: number }>;
}

export function PayablesChart({ data }: PayablesChartProps) {
  const [chartType, setChartType] = useState<'area' | 'bar' | 'pie'>('area');
  const [period, setPeriod] = useState('month');

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
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
              data={data}
              dataKey="value"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip />
          </PieChart>
        );
      default:
        return (
          <AreaChart data={data}>
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
  );
}