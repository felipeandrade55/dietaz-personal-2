import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, CreditCard, TrendingUp, Calendar } from "lucide-react";

const stats = [
  {
    title: "Total de Alunos",
    value: "24",
    icon: Users,
    trend: "+2 este mês",
  },
  {
    title: "Receita Mensal",
    value: "R$ 4.200",
    icon: CreditCard,
    trend: "+12% em relação ao mês anterior",
  },
  {
    title: "Sessões Ativas",
    value: "156",
    icon: Calendar,
    trend: "18 esta semana",
  },
  {
    title: "Taxa de Crescimento",
    value: "12%",
    icon: TrendingUp,
    trend: "+2% em relação ao mês anterior",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Bem-vindo(a) de volta!</h2>
          <p className="text-gray-600">Confira o desempenho do seu negócio hoje.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
                </div>
                <div className="bg-brand-100 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-brand-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Pagamentos Recentes</h3>
            <div className="space-y-4">
              <p className="text-gray-500">Nenhum pagamento recente para exibir</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Próximas Sessões</h3>
            <div className="space-y-4">
              <p className="text-gray-500">Nenhuma sessão agendada</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}