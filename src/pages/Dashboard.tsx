import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialKPIs } from "@/components/finance/dashboard/FinancialKPIs";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        
        <FinancialKPIs />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Alunos Ativos</h2>
            <p className="text-gray-600">Total de alunos ativos no sistema</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Mensalidades</h2>
            <p className="text-gray-600">Status das mensalidades do mês</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Próximos Vencimentos</h2>
            <p className="text-gray-600">Pagamentos previstos para os próximos dias</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}