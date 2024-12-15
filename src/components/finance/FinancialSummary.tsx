import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

function SummaryCard({ title, value, trend, icon, iconBgColor, iconColor }: SummaryCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          <p className={`text-sm mt-1 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {trend.value}
          </p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function FinancialSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Receita Mensal"
        value="R$ 5.500"
        trend={{ value: "+12% este mês", isPositive: true }}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <SummaryCard
        title="Despesas"
        value="R$ 1.200"
        trend={{ value: "-5% este mês", isPositive: false }}
        icon={<Activity className="w-6 h-6 text-red-600" />}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />
      <SummaryCard
        title="Lucro Líquido"
        value="R$ 4.300"
        trend={{ value: "+8% este mês", isPositive: true }}
        icon={<DollarSign className="w-6 h-6 text-blue-600" />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <SummaryCard
        title="Pagamentos Pendentes"
        value="3"
        trend={{ value: "R$ 1.050 a receber", isPositive: true }}
        icon={<Activity className="w-6 h-6 text-yellow-600" />}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
    </div>
  );
}