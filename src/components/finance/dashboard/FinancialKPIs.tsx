import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Target, PiggyBank, DollarSign, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  description?: string;
  progress?: number;
}

const KPICard = ({ title, value, trend, icon, description, progress }: KPICardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <p className={`text-sm flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {trend.value}
            </p>
          )}
          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500">{progress}% concluído</p>
            </div>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className="bg-gray-100 p-3 rounded-full ml-4">
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
        icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
        description="Total de mensalidades em atraso"
      />
      <KPICard
        title="Meta Mensal"
        value="R$ 25.400"
        progress={85}
        icon={<Target className="w-6 h-6 text-blue-600" />}
        description="Meta: R$ 30.000"
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
      <KPICard
        title="Receita Projetada"
        value="R$ 32.500"
        trend={{
          value: "+12% vs. mês anterior",
          isPositive: true
        }}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        description="Próximos 30 dias"
      />
    </div>
  );
}