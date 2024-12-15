import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Target, PiggyBank } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  description?: string;
}

const KPICard = ({ title, value, trend, icon, description }: KPICardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          {trend && (
            <p className={`text-sm mt-1 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {trend.value}
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export function FinancialKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Taxa de Inadimplência"
        value="5.2%"
        trend={{
          value: "-0.8% este mês",
          isPositive: true
        }}
        icon={<TrendingDown className="w-6 h-6 text-red-600" />}
        description="Total de mensalidades em atraso"
      />
      <KPICard
        title="Previsão de Receita"
        value="R$ 25.400"
        trend={{
          value: "+12% vs. mês anterior",
          isPositive: true
        }}
        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        description="Próximos 30 dias"
      />
      <KPICard
        title="Meta Mensal"
        value="85%"
        trend={{
          value: "Meta: R$ 30.000",
          isPositive: true
        }}
        icon={<Target className="w-6 h-6 text-blue-600" />}
        description="Progresso da meta mensal"
      />
      <KPICard
        title="Fluxo de Caixa Projetado"
        value="R$ 18.200"
        trend={{
          value: "+5% vs. previsto",
          isPositive: true
        }}
        icon={<PiggyBank className="w-6 h-6 text-purple-600" />}
        description="Saldo previsto fim do mês"
      />
    </div>
  );
}